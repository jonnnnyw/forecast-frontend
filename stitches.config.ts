import { createStitches } from '@stitches/react';

const scale: { [index: number]: string } = {
  1: '0.1rem',
  2: '0.2rem',
  4: '0.4rem',
  8: '0.8rem',
  16: '1.6rem',
  32: '3.2rem',
  64: '6.4rem',
};

export const { styled, css, globalCss, keyframes, getCssText, createTheme, theme, config } = createStitches({
  theme: {
    colors: {
      primary: 'rgb(0,30,40)',
    },
    space: {
      ...scale,
    },
    sizes: {
      ...scale,
    },
    radii: {
      ...scale,
    },
    borderWidths: {
      ...scale,
    },
    letterSpacings: {
      ...scale,
    },
    fonts: {
      primary: 'Merriweather Sans, Arial, Times New Roman, serif',
      secondary: 'Sulphur Point, Tahoma, Arial, sans-serif',
    },
    fontSizes: {
      xxs: '0.8rem',
      xs: '1rem',
      sm: '1.4rem',
      md: '1.6rem',
      lg: '2.2rem',
      xl: '3rem',
      xxl: '3.5rem',
      massive: '4rem',
    },
    fontWeights: {
      300: '300',
      400: '400',
      700: '700',
    },
    lineHeights: {
      ...scale,
    },
  },
  media: {
    bp1: '(min-width: 576px)',
    bp2: '(min-width: 769px)',
    bp3: '(min-width: 992px)',
    bp4: '(min-width: 1200px)',
    bp5: '(min-width: 1999px)',
  },
  utils: {
    paddingX: () => (value: string) => ({
      paddingLeft: value,
      paddingRight: value,
    }),
    paddingY: () => (value: string) => ({
      paddingTop: value,
      paddingBottom: value,
    }),
    marginX: () => (value: string) => ({
      marginLeft: value,
      marginRight: value,
    }),
    marginY: () => (value: string) => ({
      marginTop: value,
      marginBottom: value,
    }),
    size: () => (value: string) => ({
      width: value,
      height: value,
    }),
  },
});


export const themes = [
  {
    name: 'Dark',
    rules: createTheme({
      colors: {
        primary: 'rgb(0,30,40)',
        secondary: 'rgb(0,26,34)',
        tertiary: 'rgb(0,30,40,.9)',
        contrast: 'rgb(247,222,199)',
        accent: 'rgb(102,194,165)',
        highlight: 'rgb(102,194,165)',
      },
    }),
  },
];
