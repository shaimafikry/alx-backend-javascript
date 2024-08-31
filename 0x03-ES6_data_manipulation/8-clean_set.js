export default function cleanSet(set, startString) {
  if (startString instanceof String || startString.length > 0) {
    const res = [];
    for (const i of set) {
      if (i.startsWith(startString)) {
        res.push(i.slice(startString.length));
      }
    }
    return res.join('-');
  }
  return '';
}
