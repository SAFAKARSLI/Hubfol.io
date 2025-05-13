import { Tooltip } from "@radix-ui/themes";
import React from "react";
import TechCard from "../project-form/form-sections/project-sections/TechCard";
import Brand from "@/types/brand";

type Props = {
  techStack: Brand[];
};

const TechStack = ({ techStack }: Props) => {
  return (
    <div className="justify-center items-center flex flex-wrap gap-3 ">
      {techStack.map((tech, index) => {
        return <TechCard key={index} tech={tech} />;
      })}
    </div>
  );
};

export default TechStack;
