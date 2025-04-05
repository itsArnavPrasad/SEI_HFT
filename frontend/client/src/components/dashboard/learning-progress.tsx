import React from 'react';
import { LearningResourceData } from '@/lib/types';

interface LearningProgressProps {
  resources: LearningResourceData[];
  completedCount: number;
  totalCount: number;
}

export function LearningProgress({ resources, completedCount, totalCount }: LearningProgressProps) {
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/20 text-green-500';
      case 'in-progress':
        return 'bg-yellow-500/20 text-yellow-500';
      case 'locked':
        return 'bg-neutral-600/40 text-neutral-400';
      default:
        return 'bg-neutral-600/40 text-neutral-400';
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Learning Progress</h3>
        <a href="#" className="text-primary text-sm hover:text-primary-light">View All</a>
      </div>
      <div className="bg-neutral-800 rounded-xl border border-neutral-700 overflow-hidden shadow-lg">
        <div className="px-4 py-3 bg-neutral-800 border-b border-neutral-700 flex justify-between items-center">
          <h4 className="text-sm font-medium text-neutral-300">Courses & Tutorials</h4>
          <div className="text-xs text-neutral-400">
            <span>{completedCount}/{totalCount} completed</span>
          </div>
        </div>
        <div className="divide-y divide-neutral-700">
          {resources.map((resource) => (
            <div key={resource.id} className="px-4 py-3 hover:bg-neutral-700/30">
              <div className="flex items-start">
                <div className={`h-10 w-10 flex-shrink-0 ${resource.iconBg} rounded-lg flex items-center justify-center`}>
                  <i className={`${resource.icon} text-${resource.status === 'completed' ? 'primary' : resource.status === 'in-progress' ? 'secondary' : 'neutral'}-light`}></i>
                </div>
                <div className="ml-3 flex-1">
                  <div className="flex justify-between">
                    <h4 className="text-sm font-medium text-white">{resource.title}</h4>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(resource.status)}`}>
                      {resource.status === 'completed' ? 'Completed' : 
                       resource.status === 'in-progress' ? 'In Progress' : 'Locked'}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-neutral-400">
                    {resource.description}
                  </p>
                  <div className="mt-2 h-1 w-full bg-neutral-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${
                        resource.status === 'completed' ? 'bg-green-500' : 
                        resource.status === 'in-progress' ? 'bg-yellow-500' : 
                        'bg-neutral-600'
                      }`} 
                      style={{ width: `${resource.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
