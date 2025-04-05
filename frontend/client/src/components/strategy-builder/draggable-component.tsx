import React from 'react';
import { useDrag } from 'react-dnd';
import { StrategyComponentType } from '@/lib/types';

export interface DraggableComponentProps {
  type: StrategyComponentType;
  name: string;
  icon: string;
  bgColor: string;
  description?: string;
  parameters?: Record<string, any>;
}

export function DraggableComponent({ 
  type, 
  name, 
  icon, 
  bgColor,
  description,
  parameters 
}: DraggableComponentProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: type,
    item: { type, name, icon, bgColor, parameters },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`flex-shrink-0 ${bgColor} border border-${bgColor.replace('/30', '/50')} rounded-lg p-3 cursor-grab shadow-sm hover:shadow-md transition-shadow ${
        isDragging ? 'opacity-50' : ''
      }`}
      title={description}
    >
      <div className="flex items-center">
        <i className={`${icon} mr-2`}></i>
        <span className="text-sm font-medium text-white">{name}</span>
      </div>
      {description && (
        <p className="text-xs mt-1 text-neutral-300">{description}</p>
      )}
    </div>
  );
}