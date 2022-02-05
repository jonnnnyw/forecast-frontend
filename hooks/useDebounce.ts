import { useRef } from 'react';
import debounce from 'lodash.debounce';

interface DebounceOptions {
  leading?: boolean;
  trailing?: boolean;
  maxWait?: number;
}

export const useDebounce = (
  callback: (...args: any[]) => any,
  wait?: number,
  options?: DebounceOptions
) => {
  const ref = useRef(debounce(callback, wait, options));
  return ref.current;
};
