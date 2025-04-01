
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('stagger-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <section className="relative overflow-hidden py-32 md:py-40 bg-slate-900/95">
      <div className="container px-4 md:px-6 relative z-10" ref={containerRef}>
        <div className="flex flex-col items-center text-center">
          <div className="mb-8">
            <img 
              src="/lovable-uploads/ffc1bc93-8c95-4ffe-beef-a96c26d0eb14.png"
              alt="FOVY Logo"
              className="w-20 h-20 object-contain"
            />
          </div>
          
          <div className="flex flex-col justify-center items-center space-y-8 max-w-3xl mx-auto">
            <h1 className="stagger-item animate-fade-in text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-tight">
              <span className="text-blue-400">Map</span> Your Future <br/>
              <span className="text-3xl md:text-4xl text-slate-300">with AI-Powered Career Guidance</span>
            </h1>
            <p className="stagger-item animate-fade-in text-xl md:text-2xl text-slate-300 max-w-[700px]">
              Transform your career journey with intelligent tools that help you visualize opportunities, communicate effectively, and achieve your professional goals.
            </p>
            <div className="stagger-item flex animate-fade-in flex-col sm:flex-row gap-4 mt-8">
              <Button className="btn-gradient-dark h-12 px-8 rounded-xl flex items-center text-lg shadow-lg hover:shadow-blue-500/20">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
