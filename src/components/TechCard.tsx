'use client';
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
  const [showTooltip, setShowTooltip] = React.useState(false);

  const handleTooltipOpen = () => {
    setShowTooltip(true);
    setTimeout(() => {
      setShowTooltip(false);
    }, 1000);
  };

  return (
    <Tooltip content={tech.brandName} open={showTooltip}>
      <div
        className={`flex flex-col justify-evenly items-center border rounded border-gray-4 h-[5rem] w-[5rem] relative overflow-hidden`}
        onClick={handleTooltipOpen}
      >
        {onClick && (
          <Cross2Icon
            onClick={onClick}
            className="cursor-pointer absolute top-1 right-1 hover:bg-gray-5 text-red-400"
          />
        )}
        <img
          alt={`${tech.slug}-logo`}
          className="object-contain h-10 w-10"
          src={`https://cdn.simpleicons.org/${tech.slug}?viewbox=auto`}
        />

        <p className="flex-none text-xs text-gray-300 truncate px-2 w-full text-center">
          {tech.brandName}
        </p>
      </div>
    </Tooltip>
  );
}

export default TechCard;
