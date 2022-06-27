import { _effect } from './internal/core';

export const effect = (fn: () => void) => {
  return _effect(fn);
};
