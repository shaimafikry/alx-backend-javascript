import ClassRoom from './0-classroom';

export default function initializeRooms() {
  const classList = [];
  classList.push(new ClassRoom(19));
  classList.push(new ClassRoom(20));
  classList.push(new ClassRoom(34));
  return classList;
}
