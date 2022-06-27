import { expect, test, vi } from 'vitest';
import { effect } from './effect';
import { ref } from './ref';

test('Should trigger an effect', () => {
  const a = ref(5);
  const b = ref(3);
  const c = ref(2);

  const cb = vi.fn(() => {
    void a.value;
    void b.value;
  });

  effect(cb);
  expect(cb).toHaveBeenCalledTimes(1);

  c.value = 5;
  a.value = 2;
  b.value = 5;
  expect(cb).toHaveBeenCalledTimes(3);

  c.value = 5;
  a.value = 2;
  b.value = 5;
  expect(cb).toHaveBeenCalledTimes(3);
});

test('Should stop an effect', () => {
  const a = ref(5);
  const b = ref(3);
  const c = ref(2);

  const cb = vi.fn(() => {
    void a.value;
    void b.value;
  });

  const stop = effect(cb);
  expect(cb).toHaveBeenCalledTimes(1);

  c.value = 5;
  a.value = 2;
  b.value = 5;
  expect(cb).toHaveBeenCalledTimes(3);

  stop();

  c.value = 0;
  a.value = 0;
  b.value = 0;
  expect(cb).toHaveBeenCalledTimes(3);
});
