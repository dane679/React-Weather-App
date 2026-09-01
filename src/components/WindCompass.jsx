import './WindCompass.css';
import { FiWind } from "react-icons/fi";
import { convertWind } from '../utils/convertUnits';

const WindCompass = ({ deg, gust, speed, units }) => {

  return (
    <>
      <div className="WindCompass">
        <div className="WindCompass-title">
          <FiWind size={18}/>
          <span>Wind</span>
        </div>
        <div className="Compass">
          <span className="north">N</span>
          <span className="northeast">NE</span>
          <span className="east">E</span>
          <span className="southeast">SE</span>
          <span className="south">S</span>
          <span className="southwest">SW</span>
          <span className="west">W</span>
          <span className="northwest">NW</span>
          <div
            className="Compass-arrow"
            style={{
              transform: `translateX(-50%) translateY(-100%) rotate(${deg}deg)`
            }}
          />
        </div>

      <div className="Wind-info">

        <p>{convertWind(speed, units).toFixed(1)} {units === "metric" ? "m/s" : "mph"}</p>

        {gust && (
          <p>Gusts: {convertWind(gust, units).toFixed(1)} {units === "metric" ? "m/s" : "mph"}</p>
        )}
        <p>Direction: 
          {
            deg >= 337.5 || deg < 22.5 ? " N (North)" :
            deg < 67.5 ? " NE (NorthEast)" :
            deg < 112.5 ? " E (East)" :
            deg < 157.5 ? " SE (SouthEast)" :
            deg < 202.5 ? " S (South)" :
            deg < 247.5 ? " SW (SouthWest)" :
            deg < 292.5 ? " W (West)" :
            deg < 337.5 ? " NW (NorthWest)" :
            " N (North)"
          }
        </p>
        <p>Direction: {deg}°</p>
      </div>
    </div>
    </>
  );
};

export default WindCompass;