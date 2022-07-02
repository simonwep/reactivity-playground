import { Ref, UnwrapRefs } from './ref';

export type StopWatchCallback = () => void;

export type WatchCallback<T extends Ref[] | Ref> = (
  args: UnwrapRefs<T>
) => void;

export interface WatchOptions {
  immediate?: boolean;
}

export const watch = <T extends Ref[] | Ref>(
  refs: T,
  cb: WatchCallback<T>,
  options: WatchOptions = {}
): StopWatchCallback => {
  const isList = Array.isArray(refs);
  const refsList: Ref[] = isList ? refs : [refs];

  const trigger = () => {
    cb(
      isList
        ? (refsList.map((v) => v.value) as UnwrapRefs<T>)
        : refsList[0].value
    );
  };

  if (options.immediate) {
    trigger();
  }

  refsList.forEach((ref) => ref.subscribe(trigger));
  return () => refsList.forEach((ref) => ref.unSubscribe(trigger));
};
