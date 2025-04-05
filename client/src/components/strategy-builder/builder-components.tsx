import React, { useState, useCallback, useRef } from 'react';
import { useDrop } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';
import { StrategyComponent, StrategyConnection } from '@/lib/types';
import { DraggableComponent } from './draggable-component';
import { COMPONENT_DEFINITIONS, getDefaultParameters } from './component-definitions';
import { CanvasComponent } from './canvas-component';
import { ConnectionLines } from './strategy-connections';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface BuilderComponentProps {
  onComponentsChange?: (components: StrategyComponent[]) => void;
}

export function BuilderComponent({ onComponentsChange }: BuilderComponentProps = {}) {
  const [activeTab, setActiveTab] = useState<string>('indicators');
  const [strategyName, setStrategyName] = useState<string>('New Strategy');
  const [components, setComponents] = useState<StrategyComponent[]>([]);
  const [connections, setConnections] = useState<StrategyConnection[]>([]);
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);
  const [connectingFrom, setConnectingFrom] = useState<string | null>(null);
  const { toast } = useToast();
  const canvasRef = useRef<HTMLDivElement | null>(null);
  
  // Filter component definitions by type
  const getComponentsByType = (type: string) => {
    return COMPONENT_DEFINITIONS.filter(component => component.type === type);
  };
  
  // Drop handler for canvas
  const [, drop] = useDrop({
    accept: ['indicator', 'buy-signal', 'sell-signal', 'filter', 'logic'],
    drop: (item: any, monitor) => {
      const offset = monitor.getClientOffset();
      if (!offset || !canvasRef.current) return;
      
      // Get canvas position and calculate relative position
      const canvasRect = canvasRef.current.getBoundingClientRect();
      const x = offset.x - canvasRect.left;
      const y = offset.y - canvasRect.top;
      
      // Create a new component
      const newComponent: StrategyComponent = {
        id: uuidv4(),
        type: item.type,
        name: item.name,
        icon: item.icon,
        position: { x, y },
        parameters: getDefaultParameters(item.type, item.name)
      };
      
      // Add to components
      setComponents(prev => [...prev, newComponent]);
      
      // Notify parent if callback provided
      if (onComponentsChange) {
        onComponentsChange([...components, newComponent]);
      }
    },
  });
  
  // Handle component selection
  const handleSelectComponent = (id: string) => {
    if (connectingFrom) {
      // If we're in connecting mode, create a connection
      return;
    }
    setSelectedComponentId(id);
  };
  
  // Handle position change
  const handlePositionChange = (id: string, x: number, y: number) => {
    setComponents(prev => 
      prev.map(component => 
        component.id === id 
          ? { ...component, position: { x, y } } 
          : component
      )
    );
  };
  
  // Handle component removal
  const handleRemoveComponent = (id: string) => {
    // First remove any connections involving this component
    setConnections(prev => 
      prev.filter(conn => conn.fromId !== id && conn.toId !== id)
    );
    
    // Then remove the component
    setComponents(prev => prev.filter(component => component.id !== id));
    
    // Clear selection if the removed component was selected
    if (selectedComponentId === id) {
      setSelectedComponentId(null);
    }
  };
  
  // Handle connection creation
  const handleConnect = (fromId: string, toId: string) => {
    // Prevent self-connections
    if (fromId === toId) {
      setConnectingFrom(null);
      return;
    }
    
    // Check if connection already exists
    const connectionExists = connections.some(
      conn => conn.fromId === fromId && conn.toId === toId
    );
    
    if (connectionExists) {
      toast({
        title: "Connection exists",
        description: "These components are already connected",
        variant: "destructive",
      });
      setConnectingFrom(null);
      return;
    }
    
    // Create new connection
    const newConnection: StrategyConnection = {
      id: uuidv4(),
      fromId,
      toId,
    };
    
    setConnections(prev => [...prev, newConnection]);
    setConnectingFrom(null);
  };
  
  // Handle connection removal
  const handleRemoveConnection = (id: string) => {
    setConnections(prev => prev.filter(conn => conn.id !== id));
  };
  
  // Start connecting mode
  const handleStartConnecting = (id: string) => {
    setConnectingFrom(id);
    setSelectedComponentId(null);
  };
  
  // Clear canvas
  const handleClearCanvas = () => {
    setComponents([]);
    setConnections([]);
    setSelectedComponentId(null);
    setConnectingFrom(null);
  };
  
  // Save strategy
  const handleSaveStrategy = () => {
    if (components.length === 0) {
      toast({
        title: "Cannot save empty strategy",
        description: "Add components to your strategy before saving",
        variant: "destructive",
      });
      return;
    }
    
    const strategy = {
      name: strategyName,
      components,
      connections,
    };
    
    // Here you would normally send this to the server
    console.log('Saving strategy:', strategy);
    
    toast({
      title: "Strategy saved",
      description: `${strategyName} has been saved successfully`,
    });
  };
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center p-4 bg-neutral-900 border-b border-neutral-800">
        <div className="flex items-center space-x-4">
          <Input
            value={strategyName}
            onChange={(e) => setStrategyName(e.target.value)}
            className="w-64 bg-neutral-800 border-neutral-700"
          />
          <div className="text-sm text-neutral-400">
            {components.length} Components | {connections.length} Connections
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleClearCanvas}>
            Clear Canvas
          </Button>
          <Button onClick={handleSaveStrategy}>
            Save Strategy
          </Button>
        </div>
      </div>
      
      <div className="flex flex-1 min-h-0">
        {/* Component Library */}
        <div className="w-64 border-r border-neutral-800 bg-neutral-900 flex flex-col">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="indicators">Indicators</TabsTrigger>
              <TabsTrigger value="signals">Signals</TabsTrigger>
              <TabsTrigger value="more">More</TabsTrigger>
            </TabsList>
            
            <ScrollArea className="flex-1 h-full p-4">
              <TabsContent value="indicators" className="space-y-2 mt-0">
                {getComponentsByType('indicator').map((component) => (
                  <DraggableComponent
                    key={component.name}
                    type={component.type}
                    name={component.name}
                    icon={component.icon}
                    bgColor={component.bgColor}
                    description={component.description}
                    parameters={getDefaultParameters(component.type, component.name)}
                  />
                ))}
              </TabsContent>
              
              <TabsContent value="signals" className="space-y-2 mt-0">
                {getComponentsByType('buy-signal').concat(getComponentsByType('sell-signal')).map((component) => (
                  <DraggableComponent
                    key={component.name}
                    type={component.type}
                    name={component.name}
                    icon={component.icon}
                    bgColor={component.bgColor}
                    description={component.description}
                    parameters={getDefaultParameters(component.type, component.name)}
                  />
                ))}
              </TabsContent>
              
              <TabsContent value="more" className="space-y-2 mt-0">
                {getComponentsByType('filter').concat(getComponentsByType('logic')).map((component) => (
                  <DraggableComponent
                    key={component.name}
                    type={component.type}
                    name={component.name}
                    icon={component.icon}
                    bgColor={component.bgColor}
                    description={component.description}
                    parameters={getDefaultParameters(component.type, component.name)}
                  />
                ))}
              </TabsContent>
            </ScrollArea>
          </Tabs>
          
          {/* Status Bar */}
          <div className="p-2 border-t border-neutral-800 text-xs text-neutral-400">
            {connectingFrom ? (
              <div className="flex items-center">
                <span className="mr-1 h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                Connecting... Click on a target component
              </div>
            ) : selectedComponentId ? (
              <div className="flex items-center">
                <span className="mr-1 h-2 w-2 rounded-full bg-blue-500"></span>
                Component selected
              </div>
            ) : (
              <div>Drag components to build your strategy</div>
            )}
          </div>
        </div>
        
        {/* Canvas */}
        <div 
          ref={(node) => {
            drop(node);
            if (node) {
              canvasRef.current = node;
            }
          }}
          className="flex-1 bg-neutral-950 relative overflow-auto p-4"
          onClick={() => {
            // Clear selection when clicking empty canvas
            if (connectingFrom) {
              setConnectingFrom(null);
            } else {
              setSelectedComponentId(null);
            }
          }}
        >
          {/* Connection lines */}
          <ConnectionLines 
            connections={connections} 
            components={components} 
            onRemoveConnection={handleRemoveConnection} 
          />
          
          {/* Components */}
          {components.map((component) => (
            <CanvasComponent
              key={component.id}
              component={component}
              onRemove={handleRemoveComponent}
              onSelect={handleSelectComponent}
              onPositionChange={handlePositionChange}
              onConnect={handleConnect}
              isSelected={selectedComponentId === component.id}
              connectingFrom={connectingFrom}
            />
          ))}
          
          {/* Canvas guide */}
          {components.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center text-neutral-500 pointer-events-none">
              <div className="text-center">
                <i className="fas fa-chart-line text-3xl mb-2"></i>
                <p>Drag and drop components here to build your strategy</p>
              </div>
            </div>
          )}
        </div>
        
        {/* Properties Panel */}
        {selectedComponentId && (
          <div className="w-72 border-l border-neutral-800 bg-neutral-900 p-4">
            <Card className="bg-neutral-800 border-neutral-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Properties</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {components.find(c => c.id === selectedComponentId)?.parameters && 
                  Object.entries(components.find(c => c.id === selectedComponentId)!.parameters!).map(([key, value]) => (
                    <div key={key} className="space-y-1">
                      <label className="text-sm text-neutral-300">{key}</label>
                      <Input 
                        value={value.toString()}
                        onChange={(e) => {
                          const newValue = e.target.value;
                          setComponents(prev => 
                            prev.map(component => 
                              component.id === selectedComponentId 
                                ? { 
                                    ...component, 
                                    parameters: { 
                                      ...component.parameters!, 
                                      [key]: newValue 
                                    } 
                                  } 
                                : component
                            )
                          );
                        }}
                        className="bg-neutral-700 border-neutral-600"
                      />
                    </div>
                  ))
                }
                
                <div className="pt-2 space-y-2">
                  <Button 
                    onClick={() => handleStartConnecting(selectedComponentId)}
                    className="w-full"
                    variant="outline"
                  >
                    Connect to Another Component
                  </Button>
                  
                  <Button 
                    onClick={() => handleRemoveComponent(selectedComponentId)}
                    className="w-full"
                    variant="destructive"
                  >
                    Remove Component
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}