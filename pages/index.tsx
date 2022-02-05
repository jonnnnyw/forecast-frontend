import React, { useCallback, useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation';
import { InView } from 'react-intersection-observer';
import { useForecast, useDebounce } from '../hooks';
import { hoursToSerie } from '../transformers/hoursToSerie';
import { addToArray, removeFromArray, filterDatumByTime } from '../utils';
import { styled, themes } from '../stitches.config';
import * as Heading from '../components/Heading';
import * as Box from '../components/Box';
import * as Time from '../components/Time';
import * as Filter from '../components/Filter';
import * as ChartLine from '../components/ChartLine';
import * as Carousel from '../components/Carousel';

import { Point, Query, Serie } from '../types';

import globalStyles from '../styles';

const Layout = styled(Box.Root, {
  color: '$contrast',
  display: 'grid',
  columnGap: '$64',
  gridTemplateAreas: '"header" "main" "footer"',
  '@bp3': {
    gridTemplateColumns: 'repeat(4, 1fr)',
    gridTemplateRows: 'minmax(50vh, auto) minmax(50vh, auto) auto',
    gridTemplateAreas:
      '". header header ." "main main main main" "footer footer footer footer"',
  },
});

const Title = styled(Heading.Root, {
  margin: 0,
  marginBottom: '$16',
  fontSize: '8rem',
  fontWeight: '$600',
  gridArea: 'title'
});

const Header = styled('header', {
  gridArea: 'header',
  alignSelf: 'center',
});

const Main = styled('main', {
  gridArea: 'main',
  backgroundColor: '$secondary',
});

const Section = styled('section', {
  padding: '$64'
});

const Footer = styled('footer', {
  gridArea: 'footer',
  backgroundColor: '$secondary',
  color: '$contrast',
  textAlign: 'center',
  fontFamily: '$secondary',
  textTransform: 'uppercase',
  letterSpacing: '$2',
  padding: '$16',
});

type HomeProps = {
  points: Point[]
};

type Data = {
  hours: Date[],
  metrics: { [index: string]: Serie },
  visible: { [index: string]: Serie }
};

const Home = ({ points }: HomeProps) => {
  globalStyles();

  const { t } = useTranslation('home');

  const times = useRef<number[]>([]);

  const [data, setData] = useState<Data>({ hours: [], metrics: {}, visible: {} });
  const [locations, setLocations] = useState<string[]>([]);
  const [query, setQuery] = useState<Query>({
    date: '2022-01-19T06:00:00+13:00',
    lat: 0.23232,
    lng: 0.2323223
  });

  const { forecast, isLoading, isError } = useForecast(query);

  /** */
  const handleQuery = useCallback((date: string, location: string) => {
    if(date && location) {
      if(locations.includes(location)) {
        const point = points.find((point) => point.name === location);
      }
    }
  }, [locations, points]);

  /** */
  const handleTime = (hour: Date, isVisible: boolean) => {
    isVisible ? 
      addToArray(times.current, hour.getTime()) :
      removeFromArray(times.current, hour.getTime());
    filterData(times.current, data);
  };

  /** */
  const filterData = useDebounce((times: number[], data: Data) => {
    const visible = filterDatumByTime(times, data.metrics);
    setData({  ...data, visible });
  }, 500, { leading: false });
  
  /** */
  useEffect(() => {
    if(forecast && forecast.hours.length) {
      const hours = forecast.hours.map((hour) => new Date(hour.time));
      const waveHeight = hoursToSerie(forecast.hours, 'waveHeight', 'meteo');
      setData({
        hours,
        metrics: { waveHeight },
        visible: { waveHeight }
      });
    }
  }, [forecast]);

  /** */
  useEffect(() => {
    setLocations(points.map((point) => point.name))
  }, [points]);

  return (
    <Layout className={`${themes[0].rules}`}>
      <Head>
        <title>{t('Forecast')}</title>
        <meta name="description" content={t('Forecast')} />
        <meta name="viewport" content="initial-scale=1.0, width=device-width, user-scalable=no" />
      </Head>
      <Header>
        <Title uppercase center>
          {t('Forecast')}
        </Title>
        <Filter.Root 
          locations={locations} 
          defaultDate={query.date} 
          defaultLocation="Raglan" 
          onFilter={handleQuery} 
        />
      </Header>
      <Main>
        {data.hours.length ?
          <Carousel.Root css={{ top: 0, position: 'sticky' }}>
            {data.hours.map((hour) => (
              <InView as="span" onChange={(inView) => handleTime(hour, inView)} threshold={0.5} key={hour.getTime()}>
                <Time.Root dateTime={hour.toLocaleDateString()} size="xl" css={{ width: '20vw' }}>
                  {hour.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
                </Time.Root>
              </InView>
            ))}
          </Carousel.Root>
        : ''}
        {data.visible?.waveHeight ?
          <Section css={{ height: 'calc(40rem + $64 + $64)', maxWidth: '100vw' }}>
            <Heading.Root as="h3" uppercase center>{t('Wave Height')}</Heading.Root>
            <ChartLine.Root dataset={data.visible.waveHeight} />
          </Section>
        : ''}
      </Main>
      <Footer>Forecast</Footer>
    </Layout>
  );
};

export async function getStaticProps() {
  
  const points: Point[] = [
    {name: 'Raglan', lat: 1.2323, lng: 1.234343},
    {name: 'Raglan Bay', lat: 1.2323, lng: 1.234343},
    {name: 'Tauranga', lat: 1.2323, lng: 1.234343},
    {name: 'Tauranga Bay', lat: 1.2323, lng: 1.234343},
  ];

  return {
    props: {
      points,
    },
    revalidate: 86400,
  }
};

export default Home;
