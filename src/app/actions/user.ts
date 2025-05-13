"use server";

import { cache } from "react";

import { redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { baseUrl } from "@/utils";
import { clerkClient, User } from "@clerk/nextjs/server";
import { revalidateTag } from "next/cache";
import Employee from "@/types/employee";
import { EmployeeRepository } from "@/db";

const employeeRepository = new EmployeeRepository();

export const checkExistingUser = async (userId: string) => {
  try {
    const user = await clerkClient().users.getUser(userId);
    if (!user) {
      return null;
    }
    return user;
  } catch (error) {
    console.error("Error checking existing user:", error);
  }
};

export const updateUserInfo = async (formData: FormData) => {
  const userId = formData.get("userId") as string;
  const fieldName = formData.get("fieldName") as string;

  const data = formData.get(fieldName) as string;
  const user = await checkExistingUser(userId);

  if (user) {
    if (fieldName === "username") {
      const username = data;
      await clerkClient().users.updateUser(userId, {
        username,
        privateMetadata: {
          hubfolioUsername: username,
        },
      });
    }

    await employeeRepository.updateEmployee(user.id, {
      [fieldName]: data,
    });
    revalidateTag("users");
  } else {
    throw new Error(
      "Invalid email provided or user does not exist. There was an error updating the username. Please try again."
    );
  }
};

export const createEmployee = async (formData: FormData) => {
  const userId = formData.get("userId") as string;
  const username = formData.get("username") as string;
  const user = await checkExistingUser(userId);

  if (user) {
    const employee = {
      userId: user.id,
      username,
      uuid: uuidv4(),
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      title: formData.get("title") as string,
      phoneNumber: (formData.get("phoneNumber") as string) || null,
      hourlyRate: parseFloat(formData.get("hourlyRate") as string) || null,
      status: "OPEN TO WORK",
      location: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      id: 0, // Supabase will auto-increment this
    } as Employee;

    try {
      await employeeRepository.createEmployee(employee);
      await clerkClient().users.updateUser(userId, {
        username,
        firstName: formData
          .get("name")
          ?.toString()
          .split(" ")
          .shift() as string,
        lastName: formData.get("name")?.toString().split(" ").pop() as string,
        privateMetadata: {
          hubfolioUsername: username,
          hubfolioUserId: employee.uuid,
        },
      });
    } catch (error) {
      console.error("Error creating employee:", error);
      redirect(
        baseUrl + "/sign-up?error=account-already-exists-or-username-taken"
      );
    }
  } else {
    throw new Error(
      "Invalid email provided or user does not exist. There was an error creating the accont. Please try again."
    );
  }
};

export const getUser = cache(async (userId: string) => {
  try {
    const user = (await clerkClient().users.getUser(userId)) as User;
    return user;
  } catch (error) {
    return null;
  }
});
