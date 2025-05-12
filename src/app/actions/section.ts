"use server";
import { prisma } from "@/db";
import { Content, Prisma } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import { validateUUID } from "./utils";
import { checkForAuthority } from "./project";
import { revalidateTag } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import { getUser } from "./user";
import { Image, Section } from "@/types/section";
import _ from "lodash";
import { eliminateUnusedFiles, uploadFile } from "./s3";
import { redirect } from "next/navigation";
import { InputJsonArray, InputJsonValue } from "@prisma/client/runtime/library";

const processContent = async (formData: FormData) => {
  console.log(formData);
  const contentType = formData.get("contentType") as Content;

  if (contentType == Content.TEXT) {
    return formData.get("content") as string;
  } else if (contentType === Content.BRAND_STACK) {
    const content = formData.get("content") as string;
    return JSON.parse(content) as Prisma.InputJsonValue;
  } else if (contentType === Content.CAROUSEL) {
    console.log("!! FormData Keys", Array.from(formData.keys()));
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
    return result as InputJsonValue;
  } else {
    return {};
  }
};

export const upsertSections = async (formData: FormData) => {
  var content: InputJsonValue;
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
    contentType: formData.get("contentType") as Content,
    content,
  };

  const sectionUUID = formData.get("uuid") as string;
  const projectId = formData.get("projectId") as string;

  if (formData.get("prev-section")) {
    const prevSection = JSON.parse(
      formData.get("prev-section") as string
    ) as Section;

    // Deletes any files that are no longer in use after the update
    if (sectionInfo.contentType === Content.CAROUSEL) {
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
  try {
    if (!sectionUUID) {
      resultingSection = await prisma.section.create({
        data: {
          uuid: uuidv4(),
          ...sectionInfo,
          projectId,
        },
      });
    } else
      resultingSection = await prisma.section.update({
        where: { uuid: sectionUUID },
        data: {
          ...sectionInfo,
        },
      });
  } catch (error) {
    console.error("Error updating section:", error);
    return {
      status: 500,
      message: "Failed to update/create section",
    };
  } finally {
    await prisma.$disconnect;
    revalidateTag("sections");
    return { status: 200, data: resultingSection };
  }
};

export const initiateSection = async (projectUUID: string) => {
  const session = auth();
  session.protect();

  try {
    const project = await prisma.project.findUnique({
      where: { uuid: projectUUID, ownerId: session.userId! },
    });

    if (!project) {
      return { status: 404, message: "Project not found." };
    }
  } catch (error) {
    console.error("Error initiating section:", error);
  }

  try {
    const section = await prisma.section.create({
      data: {
        uuid: uuidv4(),
        projectId: projectUUID,
        title: "New Section",
        contentType: Content.TEXT,
        content: "",
      },
    });
    return { status: 200, data: section };
  } catch (error) {
    console.error("Error initiating section:", error);
  } finally {
    prisma.$disconnect();
  }
};

export const getSections = async (projectUUID: string) => {
  try {
    const sections = await prisma.section.findMany({
      where: { projectId: projectUUID },
      select: { title: true, content: true, contentType: true },
    });
    return JSON.parse(JSON.stringify(sections));
  } catch (error) {
    console.error("Error fetching sections:", error);
  } finally {
    prisma.$disconnect();
  }
};

export const getSection = async (sectionUUID: string) => {
  try {
    const section = await prisma.section.findUnique({
      where: { uuid: sectionUUID },
    });
    return JSON.parse(JSON.stringify(section));
  } catch (error) {
    console.error("Error fetching section:", error);
  } finally {
    prisma.$disconnect();
  }
};

export const getSectionCount = async () => {
  try {
    const count = await prisma.section.count();
    return count;
  } catch (error) {
    console.error("Error fetching section count:", error);
  } finally {
    prisma.$disconnect();
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
    contentType: formData.get("contentType") as Content,
    content: formData.get("content") as Prisma.InputJsonValue,
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
    await prisma.section.create({ data: section });
  } catch (error) {
    console.error("Error creating section:", error);
    errors.push("Failed to create section");
  } finally {
    await prisma.$disconnect;
    return section;
  }
};

export const deleteSection = async (formData: FormData) => {
  const sectionUUID = formData.get("uuid") as string;

  const session = auth();
  session.protect();

  const section = await prisma.section.findUnique({
    where: { uuid: sectionUUID },
    select: { projectId: true },
  });

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
    await prisma.section.delete({
      where: { uuid: sectionUUID },
    });
  } catch (error) {
    console.error("Error deleting section:", error);
  } finally {
    revalidateTag("sections");
    await prisma.$disconnect;
  }
};
