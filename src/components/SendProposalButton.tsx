import { EnvelopeClosedIcon } from '@radix-ui/react-icons';
import { Button, Text } from '@radix-ui/themes';
import React from 'react';

type Props = {};

function SendProposalButton({}: Props) {
  return (
    <Button size={'2'} className="-xl:w-10 -xl:h-10">
      <EnvelopeClosedIcon />
      <Text className="-xl:hidden">Send Proposal</Text>
    </Button>
  );
}

export default SendProposalButton;
