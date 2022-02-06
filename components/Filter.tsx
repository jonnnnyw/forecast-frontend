import React, { useEffect, useRef, useState } from 'react';
import { styled } from '../stitches.config';
import * as Box from './Box';
import * as Input from '../components/Input';
import * as Label from '../components/Label';
import * as Menu from '../components/Menu';
import * as Calendar from '../components/Calendar';

import { searchArray } from '../utils/array';

const Filter = styled('div', {
  gap: '$32',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gridTemplateAreas: '"location date"',
});

type FilterProps = React.ComponentPropsWithoutRef<typeof Filter> & {
  locations?: string[],
  defaultLocation?: string,
  defaultDate?: Date,
  onFilter: (date: Date, location: string) => void;
};

const Root = React.forwardRef<HTMLDivElement, FilterProps>(({ children, locations = [], defaultLocation, defaultDate, onFilter, ...props }, ref) =>  {

  const stash = useRef<string>();

  const [filter, setFilter] = useState({
    date: defaultDate ?? new Date(),
    location: defaultLocation
  });

  const [items, setItems] = useState<string[]>([]);
  const [active, setActive] = useState<'calendar' | 'menu'>('menu');

  const setDate = (date: Date) => {
    setActive('menu');
    setFilter((current) => ({ ...current, date }));
  }

  const setLocation = (location: string) => {
    setItems([]);
    setFilter((current) => ({ ...current, location }));
  }

  const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter((current) => ({ ...current, location: event.target.value }));
  }

  const handleLocationFocus = () => {
    if(filter.location) {
      stash.current = filter.location;
      setFilter((current) => ({ ...current, location: '' }));
    }
  }

  const handleLocationBlur = () => {
    if(!filter.location && stash.current) {
      setFilter((current) => ({ ...current, location: stash.current }));
      stash.current = '';
    }
  }

  useEffect(() => {
    const items = (filter.location && !locations.includes(filter.location)) ?
      searchArray(locations, filter.location, 5) : [];
    setItems(items);
  }, [filter.location, locations]);

  useEffect(() => {
    if(filter.location && filter.date) {
      onFilter(filter.date, filter.location);
    }
  }, [filter, onFilter]);

  return (<Filter ref={ref} {...props}>
    <Box.Root css={{ gridArea: 'location', position: 'relative' }}>
      <Label.Root htmlFor="location" css={{ marginBottom: '$4' }}>Location</Label.Root>
      <Input.Root 
        id="location" 
        value={filter.location} 
        onChange={handleLocationChange} 
        onFocus={handleLocationFocus}
        onBlur={handleLocationBlur}
        onClick={() => setActive('menu')} 
        autoComplete="off" 
        uppercase 
      />
      {items.length ? 
        <Menu.Root open={active === 'menu'} css={{ width: '100%', marginTop: '$1' }}>
          {items.map((item, key) => <Menu.Item key={key} onClick={() => setLocation(item)} uppercase>{item}</Menu.Item>)}
        </Menu.Root>
      : ''}
    </Box.Root>
    <Box.Root css={{ gridArea: 'date', position: 'relative' }}>
      <Label.Root css={{ marginBottom: '$4' }} htmlFor="date">Date</Label.Root>
      <Input.Root id="date" value={filter.date.toLocaleDateString()} onClick={() => setActive('calendar')} readOnly />
      <Calendar.Root open={active === 'calendar'} defaultValue={filter.date} onClickDay={setDate} />
    </Box.Root>
    {children}
  </Filter>);
});

Root.displayName = 'Filter';

export { Root };
