import React, { useState } from 'react';

interface BarDataPoint {
  label: string;
  value: number;
  color?: string;
}

interface BarChartProps {
  data: BarDataPoint[];
  height?: number;
  title?: string;
  formatValue?: (v: number) => string;
  barColor?: string;
  horizontal?: boolean;
}

const BarChart: React.FC<BarChartProps> = ({
  data,
  height = 280,
  title,
  formatValue = (v) => v.toLocaleString(),
  barColor = '#3b82f6',
  horizontal = false,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (horizontal) {
    const maxVal = Math.max(...data.map((d) => d.value));

    return (
      <div className="card p-6">
        {title && <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3">{title}</h3>}
        <div className="space-y-3">
          {data.map((item, i) => (
            <div
              key={i}
              className="group cursor-pointer"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-700 dark:text-gray-300 font-medium">{item.label}</span>
                <span className="text-gray-500 dark:text-gray-400 tabular-nums">{formatValue(item.value)}</span>
              </div>
              <div className="w-full h-6 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: `${(item.value / maxVal) * 100}%`,
                    backgroundColor: item.color || barColor,
                    opacity: hoveredIndex === null || hoveredIndex === i ? 1 : 0.4,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Vertical bars
  const padding = { top: 20, right: 20, bottom: 50, left: 50 };
  const chartWidth = 700;
  const chartHeight = height;
  const innerW = chartWidth - padding.left - padding.right;
  const innerH = chartHeight - padding.top - padding.bottom;
  const maxVal = Math.max(...data.map((d) => d.value));

  const barWidth = Math.min(40, (innerW / data.length) * 0.6);
  const gap = innerW / data.length;

  // Y-axis ticks
  const tickCount = 5;
  const ticks = Array.from({ length: tickCount }, (_, i) => Math.round((maxVal * i) / (tickCount - 1)));

  return (
    <div className="card p-6">
      {title && <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3">{title}</h3>}
      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full" style={{ minWidth: 350 }}>
          <defs>
            {data.map((d, i) => (
              <linearGradient key={i} id={`barGrad${i}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={d.color || barColor} stopOpacity={1} />
                <stop offset="100%" stopColor={d.color || barColor} stopOpacity={0.7} />
              </linearGradient>
            ))}
          </defs>

          {/* Grid */}
          {ticks.map((tick, i) => {
            const y = padding.top + innerH - (tick / maxVal) * innerH;
            return (
              <g key={i}>
                <line
                  x1={padding.left}
                  y1={y}
                  x2={chartWidth - padding.right}
                  y2={y}
                  stroke="currentColor"
                  className="text-gray-200 dark:text-gray-800"
                  strokeDasharray="4 4"
                  strokeWidth={1}
                />
                <text x={padding.left - 8} y={y + 4} textAnchor="end" fontSize={11} fill="currentColor" className="text-gray-400 dark:text-gray-500">
                  {formatValue(tick)}
                </text>
              </g>
            );
          })}

          {/* Bars */}
          {data.map((d, i) => {
            const x = padding.left + i * gap + (gap - barWidth) / 2;
            const barHeight = (d.value / maxVal) * innerH;
            const y = padding.top + innerH - barHeight;

            return (
              <g
                key={i}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="cursor-pointer"
              >
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  rx={4}
                  fill={`url(#barGrad${i})`}
                  opacity={hoveredIndex === null || hoveredIndex === i ? 1 : 0.4}
                  className="transition-opacity duration-200"
                />
                {/* Hover value */}
                {hoveredIndex === i && (
                  <>
                    <rect x={x + barWidth / 2 - 35} y={y - 28} width={70} height={22} rx={6} className="fill-gray-900 dark:fill-gray-100" />
                    <text x={x + barWidth / 2} y={y - 13} textAnchor="middle" fontSize={11} fontWeight={600} className="fill-white dark:fill-gray-900">
                      {formatValue(d.value)}
                    </text>
                  </>
                )}
                {/* X label */}
                <text x={x + barWidth / 2} y={chartHeight - 10} textAnchor="middle" fontSize={11} fill="currentColor" className="text-gray-400 dark:text-gray-500">
                  {d.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export default BarChart;
