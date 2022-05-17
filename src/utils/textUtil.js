import { reasonOptions, recutStatusOptions } from './CONSTANTS';

const getAbrName = fullName => {
  if (!fullName) {
    return '';
  }
  const name = fullName.split(' ');
  if (name.length > 1) {
    return `${name[0]} ${name[name.length - 1][0]}.`; //ignore middle name and truncates last name
  } else {
    return fullName;
  }
};

const getReason = reason => {
  const index = reasonOptions.findIndex(r => r.value === reason);
  console.log('INDEX::', index);
  if (index >= 0) {
    return reasonOptions[index].label;
  } else {
    return '';
  }
};
const getRecutStatus = status => {
  const index = recutStatusOptions.findIndex(r => r.value === status);
  if (index >= 0) {
    return recutStatusOptions[index].label;
  } else {
    return '';
  }
};


export {
  getAbrName,
  getReason,
  getRecutStatus,
};
