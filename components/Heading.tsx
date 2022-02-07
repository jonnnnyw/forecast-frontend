import { styled } from '../stitches.config';

const Root = styled('h1', {
  marginTop: 0,
  fontWeight: '$300',
  lineHeight: 1.125,
  fontFamily: '$secondary',
  overflowWrap: 'break-word',
  letterSpacing: '$1',
  variants: {
    uppercase: {
      true: { textTransform: 'uppercase' },
    },
    size: {
      xs: {
        fontSize: '$xs',
        marginBottom: '$8',
      },
      sm: {
        fontSize: '$sm',
        marginBottom: '$32',
      },
      md: {
        fontSize: '$md',
        marginBottom: '$32',
      },
      lg: {
        fontSize: '$lg',
        marginBottom: '$32',
      },
      xl: {
        fontSize: '$xl',
        marginBottom: '$32',
      },
      xxl: {
        fontSize: '$xxl',
        marginBottom: '$32',
      },
    },
    center: {
      true: { textAlign: 'center' },
    },
  },
});

Root.displayName = 'Heading';

export { Root };
