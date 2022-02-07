import React, { useRef, useState } from 'react';
import { InView } from 'react-intersection-observer';
import { formatTime, addToArray, removeFromArray } from '../utils';
import { useThrottle } from '../hooks';
import { styled } from '../stitches.config';
import * as Time from './Time';
import * as Carousel from './Carousel';
import * as Box from './Box';
import * as Slider from './Slider';

const TimeScroller = styled('div', {
  bottom: 0, 
  zIndex: 2,
  position: 'fixed',
  width: '100%',
  backgroundColor: '$tertiary',
});

type TimeScrollerProps = React.ComponentPropsWithoutRef<typeof TimeScroller> & {
  hours: Date[],
  onTimeChange?: (times: number[]) => void,
};

const Root = ({ children, hours, onTimeChange, ...props }: TimeScrollerProps) =>  {

  const times = useRef<number[]>([]);
  const [scale, setScale] = useState<number>(10);

  const handleTime = (hour: Date, isVisible: boolean) => {
    isVisible ? 
      addToArray(times.current, hour.getTime()) :
      removeFromArray(times.current, hour.getTime());
    
    if(onTimeChange) {
      onTimeChange(times.current);
    }
  };

  const handleScale = useThrottle((values: number[]) => {
    setScale(values[0] ?? 10);
  }, 100);

  if(!hours.length) {
    return null;
  }

  return (
    <TimeScroller { ...props }>
      <Carousel.Root scale={scale}>
        {hours.map((hour) => (
          <InView as="span" onChange={(inView) => handleTime(hour, inView)} threshold={1} key={hour.getTime()}>
            <Time.Root dateTime={hour.toLocaleDateString()} size="xl" css={{ width: `${scale}rem` }}>
              {formatTime(hour)}
            </Time.Root>
          </InView>
        ))}
      </Carousel.Root>
      <Box.Root css={{ padding: '$16', width: '100vw', margin: '0 auto', '@bp2': { width: '50vw' } }}>
        <Slider.Root id="time" min={10} max={25} defaultValue={[scale]} onValueChange={handleScale} />
        {children}
      </Box.Root>
    </TimeScroller>
  );
};  

Root.displayName = 'TimeScroller';

export { Root };
