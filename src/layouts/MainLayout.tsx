
import React, { useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  // Apply styles when layout mounts
  useEffect(() => {
    // Add dark background for the overall app
    document.body.classList.add('bg-[#0F111A]');
    
    // Reset scroll position to top on page load
    window.scrollTo(0, 0);
    
    return () => {
      document.body.classList.remove('bg-[#0F111A]');
    };
  }, []);
  
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-[#0F111A] to-[#161A23] text-white relative overflow-hidden">
      {/* Enhanced dark gradient background effect with more gentle movements */}
      <div className="absolute inset-0 -z-10 breathing-gradient-dark opacity-90"></div>
      
      <Header />
      <main className="flex-1 relative z-10">{children}</main>
      <Footer />
    </div>
  );
};
