import { _effect } from './internal/core';
import { ref, Ref } from './ref';

export const computed = <T>(fn: () => T): Ref<T> => {
  const result = ref<T>();

  _effect(() => {
    result.value = fn();
  }, [result]);

  return result;
};
