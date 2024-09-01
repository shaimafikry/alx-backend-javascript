export const weakmap = WeakMap();
export function queryAPI(endpoint) {
  // define counter
  const nCount = 0;
  // ge the stored value if not set it to 0
  const count = weakmap.get(endpoint) || 0;
  // add a count
  nCount = count + 1;
  weakmap.set(endpoint, nCount);
  if (nCount >= 5) {
    throw new error ('Endpoint load is high');
  }
}