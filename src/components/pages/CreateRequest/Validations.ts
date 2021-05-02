/* eslint-disable no-unused-vars */
import { RequestType } from 'src/types';

export const validations = (data:RequestType)=>{
  if (!data.requesterName || data.requesterName.length<3) {
    return `Name should be atleast 3 characters long`;
  }
  if (!data.patientAge || !(/^\d+$/.test(data.patientAge)) || parseInt(data.patientAge)<=0 || parseInt(data.patientAge)>=100 ) {
    return `Invalid Age`;
  }
  if ( (data.requestCategory.value==='Blood' || data.requestCategory.value==='Plasma' ) && !data.patientBloodGroup.value ) {
    return `Blood Group is mandatory !`;
  }
  if ( !data.patientDistrict.value ) {
    return `Location cannot be empty !`;
  }
  if ( !data.patientState.value ) {
    return `Please select a valid State !`;
  }
  if ( !data.patientGender.value ) {
    return `Please select the Gender !`;
  }
  if ( !data.requestCategory.value ) {
    return `Please select a category !`;
  }
  if ( !data.requestTitle ) {
    return `Subject cannot be empty !`;
  }
  if ( !data.requesterContactNumber || !(/^[6-9]{1}[0-9]{9}$/.test(data.requesterContactNumber)) ) {
    return ` Invalid Mobile number !`;
  }

  return 'true';
};

export default validations;
