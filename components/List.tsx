import React from 'react';
import { styled } from '../stitches.config';

const Root = styled('ul', {
  color: '$contrast',
  display: 'block',
  listStyle: 'none',
  padding: 0,
  margin: 0,
});


const Item = styled('li', {
  margin: 0,
});

Root.displayName = 'List';

export { Root, Item };
