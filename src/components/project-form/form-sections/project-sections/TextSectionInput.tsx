'use client';

import { Text } from '@radix-ui/themes';
import { set } from 'lodash';
import React, { useEffect } from 'react';

type Props = {
  initialValue: string;
};

function TextSectionInput({ initialValue }: Props) {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const [text, setText] = React.useState(initialValue);

  useEffect(() => {
    textareaRef.current!.style.height = 'auto';
    textareaRef.current!.style.height = `${
      textareaRef.current!.scrollHeight
    }px`;
  }, [text]);

  return (
    <>
      <textarea
        ref={textareaRef}
        value={text}
        onInput={() => {
          setText(textareaRef.current!.value);
        }}
        maxLength={2000}
        name="content"
        defaultValue={initialValue as string}
        className="w-full resize-none rounded w-full min-h-[10rem] max-h-[20rem] p-2 outline-none bg-gray-1 focus:shadow-outline 
      focus:border-violet-7 rounded-md text-sm border border-gray-6"
      />
    </>
  );
}

export default TextSectionInput;
