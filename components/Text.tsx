import { styled } from '../stitches.config';

const Root = styled('p', {
  lineHeight: 1.5,
  marginTop: 0,
  marginBottom: '$16',
  variants: {
    uppercase: {
      true: {
        textTransform: 'uppercase',
        letterSpacing: '$1',
      },
    },
    center: {
      true: {
        textAlign: 'center',
      },
    },
    size: {
      xs: {
        fontSize: '$xs',
      },
      sm: {
        fontSize: '$sm',
      },
      md: {
        fontSize: '$md',
      },
      lg: {
        fontSize: '$lg',
      },
      xl: {
        fontSize: '$xl',
      },
      xxl: {
        fontSize: '$xxl',
      },
    },
    justify: {
      true: {
        textAlign: 'justify',
        textJustify: 'inter-word',
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

Root.displayName = 'Text';

export { Root };