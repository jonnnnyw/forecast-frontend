import React, { useEffect, useState } from 'react';
import { formatTime } from '../utils';
import { serieToRange } from '../transformers/serieToRange';
import { Serie, Range, Boundary } from '../types';

import { styled } from '../stitches.config';

const Chart = styled('ul', {
    all: 'unset',
    display: 'flex',
    gap: '$4'
});

const Dataset = styled('li', {
    listStyle: 'none',
    display: 'flex',
    flexDirection:'column',
    height: '40rem',
    textAlign: 'center',
    flexGrow: '1',
    'time': {
        opacity: '0.3',
        marginTop: '$16'
    }
});

const MetricLabel = styled('dt', {
    padding: '$8',
    textTransform: 'uppercase',
});

const MetricValue = styled('dd', {
    margin: 0,
    padding: '$8',
    transition: 'height .5s',
    position: 'relative',
    '> span': {
        left: 0,
        position: 'absolute',
        width: '100%'
    },
});

const Metric = styled('dl', {
    all: 'unset',
    display: 'flex',
    flexDirection:'column',
    flexGrow: '1',
    fontSize: '$sm',
    variants: {
        position: {
            top: {
                marginTop: '3rem',
                justifyContent: 'flex-end',
                [`${MetricLabel}`]: { backgroundColor: 'CadetBlue', order: 2 },
                [`${MetricValue}`]: { backgroundColor: 'CadetBlue', order: 1, 'span': { top: '-2.5rem'} }
            },
            bottom: {
                marginBottom: '3rem',
                justifyContent: 'flex-start',
                [`${MetricLabel}`]: { backgroundColor: 'LightSeaGreen', order: 1 },
                [`${MetricValue}`]: { backgroundColor: 'LightSeaGreen', order: 2, 'span': { bottom: '-2.5rem'} }
            }
        }
    },
    defaultVariants: {
        position: 'top'
    }
});

type ChartBarProps = React.ComponentPropsWithoutRef<typeof Chart> & {
    datasetA: Serie,
    datasetB: Serie,
    labelA: string,
    labelB: string
};

const Root = ({ datasetA, datasetB, labelA, labelB, ...props }: ChartBarProps) => {

    const [dataset, setDataset] = useState<Range>();

    useEffect(() => {
        const dataset = serieToRange(datasetA, datasetB);
        setDataset(dataset);
    }, [datasetA, datasetB]);

    if(!dataset) {
        return null;
    }

    return (
        <Chart {...props}>
            {dataset.data.map((data, key) => (
                <Dataset key={key}>
                    <Metric position="top">
                        <MetricLabel>{labelA}</MetricLabel>
                        <MetricValue css={{ height: `${calcPercent(dataset.boundaries.a, data.a)}%`}}>
                            <span>{data.a}<sup>&#8451;</sup></span>
                        </MetricValue>
                    </Metric>
                    <Metric position="bottom">
                        <MetricLabel>{labelB}</MetricLabel>
                        <MetricValue css={{ height: `${calcPercent(dataset.boundaries.b, data.b)}%`}}>
                            <span>{data.b}<sup>&#8451;</sup></span>
                        </MetricValue>
                    </Metric>
                    <time>{formatTime(data.time)}</time>
                </Dataset>
            ))}
        </Chart>
    );
};

Root.displayName = 'ChartBar';

export { Root };

const calcPercent = (boundary: Boundary, value: number): number => (
    ((boundary.range - (boundary.max - value)) / boundary.range) * 100
);
