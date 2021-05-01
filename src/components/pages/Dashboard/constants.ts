import { LabelValue, UsefulLink } from '../../../types';

export const dashboardTabs = {
  open_requests: {
    key: 'open_requests',
    label: 'Open Requsts',
    index: 0,
  },
  closed_requests: {
    key: 'closed_requests',
    label: 'Closed Requsts',
    index: 1,
  },
  useful_links: {
    key: 'useful_links',
    label: 'Useful Links',
    index: 2,
  },
  my_requests: {
    key: 'my_requests',
    label: 'My Requsts',
    index: 3,
  },
  donors: {
    key: 'donors',
    label: 'Donors',
    index: 4,
  },
};

export const defaultUsefulLinks: UsefulLink[] = [
  {
    name: 'Realtime Leads',
    link:
      'https://docs.google.com/document/d/1rgHki3hQF_Q8SR_nfj6MtUN5JYN0DNnZMtrOUHKQA78/edit?usp=sharing',
    description: 'This link contains leads of covid resources in realtime.',
  },
  {
    name: 'CrowdSourcing of Data [CovidsFacts]',
    link: 'https://covidfacts.in/',
    description:
      'This link contains information regarding leads of medical requirements',
  },
  {
    name: 'EDGE | Covid Action - India',
    link:
      'https://www.notion.so/EDGE-Covid-Action-India-20APR21-01-30-100d217d90a04d1fbb46e2455de46722',
    description: 'EDGE | Covid Action - India',
  },
  {
    name: 'so.city/covid19',
    link: 'https://so.city/covid19',
    description: 'Covid resources for Delhi',
  },
  {
    name: 'covidresource.glideapp.io',
    link: 'https://covidresource.glideapp.io/',
    description: 'Covid Useful Rescources',
  },
  {
    name: 'bhopalcovidbeds.in',
    link: 'https://http://www.bhopalcovidbeds.in/',
    description: 'To check bed availability in Bhopal',
  },
  {
    name: 'external.sprinklr.com',
    link:
      'https://external.sprinklr.com/insights/explorer/dashboard/601b9e214c7a6b689d76f493/tab/1?id=DASHBOARD_601b9e214c7a6b689d76f493',
    description: 'Covid Resources',
  },
  {
    name: 'dhoondh.com',
    link: 'https://www.dhoondh.com/',
    description: 'To search for plasma donors.',
  },
];

export const defaultRequestsFilters = {
  patientDistrict: undefined as undefined | LabelValue,
  patientState: undefined as undefined | LabelValue<'open' | 'closed'>,
  requestCategory: undefined as undefined | LabelValue,
  requestStatus: undefined as undefined | LabelValue,
  requesterEmail: undefined as undefined | string,
  sortBy: {
    key: 'updatedAt',
    direction: 'desc',
  } as undefined | {
    key?: 'createdAt' | 'updatedAt' | 'patientAge',
    direction?: 'asc' | 'desc'
  },
  pageSize: 10,
  pageIndex: 1,
};
