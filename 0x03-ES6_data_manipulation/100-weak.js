export const weakMap = new WeakMap();
export function queryAPI(endpoint) {
  // ge the stored value if not set it to 0
  const count = weakMap.get(endpoint) || 0;
  // add a count
  const newCount = count + 1;
  weakMap.set(endpoint, newCount);
  if (newCount >= 5) {
    throw new Error('Endpoint load is high');
  }
}
