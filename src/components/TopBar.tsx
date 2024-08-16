import React from 'react'
import ProfileOverview from './ProfileOverview'
import { Flex, Text, Button } from '@radix-ui/themes'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { signOut, signIn } from 'next-auth/react'

type Props = {}

const links: string[] = [
  'Profile Overview',
  'Projects',
  'Professional Experiences',
  'Certificates and Education'
]

const TopBar: React.FC<Props> = ({}) => {
  return (
    <Flex className=''>
        <ProfileOverview 
            userName='John DOE' 
            title='Freelance Software Engineer' 
            location='San Francisco, CA, USA' 
            contactInfo='johndoe@hubfol.io'
        />
        <Flex justify={"center"} width={"100%"} className='border-y border-gray-4 w-full bg-gray-1' >
          <Flex justify={"between"} align={"center"} height={"100%"} width={"60%"}>
          {links.map((link, i) => (
            <Text as={'div'} size={"2"} color='gray' key={i} className='hover:text-white'>
              <Link href={"/"+link.toLowerCase().replaceAll(' ', '-')}>{link}</Link>
            </Text>
          ))}
          </Flex>
        </Flex>
    </Flex>
  )
}

export default TopBar;