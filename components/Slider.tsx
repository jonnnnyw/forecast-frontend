import React from 'react';
import { styled } from '../stitches.config';
import * as BaseSlider from '@radix-ui/react-slider';
import * as BaseLabel from '@radix-ui/react-label';

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

const Label = styled(BaseLabel.Root, {
  textTransform: 'uppercase',
  textAlign: 'center',
  display: 'block',
  marginTop: '$4'
});

type SliderProps = React.ComponentPropsWithoutRef<typeof BaseSlider.Slider> & {
  id: string;
  label?: string;
};

const Root = React.forwardRef<HTMLDivElement, SliderProps>(({ id, label, ...props }, ref) => {
  const value = props.value || props.defaultValue || [];

  return (
    <React.Fragment>
      <Slider {...props} id={id} ref={ref}>
        <Track>
          <Range />
        </Track>
        {value.map((_, i) => (
          <Thumb key={i} />
        ))}
      </Slider>
      {label ?
        <Label htmlFor={id}>{label}</Label>
      : ''}
    </React.Fragment>
  );
});

Root.displayName = 'Slider';

export { Root };