import { DateTime } from "luxon";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

const BASE_URL = 'https://api.openweathermap.org/data/2.5/';

const getWeatherData = (infoType, searchParams) => {
    const url = import.meta.env.DEV
        ? (() => {
            const devUrl = new URL(BASE_URL + infoType);
            devUrl.search = new URLSearchParams({ ...searchParams, appid: API_KEY });
            return devUrl;
        })()
        : (() => {
            const prodUrl = new URL(`/api/${infoType}`, window.location.origin);
            prodUrl.search = new URLSearchParams({ ...searchParams, infoType });
            return prodUrl;
        })();
    
    return fetch(url).then((res) => res.json());
};

const iconURLFromCode = (icon) =>  `https://openweathermap.org/img/wn/${icon}@2x.png`;

const formatToLocalTime = (secs, offset, format ="cccc, dd LLL yyyy' | Local time: 'hh:mm a") => 
    {return DateTime.fromSeconds(secs + offset, { zone: "utc"}).toFormat(format)};

const formatCurrent = (data) => {
    console.log(data)

    const {
        coord: { lat, lon },
        main: { temp, feels_like, temp_min, temp_max, humidity },
        name, 
        dt, 
        sys: {country, sunrise, sunset},
        weather,
        wind: { speed, deg ,gust },
        timezone,
        visibility,
        clouds: { all: cloudCoverage },
    }
    = data;

    const {main: details, icon, description} = weather[0];
    const formattedLocalTime = formatToLocalTime(dt, timezone);

    return {
        temp,
        feels_like,
        temp_min,
        temp_max,
        humidity,
        name,
        country,
        sunrise: formatToLocalTime(sunrise, timezone, 'hh:mm a'),
        sunset: formatToLocalTime(sunset, timezone, 'hh:mm a'),
        sunriseUnix: sunrise, 
        sunsetUnix: sunset,
        speed,
        deg,
        gust,
        timezone,
        details,
        icon: iconURLFromCode(icon),
        description,
        formattedLocalTime,
        dt,
        lat,
        lon,
        visibility,
        cloudCoverage,
        
    }
}

const formatForecastWeather = (secs, offset, data) => {
    const hourly = data.filter(f => f.dt > secs)
    .slice(0,5)
    .map((f)=> ({
        temp: f.main.temp,
        title: formatToLocalTime(f.dt, offset, 'hh:mm a'),
        icon: iconURLFromCode(f.weather[0].icon),
        description: f.weather[0].description,
        main: f.weather[0].main,
    }))

    const daily = data.filter(f => f.dt_txt.slice(-8) === "00:00:00")
    .map((f)=> ({
        temp: f.main.temp,
        title: formatToLocalTime(f.dt, offset, 'ccc'),
        icon: iconURLFromCode(f.weather[0].icon),
        description: f.weather[0].description,
        main: f.weather[0].main,
    }))

    return { hourly, daily }
}

const getFormattedWeatherData = async (searchParams) => {
    const formattedCurrentWeather = await getWeatherData('weather', searchParams)
    .then(formatCurrent)

    const {dt, lat, lon, timezone} = formattedCurrentWeather;

    const formattedForecastWeather = await getWeatherData('forecast', {lat, lon, units: searchParams.units})
    .then((d)=> { return formatForecastWeather(dt, timezone, d.list)})

    return { ...formattedCurrentWeather, ...formattedForecastWeather};
}

export default getFormattedWeatherData;