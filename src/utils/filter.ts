/**
 * 키-값 쌍을 기준으로 객체 배열을 필터링하는 제네릭 함수입니다.
 *
 * @template T - 배열에 있는 객체의 타입.
 * @param {T[] | undefined} array - 필터링할 객체 배열.
 * @param {keyof T} key - 비교할 객체의 키.
 * @param {T[keyof T]} value - 일치시킬 값.
 * @returns {T[]} - 필터링된 객체를 포함하는 새로운 배열.
 *
 * @example
 * const users = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
 * const alices = filterBy(users, 'name', 'Alice'); // [{ id: 1, name: 'Alice' }]
 * const user1 = filterBy(users, 'id', 1); // [{ id: 1, name: 'Alice' }]
 */
export function filterBy<T>(array: T[] | undefined, key: keyof T, value: T[keyof T]): T[] {
  if (!array) {
    return [];
  }
  return array.filter((item) => item[key] === value);
}
