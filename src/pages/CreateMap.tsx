import React, { useState } from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { InteractiveMindMap } from '@/components/InteractiveMindMap';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Download, Share2, ZoomIn, ZoomOut, Plus, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CreateMap = () => {
  const [expandedNodes, setExpandedNodes] = useState<string[]>([]);
  const [scale, setScale] = useState(1);
  const [newNodeText, setNewNodeText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();


  const handleNodeClick = (nodeId: string) => {
    if (expandedNodes.includes(nodeId)) {
      setExpandedNodes(expandedNodes.filter(id => id !== nodeId));
    } else {
      setExpandedNodes([...expandedNodes, nodeId]);
    }
  };

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.2, 2));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.2, 0.4));
  };

  const handleAddNode = () => {
    if (newNodeText.trim()) {
      mindMapRef.current?.addNewNode(newNodeText.trim());
      setNewNodeText('');
    }
  };

  const mindMapRef = React.useRef<{ 
    addNewNode: (label: string, options?: { color?: string; isCareer?: boolean }) => string;
    getNodes: () => any[];
    addEdge: (source: string, target: string) => void;
    setFixedViewport: (centerX: number, centerY: number, zoom: number) => void;
    handleCareerNodeClick: (career: string, relatedSkills: string[]) => void;
  } | null>(null);

  return (
    <MainLayout>
      <div className="min-h-screen bg-slate-900">
        {/* Toolbar */}
        <div className="fixed top-20 left-0 right-0 z-10 bg-slate-800/90 backdrop-blur-sm border-b border-slate-700/50">
          <div className="container mx-auto px-4 h-14 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 mr-4">
                <Input
                  type="text"
                  placeholder="Add new node..."
                  value={newNodeText}
                  onChange={(e) => setNewNodeText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleAddNode();
                    }
                  }}
                  className="w-48 bg-slate-800/50 border-slate-700 text-slate-200 placeholder:text-slate-400"
                />
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-slate-800/50 border-slate-700 text-slate-200"
                  onClick={handleAddNode}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="bg-slate-800/50 border-slate-700 text-slate-200"
                onClick={handleZoomIn}
              >
                <ZoomIn className="h-4 w-4 mr-1" />
                Zoom In
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-slate-800/50 border-slate-700 text-slate-200"
                onClick={handleZoomOut}
              >
                <ZoomOut className="h-4 w-4 mr-1" />
                Zoom Out
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-slate-800/50 border-slate-700 text-slate-200"
                onClick={() => navigate('/skill-learning')}
              >
                Go to Learning Page
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-4">
                {isAnalyzing && (
                  <div className="w-32">
                    <Progress value={progress} className="h-2" />
                  </div>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-slate-800/50 border-slate-700 text-slate-200"
                onClick={async () => {
                  if (!mindMapRef.current || isAnalyzing) return;
                  
                  setIsAnalyzing(true);
                  setProgress(0);
                  
                  // 啟動進度動畫
                  const progressInterval = setInterval(() => {
                    setProgress(prev => {
                      if (prev >= 90) return prev; // 停在90%，等待實際完成
                      return prev + 10;
                    });
                  }, 500);

                  try {
                    const nodes = mindMapRef.current.getNodes();
                    const nodeLabels = nodes.map(node => node.data.label);
                    
                    console.log('✅ 收集到的技能：', nodeLabels);
                    
                    if (nodeLabels.length === 0) {
                      throw new Error('請先添加一些技能節點！');
                    }
                    
                    // Mock data logic
                    const mockData = {
                      career: 'Software Engineer',
                      relatedSkills: ['JavaScript', 'React', 'Node.js']
                    };
                    
                    console.log('✨ 收到回應：', mockData);
                    
                    const { career, relatedSkills } = mockData;
                    
                    // 添加職業節點到中心
                    const careerNodeId = mindMapRef.current.addNewNode(career, {
                      color: '#4f46e5',
                      isCareer: true
                    });
                    
                    // 設置固定視圖
                    const container = document.querySelector('.react-flow__viewport');
                    if (container) {
                      const centerX = container.clientWidth / 2;
                      const centerY = container.clientHeight / 2;
                      const zoom = 0.8;
                      
                      mindMapRef.current?.setFixedViewport(centerX, centerY, zoom);
                    }
                    
                    // 為相關技能創建連接
                    const allNodes = mindMapRef.current.getNodes();
                    relatedSkills.forEach((skill: string) => {
                      const skillNode = allNodes.find(node => 
                        node.data.label.toLowerCase() === skill.toLowerCase()
                      );
                      
                      if (skillNode) {
                        // 使用 addCustomEdge 方法創建連接
                        mindMapRef.current.addEdge(careerNodeId, skillNode.id);
                      }
                    });
                    setProgress(100); // 設置為100%表示完成
                  } catch (error: any) {
                    console.error('❌ 職業建議錯誤：', error.message);
                    
                    // 顯示詳細的錯誤信息
                    const errorMessage = `錯誤： ${error.message}`;
                    
                    alert(errorMessage);
                  } finally {
                    setIsAnalyzing(false);
                    setTimeout(() => setProgress(0), 1000); // 1秒後重置進度條
                    clearInterval(progressInterval);
                  }
                }}
                disabled={isAnalyzing}
              >
                <Sparkles className="h-4 w-4 mr-1" />
                {isAnalyzing ? 'Analyzing...' : 'Suggest Career'}
              </Button>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="bg-slate-800/50 border-slate-700 text-slate-200"
              >
                <Share2 className="h-4 w-4 mr-1" />
                Share
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-slate-800/50 border-slate-700 text-slate-200"
              >
                <Download className="h-4 w-4 mr-1" />
                Export
              </Button>
            </div>
          </div>
        </div>

        {/* Mind Map */}
        <div 
          className="pt-14 h-[calc(100vh-5rem)]"
          style={{
            transform: `scale(${scale})`,
            transformOrigin: 'center center',
            transition: 'transform 0.3s ease'
          }}
        >
          <InteractiveMindMap
            ref={mindMapRef}
            expandedNodes={expandedNodes}
            onNodeClick={handleNodeClick}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default CreateMap;
