import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

export interface SkillNode {
  label: string;
  doc?: string;
  isTask?: boolean;
  skillsRequired?: string[];
  status?: 'not_started' | 'in_progress' | 'completed';
  children?: SkillNode[];
}

interface SkillLearningNodeProps {
  node: SkillNode;
  depth?: number;
}

export const SkillLearningNode: React.FC<SkillLearningNodeProps> = ({ node, depth = 0 }) => {
  const isTask = node.isTask;
  const [status, setStatus] = useState<'not_started' | 'in_progress' | 'completed'>(
    node.status || 'not_started'
  );

  const statusTextMap: Record<string, string> = {
    not_started: '❌ 未學習',
    in_progress: '⏳ 進行中',
    completed: '✅ 已完成',
  };

  const cycleStatus = () => {
    const next = {
      not_started: 'in_progress',
      in_progress: 'completed',
      completed: 'not_started',
    };
    setStatus(next[status] as typeof status);
  };

  return (
    <div style={{ marginLeft: depth * 20 }} className="mb-4">
      <div
        className={`p-3 rounded-lg border ${
          isTask
            ? 'bg-green-800/30 border-green-600 text-green-300'
            : 'bg-slate-800/50 border-slate-700 text-slate-200'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="text-lg font-semibold">{node.label}</div>
          {/* 狀態切換按鈕：僅區分完成與未完成/進行中 */}
          <button
            onClick={cycleStatus}
            className={`text-xs font-medium px-3 py-1 rounded-full border transition ${
              status === 'completed'
                ? 'bg-green-600 text-white border-green-500 hover:bg-green-500'
                : 'bg-slate-700 text-slate-200 border-slate-600 hover:bg-slate-600'
            }`}
          >
            {statusTextMap[status]}
          </button>
        </div>
        {!isTask && node.doc && (
          <Button
            variant="ghost"
            size="sm"
            className="text-sm text-blue-400 hover:text-blue-300 mt-1"
            onClick={() => window.open(node.doc, '_blank')}
          >
            📘 Learn
          </Button>
        )}
        {isTask && node.skillsRequired && (
          <div className="mt-1 text-sm text-slate-400">
            需要技能：{node.skillsRequired.join(', ')}
          </div>
        )}
      </div>
      {node.children &&
        node.children.map((child, idx) => (
          <SkillLearningNode key={idx} node={child} depth={depth + 1} />
        ))}
    </div>
  );
};
