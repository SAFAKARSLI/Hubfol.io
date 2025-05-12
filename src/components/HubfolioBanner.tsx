import { Box, Flex, Link, Text } from "@radix-ui/themes";
import Image from "next/image";
import React from "react";
import { Nunito } from "next/font/google";
type Props = {
  width: number;
};

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "700"],
});

function HubfolioBanner({ width = 50 }: Props) {
  return (
    <Link href="/" className="hover:no-underline text-white ">
      <Flex width={`${width}px`} align="center" justify="center" gap={"1"}>
        <Image
          alt="hubfolio-banner"
          src={"/icon.png"}
          className="w-10 h-10 rounded-md"
          width={width}
          height={width}
        />
        <Text size="5" className={`text-center font-bold  `}>
          Hubfolio
        </Text>
      </Flex>
    </Link>
  );
}

export default HubfolioBanner;
