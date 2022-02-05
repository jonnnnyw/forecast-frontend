import { styled } from '../stitches.config';

const Root = styled('div', {
  boxSizing: 'border-box',
  outline: 'none',
  variants: {
    space: {
      true: {
        padding: '$16',
        '@bp2': { padding: '$32' },
        '@bp5': { padding: '$64' },
      },
      x: {
        paddingX: '$16',
        '@bp2': { paddingX: '$32' },
        '@bp5': { paddingX: '$64' },
      },
      y: {
        paddingY: '$16',
        '@bp2': { paddingY: '$32' },
        '@bp5': { paddingY: '$64' },
      },
    },
    color: {
      primary: { backgroundColor: '$primary' },
      secondary: { backgroundColor: '$secondary' },
      tertiary: { backgroundColor: '$tertiary' },
    },
  },
});

Root.displayName = 'Box';

export { Root };
