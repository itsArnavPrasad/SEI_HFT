import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartData } from '@/lib/types';

const mockData: ChartData[] = Array(30).fill(0).map((_, i) => ({
  date: `Day ${i + 1}`,
  value: 10000 + Math.random() * 2000 - (i > 15 ? 500 : 0) + (i > 20 ? 1000 : 0)
}));

export default function Simulation() {
  const [selectedStrategy, setSelectedStrategy] = useState('btc-momentum');
  const [timeframe, setTimeframe] = useState('30d');
  const [status, setStatus] = useState('ready'); // ready, running, completed

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Strategy Simulation</h2>
          <p className="mt-1 text-sm text-neutral-400">
            Test your strategies with historical data before deploying
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <button 
            className={`px-4 py-2 ${status === 'running' ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-primary hover:bg-primary-dark'} text-white rounded-lg text-sm font-medium flex items-center`}
            onClick={() => setStatus(status === 'running' ? 'completed' : 'running')}
          >
            <i className={`fas fa-${status === 'running' ? 'stop' : 'play'} mr-2`}></i>
            {status === 'running' ? 'Stop Simulation' : 'Run Simulation'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Simulation Controls */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-neutral-800 rounded-xl border border-neutral-700 shadow-lg overflow-hidden">
            <div className="px-4 py-3 bg-neutral-800 border-b border-neutral-700">
              <h3 className="text-sm font-medium text-neutral-300">Simulation Settings</h3>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-1">Select Strategy</label>
                <div className="relative">
                  <select 
                    value={selectedStrategy}
                    onChange={(e) => setSelectedStrategy(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white appearance-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="btc-momentum">BTC Momentum</option>
                    <option value="eth-sol-arbitrage">ETH-SOL Arbitrage</option>
                    <option value="sei-market-making">SEI Market Making</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <i className="fas fa-chevron-down text-neutral-400"></i>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-1">Time Period</label>
                <div className="relative">
                  <select 
                    value={timeframe}
                    onChange={(e) => setTimeframe(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white appearance-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="7d">Last 7 days</option>
                    <option value="30d">Last 30 days</option>
                    <option value="90d">Last 90 days</option>
                    <option value="1y">Last year</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <i className="fas fa-chevron-down text-neutral-400"></i>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-1">Initial Investment</label>
                <div className="relative">
                  <input 
                    type="text" 
                    className="w-full pl-3 pr-12 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" 
                    placeholder="10000" 
                    defaultValue="10000"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <span className="text-neutral-400">USDT</span>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-1">Risk Level</label>
                <div className="flex items-center space-x-2">
                  <input 
                    type="range" 
                    min="1" 
                    max="10" 
                    defaultValue="5"
                    className="w-full h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
                  />
                  <span className="text-sm text-neutral-300 min-w-[30px] text-center">5</span>
                </div>
              </div>
              
              <div className="pt-2">
                <button 
                  className="w-full px-4 py-2 bg-neutral-700 hover:bg-neutral-600 text-white rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center"
                >
                  <i className="fas fa-sliders-h mr-2"></i>
                  Advanced Settings
                </button>
              </div>
            </div>
          </div>
          
          {/* Simulation Stats */}
          <div className="bg-neutral-800 rounded-xl border border-neutral-700 shadow-lg overflow-hidden">
            <div className="px-4 py-3 bg-neutral-800 border-b border-neutral-700">
              <h3 className="text-sm font-medium text-neutral-300">Simulation Results</h3>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-neutral-400">Initial Value:</span>
                <span className="text-sm font-medium text-white">$10,000.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-neutral-400">Final Value:</span>
                <span className="text-sm font-medium text-white">$11,243.75</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-neutral-400">Profit/Loss:</span>
                <span className="text-sm font-medium text-green-500">+$1,243.75 (12.44%)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-neutral-400">Trades Executed:</span>
                <span className="text-sm font-medium text-white">84</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-neutral-400">Win Rate:</span>
                <span className="text-sm font-medium text-white">68.5%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-neutral-400">Max Drawdown:</span>
                <span className="text-sm font-medium text-red-500">-8.2%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-neutral-400">Sharpe Ratio:</span>
                <span className="text-sm font-medium text-white">1.86</span>
              </div>
              
              <div className="pt-3">
                <button 
                  className="w-full px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center"
                >
                  <i className="fas fa-file-export mr-2"></i>
                  Export Results
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Simulation Results */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-neutral-800 rounded-xl border border-neutral-700 shadow-lg overflow-hidden">
            <div className="px-4 py-3 bg-neutral-800 border-b border-neutral-700 flex justify-between items-center">
              <h3 className="text-sm font-medium text-neutral-300">Performance Chart</h3>
              <div className="flex space-x-2">
                <button className="px-2 py-1 bg-neutral-700 hover:bg-neutral-600 text-neutral-300 rounded text-xs">
                  Portfolio
                </button>
                <button className="px-2 py-1 bg-primary text-white rounded text-xs">
                  Benchmark
                </button>
              </div>
            </div>
            <div className="p-4">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={mockData}
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
          
          {/* Trade Log */}
          <div className="bg-neutral-800 rounded-xl border border-neutral-700 shadow-lg overflow-hidden">
            <div className="px-4 py-3 bg-neutral-800 border-b border-neutral-700">
              <h3 className="text-sm font-medium text-neutral-300">Trade Log</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-neutral-700">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                      Date/Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                      Action
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                      Asset
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                      Value
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                      P/L
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800">
                  <tr className="hover:bg-neutral-800/50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-300">06/01/2025 09:32:41</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 rounded text-xs font-medium bg-green-500/20 text-green-500">Buy</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-300">BTC/USDT</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-300">$62,345.75</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-300">0.0805</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-300">$5,018.83</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-300">-</td>
                  </tr>
                  <tr className="hover:bg-neutral-800/50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-300">06/03/2025 14:21:15</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 rounded text-xs font-medium bg-red-500/20 text-red-500">Sell</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-300">BTC/USDT</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-300">$63,821.24</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-300">0.0805</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-300">$5,137.61</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-500">+$118.78</td>
                  </tr>
                  <tr className="hover:bg-neutral-800/50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-300">06/05/2025 10:45:33</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 rounded text-xs font-medium bg-green-500/20 text-green-500">Buy</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-300">BTC/USDT</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-300">$64,012.58</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-300">0.0784</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-300">$5,018.59</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-300">-</td>
                  </tr>
                  <tr className="hover:bg-neutral-800/50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-300">06/07/2025 11:03:27</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 rounded text-xs font-medium bg-red-500/20 text-red-500">Sell</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-300">BTC/USDT</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-300">$64,987.41</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-300">0.0784</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-300">$5,095.01</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-500">+$76.42</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
