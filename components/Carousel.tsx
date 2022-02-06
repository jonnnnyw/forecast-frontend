import { useEffect, useRef, useState } from 'react';
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
  position: 'absolute',
  border: 'none',
  borderRadius: '99999999px',
  transform: 'translateY(-50%)',
  zIndex: 2,
  top: '50%',
  width: 'calc($32 + $16)',
  height: 'calc($32 + $16)',
  color: '$primary',
  backgroundColor: '$contrast',
  opacity: 0.9,
  '&:hover': {
    color: '$contrast',
    backgroundColor: '$highlight',
    cursor: 'pointer',
    opacity: 1.0,
  },
  '> svg': {
    width: '$32',
    height: '$32',
  },
  variants: {
    position: {
      left: { left: '$8' },
      right: { right: '$8' },
    }
  }
});

type CarouselProps = React.ComponentPropsWithoutRef<typeof Carousel>;

const Root = ({ children, ...props }: CarouselProps) => {

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

  useEffect(() => {
    if(stage.current) {
      stage.current.style.left = `${current}px`;
    }
  }, [current])

  return (
    <Carousel ref={root} {...props}>
      <Stage ref={stage}>
        {children}
      </Stage>
      <Button type="button" onClick={handlePrev} position="left" aria-label="Previous">
        <MdChevronLeft />
      </Button>
      <Button type="button" onClick={handleNext} position="right" aria-label="Next">
        <MdChevronRight />
      </Button>
    </Carousel>
  );
};

Root.displayName = 'Carousel';

export { Root };
