import { _effect } from './internal/core';
import { createLock } from './internal/createLock';
import { ReadonlyRef } from './readonly';
import { ref } from './ref';

export type ComputedRef<T> = ReadonlyRef<T>;

const MODIFY_ERROR = 'Computed values should not be modified.';

export const computed = <T>(fn: () => T): ComputedRef<T> => {
  const internal = ref<T>();
  const modify = createLock(internal, MODIFY_ERROR);

  _effect(() => {
    modify(() => (internal.value = fn()));
  }, [internal]);

  return internal;
};
