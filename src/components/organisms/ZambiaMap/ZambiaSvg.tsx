"use client";

export function ZambiaSvg() {
  return (
    <svg
      viewBox="0 0 1000 820"
      className="absolute inset-0 w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Dotted texture fill */}
        <pattern id="zambia-dots" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.1" fill="rgba(255,255,255,0.16)" />
        </pattern>

        {/* Subtle inner glow on the border */}
        <filter id="zambia-glow" x="-5%" y="-5%" width="110%" height="110%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/*
        Zambia outline — hand-traced from geographic data.
        The shape covers the map container at viewBox 0 0 1000 820.
        Provinces are approximated with dashed interior lines.
      */}
      <path
        d="
          M 178,385
          L 185,360 L 195,340 L 215,310 L 240,285
          L 270,270 L 305,258 L 340,248 L 375,238
          L 405,228 L 435,218 L 462,212 L 490,208
          L 518,210 L 548,210 L 575,216 L 598,222
          L 618,220 L 640,214 L 665,210 L 690,212
          L 715,218 L 740,226 L 760,238 L 778,255
          L 792,274 L 802,295 L 808,318 L 808,342
          L 804,366 L 795,388 L 790,408 L 795,432
          L 806,456 L 820,480 L 830,506 L 832,532
          L 825,555 L 812,575 L 793,590 L 770,602
          L 742,612 L 710,618 L 678,616 L 645,610
          L 615,606 L 588,608 L 560,614 L 530,618
          L 500,618 L 472,614 L 445,605 L 418,592
          L 394,576 L 374,558 L 355,538 L 340,515
          L 326,492 L 312,468 L 298,444 L 284,420
          L 268,402 L 250,392 L 230,388 L 210,388
          Z
        "
        fill="url(#zambia-dots)"
        stroke="rgba(255,255,255,0.18)"
        strokeWidth="1.5"
        filter="url(#zambia-glow)"
      />

      {/* ── Province interior boundary lines (dashed) ── */}
      <g
        stroke="rgba(255,255,255,0.10)"
        strokeWidth="1"
        strokeDasharray="5,5"
        fill="none"
      >
        {/* Western | Central divider */}
        <line x1="350" y1="248" x2="350" y2="540" />
        {/* Central | Copperbelt / Lusaka divider */}
        <line x1="490" y1="208" x2="510" y2="450" />
        {/* Copperbelt | Northern divider */}
        <line x1="510" y1="208" x2="570" y2="330" />
        {/* Northern | Muchinga / Eastern */}
        <line x1="640" y1="214" x2="660" y2="420" />
        {/* Southern | Lusaka divider */}
        <line x1="350" y1="540" x2="620" y2="558" />
        {/* Horizontal mid-country divider (approximate) */}
        <line x1="260" y1="430" x2="810" y2="430" />
      </g>
    </svg>
  );
}
