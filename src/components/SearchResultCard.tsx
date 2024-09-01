import { Flex } from '@radix-ui/themes';
import React from 'react';

type Props = {
  brandName: string;
  slug: string;
};

function SearchResultCard({ brandName, slug }: Props) {
  return (
    <Flex align={'center'} gap={'2'} p={'2'} className="hover:bg-gray-3 ">
      <img
        width={20}
        height={20}
        src={`https://cdn.simpleicons.org/${slug}/_/eee?viewbox=auto`}
      />
      <div>{brandName}</div>
    </Flex>
  );
}

export default SearchResultCard;
