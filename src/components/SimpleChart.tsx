import React from 'react';

interface ChartData {
  [key: string]: string | number;
}

interface SimpleLineChartProps {
  data: ChartData[];
  xKey: string;
  lines: { key: string; color: string; name: string; dashed?: boolean }[];
  height?: number;
}

export function SimpleLineChart({ data, xKey, lines, height = 300 }: SimpleLineChartProps) {
  if (!data || data.length === 0) return null;

  const values = lines.flatMap(line => 
    data.map(d => typeof d[line.key] === 'number' ? d[line.key] as number : 0)
  );
  const maxValue = Math.max(...values);
  const minValue = Math.min(...values);
  const range = maxValue - minValue;

  const chartHeight = height - 60;
  const chartWidth = 100;

  const getYPosition = (value: number) => {
    return chartHeight - ((value - minValue) / range) * chartHeight;
  };

  return (
    <div className="w-full" style={{ height }}>
      <svg width="100%" height="100%" viewBox={`0 0 ${chartWidth + 20} ${height}`} preserveAspectRatio="none">
        {/* Grid lines */}
        {[0, 1, 2, 3, 4].map(i => {
          const y = (chartHeight / 4) * i + 10;
          return (
            <line
              key={i}
              x1="10"
              y1={y}
              x2={chartWidth + 10}
              y2={y}
              stroke="#e0e0e0"
              strokeDasharray="3,3"
            />
          );
        })}

        {/* Lines */}
        {lines.map((line, lineIdx) => {
          const points = data.map((d, i) => {
            const x = 10 + (i / (data.length - 1)) * chartWidth;
            const y = 10 + getYPosition(typeof d[line.key] === 'number' ? d[line.key] as number : 0);
            return `${x},${y}`;
          }).join(' ');

          return (
            <polyline
              key={lineIdx}
              points={points}
              fill="none"
              stroke={line.color}
              strokeWidth="2"
              strokeDasharray={line.dashed ? "5,5" : "0"}
            />
          );
        })}

        {/* X-axis labels */}
        {data.map((d, i) => {
          const x = 10 + (i / (data.length - 1)) * chartWidth;
          return (
            <text
              key={i}
              x={x}
              y={height - 5}
              textAnchor="middle"
              fontSize="10"
              fill="#666"
            >
              {String(d[xKey])}
            </text>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="flex gap-4 justify-center mt-2">
        {lines.map((line, idx) => (
          <div key={idx} className="flex items-center gap-2 text-sm">
            <div className="w-4 h-0.5" style={{ backgroundColor: line.color }} />
            <span>{line.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

interface SimpleBarChartProps {
  data: ChartData[];
  xKey: string;
  bars: { key: string; color: string; name: string }[];
  height?: number;
}

export function SimpleBarChart({ data, xKey, bars, height = 300 }: SimpleBarChartProps) {
  if (!data || data.length === 0) return null;

  const values = bars.flatMap(bar => 
    data.map(d => typeof d[bar.key] === 'number' ? d[bar.key] as number : 0)
  );
  const maxValue = Math.max(...values);

  return (
    <div className="w-full" style={{ height }}>
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
        {data.map((d, i) => {
          const barWidth = 80 / data.length / bars.length;
          const groupWidth = 80 / data.length;
          const groupX = 10 + (i * groupWidth);

          return bars.map((bar, barIdx) => {
            const value = typeof d[bar.key] === 'number' ? d[bar.key] as number : 0;
            const barHeight = (value / maxValue) * 70;
            const x = groupX + (barIdx * barWidth);
            const y = 80 - barHeight;

            return (
              <rect
                key={`${i}-${barIdx}`}
                x={x}
                y={y}
                width={barWidth * 0.8}
                height={barHeight}
                fill={bar.color}
                rx="1"
              />
            );
          });
        })}

        {/* X-axis labels */}
        {data.map((d, i) => {
          const x = 10 + (i * 80 / data.length) + (40 / data.length);
          return (
            <text
              key={i}
              x={x}
              y="95"
              textAnchor="middle"
              fontSize="8"
              fill="#666"
            >
              {String(d[xKey])}
            </text>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="flex gap-4 justify-center mt-2">
        {bars.map((bar, idx) => (
          <div key={idx} className="flex items-center gap-2 text-sm">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: bar.color }} />
            <span>{bar.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

interface SimplePieChartProps {
  data: { name: string; value: number; color: string }[];
  height?: number;
}

export function SimplePieChart({ data, height = 300 }: SimplePieChartProps) {
  if (!data || data.length === 0) return null;

  const total = data.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = -90;

  const centerX = 50;
  const centerY = 45;
  const radius = 30;

  return (
    <div className="w-full" style={{ height }}>
      <svg width="100%" height="100%" viewBox="0 0 100 100">
        {data.map((item, idx) => {
          const percentage = item.value / total;
          const angle = percentage * 360;
          const startAngle = currentAngle;
          const endAngle = currentAngle + angle;

          const startX = centerX + radius * Math.cos((startAngle * Math.PI) / 180);
          const startY = centerY + radius * Math.sin((startAngle * Math.PI) / 180);
          const endX = centerX + radius * Math.cos((endAngle * Math.PI) / 180);
          const endY = centerY + radius * Math.sin((endAngle * Math.PI) / 180);

          const largeArc = angle > 180 ? 1 : 0;

          const pathData = [
            `M ${centerX} ${centerY}`,
            `L ${startX} ${startY}`,
            `A ${radius} ${radius} 0 ${largeArc} 1 ${endX} ${endY}`,
            'Z'
          ].join(' ');

          // Label position
          const labelAngle = startAngle + angle / 2;
          const labelX = centerX + (radius * 0.7) * Math.cos((labelAngle * Math.PI) / 180);
          const labelY = centerY + (radius * 0.7) * Math.sin((labelAngle * Math.PI) / 180);

          currentAngle = endAngle;

          return (
            <g key={idx}>
              <path d={pathData} fill={item.color} />
              <text
                x={labelX}
                y={labelY}
                textAnchor="middle"
                fontSize="6"
                fill="white"
                fontWeight="bold"
              >
                {(percentage * 100).toFixed(0)}%
              </text>
            </g>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-2 px-4">
        {data.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2 text-sm">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="truncate">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
