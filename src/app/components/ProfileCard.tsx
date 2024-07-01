import Image from 'next/image'
import React from 'react'
import ProfileOverviewInfo from './ProfileOverviewInfo'
import profilePic from "../../../public/icons8-customer-100.png"

type Props = {}

export default function ProfileCard({}: Props) {
  return (
    <div className='flex h-20 text-white bg-[--hubfolio-primary]'>
        <Image className="basis-2/5" 
            alt='Profile Picture'
            src={profilePic}
            width={0}
            height={0}/>
        <ProfileOverviewInfo userName='John Doe' userRole='Software Engineer'/>
    </div>
  )
}