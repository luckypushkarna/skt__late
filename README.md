# 🏢 SKT Global Mining & Services

> [!CAUTION]
> # 🛑 CRITICAL WARNING: DO NOT TOUCH THE CODE
> *"This codebase is a highly optimized, fully audited production-ready machine. A single unescaped quote (`'`), raw double quote (`"`), or unchecked change will instantly trigger a React Hydration Mismatch, break ESLint compilation, and crash the Vercel deployment pipeline. **Touch nothing unless you are absolutely prepared to fix it.**"*

---

## 🚫 The Golden Rule: No Raw Quotes

When modifying any text inside React components (`.tsx` files), **never** type raw quotation marks or apostrophes directly inside JSX markup.

### ❌ WRONG (Will break Vercel immediately)
```jsx
<p>We don't just extract value, we build "excellence" here.</p>
```

### ✅ CORRECT (Production-safe entities)
```jsx
<p>We don&apos;t just extract value, we build &ldquo;excellence&rdquo; here.</p>
```

---

## ⚡ The 3-Step Safety Check (Run Before Pushing)

If you *must* edit the code, you **must** run these commands in order and ensure they pass with **zero errors** before pushing to GitHub:

```bash
# 1. Verify TypeScript compilation
npx tsc --noEmit

# 2. Check for ESLint violations
npm run lint

# 3. Test local production build
npm run build
```

---

## 🚀 Dev Commands
*   **Turbopack Dev:** `npm run dev`
*   **Production Run:** `npm run build && npm run start`
