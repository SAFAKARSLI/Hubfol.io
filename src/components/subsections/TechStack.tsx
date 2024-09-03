import { SearchResult } from '@/types/searchResult';
import { Tooltip } from '@radix-ui/themes';
import React from 'react';
import TechCard from '../TechCard';

type Props = {
  techStack: SearchResult[];
};

const TechStack = ({ techStack }: Props) => {
  return (
    <div className="grid justify-center items-center grid-cols-4 gap-3 w-full">
      {techStack.map((tech, index) => {
        return <TechCard key={index} tech={tech} />;
      })}
    </div>
  );
};

export default TechStack;
