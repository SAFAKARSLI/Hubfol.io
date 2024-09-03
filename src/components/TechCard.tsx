import React from 'react';
import { Tooltip } from '@radix-ui/themes';
import { SearchResult } from '@/types/searchResult';
import Image from 'next/image';
import { Cross2Icon } from '@radix-ui/react-icons';

type Props = {
  tech: SearchResult;
  onClick?: () => void;
};

function TechCard({ tech, onClick }: Props) {
  return (
    <Tooltip content={tech.brandName}>
      <div
        className={`flex flex-col justify-center items-center border rounded border-gray-4 h-[4rem] relative`}
      >
        {onClick && (
          <Cross2Icon
            onClick={onClick}
            className="cursor-pointer absolute top-1 right-1 hover:bg-gray-5 text-red-400"
          />
        )}
        <img
          alt={`${tech.slug}-logo`}
          height="32"
          width="32"
          src={`https://cdn.simpleicons.org/${tech.slug}?viewbox=auto`}
        />

        {/* {<div className="flex-none pb-2">{tech.brandName}</div>} */}
      </div>
    </Tooltip>
  );
}

export default TechCard;
