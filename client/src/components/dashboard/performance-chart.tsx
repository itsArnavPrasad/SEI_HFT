import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartData } from '@/lib/types';

interface PerformanceChartProps {
  data: ChartData[];
  timeframe: '24h' | '7d' | '30d' | 'all';
  onTimeframeChange: (timeframe: '24h' | '7d' | '30d' | 'all') => void;
}

export function PerformanceChart({ data, timeframe, onTimeframeChange }: PerformanceChartProps) {
  return (
    <div className="mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Strategy Performance</h3>
        <div className="flex space-x-2 mt-2 md:mt-0">
          <button 
            className={`px-3 py-1.5 ${timeframe === '24h' ? 'bg-primary text-white' : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-300'} rounded-lg text-sm`}
            onClick={() => onTimeframeChange('24h')}
          >
            24h
          </button>
          <button 
            className={`px-3 py-1.5 ${timeframe === '7d' ? 'bg-primary text-white' : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-300'} rounded-lg text-sm`}
            onClick={() => onTimeframeChange('7d')}
          >
            7d
          </button>
          <button 
            className={`px-3 py-1.5 ${timeframe === '30d' ? 'bg-primary text-white' : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-300'} rounded-lg text-sm`}
            onClick={() => onTimeframeChange('30d')}
          >
            30d
          </button>
          <button 
            className={`px-3 py-1.5 ${timeframe === 'all' ? 'bg-primary text-white' : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-300'} rounded-lg text-sm`}
            onClick={() => onTimeframeChange('all')}
          >
            All
          </button>
        </div>
      </div>
      <div className="bg-neutral-800 rounded-xl border border-neutral-700 overflow-hidden shadow-lg">
        {/* Performance Chart */}
        <div className="px-5 py-4">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
              >
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0052cc" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#0052cc" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#474d5a" vertical={false} />
                <XAxis 
                  dataKey="date" 
                  stroke="#6b778c" 
                  tick={{ fill: '#6b778c' }} 
                  axisLine={{ stroke: '#474d5a' }} 
                  tickLine={{ stroke: '#474d5a' }}
                />
                <YAxis 
                  stroke="#6b778c" 
                  tick={{ fill: '#6b778c' }} 
                  axisLine={{ stroke: '#474d5a' }} 
                  tickLine={{ stroke: '#474d5a' }}
                  tickFormatter={(value) => `$${value.toLocaleString()}`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#172b4d', 
                    borderColor: '#474d5a', 
                    color: '#e1e4e8' 
                  }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, 'Value']}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#0052cc" 
                  activeDot={{ r: 6, stroke: '#0052cc', strokeWidth: 2, fill: '#172b4d' }}
                  dot={{ stroke: '#0052cc', strokeWidth: 2, fill: '#172b4d', r: 4 }}
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorValue)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
