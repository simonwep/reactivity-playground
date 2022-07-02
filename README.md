## Summary

This is a demo project to better understand how [Vue3's reactivity](https://vuejs.org/guide/extras/reactivity-in-depth.html#what-is-reactivity) works internally.
Some features are ignored on purpose as it doesn't make that much sense to implement those in vanilla js without having a lifecycle.

### Implementations

* [Refs](#refs)
* [Effects](#effects)
* [Computed values](#computed-values)
* [Watchers](#watchers)

### Refs

> [back to top](#summary) | [source](src/lib/ref.ts) | [ref in vue](https://vuejs.org/api/reactivity-core.html#ref)

#### Signature

```ts
interface Ref<T = any> {
  subscribe(fn: Subscriber<T>);
  unSubscribe(fn: Subscriber<T>);
  value: T;
};

type ref = (v: T) => Ref<T>;
```

#### Example

A `ref` holds a single value which can be changed at any time and subscribed to:

```ts
const a = ref(0);

a.subscribe((value, oldValue) => console.log({ value, oldValue }))

a.value = 5; // Logs {value: 5, oldValue: 0}
a.value = 2; // Logs {value: 2, oldValue: 5}
```

### Effects

> [back to top](#summary) | [source](src/lib/effect.ts) | [ref in vue](https://vuejs.org/api/reactivity-core.html#watcheffect)

#### Signature

````ts
type StopEffectCallback = () => void;
type effect = (fn: () => void) => StopEffectCallback;
````

#### Example

An effect takes a function which gets called whenever the ref accessed in it changes:

```ts
const a = ref(0);
const b = ref(0);

effect(() => console.log({ a: a.value, b: b.value }));

a.value = 5; // Logs {a: 5, b: 0}
b.value = 3; // Logs {a: 5, b: 3}
```

`effect` returns a function to clear it:

```ts
const a = ref(0);
const b = ref(0);

const stop = effect(() => console.log({ a: a.value, b: b.value }));

a.value = 5; // Logs {a: 5, b: 0}

stop();
a.value = 5; // Logs nothing
```

### Computed values

> [back to top](#summary) | [source](src/lib/computed.ts) | [ref in vue](https://vuejs.org/guide/essentials/computed.html)

#### Signature

```ts
type ComputedRef<T> = Ref<T>;
type computed = <T>(v: () => T) => ComputedRef<T>;
```

#### Example

Same as effect but returning a value:

```ts
const a = ref(0);
const b = ref(0);

const sum = computed(() => a.value + b.value);

sum.subscribe((value, oldValue) => console.log({ value, oldValue }))

a.value = 3; // Logs {value: 3, oldValue: 0}
b.value = 5; // Logs {value: 5, oldValue: 3}
```

Trying to set the value of a computed value will throw an error.

### Watchers

> [back to top](#summary) | [source](src/lib/watch.ts) | [ref in vue](https://vuejs.org/guide/essentials/watchers.html)

#### Signature

```ts
interface WatchOptions {
  immediate?: boolean;
};

type StopWatchCallback = () => void;
type WatchCallback<T extends Ref[] | Ref> = (args: UnwrapRefs<T>) => void;

type watch = <T extends Ref[] | Ref>(
  refs: T,
  cb: WatchCallback<T>,
  options: WatchOptions
) => StopWatchCallback;
```

#### Example

Watches a list or a single ref.

```ts
const a = ref(6);
const b = ref(3);

const stop = watch([a, b], ([a, b]) => {
  console.log({ a, b }); // {a: 6, b: 4}
});

// Trigger watch by changing "b"
b.value = 4;

// Stop watching
stop();
```
