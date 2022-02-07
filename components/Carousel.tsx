import { useCallback, useEffect, useRef, useState } from 'react';
import { styled } from '../stitches.config';

import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

const Carousel = styled('div', {
  overflow: 'hidden',
  position: 'relative',
  width: '100%'
});

const Stage = styled('div', {
  position: 'relative',
  display: 'inline-flex',
  flexWrap: 'nowrap',
  transition: 'left .5s',
  zIndex: 1,
});

const Button = styled('button', {
  all: 'unset',
  zIndex: 2,
  top: '50%',
  position: 'absolute',
  borderRadius: '$4',
  color: '$primary',
  transform: 'translateY(-50%)',
  backgroundColor: '$contrast',
  padding: '$8',
  fontSize: '$sm',
  textTransform: 'uppercase',
  '&:hover': {
    color: '$contrast',
    backgroundColor: '$highlight',
    cursor: 'pointer',
  },
  variants: {
    position: {
      left: { left: '$8' },
      right: { right: '$8' },
    }
  }
});

type CarouselProps = React.ComponentPropsWithoutRef<typeof Carousel> & {
  scale?: number;
};

const Root = ({ children, scale = 1, ...props }: CarouselProps) => {

  const root = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  const [position, setPosition] = useState({ start: 0, end: 0, current: 0 });

  const handleNext = () => {
    const rWidth = root.current?.offsetWidth ?? 0;
    const sWidth = stage.current?.offsetWidth ?? 0;

    const next = Math.max(position.current - (rWidth/2), ((sWidth - rWidth) * -1));

    if(position.current > next) {
      setPosition((position) => ({...position, current: next }));
    }
  };

  const handlePrev = () => {
    if(position.current < 0) {
      const prev = Math.min(position.current  + ((root.current?.offsetWidth ?? 0)/2), 0);
      setPosition((position) => ({...position, current: prev }));
    }
  };

  const handleResize = useCallback(() => {
    if(stage.current && root.current) {
      const end = (stage.current.offsetWidth - root.current.offsetWidth) * -1;
      setPosition((position) => ({ ...position, current: position.current < end ? end : position.current, end: end }));
    }
  }, []);

  useEffect(() => {
    if(stage.current) {
      stage.current.style.left = `${position.current}px`;
    }
  }, [position]);

  useEffect(() => {
    if(stage.current && root.current) {
      handleResize();
    }
  }, [scale, handleResize]);

  useEffect(() => {
    const resize = () => handleResize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [handleResize])

  return (
    <Carousel ref={root} {...props}>
      <Stage ref={stage}>
        {children}
      </Stage>
      { position.current < position.start ?
          <Button type="button" onClick={handlePrev} position="left" aria-label="Previous">
            <MdChevronLeft /> Past
          </Button>
      : ''}
      { position.current > position.end  ?
      <Button type="button" onClick={handleNext} position="right" aria-label="Next">
        Future <MdChevronRight />
      </Button>
      : '' }
    </Carousel>
  );
};

Root.displayName = 'Carousel';

export { Root };
