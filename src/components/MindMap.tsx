
import React, { useState } from 'react';
import { InteractiveMindMap } from './InteractiveMindMap';

export const MindMap: React.FC = () => {
  const [expandedNodes, setExpandedNodes] = useState<string[]>([]);

  const handleNodeClick = (nodeId: string) => {
    if (expandedNodes.includes(nodeId)) {
      setExpandedNodes(expandedNodes.filter(id => id !== nodeId));
    } else {
      setExpandedNodes([...expandedNodes, nodeId]);
    }
  };

  return (
    <div className="mind-map-container bg-slate-900 rounded-lg overflow-hidden shadow-md border border-slate-700/50">
      <InteractiveMindMap 
        expandedNodes={expandedNodes}
        onNodeClick={handleNodeClick}
      />
    </div>
  );
};
