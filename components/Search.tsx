import React, { useCallback, useEffect, useRef, useState } from 'react';
import { styled } from '../stitches.config';
import * as Box from './Box';
import * as Input from '../components/Input';
import * as Label from '../components/Label';
import * as Menu from '../components/Menu';
import * as Calendar from '../components/Calendar';
import { formatDate, searchArray } from '../utils';
import { useClickOutside } from '../hooks';

const Search = styled('div', {
  gap: '$16',
  display: 'grid',
  gridTemplateColumns: '1fr',
  gridTemplateAreas: '"location" "date"',
  '@bp2': {
    gap: '$32',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateAreas: '"location date"',
  }
});

type SearchProps = React.ComponentPropsWithoutRef<typeof Search> & {
  locations?: string[],
  defaultLocation?: string,
  defaultDate?: Date,
  maxDate?: Date,
  minDate?: Date,
  onSearch: (date: Date, location: string) => void;
};

const Root = React.forwardRef<HTMLDivElement, SearchProps>(({ children, locations = [], defaultLocation, defaultDate, maxDate, minDate, onSearch, ...props }, ref) =>  {

  const stash = useRef<string>();

  const [query, setQuery] = useState({
    date: defaultDate ?? new Date(),
    location: defaultLocation
  });

  const [items, setItems] = useState<string[]>([]);
  const [active, setActive] = useState<'calendar' | 'menu'>('menu');

  const calendar = useRef<HTMLDivElement>(null);

  useClickOutside(calendar, useCallback(() => setActive('menu'), []));

  const setDate = (date: Date) => {
    setActive('menu');
    setQuery((current) => ({ ...current, date }));
  }

  const setLocation = (location: string) => {
    setItems([]);
    setQuery((current) => ({ ...current, location }));
  }

  const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery((current) => ({ ...current, location: event.target.value }));
  }

  const handleLocationFocus = () => {
    if(query.location) {
      stash.current = query.location;
      setQuery((current) => ({ ...current, location: '' }));
    }
  }

  const handleLocationBlur = () => {
    if(!query.location && stash.current) {
      setQuery((current) => ({ ...current, location: stash.current }));
      stash.current = '';
    }
  }

  useEffect(() => {
    const items = (query.location && !locations.includes(query.location)) ?
      searchArray(locations, query.location, 5) : [];
    setItems(items);
  }, [query.location, locations]);

  useEffect(() => {
    if(query.location && query.date) {
      onSearch(query.date, query.location);
    }
  }, [query, onSearch]);

  return (<Search ref={ref} {...props}>
    <Box.Root css={{ gridArea: 'location', position: 'relative' }}>
      <Label.Root htmlFor="location" css={{ marginBottom: '$8' }}>Location</Label.Root>
      <Input.Root 
        id="location" 
        value={query.location} 
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
      <Label.Root css={{ marginBottom: '$8' }} htmlFor="date">Date</Label.Root>
      <Input.Root id="date" value={formatDate(query.date)} onClick={() => setActive('calendar')} readOnly />
      <Calendar.Root ref={calendar} open={active === 'calendar'} initialValue={query.date} max={maxDate} min={minDate} onClickDay={setDate} />
    </Box.Root>
    {children}
  </Search>);
});

Root.displayName = 'Search';

export { Root };
