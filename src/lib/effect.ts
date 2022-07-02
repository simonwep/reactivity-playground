import { _effect } from './internal/core';

export type StopEffectCallback = () => void;

export const effect = (fn: () => void): StopEffectCallback => {
  return _effect(fn);
};
