import './Daylight.css';
import { BsSun } from 'react-icons/bs';

const ECX = 250;
const ECY = 440;
const ER  = 400;
const ANGLE_START = 0.7 * Math.PI; // sunrise angle
const ANGLE_END   = 0.3 * Math.PI; // sunset angle

const ptAt = (t) => {
  const angle = ANGLE_START + t * (ANGLE_END - ANGLE_START);
  return {
    x: ECX + ER * Math.cos(angle),
    y: ECY - ER * Math.sin(angle),
  };
};

const buildPath = (t0, t1, n = 100) => {
  let d = '';
  for (let i = 0; i <= n; i++) {
    const p = ptAt(t0 + (t1 - t0) * (i / n));
    d += i === 0 ? `M${p.x.toFixed(1)},${p.y.toFixed(1)}` : ` L${p.x.toFixed(1)},${p.y.toFixed(1)}`;
  }
  return d;
};

const Daylight = ({ sunrise, sunset, sunriseUnix, sunsetUnix, dt, timezone }) => {

  const localNow     = dt + timezone;
  const localSunrise = sunriseUnix + timezone;
  const localSunset  = sunsetUnix  + timezone;

  const pct = Math.min(
    100,
    Math.max(
      0,
      Math.round(((localNow - localSunrise) / (localSunset - localSunrise)) * 100)
    )
  );

  const t      = pct / 100;
  const sun    = ptAt(t);
  const start  = ptAt(0);
  const end    = ptAt(1);
  const bgPath = buildPath(0, 1);
  const prPath = buildPath(0, t);
  const fillPath = `${bgPath} L${end.x.toFixed(1)},130 L${start.x.toFixed(1)},130 Z`;

  return (
    <div className="Daylight">
      <div className="Daylight-title">
        <BsSun size={14} />
        <span>Daylight</span>
      </div>

      <div className="Daylight-times">
        <div className="Daylight-time">
          <span className="Daylight-time-value">{sunrise}</span>
          <span className="Daylight-time-label">Sunrise</span>
        </div>
        <div className="Daylight-time">
          <span className="Daylight-pct-value">{pct}%</span>
          <span className="Daylight-pct-label">of daylight passed</span>
        </div>
        <div className="Daylight-time">
          <span className="Daylight-time-value">{sunset}</span>
          <span className="Daylight-time-label">Sunset</span>
        </div>
      </div>

      <div className="Daylight-arc-wrap">
        <svg width="100%" viewBox="0 0 500 130" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="dlArcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="#34d399"/>
              <stop offset="50%"  stopColor="#fbbf24"/>
              <stop offset="100%" stopColor="#f59e0b"/>
            </linearGradient>
            <radialGradient id="dlGlowGrad">
              <stop offset="0%"   stopColor="#fde68a" stopOpacity="0.8"/>
              <stop offset="100%" stopColor="#fde68a" stopOpacity="0"/>
            </radialGradient>
            <linearGradient id="dlFillGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%"   stopColor="#fbbf24" stopOpacity="0.12"/>
              <stop offset="100%" stopColor="#fbbf24" stopOpacity="0"/>
            </linearGradient>
          </defs>

          <path d={bgPath}   fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="3" strokeLinecap="round"/>
          <path d={fillPath} fill="url(#dlFillGrad)" opacity="0.7"/>
          <path d={prPath}   fill="none" stroke="url(#dlArcGrad)" strokeWidth="4" strokeLinecap="round"/>
          <circle cx={sun.x} cy={sun.y} r="18" fill="url(#dlGlowGrad)"/>
          <circle cx={sun.x} cy={sun.y} r="7"  fill="#fbbf24" stroke="rgba(255,255,255,0.9)" strokeWidth="2"/>
        </svg>
      </div>
    </div>
  );
};

export default Daylight;