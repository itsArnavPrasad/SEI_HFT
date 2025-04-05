import React from 'react';
import { MarketData, ArbitrageOpportunity } from '@/lib/types';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MarketOverviewProps {
  markets: MarketData[];
  arbitrageOpportunities: ArbitrageOpportunity[];
  onMarketSelect?: (market: MarketData) => void;
  onOpportunitySelect?: (opportunity: ArbitrageOpportunity) => void;
  isLoading?: boolean;
}

export function MarketOverview({ 
  markets, 
  arbitrageOpportunities, 
  onMarketSelect, 
  onOpportunitySelect,
  isLoading = false 
}: MarketOverviewProps) {
  return (
    <div className="lg:col-span-2">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Market Overview</h3>
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-neutral-400 hover:text-white"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <i className="fas fa-sync-alt"></i>
          )}
        </Button>
      </div>
      <div className="bg-neutral-800 rounded-xl border border-neutral-700 overflow-hidden shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-neutral-700">
          {/* Left column: Markets */}
          <div>
            <div className="px-4 py-3 bg-neutral-800 border-b border-neutral-700">
              <h4 className="text-sm font-medium text-neutral-300">Top Markets</h4>
            </div>
            {isLoading ? (
              <div className="py-12 flex justify-center items-center">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : (
              <div className="divide-y divide-neutral-700">
                {markets.map((market, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between px-4 py-3 hover:bg-neutral-700/30 cursor-pointer transition-colors duration-200"
                    onClick={() => onMarketSelect && onMarketSelect(market)}
                    title="Click for detailed view"
                  >
                    <div className="flex items-center">
                      <div className={`flex-shrink-0 h-8 w-8 rounded-full bg-${market.iconColor}-500 flex items-center justify-center text-xs font-bold text-neutral-900`}>
                        {market.iconSymbol}
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-white">{market.symbol}</div>
                        <div className="text-xs text-neutral-400">{market.name}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-white">{market.price}</div>
                      <div className={`text-xs ${market.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                        {market.change}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Right column: Arbitrage Opportunities */}
          <div>
            <div className="px-4 py-3 bg-neutral-800 border-b border-neutral-700">
              <h4 className="text-sm font-medium text-neutral-300">Arbitrage Opportunities</h4>
            </div>
            {isLoading ? (
              <div className="py-12 flex justify-center items-center">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : (
              <div className="divide-y divide-neutral-700">
                {arbitrageOpportunities.map((opportunity, index) => (
                  <div 
                    key={index} 
                    className="px-4 py-3 hover:bg-neutral-700/30 cursor-pointer transition-colors duration-200"
                    onClick={() => onOpportunitySelect && onOpportunitySelect(opportunity)}
                    title="Click for detailed view"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center">
                        <div className={`h-6 w-6 rounded-full bg-${opportunity.iconColor}-500 flex items-center justify-center text-xs font-bold text-neutral-900`}>
                          {opportunity.iconSymbol}
                        </div>
                        <span className="ml-2 text-sm font-medium text-white">{opportunity.symbol}</span>
                      </div>
                      <div className="text-sm font-medium text-green-500">{opportunity.percentage}</div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-neutral-400">
                      <div>{opportunity.route}</div>
                      <div>{opportunity.volume}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
