import { Ref } from './ref';

const watcher: Set<(v: Ref) => void> = new Set();

export const touch = (ref: Ref) => {
  watcher.forEach((fn) => fn(ref));
};

export const effect = (trigger: () => void, ignored?: Ref[]) => {
  let touched: Ref[] = [];

  const collect = () => {
    // Unsubscribe from all refs previously watched
    touched.forEach((ref) => ref.unSubscribe(collect));
    touched = [];

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
};
