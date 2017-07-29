const ACTION_STATES = [
  'REQUEST',
  'SUCCESS',
  'FAILURE'
];

/* eslint-disable no-param-reassign */
export const DefineTypes = (prefix) => {
  prefix = prefix ? `${prefix}/` : '';
  return ACTION_STATES.reduce((acc, type) => (
   { ...acc, [type]: `${prefix}${type}`.toUpperCase() }
  ), {});
};
