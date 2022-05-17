export const COLORS = {
  black: '#212429',
  dark: '#2A2D32',
  primary: '#12A7A7',
  light: 'rgba(256,256,256,0.498)',
  accent1: '#FFBA2E',
  accent2: '#F9433E',
  muted: 'rgba(255, 255, 255, 0.4)',
};

export const colorPalate = ['#F9433E', '#FFBA2E', '#12A7A7'];

export const priorityOptions = [
  {
    value: 0,
    label: ' Lowest Priority',
    color: 'blue',
  },
  {
    value: 1,
    label: 'Medium Priority',
    color: 'green',
  },
  {
    value: 2,
    label: 'Needs Attention',
    color: 'yellow',
  },
  {
    value: 3,
    label: 'High Priority',
    color: 'orange',
  },
  {
    value: 4,
    label: 'Urgent',
    color: 'red',
  },
];
export const productOptions = [
  {
    value: 'patch',
    label: 'patch',
  },
  {
    value:'beta',
    label: 'beta',
  },
  {
    value: 'group',
    label: 'group',
  },
];
export const reasonOptions = [
  {
    value: 0,
    label: 'Missed from count',
  },
  {
    value: 1,
    label: 'Plotting Error',
  },
  {
    value: 2,
    label: 'Plotting Error',
  },
  {
    value: 3,
    label: 'Mis-Pressed',
  },
  {
    value: 4,
    label: 'Sewing Error',
  },
  {
    value: 5,
    label: 'Trimming Error',
  },
];

export const recutStatusOptions = [
  {
    value: 0,
    label: 'Submitted - Waiting to be Plotted',
  },
  {
    value: 1,
    label: 'Plotted - Waiting to be Pressed',
  },
  {
    value: 2,
    label: 'Pressed - Waiting to be Sewn',
  },
  {
    value: 3,
    label: 'Sewn - Waiting to be Trimmed',
  },
  {
    value: 4,
    label: 'Trimmed - Waiting to be Shipped',
  },
  {
    value: 5,
    label: 'Shipped',
  },
];

export const Days = [
  {
    value: 'Monday',
    label: 'Mon',
  },
  {
    value: 'Tuesday',
    label: 'Tue',
  },
  {
    value: 'Wednesday',
    label: 'Wed',
  },
  {
    value: 'Thursday',
    label: 'Thu',
  },
  {
    value: 'Friday',
    label: 'Fri',
  },
  {
    value: 'Saturday',
    label: 'Sat',
  },
  {
    value: 'Sunday',
    label: 'Sun',
  },
];

export const SM = 'SM';
export const MD = 'MD';
export const LG = 'LG';
export const XL = 'XL';


export const AUTH_TOKEN = "@autism-app:token";
export const USER_DATA = "@autism-app:userdata";
export const LOG_DATA = "@autism-app:logdata";

export const LABELS = {
  expereince_type: 'Experience Type',
  setting: 'Setting',
  supervisor: 'Supervisor',
  date_of_experience: 'Date of Experience',
  time_of_expereince: 'Time of Experience',
  unrestricted_hours: 'Unrestricted Hours',
  restricted_hours: 'Restricted Hours',
  experience_hours: 'Experience Hours',
  individual_or_group: 'Individual or group supervision',
  method_of_supervision: 'Method of Supervision',
  supervision_start_time: 'Supervision Start Time',
  supervision_end_time: 'Supervision End Time',
  supervised_hours: 'Supervised Hours',
  independant_hours: 'Independent Hours',
  client_observation: 'Client Observation',
  supervision_contact: 'Supervision contacts',
  task: 'Task list items documented',  
  experience_note: 'Experience Notes'
}; 
