import { Flex, ScrollArea } from '@radix-ui/themes';
import React from 'react';
import SearchResultCard from './SearchResultCard';
import { Brand } from '@/types/brand';

type Props = {
  iconList: Brand[];
  onTechAdd: (brandName: string, slug: string) => void;
};

function SearchResultList({ iconList, onTechAdd }: Props) {
  const renderSearchCards = () => {
    return iconList.map((icon, i) => {
      return (
        <SearchResultCard
          key={i}
          onTechAdd={onTechAdd}
          brandName={icon.brand_name}
          slug={icon.slug}
        />
      );
    });
  };

  return (
    <div className="absolute z-10 top-full left-0 right-0">
      <ScrollArea
        type="always"
        scrollbars="vertical"
        className="rounded-b bg-gray-1 border border-gray-5 w-full "
        style={{ maxHeight: '10rem' }}
      >
        {renderSearchCards()}
      </ScrollArea>
    </div>
  );
}

export default SearchResultList;
