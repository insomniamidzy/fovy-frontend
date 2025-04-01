import React, { useCallback, useState, useEffect } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
  MiniMap,
  Node,
  Edge,
  Connection,
  MarkerType
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Code, Figma, PenTool, PaintBucket, Users, Search, BarChart2, Type, ZoomIn, Sparkles } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CareerDetailsPanel } from '@/components/ui/CareerDetailsPanel';

// Define initial skill categories and their sub-skills
const initialSkills = {
  'UIUX': {
    icon: <PenTool className="h-5 w-5 text-white" />,
    subSkills: ['UI design', 'UX design', 'User Research', 'Coding', 'Typography']
  },
  'UI design': {
    icon: <PaintBucket className="h-5 w-5 text-white" />,
    subSkills: ['Figma', 'Color Theory']
  },
  'UX design': {
    icon: <Users className="h-5 w-5 text-white" />,
    subSkills: ['Competitive Analysis']
  },
  'User Research': {
    icon: <Search className="h-5 w-5 text-white" />,
    subSkills: []
  },
  'Coding': {
    icon: <Code className="h-5 w-5 text-white" />,
    subSkills: []
  },
  'Typography': {
    icon: <Type className="h-5 w-5 text-white" />,
    subSkills: []
  },
  'Figma': {
    icon: <Figma className="h-5 w-5 text-white" />,
    subSkills: []
  },
  'Color Theory': {
    icon: <PaintBucket className="h-5 w-5 text-white" />,
    subSkills: []
  },
  'Competitive Analysis': {
    icon: <BarChart2 className="h-5 w-5 text-white" />,
    subSkills: []
  }
};

// Custom node component
const SkillNode = ({ data }: { data: any }) => {
  const nodeStyle = data.isCareer ? {
    backgroundColor: data.color || '#4f46e5',
    boxShadow: '0 0 20px rgba(79, 70, 229, 0.3)',
    transform: 'scale(1.1)'
  } : {};

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="flex flex-col items-center justify-center p-2 relative node-container">
          <div 
            className="flex h-12 w-12 items-center justify-center rounded-full mb-2 shadow-md transition-all duration-300"
            style={{
              backgroundColor: data.isCareer ? (data.color || '#4f46e5') : '#2e177b',
              ...nodeStyle
            }}>
            {data.icon}
          </div>
          <div className="text-sm font-medium text-center whitespace-nowrap bg-slate-800/80 text-white px-2 py-1 rounded-md backdrop-blur-sm shadow-sm">
            {data.label}
          </div>
          
          {/* Display zoom-in icon for nodes that can be expanded */}
          {!data.isLeafNode && data.hasUnexpandedSkills && (
            <div className="absolute top-0 right-0 rounded-full bg-[#2e177b]/40 p-1 animate-pulse">
              <ZoomIn className="h-3 w-3 text-white" />
            </div>
          )}
        </div>
      </TooltipTrigger>
      <TooltipContent className="bg-slate-800/90 text-white backdrop-blur-sm">
        {data.hasUnexpandedSkills ? "Click to explore more skills" : data.isLeafNode ? "Skill details" : "Expanded skill"}
      </TooltipContent>
    </Tooltip>
  );
};

// Define the props interface for the InteractiveMindMap component
interface InteractiveMindMapProps {
  expandedNodes: string[];
  onNodeClick: (nodeId: string) => void;
  onAddNode?: (nodeLabel: string) => void;
}

export const InteractiveMindMap = React.forwardRef<{ addNewNode: (label: string) => void, setFixedViewport: (centerX: number, centerY: number, zoom: number) => void, handleCareerNodeClick: (career: string, relatedSkills: string[]) => void }, InteractiveMindMapProps>((
  { expandedNodes, onNodeClick },
  ref
) => {
  // State to track if the initial hint has been shown
  const [hintShown, setHintShown] = useState(false);

  // Generate initial nodes
  const generateInitialNodes = (): Node[] => {
    return [
      {
        id: 'UIUX',
        position: { x: 250, y: 250 },
        data: { 
          label: 'UIUX',
          icon: initialSkills['UIUX'].icon,
          expanded: false,
          hasUnexpandedSkills: true,
          isLeafNode: false
        },
        type: 'skillNode'
      }
    ];
  };

  // State
  const [nodes, setNodes, onNodesChange] = useNodesState(generateInitialNodes());
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [viewport, setViewport] = useState({ x: 0, y: 0, zoom: 1 });
  const [selectedCareer, setSelectedCareer] = useState<string | null>(null);
  const [careerDetails, setCareerDetails] = useState<{ career: string; relatedSkills: string[] } | null>(null);

  // Node types
  const nodeTypes = {
    skillNode: SkillNode
  };

  // Connection handler
  const onConnect = useCallback(
    (params: Connection) => {
      const edge = addEdge({ 
        ...params, 
        animated: true, 
        style: { stroke: '#4f46e5', strokeWidth: 2 }, 
        markerEnd: { type: MarkerType.ArrowClosed, color: '#4f46e5' },
        type: 'smoothstep'
      }, edges);
      setEdges(edge);
    },
    [edges, setEdges]
  );

  // Function to add a new node
  const addNewNode = useCallback((label: string, options?: { color?: string; isCareer?: boolean }) => {
    const container = document.querySelector('.react-flow__viewport');
    const centerX = (container?.clientWidth || 800) / 2;
    const centerY = (container?.clientHeight || 600) / 2;

    const newNode = {
      id: `${label}-${Date.now()}`,
      position: { x: centerX, y: centerY },
      data: { 
        label: label,
        icon: options?.isCareer ? 
          <Sparkles className="h-5 w-5 text-white" /> : 
          <PenTool className="h-5 w-5 text-white" />,
        hasUnexpandedSkills: false,
        isLeafNode: true,
        isCareer: options?.isCareer,
        color: options?.color
      },
      type: 'skillNode'
    };

    setNodes(nodes => [...nodes, newNode]);
    return newNode.id;
  }, [setNodes]);

  // Function to get all nodes
  const getNodes = useCallback(() => {
    return nodes;
  }, [nodes]);

  // Function to add an edge
  const addCustomEdge = useCallback((source: string, target: string) => {
    const newEdge: Edge = {
      id: `${source}-${target}`,
      source,
      target,
      animated: true,
      style: { stroke: '#4f46e5' },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#4f46e5' }
    };
    setEdges(edges => [...edges, newEdge]);
  }, [setEdges]);

  // Function to set fixed viewport
  const setFixedViewport = useCallback((centerX: number, centerY: number, zoom: number) => {
    setViewport({
      x: centerX,
      y: centerY,
      zoom: zoom
    });
  }, [setViewport]);

  // Function to handle career node click
  const handleCareerNodeClick = useCallback((career: string, relatedSkills: string[]) => {
    setSelectedCareer(career);
    setCareerDetails({ career, relatedSkills });
  }, []);

  // Expose methods via ref
  React.useImperativeHandle(ref, () => ({
    addNewNode,
    getNodes,
    addEdge: addCustomEdge,
    setFixedViewport,
    handleCareerNodeClick
  }));

  // Click handler to expand/collapse nodes
  const handleNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    const nodeId = node.id;
    onNodeClick(nodeId);
    setHintShown(true);
    
    // Only expand nodes that haven't been expanded yet
    if (!expandedNodes.includes(nodeId)) {
      const nodeData = initialSkills[nodeId as keyof typeof initialSkills];
      
      if (!nodeData || nodeData.subSkills.length === 0) {
        return; // No sub-skills
      }

      // Calculate positions for sub-skills (in a circle around parent)
      const centerX = node.position.x;
      const centerY = node.position.y;
      const radius = 180;
      const angleStep = (2 * Math.PI) / nodeData.subSkills.length;

      // Create new nodes for sub-skills
      const newNodes = nodeData.subSkills.map((skill, index) => {
        const angle = index * angleStep;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        
        const skillInfo = initialSkills[skill as keyof typeof initialSkills];
        const hasSubSkills = skillInfo && skillInfo.subSkills.length > 0;

        return {
          id: skill,
          position: { x, y },
          data: { 
            label: skill, 
            icon: initialSkills[skill as keyof typeof initialSkills]?.icon || nodeData.icon,
            hasUnexpandedSkills: hasSubSkills,
            isLeafNode: !hasSubSkills
          },
          type: 'skillNode'
        };
      });

      // Create connections from parent to sub-skills
      const newEdges = nodeData.subSkills.map(skill => ({
        id: `${nodeId}-${skill}`,
        source: nodeId,
        target: skill,
        animated: true,
        style: { stroke: '#4f46e5' },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: '#4f46e5'
        }
      }));

      // Update state with new nodes and edges
      setNodes(nodes => [...nodes, ...newNodes]);
      setEdges(edges => [...edges, ...newEdges]);

      // Update the parent node to show it's been expanded
      setNodes(nodes => 
        nodes.map(n => 
          n.id === nodeId 
            ? { 
                ...n, 
                data: { 
                  ...n.data, 
                  hasUnexpandedSkills: false 
                } 
              } 
            : n
        )
      );

      // Add animation class to new nodes
      setTimeout(() => {
        const nodeElements = document.querySelectorAll('.react-flow__node');
        nodeElements.forEach(el => {
          if (!el.classList.contains('animated')) {
            el.classList.add('animate-scale-in', 'animated');
          }
        });
      }, 50);
    }

    // 如果是職業節點，顯示詳細資訊視窗
    if (node.data.isCareer) {
      const relatedSkills = nodes
        .filter((n: Node) => n.data?.label !== node.data?.label)
        .map((n: Node) => n.data?.label || '');
      
      handleCareerNodeClick(node.data?.label || '', relatedSkills);
    }
  }, [expandedNodes, onNodeClick, setNodes, setEdges, nodes, handleCareerNodeClick]);

  // Show hint overlay if it's the first time viewing the map
  useEffect(() => {
    if (!hintShown && nodes.length === 1) {
      // Auto-hide the hint after 5 seconds
      const timer = setTimeout(() => {
        setHintShown(true);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [nodes.length, hintShown]);

  // Prevent viewport from moving and zooming
  const onViewportChange = useCallback((newViewport: any) => {
    // Don't update viewport state, keep it fixed
    return false;
  }, []);

  return (
    <div className="h-[500px] w-full overflow-hidden rounded-2xl bg-slate-900/90 backdrop-blur-md shadow-sm border border-slate-700/50 relative">
      {!hintShown && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white p-8 rounded-lg bg-slate-800/80">
            <h2 className="text-2xl font-bold mb-4">點擊節點開始探索</h2>
            <p className="text-gray-400">點擊節點來查看相關技能和職業建議</p>
          </div>
        </div>
      )}

      <TooltipProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          onConnect={onConnect}
          onNodeClick={handleNodeClick}
          panOnScroll
          zoomOnScroll={false}
          onViewportChange={onViewportChange}
          defaultViewport={viewport}
        >
          <Background color="#222222" gap={16} />
          <Controls className="bg-slate-800 border-slate-700 text-white" />
          
          {/* Career details panel */}
          {careerDetails && (
            <CareerDetailsPanel
              career={careerDetails.career}
              relatedSkills={careerDetails.relatedSkills}
              onClose={() => setCareerDetails(null)}
            />
          )}
        </ReactFlow>
      </TooltipProvider>
    </div>
  );
});

InteractiveMindMap.displayName = 'InteractiveMindMap';
