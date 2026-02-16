import React, { useState, useMemo } from 'react';
import { Calendar } from 'lucide-react';
import PieChart from '../components/PieChart';
import BarChart from '../components/BarChart';
import LineChart from '../components/LineChart';
import { browserStats, pageStats, sessionData } from '../data/mockData';

const dateRanges = ['Last 7 days', 'Last 14 days', 'Last 30 days', 'Last 90 days'] as const;

const Reports: React.FC = () => {
  const [selectedRange, setSelectedRange] = useState<string>('Last 30 days');

  // Filter session data based on selected range
  const filteredSessions = useMemo(() => {
    const days =
      selectedRange === 'Last 7 days'
        ? 7
        : selectedRange === 'Last 14 days'
        ? 14
        : selectedRange === 'Last 90 days'
        ? 30
        : 30;
    return sessionData.slice(-days);
  }, [selectedRange]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-white">Reports</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Performance data and trends.</p>
        </div>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          <select
            value={selectedRange}
            onChange={(e) => setSelectedRange(e.target.value)}
            className="pl-9 pr-8 py-2 text-sm bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 dark:text-gray-200 appearance-none cursor-pointer"
          >
            {dateRanges.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Sessions chart */}
      <LineChart
        title="Sessions Over Time"
        data={filteredSessions.map((d) => ({ label: d.date, value: d.sessions }))}
        primaryColor="#3b82f6"
        formatValue={(v) => v.toLocaleString()}
      />

      {/* Two-column row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PieChart
          title="Browser Distribution"
          data={browserStats.map((b) => ({
            label: b.name,
            value: b.share,
            color: b.color,
          }))}
        />
        <BarChart
          title="Top Pages by Views"
          data={pageStats.slice(0, 6).map((p) => ({
            label: p.page,
            value: p.views,
            color: '#3b82f6',
          }))}
          formatValue={(v) => v.toLocaleString()}
        />
      </div>

      {/* Page stats table */}
      <div className="card overflow-hidden">
        <div className="p-6 pb-4">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">Page Performance</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-t border-b border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30">
                <th className="px-6 py-3 text-left font-medium text-gray-500 dark:text-gray-400">Page</th>
                <th className="px-6 py-3 text-left font-medium text-gray-500 dark:text-gray-400">Views</th>
                <th className="px-6 py-3 text-left font-medium text-gray-500 dark:text-gray-400">Unique Visitors</th>
                <th className="px-6 py-3 text-left font-medium text-gray-500 dark:text-gray-400">Avg. Time</th>
                <th className="px-6 py-3 text-left font-medium text-gray-500 dark:text-gray-400">Bounce Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {pageStats.map((p, i) => (
                <tr key={i} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                  <td className="px-6 py-3.5 font-medium text-primary-600 dark:text-primary-400">{p.page}</td>
                  <td className="px-6 py-3.5 text-gray-700 dark:text-gray-300 tabular-nums">{p.views.toLocaleString()}</td>
                  <td className="px-6 py-3.5 text-gray-700 dark:text-gray-300 tabular-nums">{p.uniqueVisitors.toLocaleString()}</td>
                  <td className="px-6 py-3.5 text-gray-700 dark:text-gray-300">{p.avgTime}</td>
                  <td className="px-6 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            p.bounceRate < 30
                              ? 'bg-emerald-500'
                              : p.bounceRate < 45
                              ? 'bg-amber-500'
                              : 'bg-red-500'
                          }`}
                          style={{ width: `${p.bounceRate}%` }}
                        />
                      </div>
                      <span className="text-gray-700 dark:text-gray-300 tabular-nums">{p.bounceRate}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;
