import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AIChat from "./pages/AIChat";
import SignIn from "./pages/SignIn";
import CreateMap from "./pages/CreateMap";
import SkillLearning from "./pages/SkillLearning";
import ProjectWall from './pages/ProjectWall';
import MarketExplore from './pages/MarketExplore';
import Employer from './pages/Employer';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/ai-chat" element={<AIChat />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/create-map" element={<CreateMap />} />
          <Route path="/skill-learning" element={<SkillLearning />} />
          <Route path="/project-wall" element={<ProjectWall />} />
          <Route path="/MarketExplore" element={<MarketExplore />} />
          <Route path="/Employer" element={<Employer />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
