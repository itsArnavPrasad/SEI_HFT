import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { useIsMobile } from '@/hooks/use-mobile';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  const [location] = useLocation();

  useEffect(() => {
    // Close sidebar when route changes on mobile
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [location, isMobile]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const getNavLinkClass = (path: string) => {
    const isActive = location === path;
    
    return `flex items-center px-4 py-2.5 text-sm font-medium rounded-lg ${
      isActive 
        ? 'bg-primary/20 text-primary-foreground' 
        : 'text-neutral-300 hover:bg-neutral-700'
    } group`;
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar Overlay */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 z-10 bg-black/50"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-20 w-64 transform transition-transform duration-300 ease-in-out bg-neutral-800 border-r border-neutral-700 md:relative ${
          sidebarOpen || !isMobile ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-4 border-b border-neutral-700">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <i className="fas fa-bolt-lightning text-white"></i>
              </div>
              <h1 className="text-xl font-bold text-white">DeTrade</h1>
            </div>
            <button 
              className="md:hidden text-neutral-400 hover:text-white"
              onClick={() => setSidebarOpen(false)}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 overflow-y-auto">
            <div className="space-y-1">
              <Link href="/" className={getNavLinkClass('/')}>
                <i className={`fas fa-chart-line mr-3 ${location === '/' ? 'text-primary-foreground' : 'text-neutral-400 group-hover:text-white'}`}></i>
                <span>Dashboard</span>
              </Link>
              
              <Link href="/strategy-builder" className={getNavLinkClass('/strategy-builder')}>
                <i className={`fas fa-puzzle-piece mr-3 ${location === '/strategy-builder' ? 'text-primary-foreground' : 'text-neutral-400 group-hover:text-white'}`}></i>
                <span>Strategy Builder</span>
              </Link>
              
              <Link href="/simulation" className={getNavLinkClass('/simulation')}>
                <i className={`fas fa-play-circle mr-3 ${location === '/simulation' ? 'text-primary-foreground' : 'text-neutral-400 group-hover:text-white'}`}></i>
                <span>Simulation</span>
              </Link>
              
              <Link href="/learn" className={getNavLinkClass('/learn')}>
                <i className={`fas fa-book-open mr-3 ${location === '/learn' ? 'text-primary-foreground' : 'text-neutral-400 group-hover:text-white'}`}></i>
                <span>Learn</span>
              </Link>
              
              <Link href="/dex-integration" className={getNavLinkClass('/dex-integration')}>
                <i className={`fas fa-exchange-alt mr-3 ${location === '/dex-integration' ? 'text-primary-foreground' : 'text-neutral-400 group-hover:text-white'}`}></i>
                <span>DEX Integration</span>
              </Link>
            </div>
            
            <div className="mt-10">
              <h3 className="px-4 text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                My Strategies
              </h3>
              <div className="mt-2 space-y-1">
                <a href="#" className="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg text-neutral-300 hover:bg-neutral-700 group">
                  <span className="w-2 h-2 mr-3 bg-green-500 rounded-full"></span>
                  <span>BTC Momentum</span>
                </a>
                <a href="#" className="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg text-neutral-300 hover:bg-neutral-700 group">
                  <span className="w-2 h-2 mr-3 bg-yellow-500 rounded-full"></span>
                  <span>ETH-SOL Arbitrage</span>
                </a>
                <a href="#" className="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg text-neutral-300 hover:bg-neutral-700 group">
                  <span className="w-2 h-2 mr-3 bg-red-500 rounded-full"></span>
                  <span>SEI Market Making</span>
                </a>
              </div>
            </div>
          </nav>
          
          {/* User Profile */}
          <div className="p-4 border-t border-neutral-700">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-primary-dark flex items-center justify-center text-white font-semibold">
                  JD
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-white">Demo User</p>
                <p className="text-xs text-neutral-400">Connect Wallet</p>
              </div>
              <div className="ml-auto">
                <button className="text-neutral-400 hover:text-white">
                  <i className="fas fa-cog"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-neutral-900">
        {/* Mobile Header */}
        <div className="md:hidden bg-neutral-800 border-b border-neutral-700 p-4 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <button 
              className="text-neutral-400 hover:text-white"
              onClick={toggleSidebar}
            >
              <i className="fas fa-bars"></i>
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <i className="fas fa-bolt-lightning text-white"></i>
              </div>
              <h1 className="text-xl font-bold text-white">DeTrade</h1>
            </div>
            <div>
              <button className="text-neutral-400 hover:text-white">
                <i className="fas fa-bell"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Page Content */}
        {children}
        
        {/* Footer */}
        <footer className="bg-neutral-800 border-t border-neutral-700 py-4 px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between text-neutral-400 text-sm">
            <div className="mb-2 md:mb-0">
              <span>© {new Date().getFullYear()} DeTrade | Built for SEI All-Star College Hackathon</span>
            </div>
            <div className="flex items-center space-x-4">
              <a href="#" className="hover:text-white transition-colors duration-200">Terms</a>
              <a href="#" className="hover:text-white transition-colors duration-200">Privacy</a>
              <a href="#" className="hover:text-white transition-colors duration-200">Docs</a>
              <a href="#" className="hover:text-white transition-colors duration-200">Support</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
