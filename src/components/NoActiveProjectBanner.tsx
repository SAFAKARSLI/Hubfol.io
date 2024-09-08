import { CardStackIcon } from '@radix-ui/react-icons';
import { Button, Flex, Text } from '@radix-ui/themes';
import Image from 'next/image';
import React from 'react';

type Props = {};

function NoActiveProjectBanner({}: Props) {
  return (
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
        Select a Project from the{' '}
        {
          <Button variant="soft" size={'2'} className="h-10">
            <CardStackIcon /> Projects
          </Button>
        }
      </Text>
    </Flex>
  );
}

export default NoActiveProjectBanner;
