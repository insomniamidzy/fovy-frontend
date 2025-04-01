import React from 'react';

export const LoadingDots = () => {
  return (
    <div className="flex items-center space-x-1">
      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse [animation-delay:-0.3s] opacity-75"></div>
      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse [animation-delay:-0.15s] opacity-50"></div>
      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse opacity-25"></div>
    </div>
  );
};
