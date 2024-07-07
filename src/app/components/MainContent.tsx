import React, { useEffect, useState } from 'react';


type Props = {
}

const MainContent: React.FC<Props> = ({}) => {

  return (
    <div className="flex-1 bg-hubfolio-bg p-6">
      <div className=' h-full w-full bg-hubfolio-bg-content rounded' id="main-content">
        <iframe src='https://www.youtube.com' style={{ width: '100%', height: '100%', position: 'absolute' }} title="YouTube Video" height={"full"}/>
      </div>
    </div>
  );
};

export default MainContent;