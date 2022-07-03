import { Ref } from '../ref';

export const createLock = (ref: Ref, msg: string) => {
  let locked = true;

  ref.subscribe((_, oldValue) => {
    if (locked) {
      ref.value = oldValue;
      throw new Error(msg);
    }
  });

  return (fn: () => void) => {
    locked = false;
    fn();
    locked = true;
  };
};
