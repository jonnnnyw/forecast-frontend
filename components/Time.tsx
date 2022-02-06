import { styled } from '../stitches.config';

const Root = styled('time', {
  color: 'inherit',
  borderRight: '$borderWidths$1 solid',
  borderColor: 'inherit',
  fontFamily: '$secondary',
  display: 'inline-block',
  backgroundColor: '$tertiary',
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
        padding: '$16',
      },
      lg: {
        fontSize: '$lg',
        padding: '$16',
      },
      xl: {
        fontSize: '$xl',
        padding: '$32',
      },
      xxl: {
        fontSize: '$xxl',
        padding: '$32',
      },
    }
  },
  defaultVariants: {
    size: 'md',
  },
});

Root.displayName = 'Time';

export { Root };