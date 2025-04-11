import React from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { Link } from 'react-router-dom';

// 模擬的專案資料
const projects = [
  {
    title: '個人作品集網站',
    description: '打造一個個人網站，展示你的經歷、作品與技能。',
    skills: ['HTML', 'CSS', 'JavaScript', 'React'],
  },
  {
    title: 'ToDo List 應用',
    description: '建立一個可增刪改查的任務清單，練習狀態管理與元件設計。',
    skills: ['React', 'State Management', 'CSS'],
  },
  {
    title: 'API 資料呈現頁',
    description: '從第三方 API 取得資料並顯示在網頁上，練習 fetch、錯誤處理與 UI 結構。',
    skills: ['JavaScript', 'Fetch API', 'React', 'TailwindCSS'],
  },
];

const ProjectWall: React.FC = () => {
  return (
    <MainLayout>
      {/* 主容器：暗色背景 + 淺色文字 */}
      <div className="min-h-screen bg-slate-900 text-slate-200 p-8">
        {/* 頂部標題與 AI Recommendation 按鈕 */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Task Wall</h1>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700">
            AI Recommendation
          </button>
        </div>

        {/* 分類篩選列 */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button className="px-3 py-1 bg-slate-700 text-slate-200 rounded-full hover:bg-slate-600">
            UI Design
          </button>
          <button className="px-3 py-1 bg-slate-700 text-slate-200 rounded-full hover:bg-slate-600">
            Web Development
          </button>
          <button className="px-3 py-1 bg-slate-700 text-slate-200 rounded-full hover:bg-slate-600">
            Data Analysis
          </button>
        </div>

        {/* 卡片列表 */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-slate-800 border border-slate-700 rounded-lg shadow-sm p-5 flex flex-col justify-between"
            >
              {/* 任務標題 */}
              <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
              {/* 任務描述 */}
              <p className="text-slate-400 mb-4">{project.description}</p>
              {/* 技能標籤 */}
              <div className="flex flex-wrap gap-2 mb-3">
                {project.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-blue-900 text-blue-300 text-sm rounded-full border border-blue-800 hover:bg-blue-800 cursor-pointer"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              {/* 底部資訊區（你可以根據需求加上時間、難度等） */}
              <div className="flex items-center justify-between text-sm text-slate-500">
                <div>--</div>
                <div>--</div>
                {/* 若有推薦的案子，可在此顯示 */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default ProjectWall;
