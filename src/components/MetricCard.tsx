import React from 'react';
import { TrendingUp, TrendingDown, LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  period: string;
  icon: LucideIcon;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, period, icon: Icon }) => {
  const isPositive = change > 0;
  // For bounce rate, negative change is good
  const isBounce = title.toLowerCase().includes('bounce');
  const isGood = isBounce ? !isPositive : isPositive;

  return (
    <div className="card p-6">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
        </div>
        <div className="p-2.5 rounded-lg bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400">
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2">
        <span
          className={`inline-flex items-center gap-1 text-sm font-semibold ${
            isGood ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
          }`}
        >
          {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          {Math.abs(change)}%
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400">{period}</span>
      </div>
    </div>
  );
};

export default MetricCard;
