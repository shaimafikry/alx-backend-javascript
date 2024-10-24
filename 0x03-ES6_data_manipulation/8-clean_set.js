export default function cleanSet(set, startString) {
  if (typeof startString !== 'string' || startString === '') {
    return '';
  }
  const res = [];
  for (const i of set) {
    if (i && i.startsWith(startString)) {
      res.push(i.slice(startString.length));
    }
  }
  return res.join('-');
}
