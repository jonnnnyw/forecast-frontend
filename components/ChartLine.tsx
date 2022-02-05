import React from 'react';
import { ResponsiveLine, Serie } from '@nivo/line';
import { theme } from '../stitches.config';


export interface ChartLineProps {
  dataset: Serie;
}

const Root = ({ dataset }: ChartLineProps) => (
    <ResponsiveLine
      data={[dataset]}
      xScale={{ type: 'time', format: 'native', precision: 'hour' }}
      yScale={{ type: 'linear', nice: true, min: 'auto', max: 'auto' }}
      margin={{ top: 10, right: 10, bottom: 100, left: 50 }}
      colors={{ scheme: 'set2' }}
      curve="cardinal"
      lineWidth={2}
      axisBottom={{
        format: (date: Date) => date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
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
        fontFamily: 'Open Sans, Tahoma, Arial, sans-serif',
        fontSize: 14,
      }}
    />
);

Root.displayName = 'ChartLine';

export { Root };
