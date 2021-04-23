import useGeo from "../hooks/useGeo"


export const CATEGORIES = ["Oxygen", "Plasma", "Medicine" , "Blood", "Monetary", "Other"]
const STATUS = ["Active", "Completed"]


export const FilterData = ()=>{
    const {states } = useGeo();
    delete states["Pondicherry"]
    delete states["Delhi"]
    states["Delhi"] = [{city: "Delhi City", state: "Delhi"}]
    states["Pondicherry"] = [{city: "Karaikal", state: "Pondicherry"},{city: "Mahe", state: "Pondicherry"},{city: "Yanam", state: "Pondicherry"}]
    const newstates =  Object.keys(states).sort().reduce(
        (obj, key) => { 
          obj[key] = states[key]; 
          return obj;
        }, 
        {}
      );
    return ({
        categories : CATEGORIES,
        status : STATUS,
        state : newstates
    })
}

export default FilterData;

export const Locations = ()=>{
  const {states } = useGeo();
  let indianStates = [];
  let indianCities = [];

  Object.keys(states).map(state =>{
    indianStates.push(state)
    states[state].map(city=>indianCities.push(city.city))

  })
  return ({
    indianStates , indianCities
  })
}