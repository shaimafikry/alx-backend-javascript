export default function hasValuesFromArray(set, arr) {
  for (const i in arr) {
    if (!set.has(arr[i])) {
      return false;
    }
  }
  return true;
}
