import React from 'react';

interface ProfileOverviewProps {
  userName: string;
  title: string;
  location: string;
  contactInfo: string;
}

 
const ProfileOverview: React.FC<ProfileOverviewProps> = ({userName, title, location, contactInfo}) => {
  return (
    <div className="bg-hubfolio-primary p-4 flex shadow-custom z-50
    w-[22rem]">
      <div className="flex items-center">
        <div className="w-16 h-16 rounded-full bg-gray-600"></div>
        <div className="ml-6">
          <div className='pb-1'>
            <h1 className="text-base text-hubfolio-text">{userName}</h1>
            <p className='text-sm text-hubfolio-text'>{title}</p>
          </div>
          <div>
            <p className='text-hubfolio-subtext text-sm tracking-wide'>{location}</p>
            <p className='text-hubfolio-subtext text-sm'>{contactInfo}</p>
          </div>
        </div>
      </div>
      <div className='flex flex-col justify-between h-full'>
        <div className="text-sm">...</div> 
        <div className="text-base text-hubfolio-text">$45/hr</div>

      </div>
    </div>
  );
};

export default ProfileOverview;