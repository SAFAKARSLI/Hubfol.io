import React from 'react';

import TextSection from './Text';
import TechStack from './TechStack';

import { Box, Heading, Text } from '@radix-ui/themes';

type Props = {
  title: string;
  contentType: string;
  content: any;
  width?: string;
};

const Subsection = ({
  title,
  content,
  width = 'w-full',
  contentType,
}: Props) => {
  const renderContent = () => {
    switch (contentType) {
      case 'text':
        return <TextSection text={content} />;
      case 'tech-stack':
        return <TechStack techStack={content} />;
    }
  };

  return (
    <div className="pb-8 px-6">
      <Heading as="h3" my={'5'} className="text-lg -2xl:text-sm">
        {title}
      </Heading>
      <div className={`${width}`}>{renderContent()}</div>
    </div>
  );
};

export default Subsection;
