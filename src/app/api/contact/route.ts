import { type NextRequest, NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validations";
import type { ApiResponse, ContactApiResponse } from "@/types/api";
import { sanitizeInput } from "@/lib/validations";
// In-memory rate limiting (use Redis in production)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  return (
    forwarded?.split(",")[0]?.trim() ??
    realIp ??
    "unknown"
  );
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60_000; // 1 minute
  const maxRequests = 5; // per window

  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs });
    return false;
  }

  if (record.count >= maxRequests) {
    return true;
  }

  record.count++;
  return false;
}

function buildErrorResponse<T = unknown>(
  message: string,
  status: number
): NextResponse<ApiResponse<T>> {
  return NextResponse.json(
    { success: false, error: message, statusCode: status },
    { status }
  ) as unknown as NextResponse<ApiResponse<T>>;
}

export async function POST(
  request: NextRequest
): Promise<NextResponse<ApiResponse<ContactApiResponse>>> {
  // Rate limiting
  const ip = getClientIp(request);
  if (checkRateLimit(ip)) {
    return buildErrorResponse(
      "Too many requests. Please try again in 1 minute.",
      429
    );
  }

  // Content-Type check
  const contentType = request.headers.get("content-type");
  if (!contentType?.includes("application/json")) {
    return buildErrorResponse("Invalid content type.", 400);
  }

  // Parse body
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return buildErrorResponse("Invalid JSON body.", 400);
  }

  // Validate & sanitize
  const parseResult = contactFormSchema.safeParse(body);
  if (!parseResult.success) {
    const errors = parseResult.error.flatten().fieldErrors;
    return NextResponse.json(
      {
        success: false,
        error: "Validation failed",
        statusCode: 422,
        data: errors as unknown as ContactApiResponse,
      },
      { status: 422 }
    );
  }

  const { name, email, company, phone, subject, message, honeypot } =
    parseResult.data;

  // Honeypot check
  if (honeypot && honeypot.length > 0) {
    // Silently reject bots
    return NextResponse.json(
      {
        success: true,
        message: "Message received.",
        statusCode: 200,
        data: { sent: true, timestamp: new Date().toISOString() },
      },
      { status: 200 }
    );
  }

  // Sanitize
  const sanitizedData: {
    name: string;
    email: string;
    company?: string;
    phone?: string;
    subject: string;
    message: string;
  } = {
    name: sanitizeInput(name),
    email: sanitizeInput(email),
    subject: sanitizeInput(subject),
    message: sanitizeInput(message),
  };

  if (company) sanitizedData.company = sanitizeInput(company);
  if (phone) sanitizedData.phone = sanitizeInput(phone);

  // Send email (lazy import to keep serverless bundle small)
  try {
    const { sendContactEmail } = await import("@/lib/email");
    await sendContactEmail(sanitizedData);
  } catch (error) {
    return buildErrorResponse(
      "Failed to send your message. Please try again later.",
      500
    );
  }

  return NextResponse.json(
    {
      success: true,
      message: "Your message has been sent. We'll respond within 24 hours.",
      statusCode: 200,
      data: {
        sent: true,
        timestamp: new Date().toISOString(),
      },
    },
    {
      status: 200,
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
}

// Block non-POST
export async function GET(): Promise<NextResponse> {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
