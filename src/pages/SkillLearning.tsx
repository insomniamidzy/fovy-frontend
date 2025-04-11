import React from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { SkillLearningNode, SkillNode } from './SkillLearningNode';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const jsSkillTree: SkillNode[] = [
  {
    label: 'JavaScript 基礎',
    doc: 'https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Guide/Introduction',
    status: 'completed',
    children: [
      {
        label: '🧪 任務：寫一個 Hello World Script',
        isTask: true,
        status: 'completed',
        skillsRequired: ['JavaScript'],
      },
      {
        label: '資料型別 & 變數',
        doc: 'https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Data_structures',
        status: 'in_progress',
        children: [
          {
            label: '條件判斷 & 迴圈',
            doc: 'https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Guide/Loops_and_iteration',
            status: 'not_started',
            children: [
              {
                label: '🧪 任務：輸出 1~100 的偶數',
                isTask: true,
                status: 'not_started',
                skillsRequired: ['if', 'for loop'],
              },
              {
                label: '函式與作用域',
                doc: 'https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Guide/Functions',
                status: 'not_started',
                children: [
                  {
                    label: '🧪 任務：寫一個計算 BMI 的函式',
                    isTask: true,
                    status: 'not_started',
                    skillsRequired: ['function', 'return', 'parameter'],
                  },
                  {
                    label: '物件與陣列',
                    doc: 'https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Guide/Working_with_Objects',
                    status: 'not_started',
                    children: [
                      {
                        label: '🧪 任務：製作 Todo List 資料結構',
                        isTask: true,
                        status: 'not_started',
                        skillsRequired: ['Array', 'Object'],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    label: 'DOM 操作與事件',
    doc: 'https://developer.mozilla.org/zh-TW/docs/Web/API/Document_Object_Model',
    status: 'not_started',
    children: [
      {
        label: '🧪 任務：按鈕點擊顯示 alert',
        isTask: true,
        status: 'not_started',
        skillsRequired: ['DOM', 'EventListener'],
      },
      {
        label: '🧪 任務：表單送出驗證 Email',
        isTask: true,
        status: 'not_started',
        skillsRequired: ['Form', 'Event', 'Validation'],
      },
    ],
  },
  {
    label: '進階 JavaScript（ES6+）',
    doc: 'https://developer.mozilla.org/zh-TW/docs/Web/JavaScript',
    status: 'not_started',
    children: [
      {
        label: '🧪 任務：用箭頭函式重寫 BMI 計算',
        isTask: true,
        status: 'not_started',
        skillsRequired: ['Arrow function'],
      },
      {
        label: 'Promise 與非同步',
        doc: 'https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Guide/Using_promises',
        status: 'not_started',
        children: [
          {
            label: '🧪 任務：模擬載入資料後顯示結果',
            isTask: true,
            status: 'not_started',
            skillsRequired: ['Promise', 'setTimeout'],
          },
        ],
      },
    ],
  },
];

const SkillLearning: React.FC = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="min-h-screen bg-slate-950 text-slate-200 py-16 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-yellow-400 mb-6">JavaScript 學習流程圖</h1>
          <p className="text-slate-400 mb-8">
            按照這棵技能樹一步步累積能力，搭配任務挑戰，打好 JavaScript 的基礎 💪
          </p>
          {jsSkillTree.map((node, idx) => (
            <SkillLearningNode key={idx} node={node} />
          ))}
        </div>
        <div className="text-center mt-16">
            <Button
              className="bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-md"
              onClick={() => navigate('/project-wall')}
            >
              🚀 查看任務牆，開始實戰
            </Button>
            <p className="text-sm text-slate-500 mt-2">
              每個任務都附上技能需求，與學習頁面連動
            </p>
          </div>
      </div>
    </MainLayout>
  );
};

export default SkillLearning;
