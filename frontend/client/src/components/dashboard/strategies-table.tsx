import React from 'react';
import { StrategyData } from '@/lib/types';

interface StrategiesTableProps {
  strategies: StrategyData[];
}

export function StrategiesTable({ strategies }: StrategiesTableProps) {
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/20 text-green-500';
      case 'monitoring':
        return 'bg-yellow-500/20 text-yellow-500';
      case 'underperforming':
        return 'bg-red-500/20 text-red-500';
      default:
        return 'bg-neutral-600/40 text-neutral-400';
    }
  };

  return (
    <div className="bg-neutral-900 overflow-x-auto">
      <table className="min-w-full divide-y divide-neutral-700">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
              Strategy
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
              Assets
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
              Value
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
              Profit/Loss
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
              Trades (24h)
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-neutral-400 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-800">
          {strategies.map((strategy) => (
            <tr key={strategy.id} className="hover:bg-neutral-800/50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className={`h-8 w-8 flex-shrink-0 ${strategy.iconBg} rounded-lg flex items-center justify-center`}>
                    <i className={`${strategy.icon} text-${strategy.type === 'momentum' ? 'primary' : strategy.type === 'arbitrage' ? 'yellow' : 'red'}-light`}></i>
                  </div>
                  <div className="ml-3">
                    <div className="text-sm font-medium text-white">{strategy.name}</div>
                    <div className="text-xs text-neutral-400">Created {strategy.createdDate}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center space-x-1">
                  {strategy.assets.symbols.map((symbol, index) => (
                    <div key={index} className={`h-5 w-5 rounded-full bg-${
                      symbol === 'BTC' ? 'yellow' : 
                      symbol === 'ETH' ? 'blue' : 
                      symbol === 'SEI' ? 'green' : 
                      symbol === 'SOL' ? 'purple' : 'gray'
                    }-500 flex items-center justify-center text-xs font-bold text-neutral-900`}>
                      {symbol === 'BTC' ? '₿' : 
                       symbol === 'ETH' ? 'Ξ' : 
                       symbol === 'SEI' ? 'S' : 
                       symbol === 'SOL' ? 'S' : symbol.charAt(0)}
                    </div>
                  ))}
                  <span className="text-sm text-neutral-300">{strategy.assets.pair}</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-300">
                {strategy.value}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className={`flex items-center text-sm font-medium ${strategy.profitLoss.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                  <i className={`fas fa-arrow-${strategy.profitLoss.isPositive ? 'up' : 'down'} mr-1`}></i>
                  {strategy.profitLoss.value} ({strategy.profitLoss.percentage})
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-300">
                {strategy.trades}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(strategy.status)}`}>
                  <span className="animate-pulse mr-1 h-1.5 w-1.5 bg-current rounded-full"></span>
                  {strategy.status.charAt(0).toUpperCase() + strategy.status.slice(1)}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex justify-end space-x-2">
                  <button className="p-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white rounded">
                    <i className="fas fa-edit"></i>
                  </button>
                  <button className="p-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white rounded">
                    <i className="fas fa-pause"></i>
                  </button>
                  <button className="p-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white rounded">
                    <i className="fas fa-ellipsis-v"></i>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
