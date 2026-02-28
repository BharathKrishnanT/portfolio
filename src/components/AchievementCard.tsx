
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { cn } from "@/lib/utils";
import { Award } from "lucide-react";

interface AchievementCardProps {
  title: string;
  className?: string;
}

export default function AchievementCard({ title, className }: AchievementCardProps) {
  return (
    <div className={cn("relative h-full rounded-[1.25rem] border-[0.75px] border-zinc-800 p-2 md:rounded-[1.5rem] md:p-3", className)}>
      <GlowingEffect
        spread={40}
        glow={true}
        disabled={false}
        proximity={64}
        inactiveZone={0.01}
        borderWidth={3}
      />
      <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-[0.75px] border-zinc-800 bg-[#111111] p-6 shadow-sm md:p-6">
        <div className="relative flex flex-1 flex-col justify-between gap-3">
          <div className="w-fit rounded-lg border-[0.75px] border-zinc-700 bg-zinc-800 p-2">
            <Award className="h-4 w-4 text-white" />
          </div>
          <div className="space-y-3">
            <h3 className="pt-0.5 text-lg leading-[1.375rem] font-semibold font-sans tracking-[-0.04em] md:text-xl md:leading-[1.875rem] text-balance text-slate-200">
              {title}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
