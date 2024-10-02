import React from 'react';

import TextSection from './TextSection';
import TechStack from './TechStack';

import { Box, Heading, Text } from '@radix-ui/themes';
import { Content } from '@prisma/client';

type Props = {
  title: string;
  description: string | null;
  contentType: string;
  content: any;
  width?: string;
};

const Subsection = ({
  title,
  description,
  content,
  width = 'w-full',
  contentType,
}: Props) => {
  const renderContent = () => {
    switch (contentType) {
      case Content.TEXT:
        return <TextSection text={content} />;
      case Content.BRAND_STACK:
        return <TechStack techStack={content} />;
    }
  };

  return (
    <div className="p-5">
      <Heading as="h4" className="text-lg -2xl:text-md mb-2">
        {title}
      </Heading>
      <Text as="p" className="text-gray-9 text-md mb-2 ">
        {description}
      </Text>
      <div className={`${width}`}>{renderContent()}</div>
    </div>
  );
};

export default Subsection;
