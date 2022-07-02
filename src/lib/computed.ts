import { _effect } from './internal/core';
import { ref, Ref } from './ref';

export type ComputedRef<T> = Ref<T>;

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
