import React from 'react';
import { TrendingUp, TrendingDown, LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  period: string;
  icon: LucideIcon;
  iconColor?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, period, icon: Icon, iconColor = 'text-primary-500' }) => {
  const isPositive = change > 0;
  // For bounce rate, negative change is good
  const isBounce = title.toLowerCase().includes('bounce');
  const isGood = isBounce ? !isPositive : isPositive;

  return (
    <div className="card p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
          <p className="text-3xl font-display font-bold text-gray-900 dark:text-white">{value}</p>
        </div>
        <div className={`p-3 rounded-xl bg-primary-50 dark:bg-primary-950/50 ${iconColor}`}>
          <Icon className="w-6 h-6" />
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
