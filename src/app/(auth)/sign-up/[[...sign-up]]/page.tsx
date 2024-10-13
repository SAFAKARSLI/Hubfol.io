import {
  Box,
  Button,
  Card,
  Heading,
  Link,
  Spinner,
  Text,
} from '@radix-ui/themes';
import Image from 'next/image';
import React, { Suspense } from 'react';
import ListItem from '../ListItem';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import OAuthSignInButton from '@/components/OAuthSignInButton';
import * as Form from '@radix-ui/react-form';
import OAuthSignUpButton from '@/components/OAuthSignUpButton';
import FormInput from '@/components/project-form/FormInput';
import NewEmployeeForm from '../../new-user/NewEmployeeForm';
import SubmitButton from '@/components/SubmitButton';
import { SignUp } from '@clerk/nextjs';
import { customThemeClerkAuthenticationComponents } from '@/utils';
import HubfolioBanner from '@/components/HubfolioBanner';

type Props = {};

function page({}: Props) {
  return (
    <div className="flex">
      {/* <Card className="w-[30rem] p-8 text-center flex flex-col justify-between">
          <div>
            <Heading className="mb-4">Welcome to Hubfolio</Heading>
            <Text as="p">
              Hubfolio is a social media platform that allows developers to flex
              with their projects.
            </Text>
          </div>

          <div className="flex flex-col gap-3 py-5">
            <OAuthSignUpButton
              OAuthType="google"
              color="red"
              label="Sign up with Google"
              logo={<FaGoogle className="w-4 h-4" />}
              variant="solid"
            />
            <OAuthSignUpButton
              OAuthType="github"
              color="gray"
              label="Sign up with GitHub"
              logo={<FaGithub className="w-4 h-4" />}
              variant="surface"
            />
            <Text className="text-gray-10 text-sm text-center">or</Text>

            <Form.Root className="text-left flex flex-col gap-2">
              <FormInput
                label="Email"
                name="emailAddress"
                type="email"
                required
              />
              <FormInput
                name="password"
                label="Password"
                type="password"
                required
              />
              <SubmitButton style="w-full mt-2" variant="soft">
                Sign Up
              </SubmitButton>
            </Form.Root>
          </div>
          <Text className="text-gray-10">
            Already have an account?{' '}
            <Link href="/sign-in" className="text-violet-8">
              Log in
            </Link>
          </Text>
        </Card> */}
      <div className="w-1/2 border-r border-violet-8 bg-gray-2  rounded-r  shadow-[0_0_30px_8px_rgba(44,20,219,1)]  flex flex-col items-center">
        <Box py={'4'}>
          <HubfolioBanner width={10} />
        </Box>
        <div className="w-3/5  flex flex-col gap-3  justify-between items-center ">
          <div className="my-8 text-center">
            <Heading className="mb-3" size={'8'}>
              Welcome to{' '}
              <Text className="font-serif text-violet-9">Hubfolio</Text>
            </Heading>
            <Text className="text-center text-sm text-gray-10">
              Hubfolio is a social media platform that allows developers to flex
              with their projects.
            </Text>
          </div>
          <div className="flex flex-col gap-7">
            <ListItem
              title="Showcase Your Projects"
              text={
                'List your projects on your profile and get discovered by other developers and employers. There is no project limit! You can list as many projects as you want.'
              }
            />
            <ListItem
              title="Custom Template Builder"
              aiBanner
              text={`With our AI Asisted tool, you can easily create a custom template for your projects, tailored to the needs of your client. Each template is unique for each client and can be easily modified.`}
            />
            <ListItem
              title="Attract More Employers"
              text={
                'Employers can discover your projects and hire you directly from your profile. You can use your Hubfolio account as your digital resume to apply for jobs.'
              }
            />
          </div>
        </div>
      </div>
      <div className="w-1/2 flex items-center justify-center h-full">
        <Suspense fallback={<Spinner />}>
          <SignUp
            appearance={customThemeClerkAuthenticationComponents}
            forceRedirectUrl={'/api/fully-signed-up'}
          />
        </Suspense>
      </div>
    </div>
  );
}

export default page;
