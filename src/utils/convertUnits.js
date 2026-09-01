export const toF = (c) => {
  return (c * 9/5) + 32
};
export const convertWind = (ms, units) => {
  return units === 'imperial' ? (ms * 2.237) : ms;
};
export const convertTemp = (c, units) => {
  return units === 'imperial' ? toF(c) : c;
};

export const windUnit = (units) => {
  return units === 'imperial' ? 'mph' : 'm/s';
};
export const tempUnit = (units) => {
  return units === 'imperial' ? '°F' : '°C';
};