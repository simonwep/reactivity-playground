import { createLock } from './internal/createLock';
import { ref, Ref } from './ref';

export type ReadonlyRef<T> = Ref<T>;

const MODIFY_ERROR = 'Computed values should not be modified.';

export const readonly = <T>(v: Ref<T>): ReadonlyRef<T> => {
  const internal = ref<T>(v.value);
  const modify = createLock(internal, MODIFY_ERROR);

  v.subscribe((value) => {
    modify(() => (internal.value = value));
  });

  return internal;
};
