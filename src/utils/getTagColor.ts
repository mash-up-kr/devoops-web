export const getTagColor = (tag: string) => {
  if (tag.includes('feat')) return 'skyblue';
  if (tag.includes('refactor')) return 'violet';
  if (tag.includes('bug')) return 'red';
  if (tag.includes('chore')) return 'olive';
  if (tag.includes('style')) return 'orange';
  if (tag.includes('test')) return 'blue';
  if (tag.includes('pref')) return 'yellow';
  return 'gray';
};
