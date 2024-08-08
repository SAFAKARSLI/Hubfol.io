import { Text } from '@radix-ui/themes';
import React from 'react'

type Props = {
    text: string;
}

const TextSection: React.FC<Props> = ({ text }) => {
    return (
        <Text as='p' size={"1"} className='tracking-wider'>
            {text.split('\n').map((line, index) => (
                <React.Fragment key={index}>
                    {line}
                    <br />
                </React.Fragment>
            ))}
        </Text>
    )
}

export default TextSection;