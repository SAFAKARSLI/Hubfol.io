import { Button, Card, Heading, Link, Text } from '@radix-ui/themes';
import Image from 'next/image';
import React from 'react';
import ListItem from './ListItem';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import OAuthSignInButton from '@/components/OAuthSignInButton';
import OAuthSignUpButton from '@/components/OAuthSignUpButton';

type Props = {};

function page({}: Props) {
  return (
    <div className="w-screen items-center p-4">
      <Image
        alt="hubfolio-banner"
        src={'/hubfolio-banner.png'}
        width={500}
        height={250}
        className="m-auto w-[8rem]"
      />
      <div className="flex max-w-[70rem] min-w-0 flex-wrap w-full m-auto gap-[5rem] justify-center   py-[5rem]">
        <Card className="w-[30rem] p-8 text-center flex flex-col justify-between">
          <div>
            <Heading className="mb-2">Welcome to Hubfolio</Heading>
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
          </div>
          <Text className="text-gray-9">
            Already have an account?{' '}
            <Link href="/login" className="text-violet-8">
              Log in
            </Link>
          </Text>
        </Card>

        <div className="w-[30rem] border border-violet-8 p-8 pb-12 rounded shadow-[0_0_30px_8px_rgba(44,20,219,1)]">
          <Heading className="mb-5 font-serif text-center text-violet-8">
            Key Features
          </Heading>
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
    </div>
  );
}

export default page;
