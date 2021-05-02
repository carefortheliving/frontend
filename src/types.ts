export interface StylesProps<T> {
  classes: {
    // eslint-disable-next-line no-unused-vars
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

export interface DonationType {
  donorEmail?: string;
  donorName?: string;
  donorBloodGroup?: { value: string, label: string };
  donorAge?: string;
  donorDistrict?: { value: string, label: string };
  donorGender?: { value: string, label: string };
  donorState?: { value: string, label: string };
  donationCategory?: { value: string, label: string };
  donationTitle: string;
  donationDescription?: string;
  donationStatus?: { value: string, label: string };
  donorContactNumber: string;
  createdAt: number;
  updatedAt: number;
  donorTravelWillingness?: { value: string, label: string };
  covidRecoveryDate?: number;
  antibodyTestStatus?: { value: string, label: string };
  vaccinationStatus?: { value: string, label: string };
  medicalComplication?: string;
}

export type ExistingRequestType = RequestType & { id: string };

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

export interface UserInfo {
  isAdmin: boolean;
  email: string;
  displayName: string;
}

export interface LabelValue<ValueType = string> {
  label: string;
  value: ValueType;
}
