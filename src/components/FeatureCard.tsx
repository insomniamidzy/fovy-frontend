
import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
  delay?: number;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon: Icon,
  className,
  delay = 0,
}) => {
  return (
    <div 
      className={cn(
        "feature-card stagger-item animate-fade-in glass-card-dark p-8 rounded-xl border border-slate-800/50 hover:border-blue-500/30 transition-all duration-300", 
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="relative z-10">
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/20">
          <Icon className="h-7 w-7 text-blue-400" />
        </div>
        <h3 className="mb-3 text-xl font-semibold text-white">{title}</h3>
        <p className="text-slate-300">{description}</p>
      </div>
    </div>
  );
};
