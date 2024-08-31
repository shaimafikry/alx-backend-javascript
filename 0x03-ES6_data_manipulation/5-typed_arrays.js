export default function createInt8TypedArray(length, position, value) {
  if (position < 0 || position >= length) {
    throw new Error('Position outside range');
  }
  const newData = new ArrayBuffer(length);
  const dataView = new DataView(newData);
  dataView.setInt8(position, value);
  return dataView;
}
