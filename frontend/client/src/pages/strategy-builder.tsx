import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { useIsMobile } from '@/hooks/use-mobile';
import { useLocation } from 'wouter';
import { StrategyComponent, StrategyConnection } from '@/lib/types';
import { QuickBuilder } from '@/components/strategy-builder/quick-builder';
import { BuilderComponent } from '@/components/strategy-builder/builder-components';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

// Main component
export default function StrategyBuilder() {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [, setLocation] = useLocation();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<'design' | 'settings' | 'backtest'>('design');
  const [strategyComponents, setStrategyComponents] = useState<StrategyComponent[]>([]);
  const [connections, setConnections] = useState<StrategyConnection[]>([]);
  const [builderMode, setBuilderMode] = useState<'advanced' | 'quick'>('advanced');
  
  const [formData, setFormData] = useState({
    name: '',
    type: 'momentum',
    tradingPair: 'btc-usdt',
    initialInvestment: 1000,
    riskLevel: 5,
    maxTrades: 10,
    stopLoss: 5,
    takeProfit: 15,
    timeframe: '1h',
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: ['initialInvestment', 'riskLevel', 'maxTrades', 'stopLoss', 'takeProfit'].includes(name) 
        ? Number(value) 
        : value,
    });
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const validateForm = () => {
    if (!formData.name.trim()) {
      toast({
        title: "Strategy name required",
        description: "Please enter a name for your strategy",
        variant: "destructive"
      });
      return false;
    }
    
    if (formData.initialInvestment <= 0) {
      toast({
        title: "Invalid investment amount",
        description: "Initial investment must be greater than 0",
        variant: "destructive"
      });
      return false;
    }
    
    if (builderMode === 'advanced' && strategyComponents.length === 0) {
      toast({
        title: "Strategy components required",
        description: "Please add at least one component to your strategy",
        variant: "destructive"
      });
      return false;
    }
    
    return true;
  };
  
  const handleSaveStrategy = async () => {
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Prepare strategy data
      const strategyData = {
        userId: 1, // In a real app, this would come from auth context
        name: formData.name,
        type: formData.type,
        tradingPair: formData.tradingPair,
        initialInvestment: formData.initialInvestment,
        riskLevel: formData.riskLevel,
        status: 'draft', // Default status
        configuration: {
          components: strategyComponents,
          connections: connections,
          settings: {
            ...formData,
          }
        }
      };
      
      // Submit strategy to backend
      await apiRequest('POST', '/api/strategies', strategyData);
      
      toast({
        title: "Strategy saved!",
        description: `Your "${formData.name}" strategy has been saved successfully.`,
      });
      
    } catch (error) {
      console.error('Error saving strategy:', error);
      toast({
        title: "Error saving strategy",
        description: "There was a problem saving your strategy. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleDeployStrategy = async () => {
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Same save logic as above, but set status to 'active'
      const strategyData = {
        userId: 1,
        name: formData.name,
        type: formData.type,
        tradingPair: formData.tradingPair,
        initialInvestment: formData.initialInvestment,
        riskLevel: formData.riskLevel,
        status: 'active',
        configuration: {
          components: strategyComponents,
          connections: connections,
          settings: {
            ...formData,
          }
        }
      };
      
      await apiRequest('POST', '/api/strategies', strategyData);
      
      toast({
        title: "Strategy deployed!",
        description: `Your "${formData.name}" strategy has been deployed and is now active.`,
      });
      
      // Redirect to dashboard
      setTimeout(() => {
        setLocation('/');
      }, 1500);
      
    } catch (error) {
      console.error('Error deploying strategy:', error);
      toast({
        title: "Error deploying strategy",
        description: "There was a problem deploying your strategy. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleComponentsChange = (components: StrategyComponent[]) => {
    setStrategyComponents(components);
  };
  
  const handleConnectionsChange = (newConnections: StrategyConnection[]) => {
    setConnections(newConnections);
  };
  
  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Strategy Builder</h2>
          <p className="mt-1 text-sm text-neutral-400">
            Create and customize your trading strategies
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <Button 
            variant="outline"
            className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white"
          >
            <i className="fas fa-file-import mr-2"></i>
            Import
          </Button>
          <Button 
            variant="outline"
            className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white"
            onClick={handleSaveStrategy}
            disabled={isSubmitting}
          >
            <i className="fas fa-save mr-2"></i>
            Save Draft
          </Button>
          <Button 
            className="px-4 py-2 bg-primary hover:bg-primary/90 text-white"
            onClick={handleDeployStrategy}
            disabled={isSubmitting}
          >
            <i className="fas fa-paper-plane mr-2"></i>
            Deploy
          </Button>
        </div>
      </div>

      <div className="bg-neutral-800 rounded-xl border border-neutral-700 overflow-hidden shadow-lg mb-6">
        {/* Tabs */}
        <div className="flex border-b border-neutral-700">
          <Button
            variant={activeTab === 'design' ? 'default' : 'ghost'}
            className={`px-6 py-3 text-sm font-medium rounded-none ${activeTab === 'design' ? 'text-white border-b-2 border-primary' : 'text-neutral-400 hover:text-white'}`}
            onClick={() => setActiveTab('design')}
          >
            Design
          </Button>
          <Button
            variant={activeTab === 'settings' ? 'default' : 'ghost'}
            className={`px-6 py-3 text-sm font-medium rounded-none ${activeTab === 'settings' ? 'text-white border-b-2 border-primary' : 'text-neutral-400 hover:text-white'}`}
            onClick={() => setActiveTab('settings')}
          >
            Settings
          </Button>
          <Button
            variant={activeTab === 'backtest' ? 'default' : 'ghost'}
            className={`px-6 py-3 text-sm font-medium rounded-none ${activeTab === 'backtest' ? 'text-white border-b-2 border-primary' : 'text-neutral-400 hover:text-white'}`}
            onClick={() => setActiveTab('backtest')}
          >
            Backtest
          </Button>
        </div>
        
        <div className="p-6">
          {activeTab === 'design' && (
            <div className="flex flex-col space-y-6">
              {/* Strategy Info */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Strategy Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="block text-sm font-medium text-neutral-300 mb-1">Strategy Name</Label>
                    <Input 
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white" 
                      placeholder="e.g. SEI Advanced Momentum" 
                    />
                  </div>
                  <div>
                    <Label className="block text-sm font-medium text-neutral-300 mb-1">Strategy Type</Label>
                    <div className="relative">
                      <Select 
                        value={formData.type}
                        onValueChange={(value) => handleSelectChange('type', value)}
                      >
                        <SelectTrigger className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white">
                          <SelectValue placeholder="Select strategy type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="momentum">Momentum</SelectItem>
                          <SelectItem value="arbitrage">Arbitrage</SelectItem>
                          <SelectItem value="market-making">Market Making</SelectItem>
                          <SelectItem value="custom">Custom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label className="block text-sm font-medium text-neutral-300 mb-1">Trading Pair</Label>
                    <div className="relative">
                      <Select 
                        value={formData.tradingPair}
                        onValueChange={(value) => handleSelectChange('tradingPair', value)}
                      >
                        <SelectTrigger className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white">
                          <SelectValue placeholder="Select trading pair" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="btc-usdt">BTC/USDT</SelectItem>
                          <SelectItem value="eth-usdt">ETH/USDT</SelectItem>
                          <SelectItem value="sei-usdc">SEI/USDC</SelectItem>
                          <SelectItem value="sol-usdt">SOL/USDT</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="initialInvestment" className="block text-sm font-medium text-neutral-300 mb-1">Initial Investment</Label>
                    <div className="relative">
                      <Input 
                        id="initialInvestment"
                        type="number" 
                        name="initialInvestment"
                        value={formData.initialInvestment}
                        onChange={handleInputChange}
                        className="w-full pl-3 pr-12 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white" 
                        placeholder="1000" 
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <span className="text-neutral-400">USDT</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Strategy Workspace */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Strategy Workspace</h3>
                <Card className="border-neutral-600 bg-neutral-900">
                  <Tabs defaultValue={builderMode} onValueChange={(value) => setBuilderMode(value as 'advanced' | 'quick')}>
                    <TabsList className="w-full grid grid-cols-2">
                      <TabsTrigger value="advanced">Advanced Builder</TabsTrigger>
                      <TabsTrigger value="quick">Quick Builder</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="advanced" className="m-0">
                      <div className="h-[600px]">
                        <DndProvider backend={HTML5Backend}>
                          <BuilderComponent 
                            onComponentsChange={handleComponentsChange}
                          />
                        </DndProvider>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="quick" className="m-0 p-6">
                      <div className="flex justify-center">
                        <QuickBuilder />
                      </div>
                    </TabsContent>
                  </Tabs>
                </Card>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="flex flex-col space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Risk Management</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="stopLoss" className="block text-sm font-medium text-neutral-300 mb-1">Stop Loss (%)</Label>
                    <Input
                      id="stopLoss"
                      type="number"
                      name="stopLoss"
                      value={formData.stopLoss}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="takeProfit" className="block text-sm font-medium text-neutral-300 mb-1">Take Profit (%)</Label>
                    <Input
                      id="takeProfit"
                      type="number"
                      name="takeProfit"
                      value={formData.takeProfit}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="maxTrades" className="block text-sm font-medium text-neutral-300 mb-1">Max Concurrent Trades</Label>
                    <Input
                      id="maxTrades"
                      type="number"
                      name="maxTrades"
                      value={formData.maxTrades}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="riskLevel" className="block text-sm font-medium text-neutral-300 mb-1">Risk Level (1-10)</Label>
                    <Input
                      id="riskLevel"
                      type="number"
                      name="riskLevel"
                      min="1"
                      max="10"
                      value={formData.riskLevel}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'backtest' && (
            <div className="flex flex-col space-y-6">
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-neutral-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-chart-line text-neutral-300 text-2xl"></i>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Run Backtest</h3>
                <p className="text-neutral-400 mb-6 max-w-md mx-auto">
                  Test your strategy against historical market data to see how it would have performed.
                </p>
                <Button
                  className="bg-primary/80 hover:bg-primary text-white"
                  disabled={isSubmitting || strategyComponents.length === 0}
                >
                  <i className="fas fa-play mr-2"></i>
                  Start Backtest
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}