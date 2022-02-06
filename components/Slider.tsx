import React from 'react';
import { styled } from '../stitches.config';
import * as BaseSlider from '@radix-ui/react-slider';

const Slider = styled(BaseSlider.Root, {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  userSelect: 'none',
  touchAction: 'none',
  '&[data-orientation="horizontal"]': {
    height: 20,
  },
  '&[data-orientation="vertical"]': {
    flexDirection: 'column',
    width: 20,
    height: 100,
  },
});

const Track = styled(BaseSlider.Track, {
  flexGrow: 1,
  backgroundColor: '$accent',
  position: 'relative',
  borderRadius: '9999px',
  '&[data-orientation="horizontal"]': { height: 3 },
  '&[data-orientation="vertical"]': { width: 3 },
});

const Range = styled(BaseSlider.Range, {
  position: 'absolute',
  backgroundColor: '$contrast',
  borderRadius: '9999px',
  height: '100%',
});

const Thumb = styled(BaseSlider.Thumb, {
  all: 'unset',
  width: '$16',
  height: '$16',
  display: 'block',
  backgroundColor: '$contrast',
  boxShadow: '0 2px 10px $primary',
  borderRadius: 10,
  '&:hover': { backgroundColor: '$accent' },
  '&:focus': { boxShadow: '0 0 0 $sizes$2 $colors$accent' },
});

type SliderProps = React.ComponentPropsWithoutRef<typeof Slider>;

const Root = React.forwardRef<HTMLDivElement, SliderProps>(({ ...props }, ref) => {
  const value = props.value || props.defaultValue || [];

  return (
    <Slider {...props} ref={ref}>
      <Track>
        <Range />
      </Track>
      {value.map((_, i) => (
        <Thumb key={i} />
      ))}
    </Slider>
  );
});

Root.displayName = 'Slider';

export { Root };