"use client";

import { redirect } from "next/navigation";

import { useParams } from "next/navigation";

export default function EmployeePage() {
  const { username } = useParams();
  redirect(`/u/${username}/projects`);
}
