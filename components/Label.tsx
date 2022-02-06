import { styled } from '../stitches.config';

const Root = styled('label', {
  display: 'block',
  fontFamily: '$secondary',
  fontWeight: '$300',
  padding: '0 $8',
  letterSpacing: '$1',  
  variants: {
    uppercase: {
      true: { textTransform: 'uppercase' },
      false: { textTransform: 'none' },
    },
    required: {
      true: {
        '&:before': {
          content: '*',
          color: '$accent',
          paddingRight: '$4',
        },
      },
    },
  },
  defaultVariants: {
    uppercase: true,
  },
});

Root.displayName = 'Label';

export { Root };
