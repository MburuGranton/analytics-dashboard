import React from 'react';
import { DollarSign, Users, ArrowUpRight, Activity } from 'lucide-react';
import MetricCard from '../components/MetricCard';
import LineChart from '../components/LineChart';
import BarChart from '../components/BarChart';
import { kpiMetrics, revenueData, trafficSources, recentActivity } from '../data/mockData';

const Overview: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-white">Overview</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
        <MetricCard
          title="Total Revenue"
          value={kpiMetrics.revenue.value}
          change={kpiMetrics.revenue.change}
          period={kpiMetrics.revenue.period}
          icon={DollarSign}
        />
        <MetricCard
          title="Total Users"
          value={kpiMetrics.users.value}
          change={kpiMetrics.users.change}
          period={kpiMetrics.users.period}
          icon={Users}
        />
        <MetricCard
          title="Conversion Rate"
          value={kpiMetrics.conversion.value}
          change={kpiMetrics.conversion.change}
          period={kpiMetrics.conversion.period}
          icon={ArrowUpRight}
        />
        <MetricCard
          title="Bounce Rate"
          value={kpiMetrics.bounceRate.value}
          change={kpiMetrics.bounceRate.change}
          period={kpiMetrics.bounceRate.period}
          icon={Activity}
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <LineChart
            title="Revenue Trend"
            data={revenueData.map((d) => ({
              label: d.month,
              value: d.revenue,
              secondaryValue: d.previousRevenue,
            }))}
            showSecondary
            formatValue={(v) => `$${(v / 1000).toFixed(0)}k`}
          />
        </div>
        <div>
          <BarChart
            title="Traffic Sources"
            data={trafficSources.map((s) => ({
              label: s.source,
              value: s.visitors,
              color: s.color,
            }))}
            horizontal
            formatValue={(v) => v.toLocaleString()}
          />
        </div>
      </div>

      {/* Activity feed */}
      <div className="card p-6">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
        <div className="space-y-0">
          {recentActivity.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center gap-4 py-3 border-b border-gray-100 dark:border-gray-800 last:border-b-0"
            >
              <img
                src={activity.avatar}
                alt={activity.user}
                className="w-9 h-9 rounded-full shrink-0"
              />
              <div className="min-w-0 flex-1">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-medium text-gray-900 dark:text-white">{activity.user}</span>
                  {' '}{activity.action}{' '}
                  <span className="font-medium text-primary-600 dark:text-primary-400">{activity.target}</span>
                </p>
              </div>
              <span className="text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap shrink-0">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Overview;
