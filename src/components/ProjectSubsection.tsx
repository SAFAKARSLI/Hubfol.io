import React from 'react';

import TextSection from './subsections/Text';
import TechStack from './subsections/TechStack';

import { Box, Heading, Text } from '@radix-ui/themes';

type Props = {
  title: string;
  contentType: string;
  content: any;
  width?: string;
};

const ProjectSubsection = ({
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
    <div className="pb-8">
      <Heading size={'3'} my={'5'}>
        {title}
      </Heading>
      <div className={`${width}`}>{renderContent()}</div>
    </div>
  );
};

export default ProjectSubsection;
