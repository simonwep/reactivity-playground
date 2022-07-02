import { _effect } from './internal/core';
import { ReadonlyRef } from './readonly';
import { ref } from './ref';

export type ComputedRef<T> = ReadonlyRef<T>;

export const computed = <T>(fn: () => T): ComputedRef<T> => {
  const internal = ref<T>();
  let modifying = false;

  _effect(() => {
    modifying = true;
    internal.value = fn();
    modifying = false;
  }, [internal]);

  internal.subscribe((_, oldValue) => {
    if (!modifying) {
      internal.value = oldValue; // Re-apply old value
      throw new Error('Computed values should not be modified.');
    }
  });

  return internal;
};
