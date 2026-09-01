import { useEffect, useState } from 'react';
import TopButtons from './components/TopButtons';
import Inputs from './components/Inputs';
import TimeAndLocation from './components/TimeAndLocation';
import TemperatureAndDetails from './components/TemperatureAndDetails';
import Forecast from './components/Forecast';
import WindCompass from './components/WindCompass';
import Visibility from './components/Visibility';
import CloudCoverage from './components/CloudCoverage';
import Daylight from './components/Daylight';
import LocationInfo from './components/LocationInfo';
import HighLow from './components/HighLow';
import Humidity from './components/Humidity';
import TrendChart from './components/TrendChart';
import Navbar from './components/Navbar';
import getFormattedWeatherData from './services/weatherService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  const [query, setQuery] = useState({q: 'London'});
  const [units, setUnits] = useState('metric');
  const [weather, setWeather] = useState(null);
  const [activeCity, setActiveCity] = useState('London');
 
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


  const getWeather = async () => {
    const cityName = query.q ? query.q : "current location";
    toast.info(`Fetching Weather data for ${capitalizeFirstLetter(cityName)}`)

    await getFormattedWeatherData({...query, units: 'metric' }).then((data) => {
      toast.success(`Fetched Weather data for ${data.name}, ${data.country}`)
      setWeather(data)
      console.log(data);
    }).catch(error =>{
    toast.error(`Error while fetching data for ${capitalizeFirstLetter(cityName)}`);
    });
  }

  useEffect(() => {
    getWeather();
  }, [query])


  const formatBackground =() => {
    if(!weather) {
      return {
      bgClass: "outer-container",
    };
    }

    const temp = units === 'imperial' ? (weather.temp * 9 / 5) + 32 : weather.temp;

    const ranges = {
      metric: {
        cold: 10,
        mild: 20,
        warm: 28,
      },
      imperial: {
        cold: 50,
        mild: 68,
        warm: 82,
      },
    };
    
    const current = ranges[units];

    if (temp <= current.cold) {
    return {
      bgClass: "cool-bg",
      accent: "#0891b2",
    };
  }

  if (temp <= current.mild) {
    return {
      bgClass: "mild-bg",
      accent: "green",
    };
  }

  return {
      bgClass: "warm-bg",
      accent: "#f59e0b",
    };
  }

  return (
    <div className={`outer-container ${formatBackground().bgClass}`}>
      <Navbar units={units} setUnits={setUnits} onRefresh={getWeather} bg={formatBackground().bgClass}/>
      <div className="container">
        
        <TopButtons setQuery = {setQuery} activeCity={activeCity} setActiveCity={setActiveCity} countryCode={weather?.country}/>
        <Inputs setQuery = {setQuery} setUnits = {setUnits} units={units} setActiveCity={setActiveCity} 
        regionName={weather?.name} countryCode={weather?.country} />
        {weather && (
          <>
            <TimeAndLocation weather = {weather}/>
            <TemperatureAndDetails weather = {weather} units={units} />
            <Forecast title="3 hour step forecast" data = {weather.hourly} units={units}/>
            <TrendChart
              charttitle="Enhanced 24 Hour Forecast"
              title="Next 24hrs"
              data={weather.hourly}
              units={units}
              accent={formatBackground().accent}
            />
            <Forecast title="Daily forecast" data = {weather.daily} units={units}/>
            <TrendChart
              charttitle="Enhanced 5 Day Forecast"
              title="Next 5 Days"
              data={weather.daily}
              units={units}
              accent={formatBackground().accent}
            />
            <div
              className='weather-details'
            >
              <WindCompass deg={weather.deg} gust={weather.gust} speed={weather.speed} units={units}/>

              <div
                className='weather-column'
              >
                <Visibility visibility={weather.visibility} />
                <CloudCoverage cloudCoverage={weather.cloudCoverage} />
              </div>

              <div
                className='weather-column c-end'
              >
              <Humidity humidity={weather.humidity} />
              <HighLow
                temp={weather.temp}
                temp_min={weather.temp_min}
                temp_max={weather.temp_max}
                units={units}
              />
              </div>
              <LocationInfo
                name={weather.name}
                country={weather.country}
                lat={weather.lat}
                lon={weather.lon}
                timezone={weather.timezone}
                formattedLocalTime={weather.formattedLocalTime}
              />
            </div>

            <Daylight
              sunrise={weather.sunrise}
              sunset={weather.sunset}
              sunriseUnix={weather.sunriseUnix}
              sunsetUnix={weather.sunsetUnix}
              dt={weather.dt}
              timezone={weather.timezone}
            />
          </>
        )}
        <ToastContainer autoClose={2500} hideProgressBar={false} theme='colored' draggable closeOnClick/>
      </div>
    </div>
  )
}

export default App
