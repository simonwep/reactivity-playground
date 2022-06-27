import { _effect } from './internal/core';

export const effect = (fn: () => void) => {
  _effect(fn);
};
