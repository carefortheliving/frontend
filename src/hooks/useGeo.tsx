const indianCitiesDatabase = require('indian-cities-database');

export const useGeo = () => {
  const cities = indianCitiesDatabase.cities as [{
    city: string;
    state: string;
  }];
  const states = cities.reduce((acc, cur) => {
    if(!acc?.[cur.state]) {
      acc[cur.state] = [];
    }
    acc[cur.state].push(cur);
    return acc;
  }, {});

  return {
    states,
    cities,
  }
};

export default useGeo;
