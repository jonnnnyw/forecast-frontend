import React, { useEffect, useState } from 'react';
import { styled } from '../stitches.config';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { formatTime } from '../utils';
import { serieToRange } from '../transformers/serieToRange';
import * as Label from '@radix-ui/react-label';

import { Serie, Range } from '../types';


const Chart = styled('ul', {
    all: 'unset',
    display: 'flex',
    gap: '$4'
});

const Dataset = styled('li', {
    listStyle: 'none',
    display: 'flex',
    flexDirection:'column',
    textAlign: 'center',
    flexGrow: 1,
    'time': {
        opacity: 0.3,
    }
});

const Icon = styled('div', {
    lineHeight: 1,
    flexGrow: 1,
    fontSize: '10rem',
    transition: 'transform .5s',
    margin: '$16 auto'
});

type ChartDialProps = React.ComponentPropsWithoutRef<typeof Chart> & {
    datasetA: Serie,
    datasetB: Serie,
    unit?: string
};

const Root = ({ datasetA, datasetB, unit, ...props }: ChartDialProps) => {

    const [dataset, setDataset] = useState<Range | null>(null);

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
                    <Label.Root htmlFor={`dial${key}`}>{data.b}&nbsp;{unit}</Label.Root>
                    <Icon css={{transform: `rotate(${data.a + 270}deg)`}} id={`dial${key}`}>
                        &lt;
                    </Icon>
                    <time>{formatTime(data.time)}</time>
                </Dataset>
            ))}
        </Chart>
    );
};

Root.displayName = 'ChartDial';

export { Root };