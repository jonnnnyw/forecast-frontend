import { styled } from '../stitches.config';

const Root = styled('time', {
  color: 'inherit',
  borderRight: '$borderWidths$1 solid',
  borderColor: 'inherit',
  fontFamily: '$secondary',
  display: 'inline-block',
  variants: {
    size: {
      xs: {
        fontSize: '$xs',
        padding: '$4',
      },
      sm: {
        fontSize: '$sm',
        padding: '$8',
      },
      md: {
        fontSize: '$md',
        padding: '$8',
      },
      lg: {
        fontSize: '$lg',
        padding: '$8',
      },
      xl: {
        fontSize: '$xl',
        padding: '$16',
      },
      xxl: {
        fontSize: '$xxl',
        padding: '$16',
      },
    },
    align: {
      center: { textAlign: 'center' },
      left: { textAlign: 'left' },
      right: { textAlign: 'right' }
    }
  },
  defaultVariants: {
    size: 'md',
    align: 'right'
  },
});

Root.displayName = 'Time';

export { Root };