import './LocationInfo.css';
import { BsGeoAlt, BsGlobe, BsClock, BsCalendar3 } from 'react-icons/bs';
import { useState, useEffect } from 'react';

const getLocalTime = (timezone) => {
  const offset = timezone / 3600;
  const tzString = `Etc/GMT${offset <= 0 ? '+' : '-'}${Math.abs(offset)}`;
  const date = new Date();

  const timePart = new Intl.DateTimeFormat('en-GB', {
    timeZone: tzString,
    hour:   '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date);

  const hour24 = parseInt(new Intl.DateTimeFormat('en-GB', {
    timeZone: tzString,
    hour: '2-digit',
    hour12: false,
  }).format(date));

  const ampm = hour24 < 12 ? 'AM' : 'PM';
  return `${timePart} ${ampm}`;
};

const formatCoord = (value, posDir, negDir) => {
  const dir = value >= 0 ? posDir : negDir;
  return `${Math.abs(value).toFixed(2)}° ${dir}`;
};

const formatTimezone = (offsetSeconds) => {
  const hours = offsetSeconds / 3600;
  const sign  = hours >= 0 ? '+' : '-';
  const abs   = Math.abs(hours);
  const h     = Math.floor(abs);
  const m     = Math.round((abs - h) * 60);
  return m > 0 ? `UTC ${sign}${h}:${String(m).padStart(2, '0')}` : `UTC ${sign}${h}`;
};

const parseLocalTime = (formattedLocalTime) => {
  const [datePart, timePart] = formattedLocalTime.split(' | Local time: ');
  return { date: datePart, time: timePart };
};

const LocationInfo = ({ name, country, lat, lon, timezone, formattedLocalTime }) => {
  const { date, time } = parseLocalTime(formattedLocalTime);
  const mapsUrl = `https://maps.google.com/?q=${lat},${lon}`;
  const [currentTime, setCurrentTime] = useState(getLocalTime(timezone));

  useEffect(() => {
    setCurrentTime(getLocalTime(timezone));
    const msToNextMinute = 60000 - (Date.now() % 60000);
    const timeout = setTimeout(() => {
      setCurrentTime(getLocalTime(timezone));
      const interval = setInterval(() => setCurrentTime(getLocalTime(timezone)), 60000);
      return () => clearInterval(interval);
    }, msToNextMinute);
    return () => clearTimeout(timeout);
  }, [timezone]);
  

  return (
    <div className="LocationInfo">
      <div className="LocationInfo-title">
        <BsGeoAlt size={14} />
        <span>Location Info</span>
      </div>

      <div className="LocationInfo-city">
        {name}, {country}
      </div>

      <div className="LocationInfo-divider" />

      <div className="LocationInfo-rows">
        <div className="LocationInfo-row">
          <span className="LocationInfo-label">
            <BsClock size={11} />
            Current time
          </span>
          <span className="LocationInfo-value">{currentTime}</span>
        </div>

        <div className="LocationInfo-row">
          <span className="LocationInfo-label">
            <BsClock size={11} />
            Last updated
          </span>
          <span className="LocationInfo-value">{time}</span>
        </div>

        <div className="LocationInfo-row">
          <span className="LocationInfo-label">
            <BsCalendar3 size={11} />
            Date
          </span>
          <span className="LocationInfo-value LocationInfo-value--date">{date}</span>
        </div>

        <div className="LocationInfo-row">
          <span className="LocationInfo-label">
            <BsGlobe size={11} />
            Latitude
          </span>
          <span className="LocationInfo-value">
            {formatCoord(lat, 'N', 'S')}
          </span>
        </div>

        <div className="LocationInfo-row">
          <span className="LocationInfo-label">
            <BsGlobe size={11} />
            Longitude
          </span>
          <span className="LocationInfo-value">
            {formatCoord(lon, 'E', 'W')}
          </span>
        </div>

        <div className="LocationInfo-row">
          <span className="LocationInfo-label">
            <BsClock size={11} />
            Timezone
          </span>
          <span className="LocationInfo-value">
            {formatTimezone(timezone)}
          </span>
        </div>

        <div className="LocationInfo-row">
          <span className="LocationInfo-label">
            <BsGlobe size={11} />
            Region
          </span>
          <span className="LocationInfo-value">
            {new Intl.DisplayNames(['en'], { type: 'region' }).of(country)}
          </span>
        </div>
      </div>

      <div className="LocationInfo-divider" />

      < a
        className="LocationInfo-map-link"
        href={mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        <BsGeoAlt size={11} />
        Open in Maps
      </a>
    </div>
  );
};

export default LocationInfo;