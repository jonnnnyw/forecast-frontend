import { useRef } from 'react';
import throttle from 'lodash.throttle';

interface ThrottleOptions {
  leading?: boolean;
  trailing?: boolean;
  maxWait?: number;
}

export const useThrottle = (
  callback: (...args: any[]) => any,
  wait?: number,
  options?: ThrottleOptions
) => {
  const ref = useRef(throttle(callback, wait, options));
  return ref.current;
};
