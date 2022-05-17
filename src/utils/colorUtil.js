import { colorPalate, priorityOptions } from './CONSTANTS';

export const getProgressColor = progress => {
  if (progress < 30) {
    return colorPalate[0];
  } else if (progress < 80) {
    return colorPalate[1];
  } else {
    return colorPalate[2];
  }
};

export const getPriorityColor = priority => {
  const index = priorityOptions.findIndex(p => p.value === priority);
  return priorityOptions[index].color;
};
