import { expect, test, vi } from 'vitest';
import { ref } from './ref';
import { watch } from './watch';

test('Should watch refs of differnt type', () => {
  const a = ref(5);
  const b = ref('foo');

  const cb = vi.fn(([a, b]) => {
    expect(a).toEqual(6);
    expect(b).toEqual('foo');
  });

  watch([a, b], cb);
  expect(cb).toHaveBeenCalledTimes(0);

  a.value = 6;
  expect(cb).toHaveBeenCalledTimes(1);
});

test('Should immediately trigger a ref', () => {
  const a = ref(5);
  const b = ref('foo');

  const cb = vi.fn(([a, b]) => {
    expect(a).toEqual(5);
    expect(b).toEqual('foo');
  });

  watch([a, b], cb, { immediate: true });
  expect(cb).toHaveBeenCalledTimes(1);
});

test('Should watch a single ref', () => {
  const v = ref(5);

  const cb = vi.fn((v) => {
    expect(v).toEqual(4);
  });

  watch(v, cb);

  v.value = 4;
  expect(cb).toHaveBeenCalledTimes(1);
});

test('Should stop watching refs', () => {
  const v = ref(5);

  const cb = vi.fn((v) => {
    expect(v).toEqual(4);
  });

  const stop = watch(v, cb);

  v.value = 4;
  expect(cb).toHaveBeenCalledTimes(1);

  stop();
  v.value = 8;
  expect(cb).toHaveBeenCalledTimes(1);
});
