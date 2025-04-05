import React from 'react';
import { StrategyComponent, StrategyConnection } from '@/lib/types';

interface ConnectionLineProps {
  connections: StrategyConnection[];
  components: StrategyComponent[];
  onRemoveConnection: (id: string) => void;
}

export function ConnectionLines({ connections, components, onRemoveConnection }: ConnectionLineProps) {
  // Helper function to find a component by ID
  const findComponent = (id: string) => components.find(c => c.id === id);
  
  // Helper function to calculate connection points
  const calculateConnectionPoints = (fromId: string, toId: string) => {
    const fromComponent = findComponent(fromId);
    const toComponent = findComponent(toId);
    
    if (!fromComponent || !toComponent) return null;
    
    // Calculate output connector position for the source component
    const fromX = fromComponent.position.x + 180; // right side of component
    const fromY = fromComponent.position.y + 24; // middle of component
    
    // Calculate input connector position for the target component
    const toX = toComponent.position.x; // left side of component
    const toY = toComponent.position.y + 24; // middle of component
    
    return { fromX, fromY, toX, toY };
  };
  
  // Calculate control points for a bezier curve
  const calculateControlPoints = (fromX: number, fromY: number, toX: number, toY: number) => {
    const distance = Math.abs(toX - fromX);
    const controlX1 = fromX + distance / 3;
    const controlX2 = toX - distance / 3;
    
    return { controlX1, controlY1: fromY, controlX2, controlY2: toY };
  };
  
  return (
    <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="9"
          refY="3.5"
          orient="auto"
        >
          <polygon points="0 0, 10 3.5, 0 7" fill="#4CAF50" />
        </marker>
      </defs>
      
      {connections.map(connection => {
        const points = calculateConnectionPoints(connection.fromId, connection.toId);
        if (!points) return null;
        
        const { fromX, fromY, toX, toY } = points;
        const { controlX1, controlY1, controlX2, controlY2 } = calculateControlPoints(fromX, fromY, toX, toY);
        
        return (
          <g key={connection.id}>
            <path
              d={`M ${fromX} ${fromY} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${toX} ${toY}`}
              stroke="#4CAF50"
              strokeWidth="2"
              fill="none"
              markerEnd="url(#arrowhead)"
            />
            
            {/* Clickable area for removing connection (slightly wider than the path) */}
            <path
              d={`M ${fromX} ${fromY} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${toX} ${toY}`}
              stroke="transparent"
              strokeWidth="10"
              fill="none"
              className="cursor-pointer pointer-events-auto"
              onClick={() => onRemoveConnection(connection.id)}
            />
            
            {/* Small delete button in the middle of the path */}
            <g
              transform={`translate(${(fromX + toX) / 2}, ${(fromY + toY) / 2})`}
              className="cursor-pointer pointer-events-auto"
              onClick={() => onRemoveConnection(connection.id)}
            >
              <circle cx="0" cy="0" r="8" fill="#374151" stroke="#4b5563" />
              <text x="0" y="0" textAnchor="middle" dy=".3em" fill="white" fontSize="10">
                ×
              </text>
            </g>
          </g>
        );
      })}
    </svg>
  );
}