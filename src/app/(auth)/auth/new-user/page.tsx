import React, { useEffect } from 'react';

import { Button, Box, Flex, Heading, Text, Separator } from '@radix-ui/themes';

import * as Form from '@radix-ui/react-form';

import { FaDollarSign } from 'react-icons/fa';
import FormInput from '@/components/project-form/FormInput';
import { getSession, useSession } from 'next-auth/react';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { createEmployee } from '@/app/actions/user';

type Props = {};

async function page({}: Props) {
  const session = await getServerSession(authOptions);
  const createEmployeeWithEmail = createEmployee.bind(
    null,
    session?.user.email
  );

  return (
    <Form.Root action={createEmployeeWithEmail}>
      <Flex
        direction={'column'}
        width={'30rem'}
        p={'5'}
        className="bg-gray-2 rounded border border-gray-5"
      >
        <Box width={'100%'} className="flex flex-col items-center gap-1">
          <Heading size={'6'}>Complete Sign Up</Heading>
          <Separator size={'4'} />
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
            placerholder="Freelance Software Developer"
            type="text"
            name="title"
          />

          <FormInput
            label="Where do you live?"
            placerholder="San Francisco, CA"
            type="text"
            name="location"
          />

          <FormInput
            label="What is your hourly rate?"
            placerholder="45.00"
            logo={<FaDollarSign color="gray" />}
            type="number"
            name="hourlyRate"
          />

          <FormInput
            label="Phone Number"
            placerholder="+1 (123) 456-7890"
            type="text"
            name="phoneNumber"
          />
        </Flex>

        <Button variant="surface" className="w-full" type="submit" size={'3'}>
          Sign Up
        </Button>
      </Flex>
    </Form.Root>
  );
}

export default page;
