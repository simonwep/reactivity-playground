import { assert, expect, test } from 'vitest';
import { computed } from './computed';
import { ref } from './ref';

test('Should recompute a computed property', () => {
  const a = ref(5);
  const b = ref(3);

  const sum = computed(() => a.value + b.value);

  assert.equal(sum.value, 8);

  b.value = 5;

  assert.equal(sum.value, 10);
});

test('Should throw an error on modification', () => {
  const a = ref(5);
  const b = ref(3);

  const sum = computed(() => a.value + b.value);

  expect(() => (sum.value = 5)).toThrow();

  expect(sum.value).toEqual(8);
});

test('Should recompute several computed properties', () => {
  const a = ref(5);
  const b = ref(3);
  const c = ref(7);

  const ab = computed(() => a.value + b.value);
  const bc = computed(() => b.value + c.value);
  const abbc = computed(() => ab.value + bc.value);

  assert.equal(ab.value, 8);
  assert.equal(bc.value, 10);
  assert.equal(abbc.value, 18);

  a.value = 1;
  b.value = 2;
  c.value = 3;

  assert.equal(ab.value, 3);
  assert.equal(bc.value, 5);
  assert.equal(abbc.value, 8);
});
