import type { TagDotColor } from '@/components/common/Tag';

type TagKeys = 'feat' | 'refactor' | 'bug' | 'chore' | 'style' | 'test' | 'perf' | 'deploy' | 'fix' | 'none';

const tagColors: Record<TagKeys, TagDotColor> = {
  feat: 'skyblue',
  refactor: 'violet',
  bug: 'red',
  chore: 'olive',
  style: 'orange',
  test: 'blue',
  perf: 'yellow',
  deploy: 'lime',
  fix: 'rose',
  none: 'gray',
};

const findMatchingTag = (tagName: string) => {
  const checkTag = Object.keys(tagColors).find((tag) => {
    return new RegExp(tag, 'i').test(tagName);
  });

  return (checkTag || 'none') as TagKeys;
};

export const getTagColor = (tagName: string) => {
  const foundTag = findMatchingTag(tagName);
  return tagColors[foundTag];
};
