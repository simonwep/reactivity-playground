import { _effect } from './internal/core';
import { ReadonlyRef } from './readonly';
import { ref } from './ref';

export type ComputedRef<T> = ReadonlyRef<T>;

export const computed = <T>(fn: () => T): ComputedRef<T> => {
  const result = ref<T>();
  let modifying = false;

  _effect(() => {
    modifying = true;
    result.value = fn();
    modifying = false;
  }, [result]);

  result.subscribe(() => {
    if (!modifying) {
      throw new Error('Computed values should not be modified.');
    }
  });

  return result;
};
