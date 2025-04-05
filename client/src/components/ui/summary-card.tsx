import { SummaryCardData } from '@/lib/types';

interface SummaryCardProps {
  data: SummaryCardData;
}

export function SummaryCard({ data }: SummaryCardProps) {
  const { title, value, change, status, isPositive, icon, iconBg } = data;
  
  return (
    <div className="bg-neutral-800 rounded-xl shadow-lg p-5 border border-neutral-700">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-neutral-400">{title}</p>
          <h3 className={`mt-1 text-2xl font-semibold ${isPositive === true ? 'text-green-500' : isPositive === false ? 'text-red-500' : 'text-white'}`}>
            {value}
          </h3>
          {(change || status) && (
            <div className={`mt-1 inline-flex items-center text-xs font-medium ${isPositive === true ? 'text-green-500' : isPositive === false ? 'text-red-500' : 'text-green-500'}`}>
              {isPositive !== undefined && (
                <i className={`fas fa-arrow-${isPositive ? 'up' : 'down'} mr-1`}></i>
              )}
              {status && (
                <span className={`${status === 'Optimal' ? 'animate-pulse' : ''} mr-1 h-2 w-2 bg-green-500 rounded-full`}></span>
              )}
              <span>{change || status}</span>
            </div>
          )}
        </div>
        <div className={`p-2 ${iconBg} rounded-lg`}>
          <i className={`${icon} text-primary-light`}></i>
        </div>
      </div>
    </div>
  );
}
