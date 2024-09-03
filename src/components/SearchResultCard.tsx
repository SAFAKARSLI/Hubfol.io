'use client';
import { Flex } from '@radix-ui/themes';
import Image from 'next/image';
import React, { useEffect } from 'react';

type Props = {
  brandName: string;
  slug: string;
  onTechAdd: (brandName: string, slug: string) => void;
};

function SearchResultCard({ brandName, slug, onTechAdd }: Props) {
  return (
    <div
      className="flex items-center gap-2 p-2 hover:bg-gray-3 w-full cursor-pointer h-10"
      onMouseDown={() => onTechAdd(brandName, slug)}
    >
      <img
        alt={`${slug}-logo`}
        width={20}
        height={20}
        src={`https://cdn.simpleicons.org/${slug}/_/eee?viewbox=auto`}
      />
      <div>{brandName}</div>
    </div>
  );
}

export default SearchResultCard;
