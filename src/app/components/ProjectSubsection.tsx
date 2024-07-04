import React from 'react'

import Text from './subsections/Text'
import TechStack from './subsections/TechStack'

type Props = {
    title: string;
    contentType: string;
    content: any;
    width?: string;
}

const ProjectSubsection: React.FC<Props> = ({ title, content, width="w-full", contentType}) => {
    
    const renderContent = () => {
        switch(contentType) {
            case 'text':
                return <Text text={content}/>
            case 'techStack':
                return <TechStack techStack={content}/>
        }
    }
    
    return (
        <div className='py-6'>
            <h3 className='text-base font-bold text-hubfolio-text mb-4'>{title}</h3>
            <div className={`${width}`}>{renderContent()}</div>
        </div>
    )
}

export default ProjectSubsection