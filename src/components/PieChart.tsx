import React, { useState } from 'react';

interface PieDataPoint {
  label: string;
  value: number;
  color: string;
}

interface PieChartProps {
  data: PieDataPoint[];
  title?: string;
  size?: number;
  donut?: boolean;
}

const PieChart: React.FC<PieChartProps> = ({ data, title, size = 220, donut = true }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const total = data.reduce((sum, d) => sum + d.value, 0);
  const cx = size / 2;
  const cy = size / 2;
  const outerR = size / 2 - 8;
  const innerR = donut ? outerR * 0.6 : 0;

  // Build slices as SVG arc paths
  let startAngle = -90; // Start from top

  const slices = data.map((d, i) => {
    const sliceAngle = (d.value / total) * 360;
    const endAngle = startAngle + sliceAngle;

    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    const x1Outer = cx + outerR * Math.cos(startRad);
    const y1Outer = cy + outerR * Math.sin(startRad);
    const x2Outer = cx + outerR * Math.cos(endRad);
    const y2Outer = cy + outerR * Math.sin(endRad);

    const x1Inner = cx + innerR * Math.cos(endRad);
    const y1Inner = cy + innerR * Math.sin(endRad);
    const x2Inner = cx + innerR * Math.cos(startRad);
    const y2Inner = cy + innerR * Math.sin(startRad);

    const largeArc = sliceAngle > 180 ? 1 : 0;

    const path = donut
      ? `M ${x1Outer} ${y1Outer} A ${outerR} ${outerR} 0 ${largeArc} 1 ${x2Outer} ${y2Outer} L ${x1Inner} ${y1Inner} A ${innerR} ${innerR} 0 ${largeArc} 0 ${x2Inner} ${y2Inner} Z`
      : `M ${cx} ${cy} L ${x1Outer} ${y1Outer} A ${outerR} ${outerR} 0 ${largeArc} 1 ${x2Outer} ${y2Outer} Z`;

    const midAngle = ((startAngle + endAngle) / 2) * (Math.PI / 180);

    const result = {
      path,
      color: d.color,
      label: d.label,
      value: d.value,
      percentage: ((d.value / total) * 100).toFixed(1),
      midAngle,
      index: i,
    };

    startAngle = endAngle;
    return result;
  });

  return (
    <div className="card p-6">
      {title && <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">{title}</h3>}
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div className="relative shrink-0">
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            {slices.map((slice, i) => (
              <path
                key={i}
                d={slice.path}
                fill={slice.color}
                stroke="white"
                strokeWidth={2}
                className="dark:stroke-gray-900 transition-all duration-200 cursor-pointer"
                opacity={hoveredIndex === null || hoveredIndex === i ? 1 : 0.4}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  transform: hoveredIndex === i ? `translate(${Math.cos(slice.midAngle) * 4}px, ${Math.sin(slice.midAngle) * 4}px)` : 'none',
                  transformOrigin: `${cx}px ${cy}px`,
                }}
              />
            ))}
            {/* Center text for donut */}
            {donut && hoveredIndex !== null && (
              <>
                <text x={cx} y={cy - 6} textAnchor="middle" fontSize={22} fontWeight={700} className="fill-gray-900 dark:fill-white font-display">
                  {slices[hoveredIndex].percentage}%
                </text>
                <text x={cx} y={cy + 14} textAnchor="middle" fontSize={11} className="fill-gray-500 dark:fill-gray-400">
                  {slices[hoveredIndex].label}
                </text>
              </>
            )}
            {donut && hoveredIndex === null && (
              <>
                <text x={cx} y={cy - 6} textAnchor="middle" fontSize={20} fontWeight={700} className="fill-gray-900 dark:fill-white">
                  {total.toLocaleString()}
                </text>
                <text x={cx} y={cy + 14} textAnchor="middle" fontSize={11} className="fill-gray-500 dark:fill-gray-400">
                  Total
                </text>
              </>
            )}
          </svg>
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-2 min-w-0">
          {data.map((d, i) => (
            <div
              key={i}
              className="flex items-center gap-2.5 cursor-pointer group"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <span className="w-3 h-3 rounded-sm shrink-0" style={{ backgroundColor: d.color }} />
              <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                {d.label}
              </span>
              <span className="text-sm text-gray-400 dark:text-gray-500 ml-auto tabular-nums">
                {((d.value / total) * 100).toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PieChart;
