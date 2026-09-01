import './TemperatureAndDetails.css'
import { BiSolidDropletHalf } from "react-icons/bi";
import { FaThermometerEmpty } from "react-icons/fa";
import { FiWind } from "react-icons/fi";
import { GiSunrise, GiSunset } from "react-icons/gi";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import { convertTemp, convertWind } from '../utils/convertUnits';


function TemperatureAndDetails({
    weather: {
        details,
        icon,
        description,
        temp,
        temp_min,
        temp_max,
        sunrise,
        sunset,
        speed,
        humidity,
        feels_like,
    },
    units,
}) {

    const verticalDetails = [
        {
            id: 1,
            Icon: FaThermometerEmpty,
            title: "Real Feel",
            value: `${convertTemp(feels_like, units).toFixed()}°`
        },
        {
            id: 2,
            Icon: BiSolidDropletHalf,
            title: "Humidity",
            value: `${humidity.toFixed()}%`
        },
        {
            id: 3,
            Icon: FiWind,
            title: "Wind",
            value: `${convertWind(speed, units).toFixed()} ${units === "metric" ? "m/s" : "mph"}`
        },
    ];
    const horizontalDetails = [
        {
            id: 1,
            Icon: GiSunrise,
            title: "Sunrise",
            value: sunrise
        },
        {
            id: 2,
            Icon: GiSunset,
            title: "Sunset",
            value: sunset
        },
        {
            id: 3,
            Icon: MdKeyboardArrowUp,
            title: "High",
            value: `${convertTemp(temp_max, units).toFixed()}°`
        },
        {
            id: 4,
            Icon: MdKeyboardArrowDown,
            title: "Low",
            value: `${convertTemp(temp_min, units).toFixed()}°`
        },
    ];
    
  return (
    <div>
        <div className='TemperatureAndDetails-container'>
            <span className='td-main'>{details}</span>
            <span>{description}</span>
        </div>

        <div className='Details-container'>
            
            <img src={icon} 
            alt='weather icon' 
            className='Details-icon'/>
            <span className='Details-text'>
                {convertTemp(temp, units).toFixed()}°{units === "metric" ? "C" : "F"}
            </span>

            <div className='mics'>

                {verticalDetails.map(({id, Icon, title, value}) => (
                <div key={id} className="verticalDetails">
                    <Icon />
                    {`${title}: `}<span>{value}</span>
                </div>
                ))}

            </div>

        </div>

        <div className='horizontalDetails-container'>
            {horizontalDetails.map(({id, Icon, title, value}) => (
                <div key={id} className="horizontalDetails">
                    <Icon size={30}/>
                    {`${title}:`}<span>{value}</span>
                </div>
            ))}
        </div>
    </div>
  )
}

export default TemperatureAndDetails
