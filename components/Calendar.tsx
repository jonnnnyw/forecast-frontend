import React, { useCallback, useEffect, useState } from 'react';
import { styled } from '../stitches.config';
import * as BaseLabel from '@radix-ui/react-label';
import { getSiblingMonths, isInDateRange } from '../utils';

import { max } from 'lodash';

const Calendar = styled('div', {
  zIndex: 3,
  gap: '$8 $4',
  width: '100%',
  padding: '$16',
  position: 'absolute',
  color: '$primary',
  textAlign: 'center',
  borderRadius: '$4',
  backgroundColor: '$contrast',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridTemplateAreas: '"prev year next" "days days days"',
  variants: {
    open: {
      false: { display: 'none' },
      true: { display: 'grid' }
    }
  }
});

const Days = styled('nav', {
  gap: '$4',
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
  gridArea: 'days'
});

const Day = styled('button', {
  all: 'unset',
  flex: '0 0 14.%',
  padding: '$8',
  borderRadius: '$4',
  '&:not([disabled]):hover': {
    cursor: 'pointer',
    backgroundColor: '$highlight',
  },
  '&[disabled]': {
    opacity: '0.3'
  },
  variants: {
    active: {
      true: { backgroundColor: '$highlight' },
      false: { backgroundColor: 'none' }
    }
  },
  defaultVariants: {
    active: false
  }
});

const Label = styled(BaseLabel.Root, {
  gridArea: 'year',
  padding: '$4',
});

const Button = styled('button', {
  all: 'unset',
  borderRadius: '$4',
  padding: '$4',
  '&:hover': {
    cursor: 'pointer',
    backgroundColor: '$highlight',
  },
});

type CalendarProps = React.ComponentPropsWithoutRef<typeof Calendar> & {
  open?: boolean,
  max?: Date,
  min?: Date,
  initialValue?: Date,
  onClickDay?: (date: Date) => void,
};

type View = {
  current: Date,
  next: Date,
  prev: Date
};

const Root = ({ open = true, min, max, initialValue, onClickDay, ...props }: CalendarProps) =>  {

  const [day, setDay] = useState(initialValue ?? new Date());
  const [range, setRange] = useState<Date[]>([]);

  const [view, setView] = useState<View>(() => {
    const { prev, next } = getSiblingMonths(day);
    return { current: day, next, prev };
  });

  const handleDate = (date: Date) => {
    setDay(date);
    if(onClickDay) {
      onClickDay(date);
    }
  };

  const handleView = useCallback((date: Date) => {
    const { prev, next } = getSiblingMonths(date);
    setView({ current: date, next, prev });
  }, []);

  useEffect(() => {
    handleView(day);
  }, [open, day, handleView]);

  useEffect(() => {
    const range: Date[] = [];
    const start = new Date(view.current.getTime());
    start.setDate(1);

    while(view.current.getUTCMonth() == start.getUTCMonth()) {
      range.push(new Date(start.getTime()));
      start.setDate(start.getDate() + 1);
    }

    setRange(range);
  }, [view]);

  return (
    <Calendar open={open} {...props}>
      { isInDateRange(view.prev, min) ?
          <Button css={{ gridArea: 'prev' }} onClick={() => handleView(view.prev)}>
           {view.prev.toLocaleDateString([], { month: 'short', timeZone: 'UTC' })}
         </Button>
      :  ''}
      <Label htmlFor="calendar">
        {view.current.toLocaleDateString([], { month: 'short', year: 'numeric', timeZone: 'UTC' })}
      </Label>
      { isInDateRange(view.next, min, max) ?
        <Button css={{ gridArea: 'next' }} onClick={() => handleView(view.next)}>
          {view.next.toLocaleDateString([], { month: 'short', timeZone: 'UTC' })}
        </Button>
      : ''}
      <Days id="calendar">
        {range.map((date, key) => (
          <Day key={key} onClick={() => handleDate(date)} disabled={!isInDateRange(date, min, max)} active={date.getTime() === day.getTime()}>
            {date.toLocaleDateString([], { day: '2-digit', timeZone: 'UTC' })}
          </Day>
        ))}
      </Days>
    </Calendar>
   );
};

Root.displayName = 'Calendar';

export { Root };
