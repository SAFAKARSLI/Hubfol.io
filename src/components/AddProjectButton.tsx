import React from 'react'
import {Box, Button } from '@radix-ui/themes';
import { PlusIcon } from '@radix-ui/react-icons';

type Props = {}

function AddProjectButton({}: Props) {
  return (
    <Box className='mx-6'>
      <Button variant='ghost' className='cursor-pointer rounded h-12 w-full' >
      <div className={`flex m-4 leading-none`}
        >
          <div className='flex gap-x-2'>
            <PlusIcon /> Add Project
          </div>
          
      </div>
      </Button>
    </Box>
  )
}

export default AddProjectButton