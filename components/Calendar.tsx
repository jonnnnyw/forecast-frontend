import React from 'react';
import { styled } from '../stitches.config';
import RootCalendar from 'react-calendar';

const Calendar = styled('div', {
  position: 'absolute',
  zIndex: 2,
  variants: {
    open: {
      false: { display: 'none' },
      true: { display: 'block' }
    }
  }
});

type CalendarProps = React.ComponentPropsWithoutRef<typeof RootCalendar> & {
  open?: boolean;
};

const Root = ({ open = false, ...props }: CalendarProps) =>  {
  return (
    <Calendar open={open}>
      <RootCalendar {...props} />
    </Calendar>
   );
};

Root.displayName = 'Calendar';

export { Root };
