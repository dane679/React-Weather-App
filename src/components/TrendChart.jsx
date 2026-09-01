import './TrendChart.css';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from 'recharts';
import { convertTemp } from '../utils/convertUnits';

const CustomTooltip = ({ active, payload, label, unit }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="TempTrend-tooltip">
      <div className="TempTrend-tooltip-time">{label}</div>
      <div className="TempTrend-tooltip-row">
        <div className="TempTrend-tooltip-dot" style={{ background: payload[0].color }} />
        <span className="TempTrend-tooltip-label">Temp</span>
        <span className="TempTrend-tooltip-val">{payload[0].value.toFixed(1)}{unit}</span>
      </div>
    </div>
  );
};

const CustomDot = ({ cx, cy, stroke }) => (
  <circle cx={cx} cy={cy} r={4} fill="white" stroke={stroke} strokeWidth={2} />
);

const CustomActiveDot = ({ cx, cy, stroke }) => (
  <circle cx={cx} cy={cy} r={7} fill="white" stroke={stroke} strokeWidth={2} />
);

const CustomLabel = ({ x, y, value }) => (
  <text
    x={x}
    y={y - 8}   
    textAnchor="middle"
    fontSize={11}
    fill="#374151"
    fontWeight={600}
  >
    {Math.round(value)}°
  </text>
);

const TrendChart = ({ charttitle, title, data, units, accent }) => {
  const unit = units === 'metric' ? '°C' : '°F';
  const temps = data.map(d => convertTemp(d.temp, units));
  const minY = Math.floor(Math.min(...temps)) - 1;
  const maxY = Math.ceil(Math.max(...temps))  + 2;
  const gradId = `grad-${accent.replace('#', '')}`;
  const convertedData = data.map(d => ({
  ...d,
  temp: convertTemp(d.temp, units),
}));

  return (
    <div className="TemperatureTrend">
      <div className='Forecast-type'>
        <span>{charttitle}</span>
      </div>

      <hr/>

      <div className="TempTrend-card">

      <div className="TempTrend-header">
        <div className="TempTrend-title">Temperature Trend — {title}</div>
        <div className="TempTrend-legend">
        <div className="TempTrend-legend-line" style={{ background: accent }} />
        <div className="TempTrend-legend-dot" style={{ border: `1.5px solid ${accent}` }} />
        <span>Temp {unit}</span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={180}>

        <AreaChart data={convertedData} margin={{ top: 20, right: 16, left: 0, bottom: 0 }}>
        
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor={accent} stopOpacity={0.6} />
          <stop offset="100%" stopColor={accent} stopOpacity={0} />
          </linearGradient>
        </defs>
        
        <CartesianGrid strokeDasharray="0" stroke="rgba(0,0,0,0.06)" vertical={false} />
        
        <XAxis
          dataKey="title"
          tick={{ fontSize: 10, fill: '#9ca3af' }}
          axisLine={{ stroke: 'rgba(0,0,0,0.12)' }}
          tickLine={true}
          padding={{ left: 20, right: 20 }}
        />
        
        <YAxis
          domain={[minY, maxY]}
          tick={{ fontSize: 10, fill: '#9ca3af' }}
          axisLine={{ stroke: 'rgba(0,0,0,0.12)' }}
          tickLine={false}
          tickFormatter={v => `${v}°`}
          width={36}
        />
        
        <Tooltip
          content={<CustomTooltip unit={unit} />}
          cursor={{ stroke: 'rgba(0,0,0,0.08)', strokeWidth: 1, strokeDasharray: '4 4' }}
        />
        
        <Area
          type="monotone"
          dataKey="temp"
          name="Temp"
          stroke={accent}
          strokeWidth={2.5}
          fill={`url(#${gradId})`}
          dot={<CustomDot stroke={accent} />}
          activeDot={<CustomActiveDot stroke={accent} />}
          label={<CustomLabel />}
        />
        
        </AreaChart>
      
      </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TrendChart;