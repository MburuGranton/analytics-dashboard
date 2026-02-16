import React from 'react';
import { Users, Activity, Calendar, ArrowUpRight } from 'lucide-react';
import MetricCard from '../components/MetricCard';
import LineChart from '../components/LineChart';
import BarChart from '../components/BarChart';
import { kpiMetrics, membershipData, acquisitionChannels, recentActivity } from '../data/mockData';

const Overview: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Overview</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
        <MetricCard
          title="Total Members"
          value={kpiMetrics.totalMembers.value}
          change={kpiMetrics.totalMembers.change}
          period={kpiMetrics.totalMembers.period}
          icon={Users}
        />
        <MetricCard
          title="Active Members"
          value={kpiMetrics.activeMembers.value}
          change={kpiMetrics.activeMembers.change}
          period={kpiMetrics.activeMembers.period}
          icon={Activity}
        />
        <MetricCard
          title="Events Held"
          value={kpiMetrics.eventsHeld.value}
          change={kpiMetrics.eventsHeld.change}
          period={kpiMetrics.eventsHeld.period}
          icon={Calendar}
        />
        <MetricCard
          title="Retention Rate"
          value={kpiMetrics.retentionRate.value}
          change={kpiMetrics.retentionRate.change}
          period={kpiMetrics.retentionRate.period}
          icon={ArrowUpRight}
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <LineChart
            title="Membership Growth"
            data={membershipData.map((d) => ({
              label: d.month,
              value: d.members,
              secondaryValue: d.previousMembers,
            }))}
            showSecondary
            formatValue={(v) => v.toLocaleString()}
          />
        </div>
        <div>
          <BarChart
            title="Acquisition Channels"
            data={acquisitionChannels.map((s) => ({
              label: s.source,
              value: s.members,
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
