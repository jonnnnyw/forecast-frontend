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

  const [current, setCurrent] = useState(0);

  const handleNext = () => {
    const rWidth = root.current?.offsetWidth ?? 0;
    const sWidth = stage.current?.offsetWidth ?? 0;

    const position = Math.max(current - (rWidth/2), ((sWidth - rWidth) * -1));

    if(current > position) {
       setCurrent(position);
    }
  };

  const handlePrev = () => {
    if(current < 0) {
       setCurrent(Math.min(current + ((root.current?.offsetWidth ?? 0)/2), 0));
    }
  };

  const handleResize = useCallback(() => {
    if(stage.current && root.current) {
      const max = (stage.current.offsetWidth - root.current.offsetWidth) * -1;
      setCurrent((current) => current < max ? max : current);
    }
  }, []);

  useEffect(() => {
    if(stage.current) {
      stage.current.style.left = `${current}px`;
    }
  }, [current]);

  useEffect(() => {
    if(stage.current && root.current) {
      handleResize();
    }
  }, [scale, handleResize]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize])

  return (
    <Carousel ref={root} {...props}>
      <Stage ref={stage}>
        {children}
      </Stage>
      { current < 0 ?
          <Button type="button" onClick={handlePrev} position="left" aria-label="Previous">
            <MdChevronLeft /> Past
          </Button>
      : ''}
      <Button type="button" onClick={handleNext} position="right" aria-label="Next">
        Future <MdChevronRight />
      </Button>
    </Carousel>
  );
};

Root.displayName = 'Carousel';

export { Root };
