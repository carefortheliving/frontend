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
  requestTitle: string;
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
  requestLocation?:any;
}

export interface UsefulLink {
  name: string;
  link: string;
  description: string;
}

export interface DisqusProps {
  url: string;
  id: string;
  title: string;
  language: string;
}