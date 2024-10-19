import { Button, Heading, IconButton } from '@radix-ui/themes';
import React from 'react';
import { FaEdit } from 'react-icons/fa';

type Props = {};

/*/
  Username
  Title
  Full Name
  Email
  Status
  Phone Number
/*/

function page({}: Props) {
  return (
    <div className="max-w-[900px] m-auto py-8">
      <Heading as="h1" className="text-center -2xl:text-md text-wrap">
        Account Information
      </Heading>
      <div>
        <div className="flex flex-col gap-2 mt-8">
          <div className="flex items-center gap-2">
            <Heading as="h4" className="text-lg -2xl:text-md text-wrap">
              Username
            </Heading>
            <IconButton variant="ghost" className="hover:cursor-pointer">
              <FaEdit />
            </IconButton>
          </div>
          <div className="bg-gray-1 p-4 rounded">
            <p className="text-gray-9">username</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
