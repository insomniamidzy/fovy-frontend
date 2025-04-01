import { useEffect, useState, useRef } from 'react';

export const useIntersectionObserver = (
  options: IntersectionObserverInit = { threshold: 0.1 }
) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, options);

    const currentElement = ref.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [options]);

  return [ref, isVisible] as const;
};

export const useSequentialFadeIn = (
  elementClass: string,
  baseDelay: number = 100
) => {
  useEffect(() => {
    const elements = document.querySelectorAll(elementClass);
    
    elements.forEach((element, index) => {
      const htmlElement = element as HTMLElement;
      htmlElement.style.opacity = '0';
      htmlElement.style.transform = 'translateY(20px)';
      htmlElement.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      
      setTimeout(() => {
        htmlElement.style.opacity = '1';
        htmlElement.style.transform = 'translateY(0)';
      }, baseDelay * (index + 1));
    });
    
    return () => {
      elements.forEach((element) => {
        const htmlElement = element as HTMLElement;
        htmlElement.style.opacity = '';
        htmlElement.style.transform = '';
        htmlElement.style.transition = '';
      });
    };
  }, [elementClass, baseDelay]);
};

export const applyFlowStyles = () => {
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      .interactive-mindmap {
        background: transparent;
      }
      
      .interactive-mindmap .react-flow__node {
        transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
        opacity: 0;
        border-radius: 50%;
        overflow: visible;
      }
      
      .interactive-mindmap .react-flow__node.animated {
        opacity: 1;
      }
      
      .interactive-mindmap .react-flow__node-custom {
        border-radius: 50%;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0 0 15px rgba(4, 150, 255, 0.3);
      }
      
      .interactive-mindmap .react-flow__edge path {
        stroke: rgba(255, 255, 255, 0.3);
        stroke-width: 2;
        transition: all 0.3s ease;
      }
      
      .interactive-mindmap .react-flow__edge:hover path {
        stroke: rgba(4, 150, 255, 0.8);
        stroke-width: 3;
      }
      
      .interactive-mindmap .react-flow__controls {
        bottom: 10px;
        right: 10px;
        left: auto;
        background: rgba(11, 34, 51, 0.7);
        backdrop-filter: blur(5px);
        border-radius: 8px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      }
      
      .interactive-mindmap .react-flow__controls-button {
        background: rgba(11, 34, 51, 0.8);
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        color: white;
      }
      
      .interactive-mindmap .react-flow__controls-button:hover {
        background: rgba(4, 150, 255, 0.3);
      }
      
      .interactive-mindmap .react-flow__minimap {
        bottom: 10px;
        left: 10px;
        border-radius: 8px;
        overflow: hidden;
        opacity: 0.8;
        background: rgba(11, 34, 51, 0.7);
        border: 1px solid rgba(255, 255, 255, 0.1);
      }
      
      .interactive-mindmap .react-flow__attribution {
        display: none;
      }
      
      .node-expand-button {
        position: absolute;
        right: -5px;
        bottom: -5px;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: rgba(4, 150, 255, 0.8);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        cursor: pointer;
        box-shadow: 0 0 10px rgba(4, 150, 255, 0.5);
        transition: all 0.2s ease;
      }
      
      .node-expand-button:hover {
        transform: scale(1.2);
        background: rgba(4, 150, 255, 1);
      }
    `;
    
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);
};

export const useNodeExpansion = (initialNodes: string[] = []) => {
  const [expandedNodes, setExpandedNodes] = useState<string[]>(initialNodes);
  
  const toggleNodeExpansion = (nodeId: string) => {
    setExpandedNodes(prev => 
      prev.includes(nodeId) 
        ? prev.filter(id => id !== nodeId) 
        : [...prev, nodeId]
    );
  };
  
  return { expandedNodes, toggleNodeExpansion };
};
