import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '@/layouts/MainLayout';
import { Hero } from '@/components/Hero';
import { FeatureCard } from '@/components/FeatureCard';
import { MindMap } from '@/components/MindMap';
import { AIChat } from '@/components/AIChat';
import { Button } from '@/components/ui/button';
import { 
  Brain, 
  Sparkles, 
  MessageSquare, 
  ChevronRight,
  Users,
  Search,
  Link,
} from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const featuresRef = useRef<HTMLDivElement>(null);
  const mindMapRef = useRef<HTMLDivElement>(null);
  const matchingRef = useRef<HTMLDivElement>(null);
  const airMinderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('stagger-in');
        }
      });
    }, observerOptions);

    [featuresRef, mindMapRef, matchingRef, airMinderRef].forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      [featuresRef, mindMapRef, matchingRef, airMinderRef].forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  return (
    <MainLayout>
      <Hero />
      
      {/* Features Section */}
      <section id="features" className="section bg-slate-900/90">
        <div className="container-tight" ref={featuresRef}>
          <div className="text-center mb-16">
            <h2 className="heading-lg mt-4 stagger-item animate-fade-in text-white">
              Unlock Your <span className="text-blue-400">Potential</span>
            </h2>
            <p className="text-xl text-slate-300 mt-4 stagger-item animate-fade-in">
              Discover powerful tools designed to enhance your career journey
            </p>
          </div>
          
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              title="AI Mind Mapping"
              description="Visualize your career path with interactive mind maps and discover new opportunities."
              icon={Brain}
              delay={100}
            />
            <FeatureCard
              title="Smart Communication"
              description="Connect with clients using AI-enhanced language that helps you express your ideas clearly and professionally."
              icon={MessageSquare}
              delay={200}
            />
            <FeatureCard
              title="Career Growth"
              description="Boost your confidence with personalized AI guidance tailored to your unique career goals."
              icon={Sparkles}
              delay={300}
            />
          </div>
        </div>
      </section>
      
      {/* Mind Map Section */}
      <section id="mind-map" className="section relative overflow-hidden bg-slate-900/95">
        <div className="container-tight" ref={mindMapRef}>
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="order-2 lg:order-1">
              <MindMap />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="heading-md mb-6 text-white">
                Visualize Your <span className="text-blue-400">Journey</span>
              </h2>
              <p className="text-xl text-slate-300 mb-4">
                Transform your experience into powerful visual stories that captivate clients and showcase your expertise.
              </p>
              <p className="text-lg text-slate-400 mb-8">
                Our AI-powered mind mapping tool helps you explore and connect your skills, experiences, and future opportunities.
              </p>
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6 rounded-xl shadow-lg"
                onClick={() => navigate('/create-map')}
              >
                Create Your Map
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Smart Matching Section */}
      <section id="smart-matching" className="section bg-slate-900/95">
        <div className="container-tight" ref={matchingRef}>
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="heading-md mb-6 text-white">
                Smart <span className="text-blue-400">Matching</span>
              </h2>
              <p className="text-xl text-slate-300 mb-4">
                Connect with the perfect opportunities using our AI-powered matching system.
              </p>
              <p className="text-lg text-slate-400 mb-8">
                Our intelligent algorithm analyzes your skills, experience, and goals to find the most relevant opportunities and connections.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <Users className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Smart Network</h3>
                    <p className="text-slate-400">Connect with relevant professionals</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <Search className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Precise Matches</h3>
                    <p className="text-slate-400">Find exactly what you need</p>
                  </div>
                </div>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6 rounded-xl shadow-lg">
                Start Matching
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl blur-3xl"></div>
              <div className="relative bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8 backdrop-blur-sm">
                <div className="grid gap-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-4 p-4 bg-slate-800/80 rounded-xl border border-slate-700/50">
                      <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                        <Link className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="h-2 w-24 bg-slate-600 rounded mb-2"></div>
                        <div className="h-2 w-32 bg-slate-700 rounded"></div>
                      </div>
                      <div className="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-400 text-sm">
                        98% Match
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* AIR Minder Section */}
      <section id="air-minder" className="section bg-slate-900/90">
        <div className="container-tight" ref={airMinderRef}>
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="heading-md mb-6 text-white">
                Your AI <span className="text-blue-400">Partner</span>
              </h2>
              <p className="text-xl text-slate-300 mb-4">
                Get personalized guidance and support to achieve your career goals with confidence.
              </p>
              <p className="text-lg text-slate-400 mb-8">
                Our advanced AI understands your unique needs and provides tailored advice to help you succeed.
              </p>
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6 rounded-xl shadow-lg"
                onClick={() => navigate('/ai-chat')}
              >
                Start Now
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <div>
              <AIChat />
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="section bg-blue-600/90 backdrop-blur-sm">
        <div className="container-tight text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Ready to Transform Your Career?</h2>
          <p className="text-xl text-white/90 mb-8">Join thousands of professionals who have already elevated their careers with our AI tools.</p>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-white/90 text-lg px-8 py-6 rounded-xl shadow-lg font-semibold">
            Get Started Free
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
