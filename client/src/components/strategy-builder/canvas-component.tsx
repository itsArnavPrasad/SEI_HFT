import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import { StrategyComponent } from '@/lib/types';

interface CanvasComponentProps {
  component: StrategyComponent;
  onRemove: (id: string) => void;
  onSelect: (id: string) => void;
  onPositionChange: (id: string, x: number, y: number) => void;
  onConnect: (fromId: string, toId: string) => void;
  isSelected: boolean;
  connectingFrom: string | null;
}

export function CanvasComponent({
  component,
  onRemove,
  onSelect,
  onPositionChange,
  onConnect,
  isSelected,
  connectingFrom,
}: CanvasComponentProps) {
  const [isEditingParams, setIsEditingParams] = useState(false);
  
  // Set up drag functionality for repositioning
  const [{ isDragging }, drag] = useDrag({
    type: 'CANVAS_ITEM',
    item: { id: component.id, type: component.type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const handleDragEnd = (e: React.DragEvent) => {
    // Get the component's current position
    const { x, y } = component.position;
    
    // Calculate the new position based on the drag
    const newX = x + e.clientX;
    const newY = y + e.clientY;
    
    // Update the component's position
    onPositionChange(component.id, newX, newY);
  };

  const getComponentTypeStyle = () => {
    switch (component.type) {
      case 'indicator':
        return 'bg-primary-dark/30 border-primary/20';
      case 'buy-signal':
        return 'bg-green-500/30 border-green-500/20';
      case 'sell-signal':
        return 'bg-red-500/30 border-red-500/20';
      case 'filter':
        return 'bg-yellow-500/30 border-yellow-500/20';
      case 'logic':
        return 'bg-neutral-700 border-neutral-600';
      default:
        return 'bg-neutral-800 border-neutral-700';
    }
  };

  const handleConnect = () => {
    if (connectingFrom && connectingFrom !== component.id) {
      onConnect(connectingFrom, component.id);
    }
  };

  return (
    <div
      ref={drag}
      className={`absolute p-3 rounded-lg border shadow-md ${getComponentTypeStyle()} ${
        isSelected ? 'ring-2 ring-primary' : ''
      } ${isDragging ? 'opacity-50' : ''}`}
      style={{
        left: component.position.x,
        top: component.position.y,
        cursor: isDragging ? 'grabbing' : 'grab',
        zIndex: isSelected ? 10 : 1,
        minWidth: '180px',
      }}
      onClick={() => onSelect(component.id)}
      onDragEnd={handleDragEnd}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <i className={`${component.icon} mr-2`}></i>
          <span className="text-sm font-medium text-white">{component.name}</span>
        </div>
        <div className="flex space-x-1">
          <button
            className="w-5 h-5 flex items-center justify-center rounded hover:bg-neutral-700 text-neutral-400 hover:text-white"
            onClick={() => setIsEditingParams(!isEditingParams)}
            title="Edit parameters"
          >
            <i className="fas fa-cog text-xs"></i>
          </button>
          <button
            className="w-5 h-5 flex items-center justify-center rounded hover:bg-neutral-700 text-neutral-400 hover:text-white"
            onClick={(e) => {
              e.stopPropagation();
              onRemove(component.id);
            }}
            title="Remove component"
          >
            <i className="fas fa-times text-xs"></i>
          </button>
        </div>
      </div>
      
      {/* Parameters area (shown when editing) */}
      {isEditingParams && component.parameters && (
        <div className="mt-2 pt-2 border-t border-neutral-700 space-y-2">
          {Object.entries(component.parameters).map(([key, value]) => (
            <div key={key} className="flex justify-between items-center">
              <span className="text-xs text-neutral-300">{key}:</span>
              <span className="text-xs text-white">{value.toString()}</span>
            </div>
          ))}
        </div>
      )}
      
      {/* Input/Output connectors */}
      <div className="w-3 h-3 absolute -left-1.5 top-1/2 transform -translate-y-1/2 bg-blue-500 rounded-full border border-blue-300 cursor-pointer" 
        title="Input connector"
      />
      
      <div 
        className="w-3 h-3 absolute -right-1.5 top-1/2 transform -translate-y-1/2 bg-green-500 rounded-full border border-green-300 cursor-pointer"
        title="Output connector"
        onClick={handleConnect}
      />
    </div>
  );
}