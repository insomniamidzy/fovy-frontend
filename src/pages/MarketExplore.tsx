import React, { useState } from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { MarketExplorerCard } from '@/components/MarketExplorerCard';
import { Card, CardContent } from '@/components/ui/card';
import { AIChat as AIChatComponent } from '@/components/AIChat';

const MarketExplorer = () => {
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [currentStep, setCurrentStep] = useState(1);

  const handleResponse = (value: string, step: string) => {
    setResponses((prev) => ({ ...prev, [step]: value }));
    setCurrentStep((prev) => prev + 1);
  };

  const renderStepCard = () => {
    switch (currentStep) {
      case 1:
        return (
            <div>
                <MarketExplorerCard
                    title="你目前擁有哪些技能與特色？"
                    hint="例如：AI 工具、資料分析師"
                    tags={['AI', '低代碼', 'Web3']}
                    step="step1"
                    onSubmit={handleResponse}
                />
                <AIChatComponent initialMessage="告訴我你目前的職業、技能，我來幫助你統整" step="step1"/>
            </div>
        );
      case 2:
        return (
            <div>
                <MarketExplorerCard
                    title="你想關注的方向、觀察到的問題（市場興趣）？"
                    hint="預測未來的工具型態、職位演變"
                    tags={['AI 產品經理', '自動化流程設計師']}
                    step="step2"
                    onSubmit={handleResponse}
                />
                <AIChatComponent initialMessage="最近有什麼議題或技術是你感興趣的？可以叫我提供熱門選單或或最新趨勢" step="step2"/>
            </div>
        );
      case 3:
        return (
            <div>
                <MarketExplorerCard
                    title="你希望未來成為什麼樣的人？解決什麼樣的問題？"
                    hint="例如：將設計轉向策略顧問角色"
                    step="step3"
                    onSubmit={handleResponse}
                />
                <AIChatComponent initialMessage="告訴我你想做到什麼？我可以跟你一起來想" step="step3"/>
            </div>
        );
      default:
        return (
          <Card className="mt-8 bg-white/90">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">你的市場洞察小結 ✨</h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-800">
                <li><strong>市場現況：</strong>{responses.step1}</li>
                <li><strong>未來趨勢假設：</strong>{responses.step2}</li>
                <li><strong>你想成為的人：</strong>{responses.step3}</li>
              </ul>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <MainLayout>
      <div className="section bg-slate-900/90 min-h-[calc(100vh-4rem)]">
        <div className="container-tight py-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="heading-lg mb-8 text-center text-white">
              Market <span className="text-blue-400">Exploration</span>
            </h1>
            {renderStepCard()}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default MarketExplorer;