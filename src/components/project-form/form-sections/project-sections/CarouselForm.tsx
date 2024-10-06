import { PlusIcon } from '@radix-ui/react-icons';
import { Button, Text } from '@radix-ui/themes';
import React from 'react';

type Props = {
  editFormData: (key: string, value: string | Blob) => void;
  initialValue?: any[];
};

function CarouselForm({ editFormData, initialValue }: Props) {
  const [images, setImages] = React.useState<any[]>(initialValue ?? []);

  return (
    <div className="flex gap-3 bg-gray-2 p-3">
      {images.map((img, i) => {
        return (
          <div key={i} className="h-[8rem] w-[8rem] bg-gray-4">
            <img src={URL.createObjectURL(img)} alt="" />
          </div>
        );
      })}
      <Button className="h-[6rem] w-[6rem] " type="button" variant="surface">
        <PlusIcon /> <Text className="text-xs">New Image</Text>
      </Button>
      <input
        type="file"
        onChange={(e) => setImages([...images, e.target.files![0]!])}
      />
    </div>
  );
}

export default CarouselForm;
