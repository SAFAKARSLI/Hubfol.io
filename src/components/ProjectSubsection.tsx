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
            case 'stack':
                return <TechStack techStack={content}/>
        }
    }
    
    return (
        <div className='pb-8'>
            <h3 className='text-base font-bold text-hubfolio-text my-6 tracking-wider'>{title}</h3>
            <div className={`${width} tracking-wider`}>{renderContent()}</div>
        </div>
    )
}

export default ProjectSubsection