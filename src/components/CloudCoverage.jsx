import './CloudCoverage.css';
import { BsCloud } from 'react-icons/bs';

const CIRCUMFERENCE = 2 * Math.PI * 46;

const getCloudInfo = (pct) => {
  if (pct === 0)  return { label: 'Clear Sky',   cls: 'cloud-clear',     color: '#86efac' };
  if (pct <= 25)  return { label: 'Few Clouds',  cls: 'cloud-few',       color: '#7dd3fc' };
  if (pct <= 50)  return { label: 'Scattered',   cls: 'cloud-scattered', color: '#cbd5e1' };
  if (pct <= 84)  return { label: 'Broken',      cls: 'cloud-broken',    color: '#94a3b8' };
  return                  { label: 'Overcast',   cls: 'cloud-overcast',  color: '#64748b' };
};

const CloudCoverage = ({ cloudCoverage }) => {
  const { label, cls, color } = getCloudInfo(cloudCoverage);
  const offset = CIRCUMFERENCE * (1 - cloudCoverage / 100);

  return (
    <div className="CloudCoverage">
      <div className="CloudCoverage-title">
        <BsCloud size={14} />
        <span>Cloud Cover</span>
      </div>

      <div className="CloudCoverage-ring-wrap">
        <div className="CloudCoverage-ring">
          <svg width="110" height="110" viewBox="0 0 110 110">
            <circle className="ring-bg" cx="55" cy="55" r="46" />
            <circle
              className="ring-fill"
              cx="55" cy="55" r="46"
              stroke={color}
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={offset}
            />
          </svg>
          <div className="ring-label">
            <span className="ring-pct">{cloudCoverage}%</span>
            <span className="ring-unit">cloud</span>
          </div>
        </div>
      </div>

      <span className={`CloudCoverage-badge ${cls}`}>{label}</span>
    </div>
  );
};

export default CloudCoverage;