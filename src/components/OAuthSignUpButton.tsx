"use client";
import { Button, Text } from "@radix-ui/themes";
import React from "react";

type Props = {
  logo: JSX.Element;
  label: string;
  OAuthType: "google" | "github";
  variant: "solid" | "ghost" | "outline" | "surface";
  color: "violet" | "red" | "gray";
};

function OAuthSignUpButton({ logo, label, OAuthType, variant, color }: Props) {
  return (
    <Button
      variant={variant}
      color={color}
      className="flex gap-1 h-[2.5rem] justify-center items-center hover:cursor-pointer w-full"
    >
      {logo} <Text className="text-white">{label}</Text>
    </Button>
  );
}

export default OAuthSignUpButton;
