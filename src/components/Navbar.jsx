import './Navbar.css';
import { BsArrowClockwise } from 'react-icons/bs';

const Navbar = ({ units, setUnits, onRefresh, bg }) => {
  return (
    <nav className={`Navbar`}>

      <div className="Navbar-units">
        <button
          type="button"
          className={`Navbar-unit ${units === 'metric' ? 'active' : ''}`}
          onClick={() => setUnits('metric')}
        >
          °C
        </button>
        <span className="Navbar-divider">|</span>
        <button
          type="button"
          className={`Navbar-unit ${units === 'imperial' ? 'active' : ''}`}
          onClick={() => setUnits('imperial')}
        >
          °F
        </button>
      </div>

      <button
        className="Navbar-refresh"
        onClick={onRefresh}
        aria-label="Refresh weather data"
      >
        <BsArrowClockwise size={18} />
      </button>
    </nav>
  );
};

export default Navbar;