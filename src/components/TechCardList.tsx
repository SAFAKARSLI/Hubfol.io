import { SearchResult } from '@/types/searchResult';
import React from 'react';
import TechCard from './TechCard';

type Props = {
  techs: SearchResult[];
  setTechs: (techIndexToRemove: number) => void;
};

function TechCardList({ techs, setTechs }: Props) {
  const renderTechCards = () => {
    return techs.map((tech, i) => {
      return <TechCard key={i} tech={tech} onClick={() => setTechs(i)} />;
    });
  };

  return (
    <div className="grid justify-center items-center grid-cols-6 gap-2 w-full">
      {renderTechCards()}
    </div>
  );
}

export default TechCardList;
