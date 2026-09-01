import './Visibility.css';
import { BsEye } from 'react-icons/bs';

const Visibility = ({ visibility }) => {
  const km = visibility / 1000;
  const displayKm = km < 1 ? km.toFixed(1) : km.toFixed(0);
  const thumbPct = Math.min((km / 15) * 100, 97);

  const getVisibilityInfo = (km) => {
    if (km < 1)  return { label: 'Poor',      cls: 'badge-poor' };
    if (km < 4)  return { label: 'Moderate',  cls: 'badge-moderate' };
    if (km < 10) return { label: 'Good',      cls: 'badge-good' };
    return { label: 'Excellent', cls: 'badge-excellent' };
  };

  const { label, cls } = getVisibilityInfo(km);

  return (
    <div className="Visibility">
      <div className="Visibility-title">
        <BsEye size={14} />
        <span>Visibility</span>
      </div>

      <div className="Visibility-value">
        <span className="Visibility-amount">{displayKm}</span>
        <span className="Visibility-unit">km</span>
      </div>

      <span className={`Visibility-badge ${cls}`}>{label}</span>

      <div className="Visibility-bar-wrap">
        <div className="Visibility-track">
          <div
            className="Visibility-thumb"
            style={{ left: `${thumbPct}%` }}
          />
        </div>
        <div className="Visibility-ticks">
          <span>0</span>
          <span>2</span>
          <span>5</span>
          <span>10</span>
          <span>15+</span>
        </div>
      </div>
    </div>
  );
};

export default Visibility;