import React, { useEffect } from 'react';

export const useClickOutside = <T extends Element>(ref: React.RefObject<T>, callback: (target: T) => void) => {
  useEffect(() => {
      function handleClick(event: Event) {
        if(event.target instanceof Element) {
          if (ref.current && !ref.current.contains(event.target)) {
            callback(ref.current);
          }
        }
      }

      document.addEventListener('mousedown', handleClick);
      return () => document.removeEventListener('mousedown', handleClick);
  }, [ref, callback]);
};