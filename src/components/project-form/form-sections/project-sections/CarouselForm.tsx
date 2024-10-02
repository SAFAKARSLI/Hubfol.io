import React from 'react';

type Props = {
  editFormData: (key: string, value: string | Blob) => void;
};

function CarouselForm({ editFormData }: Props) {
  return <div>CarouselForm</div>;
}

export default CarouselForm;
