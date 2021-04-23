export interface StylesProps<T> {
  classes: {
    [X in keyof T]: string;
  };
  theme: Record<string, string>;
}
export interface RequestType {
  donorEmail?: string;
  donorName?: string;
  patientBloodGroup?: { value: string, label: string };
  patientAge?: string;
  patientDistrict?: { value: string, label: string };
  patientGender?: { value: string, label: string };
  patientState?: { value: string, label: string };
  requestCategory?: { value: string, label: string };
  requestDescription?: string;
  requestStatus?: { value: string, label: string };
  requesterContactNumber: string;
  requesterName: string;
  requesterEmail: string;
  createdAt: number;
  updatedAt: number;
}

export interface FiltersType {
  requesterEmail?: string;
  requestStatus?: any;
  requestStates?:any;
  requestCities?:any;
  requestLocation?:any;
  requestCategories?:any;
}

export interface UsefulLink {
  name: string;
  link: string;
  description: string;
}

export interface FilterInterface{
  status: string[] ;
  states: string[] ;
  cities: string[] ;
  categories: string[] ;
}
