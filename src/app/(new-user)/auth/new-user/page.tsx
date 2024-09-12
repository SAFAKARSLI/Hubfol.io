'use client';

import React, { useEffect } from 'react';

import { Button, Box, Flex, Heading, Text } from '@radix-ui/themes';
import Divider from '@/components/project-card-subsections/Divider';

import { FaDollarSign } from 'react-icons/fa';
import FormInput from '@/components/project-form/FormInput';
import { getSession, useSession } from 'next-auth/react';
import { updateUser } from '@/app/actions';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

type Props = {};

function page({}: Props) {
  const session = useSession();
  const [userForm, setUserForm] = React.useState({
    title: '',
    location: '',
    hourlyRate: 0,
    phoneNumber: '',
  });

  async function handleSignUp() {
    session.update({
      title: userForm.title,
      location: userForm.location,
      hourlyRate: userForm.hourlyRate,
      phoneNumber: userForm.phoneNumber,
    });
    await updateUser(session?.data?.user.email, userForm);
  }

  function handleFormChange(e: any) {
    setUserForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  return (
    <Flex
      direction={'column'}
      justify={'between'}
      align={'center'}
      height={'40rem'}
      width={'30rem'}
      p={'5'}
      className="bg-gray-3 rounded border border-gray-5"
    >
      <Box width={'100%'} className="flex flex-col items-center gap-1">
        <Heading size={'6'}>Complete Sign Up</Heading>
        <Divider />
        <div className="flex flex-col items-center pt-3">
          <Text size={'4'}>Welcome to the community!</Text>
          <Text size={'4'}>Please complete the form below to sign up.</Text>
        </div>
      </Box>

      <Flex
        direction={`column`}
        gap={'3'}
        width={'100%'}
        height={'100%'}
        py={'8'}
        justify={'between'}
      >
        <FormInput
          label="What is your title?"
          placerholder="'Freelance Software Developer'"
          type="text"
          name="title"
          value={userForm.title}
          onChange={handleFormChange}
        />

        <FormInput
          label="Where do you live?"
          placerholder="'San Francisco, CA'"
          type="text"
          name="location"
          value={userForm.location}
          onChange={handleFormChange}
        />

        <FormInput
          label="What is your hourly rate?"
          placerholder="45.00"
          logo={<FaDollarSign color="gray" />}
          type="number"
          name="hourlyRate"
          value={userForm.hourlyRate}
          onChange={handleFormChange}
        />

        <FormInput
          label="Phone Number (optional)"
          placerholder="+1 (123) 456-7890"
          type="text"
          name="phoneNumber"
          value={userForm.phoneNumber}
          onChange={handleFormChange}
        />
      </Flex>

      <Button
        variant="surface"
        className="w-full"
        type="submit"
        size={'3'}
        onClick={handleSignUp}
      >
        Sign Up
      </Button>
    </Flex>
  );
}

export default page;
