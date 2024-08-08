import React from 'react'
import ProfileOverview from './ProfileOverview'
import { Flex } from '@radix-ui/themes'

type Props = {}


const TopBar: React.FC<Props> = ({}) => {
  return (
    <Flex className='bg-gray-3'>
        <ProfileOverview 
            userName='John DOE' 
            title='Freelance Software Engineer' 
            location='San Francisco, CA, USA' 
            contactInfo='johndoe@hubfol.io'
        />
    </Flex>
  )
}

export default TopBar;