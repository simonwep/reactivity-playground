import { assert, test } from 'vitest';
import { ref } from './ref';

test('Should alter the state of an ref', () => {
  const v = ref(0);
  assert.equal(v.value, 0);

  v.value = 1;
  assert.equal(v.value, 1);
});
