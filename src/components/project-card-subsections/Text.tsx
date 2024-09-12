import { Text } from '@radix-ui/themes';
import React from 'react';

type Props = {
  text: string;
};

const TextSection: React.FC<Props> = ({ text }) => {
  return (
    <p className=" text-gray-12 text-sm -2xl:text-xs">
      {text.split('\n').map((line, index) => (
        <React.Fragment key={index}>
          {line}
          <br />
        </React.Fragment>
      ))}
    </p>
  );
};

export default TextSection;
