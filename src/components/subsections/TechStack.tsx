import React from 'react';

type Props = {
  techStack: string[];
};

const TechStack = ({ techStack }: Props) => {
  return (
    <div className="flex w-full">
      {techStack.map((tech, index) => (
        <div
          key={index}
          className="flex flex-shrink-1 flex-grow m-1 justify-center "
          style={{ flexBasis: 'calc(50% - 2rem)' }}
        >
          <img
            height="40"
            width="40"
            src={`https://cdn.simpleicons.org/${tech}/_/eee?viewbox=auto`}
          />
        </div>
      ))}
    </div>
  );
};

export default TechStack;
