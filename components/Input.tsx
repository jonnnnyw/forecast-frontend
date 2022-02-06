import { styled } from '../stitches.config';

const Root = styled('input', {
  color: 'inherit',
  width: '100%',
  display: 'block',
  background: 'none',
  border: '$borderWidths$2 solid',
  borderColor: 'inherit',
  borderRadius: '9999999999px',
  padding: '$8',
  fontFamily: '$primary',
  fontSize: '$md',
  fontWeight: '$300',
  '&:focus': {
    outline: 'none',
    borderColor: '$accent',
  },
  '&:-webkit-autofill, &:-webkit-autofill:hover, &:-webkit-autofill:focus': {
    '-webkit-text-fill-color': '$colors$contrast',
    borderColor: '$colors$contrast'
  },
  variants: {
    center: {
      true: { textAlign: 'center' },
      false: { textAlign: 'center' },
    },
    uppercase: {
      true: { textTransform: 'uppercase' },
      false: { textTransform: 'none' },
    }
  },
  defaultVariants: {
    center: true,
    uppercase: false,
  },
});

Root.displayName = 'Input';

export { Root };