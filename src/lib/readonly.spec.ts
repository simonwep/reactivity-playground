import { expect, test } from 'vitest';
import { readonly } from './readonly';
import { ref } from './ref';

test('Should throw an error if a readonly ref is modified', () => {
  const v = ref(5);
  const v2 = readonly(v);

  expect(v.value).toEqual(5);
  expect(v2.value).toEqual(5);

  v.value = 6;

  expect(v.value).toEqual(6);
  expect(v2.value).toEqual(6);

  expect(() => (v2.value = 8)).toThrow();

  expect(v2.value).toEqual(6);
});
