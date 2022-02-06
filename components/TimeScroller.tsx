import React, { useRef } from 'react';
import { InView } from 'react-intersection-observer';
import { formatTime, addToArray, removeFromArray } from '../utils';
import { styled } from '../stitches.config';
import * as Time from './Time';
import * as Carousel from './Carousel';

const TimeScroller = styled(Carousel.Root, {
  bottom: 0, 
  zIndex: 2,
  position: 'fixed'
});

type TimeScrollerProps = React.ComponentPropsWithoutRef<typeof TimeScroller> & {
  hours: Date[],
  onTimeChange?: (times: number[]) => void
};

const Root = ({ hours, onTimeChange, ...props }: TimeScrollerProps) =>  {

  const times = useRef<number[]>([]);

  const handleTime = (hour: Date, isVisible: boolean) => {
    isVisible ? 
      addToArray(times.current, hour.getTime()) :
      removeFromArray(times.current, hour.getTime());
    
    if(onTimeChange) {
      onTimeChange(times.current);
    }
  };

  if(!hours.length) {
    return null;
  }

  return (
    <TimeScroller {...props}>
      {hours.map((hour) => (
        <InView as="span" onChange={(inView) => handleTime(hour, inView)} threshold={0.1} key={hour.getTime()}>
          <Time.Root dateTime={hour.toLocaleDateString()} size="xl" css={{ width: '25vw' }}>
            {formatTime(hour)}
          </Time.Root>
        </InView>
      ))}
    </TimeScroller>
  );
};

Root.displayName = 'TimeScroller';

export { Root };
