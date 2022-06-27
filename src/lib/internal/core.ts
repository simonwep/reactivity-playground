import { Ref } from '../ref';

const watcher: Set<(v: Ref) => void> = new Set();

export const _touch = (ref: Ref) => {
  watcher.forEach((fn) => fn(ref));
};

export const _effect = (trigger: () => void, ignored?: Ref[]): (() => void) => {
  let touched: Ref[] = [];

  const clear = () => {
    // Unsubscribe from all refs previously watched
    touched.forEach((ref) => ref.unSubscribe(collect));
    touched = [];
  };

  const collect = () => {
    clear();

    // Collect refs accessed during the computed function
    const watch = (ref: Ref) => {
      if (!ignored?.includes(ref)) {
        touched.push(ref);
      }
    };

    // Subscribe to all refs
    watcher.add(watch);
    trigger();

    // Unsubscribe and activate effect
    watcher.delete(watch);
    touched.forEach((ref) => ref.subscribe(collect));
  };

  collect();
  return clear;
};
