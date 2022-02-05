import React from 'react';
import { styled } from '../stitches.config';

const Menu = styled('nav', {
  color: '$primary',
  position: 'absolute',
  backgroundColor: '$contrast',
  padding: '$16',
  borderRadius: '$4',
  variants: {
    open: {
      true: { display: 'block' },
      false: { display: 'none' }
    }
  }
});

const Item = styled('button', {
  margin: 0,
  width: '100%',
  display: 'block',
  background: 'none',
  border: 'none',
  fontSize: 'inherit',
  fontFamily: 'inherit',
  color: 'inherit',
  padding: '$8 0',
  cursor: 'pointer',
  '&:hover': {
    color: '$highlight',
  },
  '&:not(:last-of-type)': {
    borderBottom: '$borderWidths$1 solid $tertiary',
  },
  variants: {
    align: {
      left: { textAlign: 'left' },
      right: { textAlign: 'right' },
      center: { textAlign: 'center' }
    },
    uppercase: {
      true: { textTransform: 'uppercase' },
      false: { textTransform: 'none' },
    }
  },
  defaultVariants: {
    align: 'left',
    uppercase: false
  }
});

type MenuProps = React.ComponentPropsWithoutRef<typeof Menu> & {
  open?: boolean;
};

const Root = React.forwardRef<HTMLDivElement, MenuProps>(({ children, open = false, ...props }, ref) => {
  return (
    <Menu ref={ref} open={open} {...props}>
      {children}
    </Menu>
  );
});

Root.displayName = 'Menu';

export { Root, Item };
