import { assert, expect, test, vi } from 'vitest';
import { ref } from './ref';

test('Should alter the state of a ref', () => {
  const v = ref(0);
  assert.equal(v.value, 0);

  v.value = 1;
  assert.equal(v.value, 1);
});

test('Should subscribe to a ref', () => {
  const v = ref(0);
  const cb = vi.fn(() => 0);
  v.subscribe(cb);

  v.value = 5;
  expect(cb).toHaveBeenCalledOnce();

  v.value = 3;
  v.value = 2;
  expect(cb).toHaveBeenCalledTimes(3);

  v.unSubscribe(cb);

  v.value = 3;
  v.value = 2;
  expect(cb).toHaveBeenCalledTimes(3);
});
