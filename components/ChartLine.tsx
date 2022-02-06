import React from 'react';
import { ResponsiveLine, Serie } from '@nivo/line';
import { formatTime } from '../utils';

export interface ChartLineProps {
  dataset: Serie;
}

const Root = ({ dataset }: ChartLineProps) => (
    <ResponsiveLine
      data={[dataset]}
      xScale={{ type: 'time', format: 'native', precision: 'hour' }}
      yScale={{ type: 'linear', nice: true, min: 'auto', max: 'auto' }}
      margin={{ top: 20, right: 10, bottom: 100, left: 60 }}
      colors={{ scheme: 'set2' }}
      curve="basis"
      lineWidth={2}
      axisBottom={{
        format: formatTime,
        tickRotation: -60,
        tickPadding: 10,
      }}
      axisLeft={{
        tickPadding: 15,
      }}
      animate={true}
      enableArea={false}
      enablePoints={false}
      enableGridX={false}
      isInteractive={false}
      useMesh={true}
      theme={{
        axis: { ticks: { text: { fontSize: 14 } } },
        grid: { line: { stroke: 'rgba(255,255,255,.1)' } },
        textColor: 'rgb(255,227,194)',
        fontFamily: 'Merriweather Sans, Tahoma, Arial, sans-serif',
        fontSize: 14,
      }}
    />
);

Root.displayName = 'ChartLine';

export { Root };
