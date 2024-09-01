export default function updateUniqueItems(argMap) {
  if (!(argMap instanceof Map)) {
    throw new Error('argument is not a map');
  }
  // For each entry of the map where the quantity
  // is 1, update the quantity to 100
  // foreach in maos get the balue first
  argMap.forEach((value, key) => {
    if (value === 1) {
      argMap.set(key, 100);
    }
  });
}
