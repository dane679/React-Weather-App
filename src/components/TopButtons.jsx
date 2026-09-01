
const TopButtons = ({setQuery, activeCity, setActiveCity, countryCode}) => {

  const cities = [
    {
      id: 1,
      title: "London",
      country: "GB",
    },
    {
      id: 2,
      title: "Sydney",
      country: "AU",
    },
    {
      id: 3,
      title: "Tokyo",
      country: "JP",
    },
    {
      id: 4,
      title: "Toronto",
      country: "CA",
    },
    {
      id: 5,
      title: "Paris",
      country: "FR",
    },
    {
      id: 6,
      title: "New York",
      country: "US",
    },
  ];
    
  return (
    <div className='TopButtons'>
      {cities.map((city) =>(
        <button
        key={city.id}
        className={`button ${
          activeCity?.toLowerCase() === city.title?.toLowerCase() ||
          activeCity?.toLowerCase() === `${city.title?.toLowerCase()}, ${city.country?.toLowerCase()}`
            ? 'active'
            : ''
        }`} 
        onClick={() => {
          setQuery({ q: city.title }); 
          setActiveCity(city.title);
          document.getElementById('location-search').value = `${city.title}, ${city.country}`;
        }}
        >
          {city.title}
        </button>
      ))}
    </div>
  )
}

export default TopButtons
