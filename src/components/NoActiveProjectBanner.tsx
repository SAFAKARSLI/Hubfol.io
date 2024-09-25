import { CardStackIcon } from '@radix-ui/react-icons';
import { Button, Flex, Text } from '@radix-ui/themes';
import Image from 'next/image';
import React from 'react';
import ErrorPopup from './custom-comps/ErrorPopup';
import { errorCodes } from '@/utils';

type Props = {
  error: string;
};

function NoActiveProjectBanner({ error }: Props) {
  return (
    <>
      <Flex
        direction={'column'}
        gap={'3'}
        className="h-full w-full items-center justify-center text-center"
      >
        <Image
          alt="brand-logo"
          src="/hubfolio-dark-logo.png"
          width={200}
          height={200}
        />
        <Text weight={'bold'} size={'6'}>
          Select a Project to View
        </Text>
      </Flex>
      {errorCodes.find((e) => e.code == error) && <ErrorPopup code={error} />}
    </>
  );
}

export default NoActiveProjectBanner;
