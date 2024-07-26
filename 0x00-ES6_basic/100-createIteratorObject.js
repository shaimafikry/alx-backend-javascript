export default function createIteratorObject(report) {
  const nameList = [];
  // get the first parameter of the object report
  const keyFirst = Object.keys(report)[0];
  // loop through the values of the key
  for (const value of Object.values(report[keyFirst])) {
    // spread the list before pushing i to the new one
    // as the values are lists
    nameList.push(...value);
  }
  return nameList;
}
