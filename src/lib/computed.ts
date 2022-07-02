import { _effect } from './internal/core';
import { ref, Ref } from './ref';

export type ComputedRef<T> = Ref<T>;

export const computed = <T>(fn: () => T): ComputedRef<T> => {
  const result = ref<T>();

  _effect(() => {
    result.value = fn();
  }, [result]);

  return result;
};
