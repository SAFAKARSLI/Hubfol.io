import { Button, Heading, IconButton, Separator, Text } from "@radix-ui/themes";
import React from "react";
import { FaEdit } from "react-icons/fa";
import SingleInputWithEditButton from "./(components)/SingleInputWithEditButton";
import { Employee } from "@prisma/client";
import { baseUrl, isValidUsername } from "@/utils";
import { SlugProps } from "@/types/slug";
import { updateUserInfo } from "@/app/actions/user";
import TextInput from "./(components)/TextInput";
import UneditableField from "./(components)/UneditableField";
import PhoneInputWithCountrySelect from "react-phone-number-input";
import CustomPhoneInput from "@/app/(auth)/new-user/CustomPhoneInput";
import { notFound } from "next/navigation";

type Props = {};

/*/
  Username
  Title
  Full Name
  Email
  Status
  Phone Number
/*/

async function page({ params }: SlugProps) {
  const { username } = params;

  // Check for invalid username values
  if (!isValidUsername(username)) {
    notFound();
  }

  const user = await fetch(`${baseUrl}/api/users/${username}`, {
    next: { tags: ["users"] },
  }).then((res) => {
    if (res.status === 404) notFound();
    return res.json();
  });
  return (
    <div className="max-w-[900px] m-auto py-8 px-5">
      <div className="text-center flex flex-col gap-3">
        <Heading as="h1" className="text-center -2xl:text-md text-wrap">
          Account Information
        </Heading>
        <Text className="text-center text-gray-11 mt-2 ">
          Update your account information below. Editing for username and email
          are currently disabled.
        </Text>
      </div>
      <div>
        <div className="flex flex-col gap-2 mt-8">
          <UneditableField title="Username" value={user.username} />
          <UneditableField title="Email" value={user.email} />

          <Separator size={"4"} className="my-4" />

          <SingleInputWithEditButton
            title="Full Name"
            charLimit={50}
            name="name"
            defaultValue={user.name}
            onSubmit={updateUserInfo}
          >
            <TextInput />
          </SingleInputWithEditButton>

          <SingleInputWithEditButton
            title="Title"
            name="title"
            charLimit={50}
            defaultValue={user.title}
            onSubmit={updateUserInfo}
          >
            <TextInput />
          </SingleInputWithEditButton>

          <SingleInputWithEditButton
            title="Status"
            name="status"
            charLimit={50}
            defaultValue={user.status}
            onSubmit={updateUserInfo}
          >
            <TextInput />
          </SingleInputWithEditButton>

          <SingleInputWithEditButton
            title="Phone Number"
            name="phoneNumber"
            defaultValue={user?.phoneNumber!}
            onSubmit={updateUserInfo}
          >
            <CustomPhoneInput />
          </SingleInputWithEditButton>
        </div>
      </div>
    </div>
  );
}

export default page;
