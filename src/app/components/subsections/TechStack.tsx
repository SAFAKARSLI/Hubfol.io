import React from 'react'
import * as AspectRatio from '@radix-ui/react-aspect-ratio';


type Props = {
    techStack: string[];
}

const TechStack: React.FC<Props> = ({techStack}) => {
    return (
        <div className='flex w-full'>
            {techStack.map((tech, index) => (
                <div key={index} className='flex flex-shrink-1 flex-grow m-1 justify-center ' style={{flexBasis: 'calc(50% - 2rem)'}}>
                        <img height="40" width="40" src={`https://cdn.simpleicons.org/${tech}/_/eee?viewbox=auto`}/>
                </div>
            ))}
        </div>
    )
}

export default TechStack;