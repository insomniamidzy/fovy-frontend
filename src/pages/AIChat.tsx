import React from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { AIChat as AIChatComponent } from '@/components/AIChat';

const AIChat = () => {
  return (
    <MainLayout>
      <div className="section bg-slate-900/90 min-h-[calc(100vh-4rem)]">
        <div className="container-tight py-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="heading-lg mb-8 text-center text-white">
              Your AI <span className="text-blue-400">Assistant</span>
            </h1>
            <AIChatComponent />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AIChat;
