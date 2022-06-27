### Summary

This is a demo project to better understand how [Vue3's reactivity](https://vuejs.org/guide/extras/reactivity-in-depth.html#what-is-reactivity) works internally.


### [`ref<T>(v: T)`](src/lib/ref.ts)

A `ref` holds a single value which can be changed at any time and subscribed to:

```ts
const a = ref(0);

a.subscribe((value, oldValue) => console.log({value, oldValue}))

a.value = 5; // Logs {value: 5, oldValue: 0}
a.value = 2; // Logs {value: 2, oldValue: 5}
```

> [refs in Vue3](https://vuejs.org/api/reactivity-core.html#ref).

### [`effect(fn: () => void)`](src/lib/effect.ts)

An effect takes a function which gets called whenever the ref accessed in it changes:

```ts
const a = ref(0);
const b = ref(0);

effect(() => {
  console.log({a: a.value, b: b.value});
});

a.value = 5; // Logs {a: 5, b: 0}
b.value = 3; // Logs {a: 5, b: 3}
```

> [effects in Vue3](https://vuejs.org/api/reactivity-core.html#watcheffect).

### [`computed<T>(v: () => T)`](src/lib/computed.ts)

Same as effect but returning a value:

```ts
const a = ref(0);
const b = ref(0);

const sum = computed(() => a.value + b.value);

sum.subscribe((value, oldValue) => console.log({value, oldValue}))

a.value = 3; // Logs {value: 3, oldValue: 0}
b.value = 5; // Logs {value: 5, oldValue: 3}
```
