import { globalCss } from '../stitches.config';

const globalStyles = globalCss({
  '*': {
    boxSizing: 'border-box'
  },
  html: {
    fontSize: '62.5%',
  },
  body: {
    margin: 0,
    padding: 0,
    backgroundColor: '$primary',
    fontFamily: '$primary',
    fontSize: '$md',
    fontWeight: '$300',
  },
  'input::-webkit-outer-spin-button, input::-webkit-inner-spin-button': {
    '-webkit-appearance': 'none',
    margin: 0,
  },
  'input[type=number]': {
    '-moz-appearance': 'textfield',
  },
  'input:-webkit-autofill': {
    '-webkit-background-clip': 'text',
  },
});

export default globalStyles;
