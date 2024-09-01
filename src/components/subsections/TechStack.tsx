import { SearchResult } from '@/types/searchResult';
import React from 'react';

type Props = {
  techStack: SearchResult[];
};

const TechStack = ({ techStack }: Props) => {
  return (
    <div className="grid justify-center items-center grid-cols-3 gap-3 w-full">
      {techStack.map((tech, index) => {
        return (
          <div
            key={index}
            className={`flex flex-col text-sm text-gray-11 items-center border rounded border-gray-5 hover:bg-gray-3 h-[5.8rem] overflowhidden`}
          >
            <img
              height="32"
              width="32"
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
