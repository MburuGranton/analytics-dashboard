import React, { useState } from 'react';

interface DataPoint {
  label: string;
  value: number;
  secondaryValue?: number;
}

interface LineChartProps {
  data: DataPoint[];
  height?: number;
  primaryColor?: string;
  secondaryColor?: string;
  showSecondary?: boolean;
  title?: string;
  formatValue?: (v: number) => string;
}

const LineChart: React.FC<LineChartProps> = ({
  data,
  height = 280,
  primaryColor = '#6366f1',
  secondaryColor = '#c4b5fd',
  showSecondary = false,
  title,
  formatValue = (v) => `$${(v / 1000).toFixed(0)}k`,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const padding = { top: 20, right: 20, bottom: 40, left: 50 };
  const chartWidth = 700;
  const chartHeight = height;
  const innerW = chartWidth - padding.left - padding.right;
  const innerH = chartHeight - padding.top - padding.bottom;

  const allValues = data.flatMap((d) => [d.value, ...(d.secondaryValue !== undefined ? [d.secondaryValue] : [])]);
  const maxVal = Math.max(...allValues) * 1.1;
  const minVal = Math.min(...allValues) * 0.9;
  const range = maxVal - minVal || 1;

  const xStep = innerW / (data.length - 1);

  const toX = (i: number) => padding.left + i * xStep;
  const toY = (v: number) => padding.top + innerH - ((v - minVal) / range) * innerH;

  const buildPath = (key: 'value' | 'secondaryValue') => {
    return data
      .map((d, i) => {
        const val = key === 'secondaryValue' ? d.secondaryValue ?? 0 : d.value;
        const x = toX(i);
        const y = toY(val);
        return `${i === 0 ? 'M' : 'L'}${x},${y}`;
      })
      .join(' ');
  };

  const buildAreaPath = (key: 'value' | 'secondaryValue') => {
    const line = buildPath(key);
    const lastX = toX(data.length - 1);
    const firstX = toX(0);
    const bottomY = padding.top + innerH;
    return `${line} L${lastX},${bottomY} L${firstX},${bottomY} Z`;
  };

  // Y-axis ticks
  const tickCount = 5;
  const ticks = Array.from({ length: tickCount }, (_, i) => {
    const val = minVal + (range * i) / (tickCount - 1);
    return val;
  });

  return (
    <div className="card p-6">
      {title && <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">{title}</h3>}
      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full" style={{ minWidth: 400 }}>
          <defs>
            <linearGradient id="primaryGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={primaryColor} stopOpacity={0.2} />
              <stop offset="100%" stopColor={primaryColor} stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="secondaryGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={secondaryColor} stopOpacity={0.15} />
              <stop offset="100%" stopColor={secondaryColor} stopOpacity={0.02} />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {ticks.map((tick, i) => (
            <g key={i}>
              <line
                x1={padding.left}
                y1={toY(tick)}
                x2={chartWidth - padding.right}
                y2={toY(tick)}
                stroke="currentColor"
                className="text-gray-200 dark:text-gray-800"
                strokeDasharray="4 4"
                strokeWidth={1}
              />
              <text
                x={padding.left - 8}
                y={toY(tick) + 4}
                textAnchor="end"
                className="text-gray-400 dark:text-gray-500"
                fontSize={11}
                fill="currentColor"
              >
                {formatValue(tick)}
              </text>
            </g>
          ))}

          {/* Secondary area + line */}
          {showSecondary && (
            <>
              <path d={buildAreaPath('secondaryValue')} fill="url(#secondaryGrad)" />
              <path d={buildPath('secondaryValue')} fill="none" stroke={secondaryColor} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            </>
          )}

          {/* Primary area + line */}
          <path d={buildAreaPath('value')} fill="url(#primaryGrad)" />
          <path d={buildPath('value')} fill="none" stroke={primaryColor} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />

          {/* Data points */}
          {data.map((d, i) => (
            <g key={i}>
              <circle cx={toX(i)} cy={toY(d.value)} r={hoveredIndex === i ? 5 : 3} fill={primaryColor} stroke="white" strokeWidth={2} className="transition-all duration-150 cursor-pointer" />
              {/* Hover area */}
              <rect
                x={toX(i) - xStep / 2}
                y={padding.top}
                width={xStep}
                height={innerH}
                fill="transparent"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="cursor-pointer"
              />
            </g>
          ))}

          {/* X-axis labels */}
          {data.map((d, i) => (
            <text
              key={i}
              x={toX(i)}
              y={chartHeight - 8}
              textAnchor="middle"
              className="text-gray-400 dark:text-gray-500"
              fontSize={11}
              fill="currentColor"
            >
              {d.label}
            </text>
          ))}

          {/* Tooltip */}
          {hoveredIndex !== null && (
            <g>
              <line
                x1={toX(hoveredIndex)}
                y1={padding.top}
                x2={toX(hoveredIndex)}
                y2={padding.top + innerH}
                stroke={primaryColor}
                strokeDasharray="4 4"
                strokeWidth={1}
                opacity={0.5}
              />
              <rect
                x={toX(hoveredIndex) - 45}
                y={toY(data[hoveredIndex].value) - 32}
                width={90}
                height={24}
                rx={6}
                className="fill-gray-900 dark:fill-gray-100"
              />
              <text
                x={toX(hoveredIndex)}
                y={toY(data[hoveredIndex].value) - 16}
                textAnchor="middle"
                fontSize={12}
                fontWeight={600}
                className="fill-white dark:fill-gray-900"
              >
                {formatValue(data[hoveredIndex].value)}
              </text>
            </g>
          )}
        </svg>
      </div>
      {showSecondary && (
        <div className="flex items-center gap-6 mt-3 ml-12">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: primaryColor }} />
            <span className="text-xs text-gray-500 dark:text-gray-400">Current</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: secondaryColor }} />
            <span className="text-xs text-gray-500 dark:text-gray-400">Previous</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LineChart;
