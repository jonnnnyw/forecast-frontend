import React, { useCallback, useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation';
import { useForecast, useDebounce } from '../hooks';
import { forecastToDataset } from '../transformers';
import { filterDatumByHour, formatDate } from '../utils';
import { styled, themes } from '../stitches.config';
import * as BaseLabel from '@radix-ui/react-label';
import { Bars } from  'react-loader-spinner';
import * as Heading from '../components/Heading';
import * as Box from '../components/Box';
import * as Image from '../components/Image';
import * as Search from '../components/Search';
import * as ChartBar from '../components/ChartBar';
import * as ChartLine from '../components/ChartLine';
import * as ChartDial from '../components/ChartDial';
import * as TimeScroller from '../components/TimeScroller';

import { Point, Query, Dataset } from '../types';

import globalStyles from '../styles';

const maxDate = new Date();
maxDate.setDate(maxDate.getDate() + 7);

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
  padding: '$64 $32'
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
  minHeight: '5rem',
  'svg': {
    margin: '0 auto $8 auto'
  },
  'span': {
    fontSize: '$sm', 
    marginBottom: '$4',
    display: 'block', 
  }
});

type HomeProps = {
  points: Point[]
};

type Filter = {
  times: number[]
};

const Home = ({ points }: HomeProps) => {
  globalStyles();

  const { t } = useTranslation('home');

  const [locations, setLocations] = useState<string[]>([]);
  const [query, setQuery] = useState<Query>({ ...points[0], date: new Date() });
  const [data, setData] = useState<Dataset>({ hours: [], metrics: {}, filtered: {} });

  const filter = useRef<Filter>({ times: [] });

  const { forecast, isLoading, isError } = useForecast(query);

  const handleSearch = useCallback((date: Date, location: string) => {
    if(locations.includes(location)) {
      const point = points.find((point) => point.name === location);
      if(point) {
        setQuery({ date, ...point });
      }
    }
  }, [locations, points]);

  const handleFilter = (times: number[]) => {
    filter.current.times = times;
    filterData(filter.current, data);
  };

  const filterData = useDebounce((filter: Filter, data: Dataset) => {
      const filtered = filter.times.length ? filterDatumByHour(filter.times, data.metrics) : data.metrics;
      setData({ ...data, filtered });
  }, 200);
  
  useEffect(() => {
    if(forecast) {
      filterData(filter.current, forecastToDataset(forecast));
    }
  }, [forecast, filterData]);

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
        <Search.Root locations={locations} defaultDate={query.date} maxDate={maxDate} defaultLocation={query.name} onSearch={handleSearch} />
      </Header>
      <Main>
        <TimeScroller.Root id="time" hours={data.hours} onTimeChange={handleFilter}>
          { isLoading || isError ?
            <Label css={{ textTransform: 'uppercase', color: isError ? 'red' : '$contrast' }}>
                <Bars height="20" width="300" color="rgb(102,194,165)" ariaLabel="loading" />
                {isLoading ? t('Loading') : t('An error occurred')}
            </Label> :
            <Label htmlFor="time">
              <Box.Root as="span">{query.name}</Box.Root>
              <time dateTime={query.date.toLocaleDateString()}>
                {formatDate(query.date)}
              </time>
            </Label>
          }
        </TimeScroller.Root>
        {data.filtered?.swellHeight ?
          <Section css={{ height: '60rem', maxWidth: '100vw' }}>
            <Heading.Root as="h3" size="lg" uppercase center>{t('Swell Height')}</Heading.Root>
            <ChartLine.Root dataset={data.filtered.swellHeight} />
          </Section>
        : ''}
        {data.filtered?.airTemperature && data.filtered?.waterTemperature ?
          <Section css={{ backgroundColor: '$primary' }}>
            <Heading.Root as="h3" size="lg" uppercase center>{t('Temperature')}</Heading.Root>
            <ChartBar.Root labelA="Air" datasetA={data.filtered.airTemperature} labelB="Water" datasetB={data.filtered.waterTemperature} />
          </Section>
        : ''}
        {data.filtered?.windDirection && data.filtered?.windSpeed ?
          <Section>
            <Heading.Root as="h3" size="lg" uppercase center>{t('Wind')}</Heading.Root>
            <ChartDial.Root unit="m/s" datasetA={data.filtered.windDirection} datasetB={data.filtered.windSpeed} />
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

  if(!points.length) {
    points.push({ name: 'Raglan', lat: -37.8232, lng: 174.8906 });
  }

  return {
    props: {
      points,
    },
    revalidate: 86400,
  }
};

export default Home;
