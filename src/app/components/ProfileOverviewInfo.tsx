import React from 'react'

type Props = {
    userName: string,
    userRole: string,
}

export default function ProfileOverviewInfo({ userName, userRole }: Props) {
    return (
      <div className='flex-col'>
          <div className="w-auto">{userName}</div>
          <div className="w-auto">{userRole}</div>
      </div>
    )
  }