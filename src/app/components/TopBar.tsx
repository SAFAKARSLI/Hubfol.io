import React from 'react'
import ProfileOverview from './ProfileOverview'

type Props = {}


const TopBar: React.FC<Props> = ({}) => {
  return (
    <div className='flex bg-hubfolio-primary'>
        <ProfileOverview 
            userName='John DOE' 
            title='Freelance Software Engineer' 
            location='San Francisco, CA, USA' 
            contactInfo='johndoe@hubfol.io'
        />
    </div>
  )
}

export default TopBar;