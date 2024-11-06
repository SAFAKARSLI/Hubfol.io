import { Image as ImageType } from '@/types/section';
import { allowedIconTypes } from '@/utils';
import {
  Cross1Icon,
  Cross2Icon,
  FileIcon,
  PlusIcon,
} from '@radix-ui/react-icons';
import { Button, Text, Tooltip } from '@radix-ui/themes';
import _ from 'lodash';
import Image from 'next/image';
import React, { useEffect } from 'react';

type Props = {
  editFormData: (key: string, value: string | Blob) => void;
  initialValue?: any[];
};

const supportedFileTypes = [
  'image/jpeg',
  'image/jpg',
  'image/gif',
  'image/png',
];

function CarouselForm({ editFormData, initialValue }: Props) {
  const [images, setImages] = React.useState<ImageType[]>(initialValue ?? []);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [error, setError] = React.useState<string | null>(null);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  }, [error]);

  return (
    <div>
      {error && <p className="font-bold text-red-500 text-sm">{error}</p>}
      <p className="w-full text-end text-xs font-medium text-gray-9">
        {images.length}/10
      </p>
      <div className="flex flex-wrap gap-3 bg-gray-2 p-3 items-center rounded-md">
        {images.map((img, i) => {
          const imgBinary = new Blob([img.blob as Blob]);
          return (
            <div className="w-[8rem]" key={i}>
              <div className="h-[8rem] w-[8rem] bg-gray-0 shadow-lg relative rounded overflow-hidden">
                <div
                  className="absolute top-0 right-0 hover:cursor-pointer hover:bg-gray-7 p-1 bg-gray-4 rounded-full border border-gray-0 m-1"
                  onClick={() => {
                    const imagesCopy = _.cloneDeep(images);
                    setImages(imagesCopy.filter((_, index) => index !== i));
                  }}
                >
                  <Cross2Icon />
                </div>
                <Image
                  width={100}
                  height={100}
                  src={(img.url as string) ?? URL.createObjectURL(imgBinary)}
                  alt={img.name}
                  className="object-contain w-full h-full"
                />
              </div>
              <div className="flex items-center">
                <div>
                  <FileIcon color="gray" />
                </div>
                <Tooltip content={img.name} side="bottom">
                  <p className="truncate text-xs p-1 text-gray-9">{img.name}</p>
                </Tooltip>
              </div>
            </div>
          );
        })}
        <Button
          className="h-[6rem] w-[6rem] "
          type="button"
          variant="surface"
          onClick={() => {
            fileInputRef.current?.click();
          }}
        >
          <PlusIcon /> <Text className="text-xs">Image</Text>
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          onChange={(e) => {
            if (e.target.files && e.target.files.length + images.length > 10) {
              setError('Max 10 images allowed');
              return;
            }
            setError(null);

            const files = e.target.files;
            for (let i = 0; i < files!.length; i++) {
              const img = files?.item(i)!;
              if (!supportedFileTypes.includes(img.type)) {
                setError(
                  'Invalid file type. Supported file types are [.jpeg, .jpg, .gif, png]'
                );
                return;
              } else if (img.size > 5242880) {
                setError(
                  img.name + ': File size too large. Max file size is 5MB'
                );
                return;
              } else {
                const reader = new FileReader();
                reader.readAsArrayBuffer(img);
                reader.onload = () => {
                  const arrayBuffer = reader.result;
                  const blob = new Blob([arrayBuffer as ArrayBuffer], {
                    type: 'application/octet-stream',
                  });
                  const newImage = {
                    name: img.name,
                    blob: blob,
                  } as ImageType;

                  // The new image is sent to server as blob as opposed to url because it has not yet been uploaded in the S3 bucket
                  editFormData(
                    `images[${images.length}][blob]`,
                    newImage.blob as Blob
                  );
                  setImages([...images, newImage]);
                };
              }
            }
          }}
        />
      </div>
      <p className="text-xs my-2 text-gray-10 text-center">
        Supported file types: [.jpeg, .jpg, .gif, .png]
      </p>
      <>
        {images.map((img, i) => {
          return (
            <>
              <input
                type="hidden"
                name={`images[${i}][name]`}
                value={img.name}
                key={i}
              />
              {img.url && (
                <input
                  type="hidden"
                  name={`images[${i}][url]`}
                  value={img.url}
                  key={i}
                />
              )}
            </>
          );
        })}
      </>
    </div>
  );
}

export default CarouselForm;
