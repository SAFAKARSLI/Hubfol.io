import { SearchResult } from '@/types/searchResult';
import React from 'react';

type Props = {
  techStack: SearchResult[];
};

const TechStack = ({ techStack }: Props) => {
  return (
    <div className="grid justify-center items-center grid-cols-4 gap-2 w-full">
      {techStack.map((tech, index) => {
        return (
          <div
            key={index}
            className={`flex flex-col text-xs text-gray-11 items-center border rounded border-gray-4 hover:bg-gray-2 h-[5rem] overflowhidden`}
          >
            <img
              height="30"
              width="30"
              src={`https://cdn.simpleicons.org/${tech.slug}?viewbox=auto`}
              className="flex-1"
            />
            {<div className="flex-none pb-2">{tech.brandName}</div>}
          </div>
        );
      })}
    </div>
  );
};

export default TechStack;
