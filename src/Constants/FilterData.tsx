import useGeo from '../hooks/useGeo';

const CATEGORIES = ['Blood', 'Plasma', 'Financial Aid', 'Transport'];
const STATUS = ['Active', 'Completed'];

export const FilterData = () => {
  const { states } = useGeo();
  delete states['Pondicherry'];
  delete states['Delhi'];
  states['Delhi'] = [{ city: 'Delhi City', state: 'Delhi' }];
  states['Pondicherry'] = [
    { city: 'Karaikal', state: 'Pondicherry' },
    { city: 'Mahe', state: 'Pondicherry' },
    { city: 'Yanam', state: 'Pondicherry' },
  ];
  const newstates = Object.keys(states)
      .sort()
      .reduce((obj, key) => {
        obj[key] = states[key];
        return obj;
      }, {});
  return {
    categories: CATEGORIES,
    status: STATUS,
    state: newstates,
  };
};

export default FilterData;

export const AllLocations = () => {
  const { states } = useGeo();
  const location: any = [];
  Object.keys(states).map((state) => {
    location.push(state);
    states[state].map((city) => location.push(city.city));
  });
  return location;
};
