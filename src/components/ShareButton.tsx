"use client";

import { Share1Icon, Share2Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import React from "react";
import * as Portal from "@radix-ui/react-portal";
import toast from "react-hot-toast";

type Props = {};

function ShareButton({}: Props) {
  return (
    <>
      <div
        className="m-0 font-medium flex gap-1"
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          toast.success("Copied to clipboard");
        }}
      >
        <Share1Icon /> Share
      </div>
    </>
  );
}

export default ShareButton;
