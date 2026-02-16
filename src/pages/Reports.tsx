import React, { useState, useMemo } from 'react';
import { Calendar } from 'lucide-react';
import PieChart from '../components/PieChart';
import BarChart from '../components/BarChart';
import LineChart from '../components/LineChart';
import { chapterStats, programStats, engagementData } from '../data/mockData';

const dateRanges = ['Last 7 days', 'Last 14 days', 'Last 30 days', 'Last 90 days'] as const;

const Reports: React.FC = () => {
  const [selectedRange, setSelectedRange] = useState<string>('Last 30 days');

  // Filter engagement data based on selected range
  const filteredEngagement = useMemo(() => {
    const days =
      selectedRange === 'Last 7 days'
        ? 7
        : selectedRange === 'Last 14 days'
        ? 14
        : selectedRange === 'Last 90 days'
        ? 30
        : 30;
    return engagementData.slice(-days);
  }, [selectedRange]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Reports</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Membership data and program performance.</p>
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

      {/* Daily active members chart */}
      <LineChart
        title="Daily Active Members"
        data={filteredEngagement.map((d) => ({ label: d.date, value: d.activeMembers }))}
        primaryColor="#3b82f6"
        formatValue={(v) => v.toLocaleString()}
      />

      {/* Two-column row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PieChart
          title="Chapter Distribution"
          data={chapterStats.map((c) => ({
            label: c.name,
            value: c.share,
            color: c.color,
          }))}
        />
        <BarChart
          title="Programs by Enrollment"
          data={programStats.slice(0, 6).map((p) => ({
            label: p.program,
            value: p.enrolled,
            color: '#3b82f6',
          }))}
          formatValue={(v) => v.toLocaleString()}
        />
      </div>

      {/* Program performance table */}
      <div className="card overflow-hidden">
        <div className="p-6 pb-4">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">Program Performance</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-t border-b border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30">
                <th className="px-6 py-3 text-left font-medium text-gray-500 dark:text-gray-400">Program</th>
                <th className="px-6 py-3 text-left font-medium text-gray-500 dark:text-gray-400">Enrolled</th>
                <th className="px-6 py-3 text-left font-medium text-gray-500 dark:text-gray-400">Completed</th>
                <th className="px-6 py-3 text-left font-medium text-gray-500 dark:text-gray-400">Avg. Rating</th>
                <th className="px-6 py-3 text-left font-medium text-gray-500 dark:text-gray-400">Completion Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {programStats.map((p, i) => (
                <tr key={i} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                  <td className="px-6 py-3.5 font-medium text-primary-600 dark:text-primary-400">{p.program}</td>
                  <td className="px-6 py-3.5 text-gray-700 dark:text-gray-300 tabular-nums">{p.enrolled.toLocaleString()}</td>
                  <td className="px-6 py-3.5 text-gray-700 dark:text-gray-300 tabular-nums">{p.completed.toLocaleString()}</td>
                  <td className="px-6 py-3.5 text-gray-700 dark:text-gray-300">{p.avgRating}</td>
                  <td className="px-6 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-primary-500"
                          style={{ width: `${p.completionRate}%` }}
                        />
                      </div>
                      <span className="text-gray-700 dark:text-gray-300 tabular-nums">{p.completionRate}%</span>
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
