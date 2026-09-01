import './Humidity.css';
import { BsDroplet } from 'react-icons/bs';

const Humidity = ({ humidity }) => {
  return (
    <div className="Humidity">
      <div className="Humidity-title">
        <BsDroplet size={14} />
        <span>Humidity</span>
      </div>

      <span className="Humidity-amount" data-unit="%">
        {humidity}
      </span>

      <div className="Humidity-bar-wrap">
        <div className="Humidity-track">
          <div className="Humidity-fill" style={{ width: `${humidity}%` }} />
          <div className="Humidity-thumb" style={{ left: `${humidity}%` }} />
        </div>
        <div className="Humidity-ticks">
          <span>0%</span>
          <span>25%</span>
          <span>50%</span>
          <span>75%</span>
          <span>100%</span>
        </div>
      </div>
    </div>
  );
};

export default Humidity;