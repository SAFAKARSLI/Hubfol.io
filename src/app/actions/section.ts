"use server";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import { checkForAuthority } from "./project";
import { revalidateTag } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import { getUser } from "./user";
import Section, { Image } from "@/types/section";
import _ from "lodash";
import { eliminateUnusedFiles, uploadFile } from "./s3";
import { redirect } from "next/navigation";
import { Database } from "@/types/supabase";
import { SectionRepository } from "@/db";
import { ProjectRepository } from "@/db";

const sectionRepository = new SectionRepository();
const projectRepository = new ProjectRepository();

const processContent = async (formData: FormData) => {
  const contentType = formData.get(
    "contentType"
  ) as Database["public"]["Enums"]["Content"];

  if (contentType == "TEXT") {
    return formData.get("content") as string;
  } else if (contentType === "BRAND_STACK") {
    const content = formData.get("content") as string;
    return JSON.parse(content);
  } else if (contentType === "CAROUSEL") {
    const images = Array.from(formData.keys()).filter((key) =>
      key.startsWith("images")
    );
    const result = [];
    for (let i = 0; i < images.length / 2; i++) {
      if (formData.get(`images[${i}][url]`)) {
        result.push({
          name: formData.get(`images[${i}][name]`) as string,
          url: formData.get(`images[${i}][url]`) as string,
        });
        continue;
      }

      const uploadedFile = await uploadFile(
        formData.get(`images[${i}][blob]`) as File,
        "hubfol.io.gallery"
      );

      if (uploadedFile.status !== 200) {
        throw new Error("Failed to upload image.");
      }

      result.push({
        name: formData.get(`images[${i}][name]`) as string,
        url: "https://s3.amazonaws.com/hubfol.io.gallery/" + uploadedFile.data,
      });
    }
    return result;
  } else {
    return {};
  }
};

export const upsertSections = async (formData: FormData) => {
  var content;
  try {
    content = await processContent(formData)!;
  } catch (error) {
    console.error("Error processing content:", error);
    // TODO: Implement the error page.
    redirect("?error=failed-to-process-content");
  }

  const sectionInfo = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    contentType: formData.get(
      "contentType"
    ) as Database["public"]["Enums"]["Content"],
    content,
  };

  const sectionUUID = formData.get("uuid") as string;
  const projectId = formData.get("projectId") as string;

  if (formData.get("prev-section")) {
    const prevSection = JSON.parse(
      formData.get("prev-section") as string
    ) as Section;

    // Deletes any files that are no longer in use after the update
    if (sectionInfo.contentType === "CAROUSEL") {
      await eliminateUnusedFiles(
        prevSection.content as unknown as Image[],
        sectionInfo.content as unknown as Image[],
        "hubfol.io.gallery"
      );
    }

    const keys = Object.keys(sectionInfo) as (keyof typeof sectionInfo)[];

    const noChange = keys.every((key) =>
      _.isEqual(sectionInfo[key], prevSection[key])
    );

    if (noChange) {
      return { status: 200, message: "No changes detected." };
    }
  }

  const session = auth();
  session.protect();

  const user = await getUser(session.userId!);
  const hubfolioUserId = user?.privateMetadata?.hubfolioUserId;
  const authorityCheck = await checkForAuthority(
    projectId,
    hubfolioUserId as string
  );
  if (authorityCheck.status !== 200) {
    return authorityCheck;
  }

  let resultingSection;
  if (!sectionUUID) {
    resultingSection = await sectionRepository.createSection({
      uuid: uuidv4(),
      ...sectionInfo,
      projectId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      id: 0,
      isActive: true,
      description: sectionInfo.description ?? null,
      contentType: (
        sectionInfo.contentType ?? "TEXT"
      ).toString() as Database["public"]["Enums"]["Content"],
    });
  } else {
    // Fetch the existing section to get all required fields
    const existingSection = await sectionRepository.findSectionByUuid(
      sectionUUID
    );
    resultingSection = await sectionRepository.updateSection({
      ...existingSection,
      ...sectionInfo,
      updatedAt: new Date().toISOString(),
      contentType: (
        sectionInfo.contentType ??
        existingSection.contentType ??
        "TEXT"
      ).toString() as Database["public"]["Enums"]["Content"],
      description:
        sectionInfo.description ?? existingSection.description ?? null,
    });
  }
  revalidateTag("sections");
  return { status: 200, data: resultingSection };
};

export const initiateSection = async (projectUUID: string) => {
  const session = auth();
  session.protect();

  try {
    const project = await projectRepository.findProjectByUuid(projectUUID);

    if (!project) {
      return { status: 404, message: "Project not found." };
    }
  } catch (error) {
    console.error("Error initiating section:", error);
  }

  try {
    const section = await sectionRepository.createSection({
      uuid: uuidv4(),
      projectId: projectUUID,
      title: "New Section",
      contentType: "TEXT",
      content: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      description: null,
      id: 0,
      isActive: true,
    });
    revalidateTag("sections");
    return { status: 200, data: section };
  } catch (error) {
    console.error("Error initiating section:", error);
  }
};

export const createSection = async (
  formData: FormData,
  { request }: { request: Request }
) => {
  if (request.method !== "POST") throw new Error("Invalid request method.");

  const session = auth();
  session.protect();

  const section = {
    uuid: uuidv4(),
    title: formData.get("title") as string,
    projectId: formData.get("projectUUID") as string,
    contentType: (
      formData.get("contentType") ?? "TEXT"
    ).toString() as Database["public"]["Enums"]["Content"],
    content: formData.get("content")
      ? JSON.parse(formData.get("content") as string)
      : "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    id: 0,
    isActive: true,
    description: null,
  };

  const schema = z.object({
    title: z
      .string()
      .min(1, { message: "Title must be at least 1 character long." }),
    projectUUID: z.string(),
  });

  const parse = schema.safeParse(section);

  const errors = [] as string[];

  if (!parse.success) {
    parse.error.errors.forEach((err) => {
      errors.push(err.message);
    });
    return errors;
  }

  try {
    await sectionRepository.createSection(section);
  } catch (error) {
    console.error("Error creating section:", error);
    errors.push("Failed to create section");
  }
  revalidateTag("sections");
  return section;
};

export const deleteSection = async (formData: FormData) => {
  const sectionUUID = formData.get("uuid") as string;

  const session = auth();
  session.protect();

  const section = await sectionRepository.findSectionByUuid(sectionUUID);

  if (!section) {
    return { status: 404, message: "Section not found." };
  }

  const user = await getUser(session.userId!);
  const hubfolioUserId = user?.privateMetadata?.hubfolioUserId;
  const authorityCheck = await checkForAuthority(
    section.projectId,
    hubfolioUserId as string
  );

  if (authorityCheck.status !== 200) {
    return authorityCheck;
  }

  try {
    await sectionRepository.deleteSection(section);
    revalidateTag("sections");
  } catch (error) {
    console.error("Error deleting section:", error);
  }
};
