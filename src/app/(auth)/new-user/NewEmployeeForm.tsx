"use client";

import React from "react";
import { Flex } from "@radix-ui/themes";
import * as Form from "@radix-ui/react-form";
import { FaDollarSign } from "react-icons/fa";
import FormInput from "@/components/project-form/FormInput";
import { createEmployee } from "@/app/actions/user";
import SubmitButton from "@/components/SubmitButton";
import CustomPhoneInput from "./CustomPhoneInput";
import { useRouter } from "next/navigation";
import UsernameInput from "@/components/UsernameInput";
import { useUser } from "@clerk/nextjs";

type Props = {};

function NewEmployeeForm({}: Props) {
  const session = useUser();
  const router = useRouter();

  const [isUsernameValid, setIsUsernameValid] = React.useState<boolean>(false);

  return (
    <Form.Root
      action={createEmployee}
      onSubmit={(e) => {
        if (!isUsernameValid) {
          e.preventDefault();
          return;
        }
        router.push(`/account-successfully-created`);
      }}
    >
      <input
        type="hidden"
        name="email"
        value={session.user?.primaryEmailAddress?.emailAddress}
      />
      <input type="hidden" name="userId" value={session.user?.id} />
      <Flex direction={`column`} gap={"6"} justify={"between"} py={"6"}>
        <FormInput
          label="Email"
          type="text"
          description="You have selected the following email address to sign up."
          value={session.user?.primaryEmailAddress?.emailAddress}
          name="email"
          disabled
          required
        />

        <FormInput
          label="Full Name"
          defaultValue={session.user?.fullName as string}
          type="text"
          name="name"
          charLimit={50}
          required
        />

        <UsernameInput setUserNameValid={setIsUsernameValid} />

        <FormInput
          label="Title"
          placeholder='e.g. "Full Stack Developer"'
          description="Please enter your job title. You can edit this information later."
          type="text"
          name="title"
          charLimit={50}
          required
        />

        <FormInput
          label="Hourly Rate"
          description="Please enter your hourly rate in USD. This information will be visible to potential clients."
          logo={<FaDollarSign color="gray" />}
          type="number"
          step={0.01}
          name="hourlyRate"
        />

        <Form.Field name="phoneNumber">
          <Form.FormLabel htmlFor="phoneNumber" className="font-bold ">
            Phone Number
          </Form.FormLabel>
          <CustomPhoneInput />
        </Form.Field>
      </Flex>
      <SubmitButton style="w-full">Create Account</SubmitButton>
    </Form.Root>
  );
}

export default NewEmployeeForm;
