import React, { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation';
import { useForecast, useDebounce } from '../hooks';
import { hoursToSerie } from '../transformers/hoursToSerie';
import { filterDatumByTime, formatDate } from '../utils';
import { styled, themes } from '../stitches.config';
import * as BaseLabel from '@radix-ui/react-label';
import * as Heading from '../components/Heading';
import * as Box from '../components/Box';
import * as Image from '../components/Image';
import * as Filter from '../components/Filter';
import * as ChartBar from '../components/ChartBar';
import * as ChartLine from '../components/ChartLine';
import * as ChartDial from '../components/ChartDial';
import * as TimeScroller from '../components/TimeScroller';

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
  fontWeight: '$700',
  gridArea: 'title'
});

const Logo = styled(Image.Root, {
  width: '10rem',
  margin: '0 auto',
  marginBottom: '$8'
});

const Header = styled('header', {
  gridArea: 'header',
  alignSelf: 'center',
  padding: '$64 $16'
});

const Main = styled('main', {
  gridArea: 'main',
  backgroundColor: '$secondary',
  paddingBottom: '$128'
});

const Section = styled('section', {
  padding: '$32'
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

const Label = styled(BaseLabel.Root, {
  display: 'block',
  marginTop: '$4',
  textAlign: 'center',
  '> span': {
    fontSize: '$sm', 
    marginBottom: '$4',
    display: 'block', 
  }
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

  const [data, setData] = useState<Data>({ hours: [], metrics: {}, visible: {} });
  const [locations, setLocations] = useState<string[]>([]);

  const [query, setQuery] = useState<Query>({
    name: 'Raglan',
    date: new Date(),
    lat: 58.7984,
    lng: 17.8081
  });

  const { forecast, isLoading, isError } = useForecast(query);

  const handleQuery = useCallback((date: Date, location: string) => {
    if(locations.includes(location)) {
      const point = points.find((point) => point.name === location);
      if(point) {
        setQuery({ date, ...point });
      }
    }
  }, [locations, points]);

  const handleTime = (times: number[]) => {
    filterData(times, data);
  };

  const filterData = useDebounce((times: number[], data: Data) => {
    const visible = filterDatumByTime(times, data.metrics);
    setData({  ...data, visible });
  }, 500, { leading: false });
  
  useEffect(() => {
    if(forecast && forecast.hours.length) {
      const hours = forecast.hours.map((hour) => new Date(hour.time));
      
      const waveHeight = hoursToSerie(forecast.hours, 'waveHeight', 'meteo');
      const airTemperature = hoursToSerie(forecast.hours, 'airTemperature', 'noaa');
      const waterTemperature = hoursToSerie(forecast.hours, 'waterTemperature', 'noaa');
      const windDirection = hoursToSerie(forecast.hours, 'windDirection', 'noaa');
      const windSpeed = hoursToSerie(forecast.hours, 'windSpeed', 'noaa');

      setData({
        hours,
        metrics: { waveHeight, airTemperature, waterTemperature, windSpeed, windDirection },
        visible: { waveHeight, airTemperature, waterTemperature, windSpeed, windDirection }
      });
    }
  }, [forecast]);

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
        <Logo src="/image/waves.svg" width="auto" height="auto" alt="Forecast" />
        <Title uppercase center>
          {t('Forecast')}
        </Title>
        <Filter.Root locations={locations} defaultDate={query.date} defaultLocation={query.name} onFilter={handleQuery} />
      </Header>
      <Main>
        <TimeScroller.Root id="time" hours={data.hours} onTimeChange={handleTime}>
          <Label htmlFor="time">
            <Box.Root as="span">{query.name}</Box.Root>
            <time dateTime={query.date.toLocaleDateString()}>
              {formatDate(query.date)}
            </time>
          </Label>
        </TimeScroller.Root>
        {data.visible?.waveHeight ?
          <Section css={{ height: '40rem', maxWidth: '100vw' }}>
            <Heading.Root as="h3" size="lg" uppercase center>{t('Wave Height')}</Heading.Root>
            <ChartLine.Root dataset={data.visible.waveHeight} />
          </Section>
        : ''}
        {data.visible?.airTemperature && data.visible?.waterTemperature ?
          <Section css={{ backgroundColor: '$primary' }}>
            <Heading.Root as="h3" size="lg" uppercase center>{t('Temperature')}</Heading.Root>
            <ChartBar.Root labelA="Air" datasetA={data.visible.airTemperature} labelB="Water" datasetB={data.visible.waterTemperature} />
          </Section>
        : ''}
        {data.visible?.windDirection && data.visible?.windSpeed ?
          <Section>
            <Heading.Root as="h3" size="lg" uppercase center>{t('Wind')}</Heading.Root>
            <ChartDial.Root unit="m/s" datasetA={data.visible.windDirection} datasetB={data.visible.windSpeed} />
          </Section>
         : ''}
      </Main>
      <Footer>{t('Forecast')}</Footer>
    </Layout>
  );
};

export async function getStaticProps() {
  
  const result = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/points.json`);
  const points: Point[] = await result.json();

  return {
    props: {
      points,
    },
    revalidate: 86400,
  }
};

export default Home;
