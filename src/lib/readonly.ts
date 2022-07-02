import { ref, Ref } from './ref';

export type ReadonlyRef<T> = Ref<T>;

export const readonly = <T>(v: Ref<T>): ReadonlyRef<T> => {
  const internal = ref<T>(v.value);
  let modifying = false;

  v.subscribe((value) => {
    modifying = true;
    internal.value = value;
    modifying = false;
  });

  internal.subscribe(() => {
    if (!modifying) {
      throw new Error('Cannot modify readonly ref.');
    }
  });

  return internal;
};
