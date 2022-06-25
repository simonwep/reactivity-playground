import { effect } from './core';
import { ref, Ref } from './ref';

export const computed = <T>(fn: () => T): Ref<T> => {
  const result = ref<T>();

  effect(() => {
    result.value = fn();
  }, [result]);

  return result;
};
