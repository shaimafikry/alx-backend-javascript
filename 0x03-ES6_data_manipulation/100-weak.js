export const weakMap = WeakMap();
export function queryAPI(endpoint) {
  // define counter
  const nCount = 0;
  // ge the stored value if not set it to 0
  const count = weakMap.get(endpoint) || 0;
  // add a count
  nCount = count + 1;
  weakMap.set(endpoint, nCount);
  if (nCount >= 5) {
    throw new error ('Endpoint load is high');
  }
}