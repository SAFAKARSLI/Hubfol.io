import React from 'react'

type Props = {
    text: string;
}

const Text: React.FC<Props> = ({ text }) => {
    return (
        <p className='text-sm'>
            {text.split('\n').map((line, index) => (
                <React.Fragment key={index}>
                    {line}
                    <br />
                </React.Fragment>
            ))}
        </p>
    )
}

export default Text;