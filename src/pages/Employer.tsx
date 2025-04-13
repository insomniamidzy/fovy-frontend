import React, { useState } from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { EmployerStepCard } from '@/components/EmployerStepCard';
import { Card, CardContent } from '@/components/ui/card';

const EmployerFlow = () => {
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
          <EmployerStepCard
            title="你目前的公司正在面對哪些挑戰？"
            hint="例如：數位轉型、AI 落地困難、找不到對的人才"
            step="step1"
            onSubmit={handleResponse}
          />
        );
      case 2:
        return (
          <EmployerStepCard
            title="你未來3~5年的發展規劃是什麼？"
            hint="例如：建立AI內部工具、擴展海外市場"
            step="step2"
            onSubmit={handleResponse}
          />
        );
      case 3:
        return (
          <EmployerStepCard
            title="你覺得這些目標需要哪些技能或角色？"
            hint="例如：資料工程師、Prompt 設計師、變革管理顧問"
            step="step3"
            onSubmit={handleResponse}
          />
        );
      default:
        return (
          <Card className="mt-8 bg-white/90">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4 text-slate-800">
                公司需求小結 🔍
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-slate-800">
                <li><strong>目前挑戰：</strong>{responses.step1}</li>
                <li><strong>未來規劃：</strong>{responses.step2}</li>
                <li><strong>技能需求：</strong>{responses.step3}</li>
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
              Employer <span className="text-blue-400">Flow</span>
            </h1>
            {renderStepCard()}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default EmployerFlow;
