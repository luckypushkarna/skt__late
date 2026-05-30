// ─── Services data ────────────────────────────────────────────────────────────
// Pure data — no "use client". Safe to import from Server and Client components.

export type ServiceCard = {
  num: string;
  iconName: string; // we resolve the Lucide icon in each component
  slug: string;
  title: string;
  desc: string;
  detail: string;
  tags: string[];
  bgImage: string;
};

export const CARDS: ServiceCard[] = [
  {
    num: "01",
    iconName: "Wrench",
    slug: "workshop",
    title: "Workshop",
    desc: "Full underground maintenance hub. 24/7 repair, rapid response.",
    detail:
      "Our underground workshop is a fully self-sufficient maintenance facility operating 24 hours a day. Equipped with heavy lifting capability, precision tooling, and a rapid-response technical team, it minimises equipment downtime and keeps every machine on the roster mission-ready.",
    tags: ["24/7 Repair", "Rapid Response"],
    bgImage: "/Underground Workshop.webp",
  },
  {
    num: "02",
    iconName: "Package",
    slug: "warehousing",
    title: "Warehousing",
    desc: "US$3M+ spare parts inventory. Zero downtime readiness.",
    detail:
      "A centralised warehousing operation stocking over US$3 million in OEM and aftermarket parts. Inventory is tracked in real time, enabling same-shift parts fulfilment and eliminating the production delays associated with procurement lead times.",
    tags: ["US$3M+ Stock", "Zero Downtime"],
    bgImage: "/Strategic Warehousing.webp",
  },
  {
    num: "03",
    iconName: "Truck",
    slug: "fleet",
    title: "Fleet",
    desc: "Loaders, drill rigs, mine trucks. Underground-ready, always.",
    detail:
      "SKT operates a mechanised underground fleet covering every production phase — LHD loaders, 50-tonne mine trucks, long-hole drill rigs, development jumbos, cable bolters, and utility vehicles. Each unit is maintained to OEM specification and deployed to maximise shift utilisation.",
    tags: ["Drill Rigs", "Mine Trucks"],
    bgImage: "/Mechanised Fleet.webp",
  },
  {
    num: "04",
    iconName: "Shield",
    slug: "rescue",
    title: "Rescue",
    desc: "Rescue chambers, live monitoring, emergency response protocols.",
    detail:
      "Purpose-built rescue chambers are positioned at strategic underground intervals, each stocked with life support supplies for extended survival. Paired with real-time atmospheric and personnel monitoring, our mine rescue team conducts regular drills and holds certifications aligned with international standards.",
    tags: ["Rescue Chambers", "Live Monitoring"],
    bgImage: "/Rescue Systems.webp",
  },
  {
    num: "05",
    iconName: "Network",
    slug: "logistics",
    title: "Logistics",
    desc: "Workforce, equipment, material — moving without interruption.",
    detail:
      "Coordinated logistics spanning workforce transport, equipment mobilisation, and ore-to-surface material handling. Our fleet of light and heavy surface vehicles ensures shift movements are on time, consumables reach the face, and production ore reaches the mill without delay.",
    tags: ["Fleet Dispatch", "Material Handling"],
    bgImage: "/Logistics Network.webp",
  },
  {
    num: "06",
    iconName: "Monitor",
    slug: "command",
    title: "Command",
    desc: "Engineering, mining, maintenance — one coordinated operations room.",
    detail:
      "A single operations command integrating shift reports, equipment tracking, personnel location, and production KPIs. Mine managers and engineers work from a unified dashboard that surfaces bottlenecks in real time, allowing immediate corrective action before production targets are missed.",
    tags: ["Unified Control", "Production Planning"],
    bgImage: "/Operational Command.webp",
  },
  {
    num: "07",
    iconName: "Users",
    slug: "facilities",
    title: "Facilities",
    desc: "Accommodation, 24-hour catering, welfare for every shift.",
    detail:
      "Permanent and rotational workforce accommodation built to international mining camp standards. A 24-hour catering operation feeds every shift, recreational facilities support wellbeing, and a dedicated welfare team manages the pastoral needs of both local national and expatriate personnel.",
    tags: ["Accommodation", "24/7 Catering"],
    bgImage: "/Workforce Facilities.webp",
  },
  {
    num: "08",
    iconName: "Settings",
    slug: "engineering",
    title: "Engineering",
    desc: "Preventive maintenance keeping every machine at peak capacity.",
    detail:
      "A structured engineering regime built on manufacturer-recommended maintenance intervals, oil analysis, and predictive condition monitoring. Component rebuild schedules are tracked by a dedicated planning team, ensuring major failures are anticipated and addressed during planned downtime rather than unplanned stoppages.",
    tags: ["Preventive Maint.", "Max Availability"],
    bgImage: "/Engineering & Maintenance.webp",
  },
  {
    num: "09",
    iconName: "TrendingUp",
    slug: "production",
    title: "Production",
    desc: "Mechanised mine development built for long-term output growth.",
    detail:
      "Underground development and production drilling executed using fully mechanised methods. Development headings are advanced on a twin-boom jumbo cycle, with production blasting, mucking, and trucking sequenced to sustain continuous ore flow from the stopes to the primary crusher.",
    tags: ["Mechanisation", "Growth Strategy"],
    bgImage: "/Production Development.webp",
  },
  {
    num: "10",
    iconName: "ShieldCheck",
    slug: "safety",
    title: "Safety",
    desc: "Zero-harm culture. Rigorous training, compliance, and protection.",
    detail:
      "A zero-harm safety philosophy embedded at every level of operation. Mandatory induction, task-based risk assessments, and monthly safety audits are supplemented by a proactive near-miss reporting culture. All personnel are trained to stop any task they judge to be unsafe without consequence.",
    tags: ["Zero Harm", "Compliance"],
    bgImage: "/Safety & Compliance.webp",
  },
  {
    num: "11",
    iconName: "Building2",
    slug: "infrastructure",
    title: "Infrastructure",
    desc: "Workshops, offices, utilities — built for scale underground.",
    detail:
      "Surface and underground infrastructure designed for long-life mining operations — portal construction, decline development, pump stations, compressed air reticulation, ventilation fans, underground electrical substations, and a surface workshop complex capable of handling the heaviest fleet components.",
    tags: ["Utility Systems", "Workshops"],
    bgImage: "/Infrastructure Systems.webp",
  },
  {
    num: "12",
    iconName: "Globe",
    slug: "expansion",
    title: "Expansion",
    desc: "Strategic investment positioning SKT across new African regions.",
    detail:
      "SKT Global is actively evaluating new project opportunities across sub-Saharan Africa, with a focus on countries that have established mining codes and proven mineral endowment. Our expansion model leverages existing equipment assets, operational expertise, and local community relationships to fast-track project establishment.",
    tags: ["Africa Regions", "Scale-Up"],
    bgImage: "/Future Expansion.webp",
  },
];
