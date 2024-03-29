/* eslint-disable @typescript-eslint/no-explicit-any */
import { _touch } from './internal/core';

export type UnwrapRefs<T extends Ref[] | Ref> = T extends Ref[]
  ? { [K in keyof T]: T[K] extends Ref ? T[K]['value'] : never }
  : T extends Ref
  ? T['value']
  : never;

export type Subscriber<T = any> = (newValue: T, oldValue: T) => void;

export interface Ref<T = any> {
  subscribe(fn: Subscriber<T>);
  unSubscribe(fn: Subscriber<T>);
  value: T;
}

export const ref = <T = any>(init?: T): Ref<T> => {
  const subscribers: Set<Subscriber<T>> = new Set();
  let value = init;

  return {
    subscribe(fn: Subscriber<T>) {
      subscribers.add(fn);
    },

    unSubscribe(fn: Subscriber<T>) {
      subscribers.delete(fn);
    },

    set value(v: T) {
      // Ignore non-changes
      if (v === value) {
        return;
      }

      const oldValue = value;
      value = v;

      // subscribers may be changed when one is called
      const subscriberCount = subscribers.size;
      const interator = subscribers[Symbol.iterator]();
      for (let i = 0; i < subscriberCount; i++) {
        interator.next().value(value, oldValue);
      }
    },

    get value() {
      _touch(this);
      return value;
    }
  };
};
