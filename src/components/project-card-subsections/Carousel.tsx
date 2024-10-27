'use client';
import { Image } from '@/types/section';
import {
  Box,
  Button,
  Dialog,
  Flex,
  IconButton,
  Text,
  TextField,
} from '@radix-ui/themes';
import React, { lazy } from 'react';
import Slider from 'react-slick';
import * as Portal from '@radix-ui/react-portal';
import { set } from 'lodash';
import { Cross1Icon } from '@radix-ui/react-icons';

type Props = {
  images: Image[];
};

function Carousel({ images }: Props) {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: false,
    lazyLoad: 'ondemand' as 'ondemand' | 'progressive',
  };

  return (
    <>
      <div className="slider-container w-[20rem] m-auto px-5 focus:outline-none">
        <Slider {...settings}>
          {images.map((e) => {
            return (
              <Dialog.Root key={e.url}>
                <Dialog.Trigger>
                  <img
                    src={e.url}
                    alt={e.name}
                    className="h-[10rem] object-contain m-auto rounded cursor-pointer hover:opacity-70"
                  />
                </Dialog.Trigger>

                <Dialog.Content className="max-w-[60vw] max-h-[80vh]">
                  <Flex
                    style={{
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: 10,
                    }}
                  >
                    <Text size="2" className="font-medium text-gray-11">
                      {e.name}
                    </Text>
                    <Dialog.Close>
                      <IconButton variant="ghost">
                        <Cross1Icon />
                      </IconButton>
                    </Dialog.Close>
                  </Flex>
                  <img src={e.url} alt={e.name} className="rounded-md w-full" />
                </Dialog.Content>
              </Dialog.Root>
            );
          })}
        </Slider>
      </div>
    </>
  );
}

export default Carousel;
