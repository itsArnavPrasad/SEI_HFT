import React from 'react';
import { LearningResourceData } from '@/lib/types';

export default function Learn() {
  const resources: LearningResourceData[] = [
    {
      id: '1',
      title: 'HFT Fundamentals',
      description: 'Learn the basics of high-frequency trading and key strategies.',
      icon: 'fas fa-graduation-cap',
      iconBg: 'bg-primary-dark',
      status: 'completed',
      progress: 100,
    },
    {
      id: '2',
      title: 'Arbitrage Strategies',
      description: 'Discover how to identify and execute arbitrage opportunities.',
      icon: 'fas fa-exchange-alt',
      iconBg: 'bg-primary-dark',
      status: 'completed',
      progress: 100,
    },
    {
      id: '3',
      title: 'Building with SEI',
      description: 'Learn how to leverage SEI blockchain for HFT strategies.',
      icon: 'fas fa-robot',
      iconBg: 'bg-secondary-dark',
      status: 'in-progress',
      progress: 65,
    },
    {
      id: '4',
      title: 'Advanced Technical Analysis',
      description: 'Master technical indicators for better trading decisions.',
      icon: 'fas fa-chart-area',
      iconBg: 'bg-neutral-700',
      status: 'locked',
      progress: 0,
    },
    {
      id: '5',
      title: 'AI in Algorithmic Trading',
      description: 'Explore AI and ML applications in trading strategies.',
      icon: 'fas fa-brain',
      iconBg: 'bg-neutral-700',
      status: 'locked',
      progress: 0,
    },
  ];

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
    <div className="p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Learning Resources</h2>
          <p className="mt-1 text-sm text-neutral-400">
            Educational materials to help you master high-frequency trading
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <div className="relative">
            <input 
              type="text" 
              className="pl-10 pr-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" 
              placeholder="Search resources..." 
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <i className="fas fa-search text-neutral-400"></i>
            </div>
          </div>
          <button className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg text-sm font-medium flex items-center">
            <i className="fas fa-certificate mr-2"></i>
            Certificates
          </button>
        </div>
      </div>

      {/* Course Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-neutral-800 rounded-xl shadow-lg p-5 border border-neutral-700">
          <div className="flex items-center">
            <div className="p-2 bg-primary-dark/30 rounded-lg">
              <i className="fas fa-bolt-lightning text-primary-light"></i>
            </div>
            <h3 className="ml-3 text-md font-semibold text-white">Getting Started</h3>
          </div>
          <p className="mt-2 text-sm text-neutral-400">Basics of crypto trading and the SEI blockchain</p>
          <div className="mt-3">
            <a href="#" className="text-sm text-primary hover:text-primary-light">View courses</a>
          </div>
        </div>
        
        <div className="bg-neutral-800 rounded-xl shadow-lg p-5 border border-neutral-700">
          <div className="flex items-center">
            <div className="p-2 bg-green-500/30 rounded-lg">
              <i className="fas fa-chart-line text-green-500"></i>
            </div>
            <h3 className="ml-3 text-md font-semibold text-white">Strategy Development</h3>
          </div>
          <p className="mt-2 text-sm text-neutral-400">Learn to create and optimize trading strategies</p>
          <div className="mt-3">
            <a href="#" className="text-sm text-primary hover:text-primary-light">View courses</a>
          </div>
        </div>
        
        <div className="bg-neutral-800 rounded-xl shadow-lg p-5 border border-neutral-700">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-500/30 rounded-lg">
              <i className="fas fa-code text-yellow-500"></i>
            </div>
            <h3 className="ml-3 text-md font-semibold text-white">Advanced Topics</h3>
          </div>
          <p className="mt-2 text-sm text-neutral-400">Dive into smart contracts and advanced techniques</p>
          <div className="mt-3">
            <a href="#" className="text-sm text-primary hover:text-primary-light">View courses</a>
          </div>
        </div>
      </div>

      {/* Course Listing */}
      <div className="bg-neutral-800 rounded-xl border border-neutral-700 overflow-hidden shadow-lg mb-6">
        <div className="px-4 py-3 bg-neutral-800 border-b border-neutral-700 flex justify-between items-center">
          <h3 className="text-sm font-medium text-neutral-300">All Courses</h3>
          <div className="text-xs text-neutral-400">
            <span>2/{resources.length} completed</span>
          </div>
        </div>
        <div className="divide-y divide-neutral-700">
          {resources.map((resource) => (
            <div key={resource.id} className="p-4 hover:bg-neutral-700/30">
              <div className="flex flex-col md:flex-row md:items-center">
                <div className="flex items-start flex-1">
                  <div className={`h-12 w-12 flex-shrink-0 ${resource.iconBg} rounded-lg flex items-center justify-center`}>
                    <i className={`${resource.icon} text-${resource.status === 'completed' ? 'primary' : resource.status === 'in-progress' ? 'secondary' : 'neutral'}-light text-xl`}></i>
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <h4 className="text-md font-medium text-white">{resource.title}</h4>
                        <p className="mt-1 text-sm text-neutral-400">
                          {resource.description}
                        </p>
                      </div>
                      <div className="mt-3 md:mt-0 flex items-center">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(resource.status)} mr-4`}>
                          {resource.status === 'completed' ? 'Completed' : 
                           resource.status === 'in-progress' ? 'In Progress' : 'Locked'}
                        </span>
                        <button 
                          className={`px-4 py-2 rounded-lg text-sm font-medium ${
                            resource.status === 'locked' 
                              ? 'bg-neutral-700 text-neutral-400 cursor-not-allowed' 
                              : 'bg-primary hover:bg-primary-dark text-white'
                          }`}
                          disabled={resource.status === 'locked'}
                        >
                          {resource.status === 'completed' ? 'Review' : 
                           resource.status === 'in-progress' ? 'Continue' : 'Start'}
                        </button>
                      </div>
                    </div>
                    <div className="mt-3 h-1 w-full bg-neutral-700 rounded-full overflow-hidden">
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
            </div>
          ))}
        </div>
      </div>
      
      {/* Featured Tutorial */}
      <div className="bg-neutral-800 rounded-xl border border-neutral-700 overflow-hidden shadow-lg mb-6">
        <div className="px-4 py-3 bg-neutral-800 border-b border-neutral-700">
          <h3 className="text-sm font-medium text-neutral-300">Featured Tutorial</h3>
        </div>
        <div className="p-6">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/2 lg:pr-6">
              <h3 className="text-xl font-semibold text-white mb-3">Building Your First SEI HFT Strategy</h3>
              <p className="text-neutral-300 mb-4">
                Learn how to build, test, and deploy a high-frequency trading strategy on the SEI blockchain using our no-code strategy builder.
              </p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2"></i>
                  <span className="text-sm text-neutral-300">How to analyze market conditions</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2"></i>
                  <span className="text-sm text-neutral-300">Setting up buy and sell signals</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2"></i>
                  <span className="text-sm text-neutral-300">Risk management best practices</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2"></i>
                  <span className="text-sm text-neutral-300">Testing and optimizing your strategy</span>
                </div>
              </div>
              <button className="mt-6 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg text-sm font-medium transition-colors duration-200">
                Start Tutorial
              </button>
            </div>
            <div className="lg:w-1/2 mt-6 lg:mt-0 flex items-center justify-center">
              <div className="w-full h-64 bg-neutral-900 rounded-lg border border-neutral-700 flex items-center justify-center">
                <div className="text-center">
                  <i className="fas fa-play-circle text-5xl text-primary mb-3"></i>
                  <p className="text-sm text-neutral-400">Tutorial Video</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Community Resources */}
      <div className="bg-neutral-800 rounded-xl border border-neutral-700 overflow-hidden shadow-lg">
        <div className="px-4 py-3 bg-neutral-800 border-b border-neutral-700">
          <h3 className="text-sm font-medium text-neutral-300">Community Resources</h3>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a href="#" className="block p-4 bg-neutral-700/30 hover:bg-neutral-700/50 rounded-lg border border-neutral-700">
              <div className="flex items-start">
                <div className="p-2 bg-primary-dark/30 rounded-lg">
                  <i className="fas fa-users text-primary-light"></i>
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-white">SEI Developer Forum</h4>
                  <p className="mt-1 text-xs text-neutral-400">Connect with other developers building on SEI</p>
                </div>
              </div>
            </a>
            
            <a href="#" className="block p-4 bg-neutral-700/30 hover:bg-neutral-700/50 rounded-lg border border-neutral-700">
              <div className="flex items-start">
                <div className="p-2 bg-purple-500/30 rounded-lg">
                  <i className="fab fa-discord text-purple-500"></i>
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-white">Discord Community</h4>
                  <p className="mt-1 text-xs text-neutral-400">Join our Discord for real-time help and discussion</p>
                </div>
              </div>
            </a>
            
            <a href="#" className="block p-4 bg-neutral-700/30 hover:bg-neutral-700/50 rounded-lg border border-neutral-700">
              <div className="flex items-start">
                <div className="p-2 bg-blue-500/30 rounded-lg">
                  <i className="fab fa-twitter text-blue-500"></i>
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-white">Twitter Updates</h4>
                  <p className="mt-1 text-xs text-neutral-400">Follow us for the latest news and trading insights</p>
                </div>
              </div>
            </a>
            
            <a href="#" className="block p-4 bg-neutral-700/30 hover:bg-neutral-700/50 rounded-lg border border-neutral-700">
              <div className="flex items-start">
                <div className="p-2 bg-yellow-500/30 rounded-lg">
                  <i className="fas fa-book text-yellow-500"></i>
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-white">Documentation</h4>
                  <p className="mt-1 text-xs text-neutral-400">In-depth guides and API documentation</p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
