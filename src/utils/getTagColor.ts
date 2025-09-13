import type { VariantProps } from 'class-variance-authority';

import { dotVariants } from '@/components/common/Tag';

type TagKeys = 'feat' | 'refactor' | 'bug' | 'chore' | 'style' | 'test' | 'pref' | 'deploy' | 'fix' | 'none';

const tagColors: Record<TagKeys, VariantProps<typeof dotVariants>['dotColor']> = {
  feat: 'skyblue',
  refactor: 'violet',
  bug: 'red',
  chore: 'olive',
  style: 'orange',
  test: 'blue',
  pref: 'yellow',
  deploy: 'lime',
  fix: 'rose',
  none: 'gray',
};

const findMatchingTag = (tagName: string) => {
  const checkTag = Object.keys(tagColors).find((tag) => {
    return new RegExp(tag, 'i').test(tagName);
  });

  return checkTag || 'none';
};

export const getTagColor = (tagName: string) => {
  const foundTag = findMatchingTag(tagName);
  return tagColors[foundTag as TagKeys];
};
