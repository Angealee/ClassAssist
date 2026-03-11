import React from 'react';

interface AttendanceRateGaugeProps {
  rate: number; // 0–100
  weeklyRates: number[];
}

const AttendanceRateGauge: React.FC<AttendanceRateGaugeProps> = ({ rate, weeklyRates }) => {
  // SVG arc gauge params
  const R = 54;
  const cx = 70;
  const cy = 70;
  const circumference = Math.PI * R; // half-circle arc length
  const progress = (rate / 100) * circumference;

  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const today = new Date().getDay(); // 0=Sun
  // Remap so Monday=0
  const todayIdx = today === 0 ? 6 : today - 1;

  const color =
    rate >= 85 ? '#10b981' :
    rate >= 70 ? '#f59e0b' :
    '#ef4444';

  return (
    <div className="rounded-2xl bg-white ring-1 ring-slate-200 p-5 shadow-sm">
      <p className="text-xs font-medium text-slate-500 uppercase tracking-widest mb-4">Attendance Rate</p>

      {/* Gauge */}
      <div className="flex flex-col items-center">
        <svg viewBox="0 0 140 80" className="w-40 h-24">
          {/* Track arc */}
          <path
            d={`M ${cx - R} ${cy} A ${R} ${R} 0 0 1 ${cx + R} ${cy}`}
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="12"
            strokeLinecap="round"
          />
          {/* Progress arc */}
          <path
            d={`M ${cx - R} ${cy} A ${R} ${R} 0 0 1 ${cx + R} ${cy}`}
            fill="none"
            stroke={color}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={`${progress} ${circumference}`}
            style={{ transition: 'stroke-dasharray 0.8s ease' }}
          />
          {/* Label */}
          <text x={cx} y={cy - 4} textAnchor="middle" className="font-bold" fontSize="22" fill="#1e293b" fontWeight="700">
            {rate}%
          </text>
          <text x={cx} y={cy + 14} textAnchor="middle" fontSize="9" fill="#94a3b8">
            this week
          </text>
        </svg>
      </div>

      {/* Weekly sparkline bars */}
      <div className="flex items-end justify-between gap-1 mt-3 px-1">
        {weeklyRates.map((r, i) => (
          <div key={i} className="flex flex-col items-center gap-1 flex-1">
            <div className="w-full rounded-sm" style={{
              height: `${Math.max(4, (r / 100) * 32)}px`,
              background: i === todayIdx ? color : r === 0 ? '#f1f5f9' : '#cbd5e1',
              transition: 'height 0.5s ease',
            }} />
            <span className={`text-[9px] font-medium ${i === todayIdx ? 'text-slate-800' : 'text-slate-400'}`}>
              {days[i]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttendanceRateGauge;