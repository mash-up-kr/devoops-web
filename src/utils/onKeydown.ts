import { KeyboardEventHandler, KeyboardEvent } from 'react';

export function onKeyDown(callable: (e: KeyboardEvent<any>) => void, whitelist?: string[]): KeyboardEventHandler<any> {
  return (e) => {
    if (!whitelist) {
      if (e.key !== 'Tab' && e.key !== 'Shift') {
        callable(e);
      }
    } else if (whitelist.find((key) => key === e.key)) {
      callable(e);
    }
    return e;
  };
}
