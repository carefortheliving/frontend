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
  
  "Agra Bulandshahr Farrukhabad Ghazipur Hardoi India Purulia Rampur".split(' ').forEach(val => delete states[" "+val])  //Not states
  delete states["Andhra pradesh"]   //This state is repeated again and conatins only 1 city
  delete states["Tamil nadu"]       //This state is repeated again and conatins only 1 city
  "Maharastra Gujrat Rajastan".split(' ').forEach(val => delete states[val]) //repeated again
  
  return {
    states,
    cities,
  }
};

export default useGeo;
