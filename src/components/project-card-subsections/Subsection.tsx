import React from "react";

import TextSection from "./TextSection";
import TechStack from "./TechStack";

import { Heading, Text } from "@radix-ui/themes";
import Carousel from "./Carousel";
import { Database } from "@/types/supabase";

type Props = {
  title: string;
  description: string | null;
  contentType: string;
  content: any;
  width?: string;
};

const Subsection = ({
  title,
  description,
  content,
  width = "w-full",
  contentType,
}: Props) => {
  const renderContent = () => {
    switch (contentType as Database["public"]["Enums"]["Content"]) {
      case "TEXT":
        return <TextSection text={content} />;
      case "BRAND_STACK":
        return <TechStack techStack={content} />;
      case "CAROUSEL":
        return <Carousel images={content} />;
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Heading as="h4" className="text-lg -2xl:text-md text-wrap">
        {title}
      </Heading>
      {description && (
        <Text as="p" className="text-gray-9 mb-1">
          {description}
        </Text>
      )}
      <div className={`${width}`}>{renderContent()}</div>
    </div>
  );
};

export default Subsection;
