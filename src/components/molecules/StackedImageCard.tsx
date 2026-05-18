import { JSX } from "react";
import { Play } from "lucide-react";

export interface StatItem {
  value: string;
  label: string;
}

export interface StackedImageCardProps {
  backgroundImage?: string;
  stats?: StatItem[];
  className?: string;
}

export function StackedImageCard({
  backgroundImage = "https://picsum.photos/seed/mining/800/1200",
  stats = [
    { value: "$600B", label: "Global Contribution" },
    { value: "70%", label: "Sustainable Practices" },
    { value: "10%", label: "Annual Growth Rate" },
  ],
  className = "",
}: StackedImageCardProps): JSX.Element {
  return (
    <div className={`relative w-full max-w-[500px] aspect-[5/4] mx-auto card-stack-wrapper ${className}`}>
      
      {/* Layer 5 - Deepest Back Card */}
      <div 
        className="absolute w-full h-full bg-[#F0F4F8] rounded-[24px] shadow-sm"
        style={{ 
          transform: "translateY(-56px) scale(0.88)", 
          transformOrigin: "top center",
          zIndex: 5 
        }}
      />
      
      {/* Layer 4 - Far Back Card */}
      <div 
        className="absolute w-full h-full bg-[#E6EDF3] rounded-[24px] shadow-sm"
        style={{ 
          transform: "translateY(-42px) scale(0.91)", 
          transformOrigin: "top center",
          zIndex: 6 
        }}
      />

      {/* Layer 3 - Mid Back Card */}
      <div 
        className="absolute w-full h-full bg-[#D0DCE7] rounded-[24px] shadow-sm"
        style={{ 
          transform: "translateY(-28px) scale(0.94)", 
          transformOrigin: "top center",
          zIndex: 7 
        }}
      />
      
      {/* Layer 2 - Near Back Card */}
      <div 
        className="absolute w-full h-full bg-[#B8C8D9] rounded-[24px] shadow-md"
        style={{ 
          transform: "translateY(-14px) scale(0.97)", 
          transformOrigin: "top center",
          zIndex: 8 
        }}
      />
      
      {/* Layer 1 - Front Hero Card */}
      <div 
        className="absolute w-full h-full rounded-[24px] overflow-hidden shadow-2xl flex flex-col justify-between"
        style={{ 
          zIndex: 10,
        }}
      >
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${backgroundImage}')` }}
        />
        
        {/* Dark overlay for text contrast matching the gradient spec */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
        
        {/* Content Overlay - Top Left Action */}
        <div className="relative z-40 p-6 flex justify-start">
          <button className="flex items-center gap-2.5 bg-black/20 backdrop-blur-md border border-white/30 text-white px-4 py-2 rounded-full text-xs font-bold hover:bg-black/40 transition-colors cursor-pointer">
            <div className="w-5 h-5 flex items-center justify-center bg-white text-neutral-900 rounded-full">
              <Play size={10} className="ml-0.5" fill="currentColor" />
            </div>
            Watch Our Story
          </button>
        </div>

        {/* Content Overlay - Bottom */}
        <div className="relative z-40 p-6 md:p-8 flex items-end justify-between">
          {/* Bottom-Left Data Stats (Typographic Stack) */}
          <div className="flex flex-col gap-5 md:gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col">
                <span className="text-3xl md:text-[32px] font-bold text-white tracking-tight leading-none mb-1">
                  {stat.value}
                </span>
                <span className="text-xs text-neutral-300 font-medium">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* Bottom-Right Navigation (Vertical Dots) */}
          <div className="flex flex-col items-center gap-2.5 pb-2">
            <div className="w-1.5 h-1.5 bg-white/40 rounded-full" />
            <div className="w-1.5 h-1.5 bg-white/40 rounded-full" />
            <div className="w-1.5 h-1.5 bg-white/40 rounded-full" />
            {/* Active Capsule (4th item) */}
            <div className="w-1.5 h-5 bg-yellow-400 rounded-full" />
            <div className="w-1.5 h-1.5 bg-white/40 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
