export function findIndexById<T extends { id: number }>(collection: T[], id: number) {
  return collection.findIndex((item) => item.id === id);
}
