import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';

export default function DexIntegration() {
  const { toast } = useToast();
  const [selectedDex, setSelectedDex] = useState<string>('dragonswap');
  const [selectedAsset, setSelectedAsset] = useState<string>('sei');
  const [connected, setConnected] = useState<boolean>(false);
  
  // New states for trading functionality
  const [payAmount, setPayAmount] = useState<string>('');
  const [receiveAmount, setReceiveAmount] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [slippageTolerance, setSlippageTolerance] = useState<number>(0.5);
  const [autoSlippage, setAutoSlippage] = useState<boolean>(true);
  const [autoRouting, setAutoRouting] = useState<boolean>(true);
  const [advancedMode, setAdvancedMode] = useState<boolean>(false);
  
  const [connectedWallet, setConnectedWallet] = useState<{
    address: string;
    balance: { 
      sei: string; 
      usdc: string;
    };
  } | null>(null);
  
  const assets = [
    { id: 'btc', name: 'Bitcoin', symbol: 'BTC', color: 'yellow', icon: '₿', price: '65,432.78', change: '+2.34%', isPositive: true },
    { id: 'eth', name: 'Ethereum', symbol: 'ETH', color: 'blue', icon: 'Ξ', price: '3,456.82', change: '+1.87%', isPositive: true },
    { id: 'sei', name: 'SEI Network', symbol: 'SEI', color: 'green', icon: 'S', price: '0.8432', change: '-0.75%', isPositive: false },
    { id: 'sol', name: 'Solana', symbol: 'SOL', color: 'purple', icon: 'S', price: '145.23', change: '+3.15%', isPositive: true },
  ];
  
  const dexOptions = [
    { id: 'dragonswap', name: 'DragonSwap', icon: 'fas fa-dragon', status: 'active' },
    { id: 'astrox', name: 'AstroX', icon: 'fas fa-planet-ringed', status: 'active' },
    { id: 'novadex', name: 'NovaDEX', icon: 'fas fa-star', status: 'active' },
    { id: 'saturndex', name: 'SaturnDEX', icon: 'fas fa-rings-planet', status: 'maintenance' },
  ];

  // Add effects for wallet connection and price calculation
  useEffect(() => {
    if (connected && !connectedWallet) {
      // Simulate wallet connection
      setConnectedWallet({
        address: '0x7Fa' + Math.random().toString(16).slice(2, 8) + '...',
        balance: {
          sei: '245.32',
          usdc: '1,250.00'
        }
      });
      
      toast({
        title: "Wallet Connected",
        description: "Your wallet has been successfully connected to " + dexOptions.find(d => d.id === selectedDex)?.name,
      });
    } else if (!connected && connectedWallet) {
      // Reset wallet data
      setConnectedWallet(null);
      setPayAmount('');
      setReceiveAmount('');
      
      toast({
        title: "Wallet Disconnected",
        description: "Your wallet has been disconnected",
      });
    }
  }, [connected, selectedDex, toast, connectedWallet]);
  
  // Calculate receive amount based on pay amount
  useEffect(() => {
    if (payAmount && !isNaN(Number(payAmount))) {
      // Get the exchange rate for the selected asset
      const assetPrice = assets.find(a => a.id === selectedAsset)?.price.replace(',', '') || '0';
      const rate = Number(assetPrice);
      
      // Calculate receive amount (with 0.3% fee)
      const amount = Number(payAmount) * rate * 0.997;
      setReceiveAmount(amount.toFixed(2));
    } else {
      setReceiveAmount('');
    }
  }, [payAmount, selectedAsset, assets]);
  
  // Handle wallet connection
  const handleWalletConnection = () => {
    if (connected) {
      // Ask for confirmation before disconnecting
      if (window.confirm("Are you sure you want to disconnect your wallet?")) {
        setConnected(false);
      }
    } else {
      // Connect wallet
      setConnected(true);
    }
  };
  
  // Handle swap submission
  const handleSwap = () => {
    if (!payAmount || Number(payAmount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount to swap",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate a network request
    setTimeout(() => {
      setIsSubmitting(false);
      
      toast({
        title: "Swap successful!",
        description: `You swapped ${payAmount} ${assets.find(a => a.id === selectedAsset)?.symbol} for ${receiveAmount} USDC`,
      });
      
      // Reset the form
      setPayAmount('');
      setReceiveAmount('');
    }, 1500);
  };

  const getStatusClass = (status: string) => {
    return status === 'active' 
      ? 'bg-green-500/20 text-green-500' 
      : 'bg-yellow-500/20 text-yellow-500';
  };
  
  // Helper functions for trading interface
  const handleSetPayAmount = (value: string) => {
    // Only allow numeric input and decimals
    if (/^(\d*\.?\d*)$/.test(value) || value === '') {
      setPayAmount(value);
    }
  };
  
  const handleSetHalf = () => {
    if (connectedWallet) {
      const balance = Number(connectedWallet.balance.sei.replace(',', ''));
      setPayAmount((balance / 2).toFixed(2));
    }
  };
  
  const handleSetMax = () => {
    if (connectedWallet) {
      const balance = Number(connectedWallet.balance.sei.replace(',', ''));
      setPayAmount(balance.toFixed(2));
    }
  };

  const handleToggleAutoSlippage = (checked: boolean) => {
    setAutoSlippage(checked);
    if (checked) {
      setSlippageTolerance(0.5);
    }
  };

  const handleToggleAutoRouting = (checked: boolean) => {
    setAutoRouting(checked);
  };

  const handleSlippageChange = (value: number[]) => {
    setSlippageTolerance(value[0]);
  };

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">DEX Integration</h2>
          <p className="mt-1 text-sm text-neutral-400">
            Connect to decentralized exchanges for automated trading
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <Button 
            variant={connected ? "destructive" : "default"}
            className={`px-4 py-2 ${connected ? 'bg-red-500 hover:bg-red-600' : 'bg-primary hover:bg-primary/90'}`}
            onClick={handleWalletConnection}
          >
            <i className={`fas fa-${connected ? 'unlink' : 'link'} mr-2`}></i>
            {connected ? 'Disconnect' : 'Connect Wallet'}
          </Button>
          {connected && connectedWallet && (
            <Button variant="outline" className="bg-neutral-800 text-white">
              <i className="fas fa-wallet mr-2 text-primary"></i>
              {connectedWallet.address}
            </Button>
          )}
        </div>
      </div>

      {/* DEX Selection Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <div className="lg:col-span-1">
          <Card className="bg-neutral-800 border-neutral-700">
            <CardHeader className="pb-3 border-b border-neutral-700">
              <CardTitle className="text-sm font-medium text-neutral-300">Available DEXs</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-neutral-700">
                {dexOptions.map((dex) => (
                  <button
                    key={dex.id}
                    className={`w-full px-4 py-3 text-left transition-colors duration-200 hover:bg-neutral-700/30 ${selectedDex === dex.id ? 'bg-neutral-700/50' : ''}`}
                    onClick={() => setSelectedDex(dex.id)}
                  >
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 bg-primary-dark/30 rounded-lg flex items-center justify-center">
                        <i className={`${dex.icon} text-primary-light`}></i>
                      </div>
                      <div className="ml-3 flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-white">{dex.name}</span>
                          <Badge variant={dex.status === 'active' ? 'default' : 'outline'} className={dex.status === 'active' ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'}>
                            {dex.status.charAt(0).toUpperCase() + dex.status.slice(1)}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* DEX Interface */}
        <div className="lg:col-span-3">
          <Card className="bg-neutral-800 border-neutral-700">
            <CardHeader className="pb-3 border-b border-neutral-700 flex flex-row items-center justify-between">
              <div className="flex items-center">
                <CardTitle className="text-sm font-medium text-neutral-300">
                  {dexOptions.find(d => d.id === selectedDex)?.name} Interface
                </CardTitle>
                <Badge variant="outline" className="ml-2 bg-primary/20 text-primary border-none">
                  SEI Network
                </Badge>
              </div>
              <Button variant="ghost" size="icon">
                <i className="fas fa-ellipsis-h"></i>
              </Button>
            </CardHeader>

            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Asset Selector */}
                <div className="md:col-span-1 bg-neutral-900 rounded-lg border border-neutral-700 p-4">
                  <h4 className="text-sm font-medium text-neutral-300 mb-3">Select Asset</h4>
                  <div className="space-y-2">
                    {assets.map((asset) => (
                      <div
                        key={asset.id}
                        className={`p-3 rounded-lg cursor-pointer flex items-center transition-colors duration-200 ${
                          selectedAsset === asset.id ? 'bg-primary/20 border border-primary/50' : 'bg-neutral-800 border border-neutral-700 hover:bg-neutral-700'
                        }`}
                        onClick={() => setSelectedAsset(asset.id)}
                      >
                        <div className={`h-8 w-8 rounded-full bg-${asset.color}-500 flex items-center justify-center text-xs font-bold text-neutral-900`}>
                          {asset.icon}
                        </div>
                        <div className="ml-3 flex-1">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium text-white">{asset.symbol}</span>
                            <span className={`text-xs ${asset.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                              {asset.change}
                            </span>
                          </div>
                          <div className="flex justify-between mt-1">
                            <span className="text-xs text-neutral-400">{asset.name}</span>
                            <span className="text-xs text-neutral-300">${asset.price}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Trading Interface */}
                <div className="md:col-span-2">
                  <div className="bg-neutral-900 rounded-lg border border-neutral-700 p-4 h-full">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-sm font-medium text-neutral-300">Trading Interface</h4>
                      <Tabs defaultValue="swap" className="w-auto">
                        <TabsList className="bg-neutral-800">
                          <TabsTrigger value="swap">Swap</TabsTrigger>
                          <TabsTrigger value="pool">Pool</TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </div>

                    {connected ? (
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="pay-amount" className="block text-sm font-medium text-neutral-300 mb-1">You Pay</Label>
                          <div className="flex items-center bg-neutral-800 border border-neutral-700 rounded-lg p-3">
                            <Input 
                              id="pay-amount"
                              type="text"
                              className="flex-1 bg-transparent border-none shadow-none text-white focus-visible:ring-0 focus-visible:ring-offset-0" 
                              placeholder="0.0"
                              value={payAmount}
                              onChange={(e) => handleSetPayAmount(e.target.value)}
                            />
                            <div className="flex items-center">
                              <div className="px-2 py-1 bg-neutral-700 rounded flex items-center">
                                <div className={`h-5 w-5 rounded-full bg-${assets.find(a => a.id === selectedAsset)?.color}-500 flex items-center justify-center text-xs font-bold text-neutral-900`}>
                                  {assets.find(a => a.id === selectedAsset)?.icon}
                                </div>
                                <span className="ml-2 text-sm text-white">{assets.find(a => a.id === selectedAsset)?.symbol}</span>
                                <i className="fas fa-chevron-down ml-2 text-neutral-400"></i>
                              </div>
                            </div>
                          </div>
                          <div className="text-xs text-neutral-400 mt-1 flex justify-between">
                            <span>Balance: {connectedWallet?.balance.sei} {assets.find(a => a.id === selectedAsset)?.symbol}</span>
                            <div className="space-x-2">
                              <button className="text-primary hover:underline" onClick={handleSetHalf}>Half</button>
                              <button className="text-primary hover:underline" onClick={handleSetMax}>Max</button>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-center">
                          <Button variant="ghost" size="icon" className="bg-neutral-800 hover:bg-neutral-700 rounded-full">
                            <i className="fas fa-arrow-down text-neutral-400"></i>
                          </Button>
                        </div>

                        <div>
                          <Label htmlFor="receive-amount" className="block text-sm font-medium text-neutral-300 mb-1">You Receive</Label>
                          <div className="flex items-center bg-neutral-800 border border-neutral-700 rounded-lg p-3">
                            <Input 
                              id="receive-amount"
                              type="text"
                              className="flex-1 bg-transparent border-none shadow-none text-white focus-visible:ring-0 focus-visible:ring-offset-0" 
                              placeholder="0.0" 
                              value={receiveAmount}
                              readOnly 
                            />
                            <div className="flex items-center">
                              <div className="px-2 py-1 bg-neutral-700 rounded flex items-center">
                                <div className="h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center text-xs font-bold text-neutral-900">
                                  U
                                </div>
                                <span className="ml-2 text-sm text-white">USDC</span>
                                <i className="fas fa-chevron-down ml-2 text-neutral-400"></i>
                              </div>
                            </div>
                          </div>
                          <div className="text-xs text-neutral-400 mt-1">
                            <span>Balance: {connectedWallet?.balance.usdc} USDC</span>
                          </div>
                        </div>

                        {/* Advanced settings toggle */}
                        <div className="flex items-center justify-between pt-2">
                          <Label htmlFor="advanced-toggle" className="text-sm text-neutral-400 cursor-pointer hover:text-neutral-300 transition-colors duration-200">
                            Advanced Settings
                          </Label>
                          <Switch
                            id="advanced-toggle"
                            checked={advancedMode}
                            onCheckedChange={setAdvancedMode}
                          />
                        </div>

                        {/* Advanced settings panel */}
                        {advancedMode && (
                          <div className="mt-4 p-3 bg-neutral-800 rounded-lg border border-neutral-700">
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <Label htmlFor="auto-slippage" className="text-sm text-neutral-400">
                                  Auto Slippage
                                </Label>
                                <Switch
                                  id="auto-slippage"
                                  checked={autoSlippage}
                                  onCheckedChange={handleToggleAutoSlippage}
                                />
                              </div>
                              
                              {!autoSlippage && (
                                <div className="space-y-2">
                                  <div className="flex justify-between">
                                    <Label htmlFor="slippage-tolerance" className="text-xs text-neutral-400">
                                      Slippage Tolerance
                                    </Label>
                                    <span className="text-xs font-medium text-white">{slippageTolerance.toFixed(1)}%</span>
                                  </div>
                                  <Slider
                                    id="slippage-tolerance"
                                    min={0.1}
                                    max={5}
                                    step={0.1}
                                    value={[slippageTolerance]}
                                    onValueChange={handleSlippageChange}
                                    className="mt-2"
                                  />
                                </div>
                              )}
                              
                              <div className="flex items-center justify-between">
                                <Label htmlFor="auto-routing" className="text-sm text-neutral-400">
                                  Auto Routing
                                </Label>
                                <Switch
                                  id="auto-routing"
                                  checked={autoRouting}
                                  onCheckedChange={handleToggleAutoRouting}
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="pt-2">
                          <Button 
                            className="w-full px-4 py-3 text-white"
                            onClick={handleSwap}
                            disabled={isSubmitting || !payAmount}
                          >
                            {isSubmitting ? (
                              <span className="flex items-center justify-center">
                                <i className="fas fa-circle-notch fa-spin mr-2"></i>
                                Processing...
                              </span>
                            ) : 'Swap'}
                          </Button>
                        </div>

                        <div className="bg-neutral-800 rounded-lg p-3 mt-2">
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-neutral-400">Rate</span>
                            <span className="text-white">1 {assets.find(a => a.id === selectedAsset)?.symbol} = {assets.find(a => a.id === selectedAsset)?.price} USDC</span>
                          </div>
                          <div className="flex justify-between items-center text-xs mt-2">
                            <span className="text-neutral-400">Fee</span>
                            <span className="text-white">0.3%</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-12">
                        <div className="h-16 w-16 bg-neutral-800 rounded-full flex items-center justify-center mb-4">
                          <i className="fas fa-wallet text-2xl text-neutral-400"></i>
                        </div>
                        <h4 className="text-lg font-medium text-white mb-2">Connect Your Wallet</h4>
                        <p className="text-sm text-neutral-400 text-center mb-6 max-w-md">
                          Connect your wallet to access trading features and execute trades on the SEI Network.
                        </p>
                        <Button onClick={handleWalletConnection}>
                          <i className="fas fa-link mr-2"></i>
                          Connect Wallet
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}