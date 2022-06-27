### Summary

This is a demo project to better understand how [Vue3's reactivity](https://vuejs.org/guide/extras/reactivity-in-depth.html#what-is-reactivity) works internally.

This "demo" implements the following functions:

| Function                                         | Description                                                                                    |
|--------------------------------------------------|------------------------------------------------------------------------------------------------|
| [`ref<T>(v: T)`](src/lib/ref.ts)                 | Holds a single value. Can be subscribed to.                                                    |
| [`effect(fn: () => void)`](src/lib/effect.ts)    | Takes a function that gets called whenever a ref inside of it changes its value.               |
| [`computed<T>(v: () => T)`](src/lib/computed.ts) | Takes a function and returns a ref that changes whenever a ref inside of the function changes. |
