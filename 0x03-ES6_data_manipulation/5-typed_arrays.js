export default function createInt8TypedArray(length, position, value) {
  if (position >= 10) {
    console.log('Position outside range');
  }
  const newData = new ArrayBuffer(length);
  const dataView = new DataView(newData);
  dataView.setInt8(position, value);
  return dataView;
}
