import { SearchResult } from '@/types/searchResult';
import { Flex, ScrollArea } from '@radix-ui/themes';
import React from 'react';
import SearchResultCard from './SearchResultCard';

type Props = {
  iconList: SearchResult[];
  onTechAdd: (brandName: string, slug: string) => void;
};

function SearchResultList({ iconList, onTechAdd }: Props) {
  const renderSearchCards = () => {
    return iconList.map((icon, i) => {
      return (
        <SearchResultCard
          key={i}
          onTechAdd={onTechAdd}
          brandName={icon.brandName}
          slug={icon.slug}
        />
      );
    });
  };

  return (
    <ScrollArea
      type="always"
      scrollbars="vertical"
      className="rounded-b bg-gray-1 border border-gray-5 w-full"
      style={{ maxHeight: '10rem' }}
    >
      {renderSearchCards()}
    </ScrollArea>
  );
}

export default SearchResultList;
