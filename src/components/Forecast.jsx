import './Forecast.css';
import { convertTemp } from '../utils/convertUnits';

const Forecast = ({title, data, units}) => {

  return (
    <div>
        <div className='Forecast-type'>
            <span>{title}</span>
        </div>
        <hr/>
        <div className='Forecast-container'>
            {data.map((data,index)=>(
                <div key={index} className='Forecast Forecast--glass'>
                    <span className='Forecast-title'>{data.title}</span>
                    <img src={data.icon} alt="weather icon"/>
                    <span className='Forecast-temp'>{convertTemp(data.temp, units).toFixed()}°</span>
                    <span className='Forecast-main'>{data.main}</span>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Forecast
