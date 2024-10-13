import { Box } from '@radix-ui/themes';
import Image from 'next/image';
import React from 'react';

type Props = {
  width: number;
};

function HubfolioBanner({ width }: Props) {
  return (
    <Box width={`${width}rem`}>
      <Image
        alt="hubfolio-banner"
        src={'/hubfolio-banner.png'}
        width={500}
        height={250}
      />
    </Box>
  );
}

export default HubfolioBanner;
