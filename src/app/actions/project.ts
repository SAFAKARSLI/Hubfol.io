"use server";

import { permanentRedirect, redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import { validateUUID } from "@/utils";
import { ProjectRepository } from "@/db";
import { auth, User } from "@clerk/nextjs/server";
import { revalidateTag } from "next/cache";
import { getUser } from "./user";
import { baseUrl, generateProjectSlug } from "@/utils";
import _ from "lodash";
import { uploadFile } from "./s3";

const projectRepository = new ProjectRepository();

export const initiateProject = async (formData: FormData) => {
  const session = auth();
  session.protect();
  const { userId } = session;
  const user = await getUser(userId!);

  const username = formData.get("username") as string;

  if (user?.username != username)
    return { status: 403, message: "Not authorized." };

  const date = new Date();
  const projectUUID = uuidv4();
  const name = "New Project";
  const { hubfolioUserId } = user.privateMetadata;
  try {
    const initiatedProject = await projectRepository.createProject({
      slug: generateProjectSlug(name),
      uuid: projectUUID,
      ownerId: hubfolioUserId as string,
      createdAt: date.toISOString(),
      name,
      content: "",
      type: "URL",
      tagline: "",
      iconLink: "",
      updatedAt: date.toISOString(),
      id: 0,
    });

    return { status: 200, data: initiatedProject };
  } catch (error) {
    console.error("Error creating sections:", error);
    throw new Error("Internal Server Error. Failed to create project.");
  } finally {
    revalidateTag("projects");
    redirect(
      `/u/${username}/projects/edit/${projectUUID}/general-information?initialize=true`
    );
  }
};

export const checkForAuthority = async (
  projectUUID: string,
  userUUID: string
) => {
  try {
    const project = await projectRepository.findProjectByUuid(projectUUID);
    if (!project) {
      return { status: 403, message: "Not authorized." };
    }
    return { status: 200 };
  } catch (error) {
    return { status: 500, message: "Internal Server Error." };
  }
};

export const upsertGeneralInfo = async (formData: FormData) => {
  const session = auth();
  session.protect();

  var iconLink = "";
  if ((formData.get("iconLink") as File).size != 0) {
    iconLink = (
      await uploadFile(
        formData.get("iconLink") as File,
        process.env.NEXT_AWS_PROJECT_ICONS_BUCKET_NAME as string
      )
    ).data as string;
  }

  const projectFromFormData = {
    name: formData.get("name") as string,
    tagline: formData.get("tagline") as string,
    iconLink,
    slug: generateProjectSlug(formData.get("name") as string),
  };
  const projectUUID = formData.get("uuid") as string;

  // If the project previously created, check if any of the field have changed.
  // If not, bypass the update

  if (formData.get("prev-project")) {
    const prevProject = JSON.parse(
      formData.get("prev-project") as string
    ) as typeof projectFromFormData;
    const keys = [...formData.keys()].filter((key) => key !== "prev-project");

    const noChange = keys.every((key) =>
      _.isEqual(
        projectFromFormData[key as keyof typeof projectFromFormData],
        prevProject[key as keyof typeof prevProject]
      )
    );

    if (noChange) {
      return { status: 200, message: "No changes detected." };
    }
  }

  if (projectUUID != null && !validateUUID(projectUUID))
    return { status: 400, message: "Invalid project identifier provided." };

  const user = await getUser(session.userId!);
  const { hubfolioUserId } = user?.privateMetadata!;

  const authorityCheck = await checkForAuthority(
    projectUUID,
    hubfolioUserId as string
  );
  if (authorityCheck.status != 200) return authorityCheck;

  try {
    const existingProject = await projectRepository.findProjectByUuid(
      projectUUID
    );
    const resultingProject = await projectRepository.updateProject({
      uuid: projectUUID,
      ...projectFromFormData,
      updatedAt: new Date().toISOString(),
      content: existingProject.content,
      createdAt: existingProject.createdAt,
      id: existingProject.id,
      ownerId: existingProject.ownerId,
      type: existingProject.type,
    });
    return { status: 200, data: resultingProject };
  } catch (error) {
    console.error("Error updating project:", error);
    throw new Error(
      "Internal Server Error. An error occurred while updating the project."
    );
  } finally {
    revalidateTag("projects");
  }
};

export const deleteProject = async (projectUUID: string) => {
  const session = auth();
  session.protect();

  let userUUID: string | undefined;
  const user = (await getUser(session.userId!)) as User;
  try {
    const projectFromDb = await projectRepository.findProjectByUuid(
      projectUUID
    );

    if (!projectFromDb) {
      return { status: 404, message: "Project not found." };
    }

    const { hubfolioUserId } = user.privateMetadata;

    if (projectFromDb.ownerId !== hubfolioUserId) {
      return { status: 403, message: "Not authorized." };
    }

    userUUID = projectFromDb.ownerId;

    await projectRepository.deleteProject(projectFromDb);
  } catch (error) {
    throw new Error(
      "Internal Server Error. An error occured while deleting the project."
    );
  } finally {
    revalidateTag("projects");
    redirect(`/u/${user.username}/projects`);
  }
};

export const upsertFrameOptions = async (formData: FormData) => {
  auth().protect();

  console.log(formData);

  const projectUUID = formData.get("projectId") as string;

  // Security checks
  const user = await getUser(auth().userId!);
  if (!user) return { status: 403, message: "Unauthenticated" };
  const { hubfolioUserId } = user?.privateMetadata;
  const authorityCheck = await checkForAuthority(
    projectUUID,
    hubfolioUserId as string
  );
  if (authorityCheck.status != 200) {
    permanentRedirect(baseUrl + "sign-in");
  }

  // If the content is a file, upload it to S3

  const frameOptionsFormData = {
    type: formData.get("type") as any,
    content: formData.get("content") as File | string,
  };

  var content = "";

  console.log("!! FormData", formData);
  console.log("!! Frame Options Form Data", frameOptionsFormData);
  if (
    typeof formData.get("content") === "object" &&
    frameOptionsFormData.type === "FILE"
  ) {
    const file = formData.get("content") as File;

    content = (
      await uploadFile(
        file,
        process.env.NEXT_AWS_FILE_PROJECTS_BUCKET_NAME as string
      )
    ).data as string;
  } else {
    // The content is URL
    content = formData.get("content") as string;
  }

  try {
    const existingProject = await projectRepository.findProjectByUuid(
      projectUUID
    );
    const project = await projectRepository.updateProject({
      ...existingProject,
      type: frameOptionsFormData.type as any,
      content,
      updatedAt: new Date().toISOString(),
    });

    return { status: 200, data: project };
  } catch (error) {
    console.error("Error updating frame options:", error);
    throw new Error("Internal Server Error. Failed to update frame options.");
  } finally {
    revalidateTag("projects");
  }
};
