export interface Location {
  id: string;
  name: string;
  province: string;
  type: "hq" | "major" | "branch" | "mall";
  /** Coordinates as % of map container (0–100) */
  x: number;
  y: number;
  isMain?: boolean;
}

export interface Province {
  id: string;
  name: string;
  count: number;
}

export const PROVINCES: Province[] = [
  { id: "western",       name: "Western",       count: 2  },
  { id: "north-western", name: "North Western", count: 2  },
  { id: "copperbelt",    name: "Copperbelt",    count: 4  },
  { id: "central",       name: "Central",       count: 4  },
  { id: "lusaka",        name: "Lusaka",        count: 19 },
  { id: "southern",      name: "Southern",      count: 3  },
  { id: "eastern",       name: "Eastern",       count: 1  },
  { id: "northern",      name: "Northern",      count: 2  },
  { id: "muchinga",      name: "Muchinga",      count: 2  },
  { id: "luapula",       name: "Luapula",       count: 1  },
];

export const LOCATIONS: Location[] = [
  // ── WESTERN ──────────────────────────────────────────────────────────
  { id: "mongu",         name: "Mongu",              province: "western",       type: "major",  x: 18, y: 52 },
  { id: "kaoma",         name: "Kaoma",              province: "western",       type: "branch", x: 28, y: 55 },

  // ── NORTH WESTERN ────────────────────────────────────────────────────
  { id: "solwezi",       name: "Solwezi",            province: "north-western", type: "major",  x: 38, y: 36 },
  { id: "kalumbila",     name: "Kalumbila",          province: "north-western", type: "branch", x: 34, y: 38 },

  // ── COPPERBELT ───────────────────────────────────────────────────────
  { id: "ndola",         name: "Ndola",              province: "copperbelt",    type: "major",  x: 50, y: 44 },
  { id: "kitwe",         name: "Kitwe",              province: "copperbelt",    type: "branch", x: 48, y: 41 },
  { id: "chingola",      name: "Chingola",           province: "copperbelt",    type: "branch", x: 46, y: 39 },
  { id: "chililabombwe", name: "Chililabombwe",      province: "copperbelt",    type: "branch", x: 45, y: 37 },

  // ── CENTRAL ──────────────────────────────────────────────────────────
  { id: "kabwe",         name: "Kabwe",              province: "central",       type: "major",  x: 50, y: 54 },
  { id: "kapiri-mposhi", name: "Kapiri Mposhi",      province: "central",       type: "branch", x: 51, y: 49 },
  { id: "serenje",       name: "Serenje",            province: "central",       type: "branch", x: 58, y: 48 },
  { id: "jacaranda",     name: "Jacaranda Mall",     province: "central",       type: "mall",   x: 49, y: 46 },

  // ── LUSAKA (Main Hub) ─────────────────────────────────────────────────
  { id: "lusaka",        name: "Lusaka",             province: "lusaka",        type: "hq",     x: 52, y: 65, isMain: true },
  { id: "cross-roads",   name: "Cross Roads",        province: "lusaka",        type: "mall",   x: 50, y: 63 },
  { id: "manda-hill",    name: "Manda Hill",         province: "lusaka",        type: "mall",   x: 51, y: 64 },
  { id: "industrial",    name: "Industrial Area",    province: "lusaka",        type: "branch", x: 49, y: 65 },
  { id: "kafue",         name: "Kafue",              province: "lusaka",        type: "branch", x: 51, y: 68 },
  { id: "cosmopolitan",  name: "Cosmopolitan Mall",  province: "lusaka",        type: "mall",   x: 48, y: 66 },
  { id: "lewanika",      name: "Lewanika Mall",      province: "lusaka",        type: "mall",   x: 47, y: 65 },
  { id: "northend",      name: "Northend",           province: "lusaka",        type: "branch", x: 53, y: 63 },
  { id: "chandwe",       name: "Chandwe Musonda",    province: "lusaka",        type: "branch", x: 54, y: 64 },
  { id: "kamwala",       name: "Kamwala",            province: "lusaka",        type: "branch", x: 52, y: 66 },
  { id: "longacres",     name: "Longacres",          province: "lusaka",        type: "branch", x: 53, y: 67 },
  { id: "premier",       name: "Premier Banking Suite", province: "lusaka",     type: "branch", x: 54, y: 65 },
  { id: "chilanga",      name: "Chilanga",           province: "lusaka",        type: "branch", x: 50, y: 69 },
  { id: "kkia",          name: "KKIA",               province: "lusaka",        type: "branch", x: 55, y: 67 },
  { id: "mulungushi",    name: "Mulungushi",         province: "lusaka",        type: "branch", x: 52, y: 56 },
  { id: "university",    name: "University Agency",  province: "lusaka",        type: "branch", x: 53, y: 57 },
  { id: "waterfalls",    name: "Waterfalls Mall",    province: "lusaka",        type: "mall",   x: 55, y: 60 },
  { id: "luangwa",       name: "Luangwa",            province: "lusaka",        type: "branch", x: 60, y: 61 },
  { id: "nyimba",        name: "Nyimba",             province: "lusaka",        type: "branch", x: 64, y: 62 },

  // ── SOUTHERN ─────────────────────────────────────────────────────────
  { id: "livingstone",   name: "Livingstone",        province: "southern",      type: "major",  x: 35, y: 82 },
  { id: "choma",         name: "Choma",              province: "southern",      type: "branch", x: 42, y: 73 },
  { id: "pemba",         name: "Pemba",              province: "southern",      type: "branch", x: 44, y: 71 },

  // ── EASTERN ──────────────────────────────────────────────────────────
  { id: "chipata",       name: "Chipata",            province: "eastern",       type: "major",  x: 75, y: 56 },

  // ── NORTHERN ─────────────────────────────────────────────────────────
  { id: "kasama",        name: "Kasama",             province: "northern",      type: "major",  x: 65, y: 25 },
  { id: "mungwi",        name: "Mungwi",             province: "northern",      type: "branch", x: 68, y: 27 },

  // ── MUCHINGA ─────────────────────────────────────────────────────────
  { id: "chinsali",      name: "Chinsali",           province: "muchinga",      type: "major",  x: 70, y: 32 },
  { id: "lundazi",       name: "Lundazi",            province: "muchinga",      type: "branch", x: 76, y: 45 },

  // ── LUAPULA ──────────────────────────────────────────────────────────
  { id: "mansa",         name: "Mansa",              province: "luapula",       type: "major",  x: 52, y: 30 },
];
