/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Ref<T = any> {
  value: T;
}

export const ref = <T = any>(init: T): Ref<T> => {
  let value = init;

  return {
    set value(v: T) {
      value = v;
    },

    get value() {
      return value;
    }
  };
};
