export const getTagColor = (tagName: string) => {
  if (tagName.includes('feat')) return 'skyblue';
  if (tagName.includes('refactor')) return 'violet';
  if (tagName.includes('bug')) return 'red';
  if (tagName.includes('chore')) return 'olive';
  if (tagName.includes('style')) return 'orange';
  if (tagName.includes('test')) return 'blue';
  if (tagName.includes('pref')) return 'yellow';
  return 'gray';
};
