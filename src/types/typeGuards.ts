import {Rocket} from './rockets.types';

export const isRocket = (rocket: any): rocket is Rocket => {
  return typeof rocket === 'object';
};
