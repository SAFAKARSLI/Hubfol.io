"use client";
import { Toaster } from "react-hot-toast";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
export default function ToasterWrapper() {
  const searchParams = useSearchParams();

  switch (searchParams?.get("message")) {
    case "project-success":
      toast.success("Project created successfully");
      break;
    case "project-updated":
      toast.success("Project updated successfully");
      break;
  }
  return <Toaster position="top-center" />;
}
