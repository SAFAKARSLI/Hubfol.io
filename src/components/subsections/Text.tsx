import React from 'react'

type Props = {
    text: string;
}

const Text: React.FC<Props> = ({text}) => {
    return (
        <p className='text-sm'>{text}</p>
    )
}

export default Text;