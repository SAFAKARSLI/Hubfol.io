import { Text } from '@radix-ui/themes';
import React from 'react';

type Props = {
  text: string;
};

const TextSection: React.FC<Props> = ({ text }) => {
  return (
    <Text className="text-gray-11 text-md">
      {text.split('\n').map((line, index) => (
        <React.Fragment key={index}>
          {line}
          <br />
        </React.Fragment>
      ))}
    </Text>
  );
};

export default TextSection;
