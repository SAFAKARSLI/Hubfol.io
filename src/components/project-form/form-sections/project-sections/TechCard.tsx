'use client';
import React from 'react';
import { Tooltip } from '@radix-ui/themes';
import { Brand } from '@/types/brand';
import Image from 'next/image';
import { Cross2Icon } from '@radix-ui/react-icons';

type Props = {
  tech: Brand;
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
    <Tooltip content={tech.brand_name} className="z-10">
      <div
        className={`flex flex-col justify-evenly items-center border rounded border-gray-4 -2xl:h-[5rem] -2xl:w-[5rem] h-[6rem] w-[6rem] relative `}
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
          className="object-contain h-9 w-9"
          src={`https://cdn.simpleicons.org/${tech.slug}?viewbox=auto`}
        />

        <p className="flex-none text-xs text-gray-11 truncate px-2 w-full text-center">
          {tech.brand_name}
        </p>
      </div>
    </Tooltip>
  );
}

export default TechCard;
