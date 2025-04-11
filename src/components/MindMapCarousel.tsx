import React from 'react';
import { MindMap } from '@/components/MindMap';

export const MindMapCarousel: React.FC = () => {
  // 將 1~4 代表四個不同畫面
  const cards = [1, 2, 3, 4];

  return (
    <div className="overflow-x-auto py-4">
      <div className="flex space-x-4 px-4">
        {cards.map((card) => (
          <div
            key={card}
            className="min-w-[600px] flex-shrink-0 bg-slate-800 rounded-xl shadow-md p-4 
                       hover:shadow-xl transition-all duration-300"
          >
            {/* 根據 card 值顯示不同的內容 */}
            {card === 1 && (
              /* 1) Task Board */
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Task Board</h2>
                <p className="text-slate-300 mb-2">
                  任務列表一覽，可以顯示多個小任務卡片。
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-slate-700 rounded">Task 1</div>
                  <div className="p-3 bg-slate-700 rounded">Task 2</div>
                  <div className="p-3 bg-slate-700 rounded">Task 3</div>
                  <div className="p-3 bg-slate-700 rounded">Task 4</div>
                </div>
              </div>
            )}

            {card === 2 && (
              /* 2) Task Title */
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Task Title</h2>
                <div className="text-slate-300 mb-4">
                  <span className="font-semibold block mb-1">Related Skills:</span>
                  <div className="flex gap-2 flex-wrap">
                    <span className="px-2 py-1 bg-blue-600 text-white rounded">
                      Skill A
                    </span>
                    <span className="px-2 py-1 bg-blue-600 text-white rounded">
                      Skill B
                    </span>
                    <span className="px-2 py-1 bg-blue-600 text-white rounded">
                      Skill C
                    </span>
                  </div>
                </div>
                <div className="text-slate-200">
                  <p className="font-semibold mb-1">Steps:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Step 1</li>
                    <li>Step 2</li>
                    <li>Step 3</li>
                  </ul>
                </div>
              </div>
            )}

            {card === 3 && (
              /* 3) Mind Map */
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Mind Map</h2>
                <p className="text-slate-300 mb-4">
                  用視覺化的方式呈現任務、技能與想法之間的關聯。
                </p>
                {/* 直接嵌入現有的 MindMap 元件 */}
                <MindMap />
              </div>
            )}

            {card === 4 && (
              /* 4) AI Analysis */
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">AI Analysis</h2>
                <div className="bg-slate-700 p-4 rounded">
                  <p className="text-slate-300 font-semibold">Analysis:</p>
                  <ul className="list-disc list-inside mt-2 text-slate-200 space-y-1">
                    <li>Key findings 1</li>
                    <li>Key findings 2</li>
                    <li>Key findings 3</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
