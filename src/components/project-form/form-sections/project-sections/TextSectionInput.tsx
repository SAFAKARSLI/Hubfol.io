import React from 'react';

type Props = {
  content: string;
};

function TextSectionInput({ content }: Props) {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  return (
    <textarea
      ref={textareaRef}
      onInput={() => {
        textareaRef.current!.style.height = 'auto';
        textareaRef.current!.style.height = `${
          textareaRef.current!.scrollHeight
        }px`;
      }}
      name="content"
      defaultValue={content as string}
      className="w-full resize-none rounded w-full min-h-[10rem] max-h-[20rem] p-2 outline-none bg-gray-1 focus:shadow-outline 
      focus:border-violet-7 rounded-md text-sm border border-gray-6"
    />
  );
}

export default TextSectionInput;
