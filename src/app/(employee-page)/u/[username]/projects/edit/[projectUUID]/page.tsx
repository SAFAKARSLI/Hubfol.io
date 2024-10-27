import EditProjectCard from '@/components/EditProjectCard';
import FormWrapper from '@/components/FormWrapper';
import { SlugProps } from '@/types/slug';
import { Badge, Card, Heading, Separator, Text } from '@radix-ui/themes';
import React from 'react';
import { FaGoogle } from 'react-icons/fa';

type Props = {};

function page({ params }: SlugProps) {
  const { username, projectUUID } = params;
  return (
    <FormWrapper backButtonUrl={`/u/${username}/projects`}>
      <div className="max-w-[40rem] m-auto">
        <div className="text-center flex flex-col gap-4">
          <Heading as="h1" size={'7'} className="text-center text-wrap ">
            Edit Project
          </Heading>
          <Text className="text-center text-gray-11 ">
            Please select which information you want to edit.
          </Text>
        </div>

        <Separator size={'4'} className="my-8" color="violet" />

        <div className="flex flex-col gap-3 ">
          <EditProjectCard
            title="General Information"
            description="Name, tagline, and project icon"
            href={`/u/${username}/projects/edit/${projectUUID}/general-information`}
          />
          <EditProjectCard
            title="Sections"
            description="Add, remove, and edit sections"
            href={`/u/${username}/projects/edit/${projectUUID}/sections`}
          />
          <EditProjectCard
            title="Frame Options"
            description="Manage how the project content is displayed"
            href={`/u/${username}/projects/edit/${projectUUID}/frame-options`}
          />
        </div>
      </div>
    </FormWrapper>
  );
}

export default page;
