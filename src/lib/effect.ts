import { _effect } from './core';

export const effect = (fn: () => void) => {
  _effect(fn);
};
