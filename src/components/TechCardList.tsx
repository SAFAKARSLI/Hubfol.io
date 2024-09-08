import { SearchResult } from '@/types/searchResult';
import React from 'react';
import TechCard from './TechCard';

type Props = {
  techs: SearchResult[];
  setTechs: (techIndexToRemove: number) => void;
};

function TechCardList({ techs, setTechs }: Props) {
  const [activeTooltip, setActiveTooltip] = React.useState<number | null>(null);
  const renderTechCards = () => {
    return techs.map((tech, i) => {
      return <TechCard key={i} tech={tech} onClick={() => setTechs(i)} />;
    });
  };

  return (
    <div className="flex flex-wrap max-h-[10rem] justify-center gap-2 w-full">
      {renderTechCards()}
    </div>
  );
}

export default TechCardList;
