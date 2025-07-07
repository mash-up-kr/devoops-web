import { SyntheticEvent } from 'react';

export function stopPropagation(e: SyntheticEvent<HTMLDivElement, Event>) {
  e.stopPropagation();
}
