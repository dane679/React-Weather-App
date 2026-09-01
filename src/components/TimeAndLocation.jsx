import { useState, useEffect } from 'react';
import './TimeAndLocation.css';

const getLocalTime = () => {
  const date = new Date();

  const datePart = new Intl.DateTimeFormat('en-GB', {
    weekday: 'long',
    day:     '2-digit',
    month:   'short',
    year:    'numeric',
  }).format(date);

  const timePart = new Intl.DateTimeFormat('en-GB', {
    hour:   '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date).toUpperCase();

  const hour24 = parseInt(new Intl.DateTimeFormat('en-GB', {
    hour:   '2-digit',
    hour12: false,
  }).format(date));

  const period = hour24 < 12 ? 'AM' : 'PM';

  return `${datePart} | Local time: ${timePart} ${period}`;
};

const TimeAndLocation = ({weather: {formattedLocalTime, timezone, name, country}}) => {
  const [localTime, setLocalTime] = useState(getLocalTime(timezone));

  useEffect(() => {
    setLocalTime(getLocalTime(timezone));

    const msToNextMinute = 60000 - (Date.now() % 60000);
    const timeout = setTimeout(() => {
      setLocalTime(getLocalTime(timezone));
      const interval = setInterval(() => setLocalTime(getLocalTime(timezone)), 60000);
      return () => clearInterval(interval);
    }, msToNextMinute);

    return () => clearTimeout(timeout);
  }, [timezone]);

  return (
    <>
    <div className='TimeAndLocation-container'>
      <div className='Time-container'>
        <span className='Time-text'>{localTime}</span>
        <span className='Time-text'>Last updated: {formattedLocalTime.split(' | Local time: ')[1]}</span>
      </div>
      <div className='Location-container'>
        <span className='Location-text'>{name}, {country}</span>
        <span className='Location-country-text'>{new Intl.DisplayNames(['en'], { type: 'region' }).of(country)}</span>
      </div>
    </div>
    </>
  );
};

export default TimeAndLocation;