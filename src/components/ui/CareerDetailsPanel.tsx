import React from 'react';
import { X, Sparkles } from 'lucide-react';
import { Button } from './button';

interface CareerDetailsPanelProps {
  career: string;
  relatedSkills: string[];
  onClose: () => void;
}

export const CareerDetailsPanel = ({ career, relatedSkills, onClose }: CareerDetailsPanelProps) => {
  return (
    <div className="fixed top-0 right-0 w-full sm:w-[400px] h-full bg-slate-900 text-white shadow-xl border-l border-slate-700 z-50 flex flex-col">
      
      {/* Header */}
      <div className="p-5 border-b border-slate-700 flex items-center justify-between bg-slate-800/80 backdrop-blur">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-indigo-400" />
          <h2 className="text-lg font-semibold">{career}</h2>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5 text-slate-300 hover:text-white transition" />
        </Button>
      </div>

      {/* Content */}
      <div className="p-6 overflow-y-auto flex-1">
        <h3 className="text-base font-medium text-slate-300 mb-3">相關技能</h3>
        <div className="grid grid-cols-2 gap-3">
          {relatedSkills.map((skill, index) => (
            <div
              key={index}
              className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 shadow-sm hover:bg-slate-700 transition"
            >
              {skill}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
