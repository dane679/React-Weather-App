import { useEffect } from "react";
import {BiSearch, BiCurrentLocation} from 'react-icons/bi'

const Inputs = ({ setQuery, setUnits, units, setActiveCity, regionName, countryCode }) => {
  
  const handleSearchClick = () => {
    const searchValue =
        document.getElementById('location-search').value.trim();

    if (searchValue !== "") {
        setQuery({ q: searchValue });
        setActiveCity(searchValue);
    }
}

  const handleLocationClick = () =>{
    if (navigator.geolocation){
      navigator.geolocation.getCurrentPosition((poaition) =>{
        const {latitude, longitude} = poaition.coords;
        setQuery({ lat: latitude, lon: longitude });
        setActiveCity(null);
      });
    } 
  } 

  useEffect(() => {
    if (regionName && countryCode) {
      document.getElementById('location-search').value = `${regionName}, ${countryCode}`;
    }
  }, [regionName, countryCode]);

  return (
    <div className='Inputs'>
      <div className='search-container'>
        <input 
        id="location-search"
        type='text' 
        placeholder='City Name' 
        onKeyDownCapture={(e)=>{
          if (e.key === "Enter"){
            handleSearchClick();
          }
        }}
        ></input>
        <BiSearch size={30} className="BiSearch" onClick={handleSearchClick}/>
        <BiCurrentLocation size={30} className="BiCurrentLocation" 
        onClick={handleLocationClick}
        />
      </div>

      <div className="units-container">
        <button
          type="button"
          className={`units ${units === "metric" ? "active" : ""}`}
          onClick={() => setUnits("metric")}
        >
          °C
        </button>
        <span className="units-divider">|</span>
        <button
          type="button"
          className={`units ${units === "imperial" ? "active" : ""}`}
          onClick={() => setUnits("imperial")}
        >
          °F
        </button>
      </div>
    </div>
  )
}

export default Inputs
