import './HighLow.css';
import { BsThermometer } from 'react-icons/bs';
import { convertTemp } from '../utils/convertUnits';

const HighLow = ({ temp, temp_min, temp_max, units }) => {

    const unit  = units === 'metric' ? '°C' : '°F';
    const pct = Math.min(100, Math.max(0,
    ((convertTemp(temp, units) - convertTemp(temp_min, units)) / 
    (convertTemp(temp_max, units) - convertTemp(temp_min, units))) * 100
    ));
  
    const range = (convertTemp(temp_max, units) - convertTemp(temp_min, units)).toFixed(1);

    return (
        <div className="HighLow">
        <div className="HighLow-title">
            <BsThermometer size={14} />
            <span>High / Low</span>
        </div>

        <div className="HighLow-unit-label">
            {units === 'metric' ? 'Celsius' : 'Fahrenheit'}
        </div>

        <div className="HighLow-row">

            <div className="HighLow-item">
                <span className="HighLow-label">Low</span>
                <span className="HighLow-val" data-unit={unit}>
                {convertTemp(temp_min, units).toFixed(1)}
                </span>
            </div>

            <div className="HighLow-current">
                <span className="HighLow-val" data-unit={unit}>
                {convertTemp(temp, units).toFixed(1)}
                </span>
                <span className="HighLow-current-label">current</span>
            </div>

        <div className="HighLow-item">
            <span className="HighLow-label">High</span>
            <span className="HighLow-val" data-unit={unit}>
            {convertTemp(temp_max, units).toFixed(1)}
            </span>
        </div>
        </div>

        <div className="HighLow-bar-wrap">
            <div className="HighLow-bar-fill" />
            <div className="HighLow-bar-dot" style={{ left: `${pct}%` }} />
        </div>

        <div className="HighLow-scale">
            <span>{convertTemp(temp_min, units).toFixed(1)}{unit}</span>
            <span>{convertTemp(temp_max, units).toFixed(1)}{unit}</span>
        </div>

        <div className="HighLow-range">
            Range: <span className="HighLow-range-val">{range}{unit}</span>
        </div>
        </div>
    );
    };

    export default HighLow;