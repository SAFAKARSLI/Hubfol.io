import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Callout, Flex } from "@radix-ui/themes";
import React from "react";

type Props = {
  errors: string[];
};

function FormErrorMessage({ errors }: Props) {
  return errors.length > 0 ? (
    <Flex direction="column" gap="3">
      <Callout.Root color="red">
        <Callout.Icon>
          <InfoCircledIcon />
        </Callout.Icon>
        <Callout.Text>
          The following errors occurred while creating the project:
          {errors.map((e, idx) => (
            <p key={idx}>{e}</p>
          ))}
        </Callout.Text>
      </Callout.Root>
    </Flex>
  ) : null;
}

export default FormErrorMessage;
