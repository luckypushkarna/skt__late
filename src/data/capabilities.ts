import { 
  Wrench, Package, Truck, Shield, Network, Monitor, 
  Users, Settings, TrendingUp, ShieldCheck, Building2, Globe 
} from "lucide-react";
import { LucideIcon } from "lucide-react";

export interface Capability {
  num: string;
  slug: string;
  icon: LucideIcon;
  title: string;
  tagline: string;
  desc: string;
  overview: string;
  tags: string[];
  bgImage: string;
}

export const CAPABILITIES: Capability[] = [
  {
    num: "01",
    slug: "underground-workshop",
    icon: Wrench,
    title: "Underground Workshop",
    tagline: "Repairs that never stop, deep where the work happens.",
    desc: "A fully integrated underground maintenance ecosystem engineered to support uninterrupted mining operations, with 24/7 repair systems and rapid-response servicing.",
    overview: "On-site underground workshops built directly inside the shaft to keep mining fleets operational around the clock. Our technical teams perform preventive maintenance, breakdown repairs, and component overhauls without sending equipment to surface — saving time, fuel, and production hours.",
    tags: ["24/7 Repair", "Technical Support", "Rapid Response"],
    bgImage: "/Underground Workshop-card.webp",
  },
  {
    num: "02",
    slug: "strategic-warehousing",
    icon: Package,
    title: "Strategic Warehousing",
    tagline: "Every part. Every shift. Always within reach.",
    desc: "Centralised warehousing and inventory systems designed to maintain continuous operational readiness backed by a spare parts inventory valued at over US$3M.",
    overview: "A US$3M+ spare parts inventory managed across centralised depots that keep critical components within reach of every active mining face. Smart stock management ensures zero waiting time for replacement parts, protecting fleet uptime and operational continuity.",
    tags: ["US$3M+ Inventory", "Spare Parts", "Minimum Downtime"],
    bgImage: "/Strategic Warehousing-card.webp",
  },
  {
    num: "03",
    slug: "mechanised-fleet",
    icon: Truck,
    title: "Mechanised Fleet",
    tagline: "Heavy iron, built for deep production.",
    desc: "A world-class mechanised underground mining fleet including loaders, mine trucks, drill rigs, boomers, bolters, and advanced support equipment.",
    overview: "A complete mechanised underground fleet of 225+ machines including heavy loaders, articulated dump trucks, twin-boom drill rigs, roof bolters, and specialised support vehicles. Built to deliver high tonnage, deep-shaft mining at scale.",
    tags: ["Drill Rigs", "Mine Trucks", "Loaders & Bolters"],
    bgImage: "/Mechanised Fleet-card.webp",
  },
  {
    num: "04",
    slug: "rescue-systems",
    icon: Shield,
    title: "Rescue Systems",
    tagline: "Prepared for every scenario, underground.",
    desc: "Advanced underground safety and emergency response infrastructure with integrated rescue chambers, monitoring systems, and preparedness protocols.",
    overview: "Underground rescue chambers, real-time atmospheric monitoring, and trained emergency response teams stationed across all active sections. Every worker is covered by a redundant safety net — gas detection, escape routes, and rescue infrastructure available within minutes.",
    tags: ["Rescue Chambers", "Emergency Protocol", "Live Monitoring"],
    bgImage: "/Rescue Systems-card.webp",
  },
  {
    num: "05",
    slug: "logistics-network",
    icon: Network,
    title: "Logistics Network",
    tagline: "Workforce, equipment, material — moving without interruption.",
    desc: "An interconnected logistics ecosystem enabling continuous workforce mobility, equipment deployment, material handling, and uninterrupted production flow.",
    overview: "Coordinated logistics spanning workforce transport, equipment mobilisation, and ore-to-surface material handling. Our fleet of light and heavy surface vehicles ensures shift movements are on time, consumables reach the face, and production ore reaches the mill without delay.",
    tags: ["Fleet Dispatch", "Material Handling", "Workforce Mobility"],
    bgImage: "/Logistics Network-card.webp",
  },
  {
    num: "06",
    slug: "operational-command",
    icon: Monitor,
    title: "Operational Command",
    tagline: "One control room. Every machine. Every shift.",
    desc: "A unified operational management system integrating engineering, mining, maintenance, logistics, and oversight into one coordinated command infrastructure.",
    overview: "A centralised command centre coordinates engineering, mining production, maintenance schedules, logistics dispatch, and workforce allocation in real time. Live machine telemetry, shift outputs, and safety sensors feed into one operational dashboard for unified control.",
    tags: ["Unified Control", "Production Planning", "Workforce Allocation"],
    bgImage: "/Operational Command-card.webp",
  },
  {
    num: "07",
    slug: "workforce-facilities",
    icon: Users,
    title: "Workforce Facilities",
    tagline: "Built for the people who build the mine.",
    desc: "Purpose-built workforce infrastructure for local and international teams, including accommodation, transportation, welfare support, and 24-hour catering.",
    overview: "Purpose-built housing, catering, transport, and welfare facilities supporting 1,500+ Zambian employees and international specialists. Every worker has access to clean accommodation, three meals daily, medical care, and safe transit to and from site.",
    tags: ["Accommodation", "Catering 24/7", "Welfare Support"],
    bgImage: "/Workforce Facilities-card.webp",
  },
  {
    num: "08",
    slug: "engineering-maintenance",
    icon: Settings,
    title: "Engineering & Maintenance",
    tagline: "Reliability engineered into every component.",
    desc: "Dedicated engineering systems ensuring equipment reliability and continuous underground performance through preventive maintenance and rapid intervention.",
    overview: "Scheduled maintenance protocols, condition monitoring, and rapid intervention teams maintain fleet availability above 90%. Specialised engineering crews work across mechanical, electrical, and hydraulic systems to keep production faces running continuously.",
    tags: ["Preventive Maint.", "Max Availability", "Specialised Teams"],
    bgImage: "/Engineering & Maintenance-card.webp",
  },
  {
    num: "09",
    slug: "production-development",
    icon: TrendingUp,
    title: "Production Development",
    tagline: "Opening new ground. Scaling production.",
    desc: "Accelerated underground mine development focused on long-term production growth and sustainability through mechanisation and modern mining methodologies.",
    overview: "High-speed shaft sinking, decline development, and lateral tunnelling to open new production faces ahead of schedule. Modern mechanised mining methods and disciplined development sequencing ensure sustainable production growth at the Mopani copper operations.",
    tags: ["Mechanisation", "Growth Strategy", "Sustainability"],
    bgImage: "/Production Development-card.webp",
  },
  {
    num: "10",
    slug: "safety-compliance",
    icon: ShieldCheck,
    title: "Safety & Compliance",
    tagline: "Zero harm — enforced at the rock face.",
    desc: "A safety-first operational framework embedded across every aspect of underground mining with rigorous compliance, training, and workforce protection protocols.",
    overview: "Safety is built directly into our mechanics — enforced physical barriers, automated gas monitoring, mandatory pre-shift hazard isolation, and continuous workforce training. Compliance with international mining safety standards is non-negotiable across every shift, every machine, every meter underground.",
    tags: ["Zero Harm", "Compliance Systems", "Continuous Training"],
    bgImage: "/Safety & Compliance-card.webp",
  },
  {
    num: "11",
    slug: "infrastructure-systems",
    icon: Building2,
    title: "Infrastructure Systems",
    tagline: "The backbone of every operation, above and below.",
    desc: "A large-scale operational ecosystem including workshops, offices, warehousing, utility systems, transportation networks, and integrated support infrastructure.",
    overview: "Substantial surface support facilities including secure heavy-parts warehouses, machine shops, administrative offices, high-voltage power substations, water management systems, and integrated transportation networks supporting every aspect of underground operations.",
    tags: ["Utility Systems", "Workshops", "Support Infra"],
    bgImage: "/Infrastructure Systems-card.webp",
  },
  {
    num: "12",
    slug: "future-expansion",
    icon: Globe,
    title: "Future Expansion",
    tagline: "Scaling into Africa's copper belt.",
    desc: "SKT Global is positioning for regional expansion through modernisation, operational scale, and strategic investment across multiple mining regions in Africa.",
    overview: "Leveraging our Zambian operational footprint, SKT Global is positioned to mobilise heavy equipment fleets and launch contract mining services in neighbouring copper belts across Sub-Saharan Africa. Strategic investments in modernisation and workforce localisation drive the next phase of growth.",
    tags: ["Africa Expansion", "Scale-Up", "New Regions"],
    bgImage: "/Future Expansion-card.webp",
  },
];

// Helper function to get capability by slug
export function getCapabilityBySlug(slug: string): Capability | undefined {
  return CAPABILITIES.find(c => c.slug === slug);
}

// Helper function to get prev/next
export function getAdjacentCapabilities(slug: string) {
  const index = CAPABILITIES.findIndex(c => c.slug === slug);
  if (index === -1) return { prev: null, next: null };
  
  const prev = index > 0 ? CAPABILITIES[index - 1] : CAPABILITIES[CAPABILITIES.length - 1];
  const next = index < CAPABILITIES.length - 1 ? CAPABILITIES[index + 1] : CAPABILITIES[0];
  
  return { prev, next };
}

export interface GalleryItem {
  src: string;
  caption: string;
}

export function getCapabilityGallery(slug: string): GalleryItem[] {
  switch (slug) {
    case "underground-workshop":
      return [
        { src: "/Underground Workshop.webp", caption: "Heavy Maintenance Bays" },
        { src: "/Mechanised Fleet.webp", caption: "Hydraulic System Repairs" },
        { src: "/Engineering & Maintenance.webp", caption: "Electrical Calibrations" },
        { src: "/Strategic Warehousing.webp", caption: "Critical Spare Parts Depot" },
        { src: "/Safety & Compliance.webp", caption: "Technician Training Programs" },
        { src: "/Operational Command.webp", caption: "Digital Diagnostics Center" },
      ];
    case "strategic-warehousing":
      return [
        { src: "/Strategic Warehousing.webp", caption: "US$3M+ Parts Stockpile" },
        { src: "/Logistics Network.webp", caption: "Shift Materials Dispatch" },
        { src: "/Underground Workshop.webp", caption: "Parts Assembly Stations" },
        { src: "/Mechanised Fleet.webp", caption: "Heavy Transport Fleet Support" },
        { src: "/Infrastructure Systems.webp", caption: "Centralized Supply Depots" },
        { src: "/Operational Command.webp", caption: "Smart Inventory Tracking" },
      ];
    case "mechanised-fleet":
      return [
        { src: "/Mechanised Fleet.webp", caption: "Articulated Dump Trucks" },
        { src: "/Underground Workshop.webp", caption: "LHD Loader Servicing" },
        { src: "/Infrastructure Systems.webp", caption: "Drill Rig Fleet Deployment" },
        { src: "/Safety & Compliance.webp", caption: "Twin-Boom Boomer Operations" },
        { src: "/Rescue Systems.webp", caption: "Automated Utility Fleet" },
        { src: "/Logistics Network.webp", caption: "Ore Transportation Systems" },
      ];
    case "rescue-systems":
      return [
        { src: "/Rescue Systems.webp", caption: "Underground Rescue Chambers" },
        { src: "/Safety & Compliance.webp", caption: "Atmospheric Monitoring Units" },
        { src: "/Emergency Readiness.webp", caption: "Sub-5-Minute Response Protocols" },
        { src: "/Continuous Training.webp", caption: "Safety Drills & Education" },
        { src: "/Operational Command.webp", caption: "Real-Time Tracking Systems" },
        { src: "/Workforce Facilities.webp", caption: "Emergency Medical Center" },
      ];
    case "logistics-network":
      return [
        { src: "/Logistics Network.webp", caption: "Ore Sizing & Conveyor Handling" },
        { src: "/Mechanised Fleet.webp", caption: "Articulated Mine Haulers" },
        { src: "/Infrastructure Systems.webp", caption: "Heavy Surface Transit Depot" },
        { src: "/Workforce Facilities.webp", caption: "Staff Transport Operations" },
        { src: "/Operational Command.webp", caption: "Real-Time Fleet Dispatch" },
        { src: "/Strategic Warehousing.webp", caption: "Consumables Inventory Depots" },
      ];
    case "operational-command":
      return [
        { src: "/Operational Command.webp", caption: "Central Control Interface" },
        { src: "/Safety & Compliance.webp", caption: "Safety Telemetry Control" },
        { src: "/Logistics Network.webp", caption: "Real-Time Fleet Monitors" },
        { src: "/Engineering & Maintenance.webp", caption: "Predictive Health Dashboards" },
        { src: "/Infrastructure Systems.webp", caption: "Substation Control Network" },
        { src: "/Underground Workshop.webp", caption: "Maintenance Queue Display" },
      ];
    case "workforce-facilities":
      return [
        { src: "/Workforce Facilities.webp", caption: "International Lodgings" },
        { src: "/Logistics Network.webp", caption: "Shift Transport Hub" },
        { src: "/Safety & Compliance.webp", caption: "Catering and Dining Hall" },
        { src: "/Emergency Readiness.webp", caption: "On-site Medical Clinic" },
        { src: "/Community Safety Culture.webp", caption: "Recreational Fields" },
        { src: "/Continuous Training.webp", caption: "Welfare Support Center" },
      ];
    case "engineering-maintenance":
      return [
        { src: "/Engineering & Maintenance.webp", caption: "Predictive Asset Auditing" },
        { src: "/Underground Workshop.webp", caption: "High-Pressure Hydraulic Rig" },
        { src: "/Mechanised Fleet.webp", caption: "LHD Loader Calibration" },
        { src: "/Strategic Warehousing.webp", caption: "Pre-Assembled Component Depot" },
        { src: "/Operational Command.webp", caption: "Telemetry Analysis Labs" },
        { src: "/Safety & Compliance.webp", caption: "Engine Load Testing" },
      ];
    case "production-development":
      return [
        { src: "/Production Development.webp", caption: "Lateral Tunnel Excavation" },
        { src: "/Mechanised Fleet.webp", caption: "High-Speed Declines Sinking" },
        { src: "/Infrastructure Systems.webp", caption: "Decline Ventilation Mains" },
        { src: "/Underground Workshop.webp", caption: "Production Face Support" },
        { src: "/Safety & Compliance.webp", caption: "Geotechnical Rock Bolting" },
        { src: "/Logistics Network.webp", caption: "Rapid High-Tonnage Haulage" },
      ];
    case "safety-compliance":
      return [
        { src: "/Safety & Compliance.webp", caption: "Mandatory Pre-Shift Briefing" },
        { src: "/Rescue Systems.webp", caption: "Self-Rescuer Inspection" },
        { src: "/Continuous Training.webp", caption: "Over 5,000 Hours Safety Ed." },
        { src: "/Emergency Readiness.webp", caption: "On-Site Rescue Drills" },
        { src: "/Community Safety Culture.webp", caption: "Outreach Partnership Centers" },
        { src: "/Operational Command.webp", caption: "Continuous Gas Telemetry" },
      ];
    case "infrastructure-systems":
      return [
        { src: "/Infrastructure Systems.webp", caption: "Power & Utility Substation" },
        { src: "/Strategic Warehousing.webp", caption: "Consolidated Material Depots" },
        { src: "/Underground Workshop.webp", caption: "Surface Machine Shop" },
        { src: "/Logistics Network.webp", caption: "Administrative Office Blocks" },
        { src: "/Workforce Facilities.webp", caption: "Personnel Transit Centers" },
        { src: "/Future Expansion.webp", caption: "Regional Expansion Yards" },
      ];
    case "future-expansion":
      return [
        { src: "/Future Expansion.webp", caption: "Sub-Saharan Growth Strategy" },
        { src: "/Infrastructure Systems.webp", caption: "Regional Operations Headquarters" },
        { src: "/Logistics Network.webp", caption: "Heavy Equipment Mobilization" },
        { src: "/Continuous Training.webp", caption: "International Skills Exchange" },
        { src: "/Safety & Compliance.webp", caption: "Unified Mining Frameworks" },
        { src: "/Operational Command.webp", caption: "Global Command Operations" },
      ];
    default:
      return [
        { src: "/Workforce Facilities.webp", caption: "System Overview" },
        { src: "/Underground Workshop.webp", caption: "Active Operations" },
        { src: "/Strategic Warehousing.webp", caption: "Material Supply" },
        { src: "/Mechanised Fleet.webp", caption: "Heavy Machinery" },
        { src: "/Rescue Systems.webp", caption: "Emergency Systems" },
        { src: "/Logistics Network.webp", caption: "Distribution Network" },
      ];
  }
}
