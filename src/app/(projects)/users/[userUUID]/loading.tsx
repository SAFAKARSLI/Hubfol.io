import { Spinner } from '@radix-ui/themes';
import React from 'react';

type Props = {};

function loading({}: Props) {
  return <Spinner size={'3'} />;
}

export default loading;
