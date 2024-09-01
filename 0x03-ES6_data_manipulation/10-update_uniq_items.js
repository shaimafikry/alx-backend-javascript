export default function updateUniqueItems(argMap) {
  if (typeof argMap !== 'map') {
    throw new Error ('argument is not a map');
  }
  // For each entry of the map where the quantity
  // is 1, update the quantity to 100
  for (const key in argMap) {
    if (argMap.key === 1) {
      argMap.key = 100;
    }
  }
}
