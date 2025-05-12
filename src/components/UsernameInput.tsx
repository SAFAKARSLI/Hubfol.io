"use client";

import FormInput from "@/components/project-form/FormInput";
import Employee from "@/types/employee";
import { CheckIcon, Cross1Icon, Cross2Icon } from "@radix-ui/react-icons";
import { Spinner } from "@radix-ui/themes";
import React, { useEffect } from "react";

type Props = {
  setUserNameValid: (value: boolean) => void;
};

function UsernameInput({ setUserNameValid }: Props) {
  const [username, setUsername] = React.useState<string | undefined>("");
  const [usernameBounce, setUsernameBounce] = React.useState<
    string | undefined
  >("");
  const [status, setStatus] = React.useState<string | undefined>();

  useEffect(() => {
    if (!username) {
      setStatus("");
      setUsernameBounce("");
      return;
    }

    setStatus("loading");
    setUserNameValid(false);
    const timeout = setTimeout(() => {
      setUsernameBounce(username);
    }, 800);

    return () => {
      clearTimeout(timeout);
    };
  }, [username]);

  useEffect(() => {
    if (!usernameBounce) {
      return;
    }

    const isValid = validateUsername(usernameBounce);
    if (!isValid) {
      setStatus("invalid");
      setUserNameValid(false);
      return;
    }

    async function checkUsername() {
      try {
        const response = await fetch(`/api/employee/${usernameBounce}`).then(
          (r) => {
            if (r.status == 404) {
              setStatus("valid");
              setUserNameValid(true);
            } else {
              setStatus("username-taken");
              setUserNameValid(false);
            }
          }
        );
      } catch (error) {
        console.error(error);
        setStatus("invalid");
        setUserNameValid(false);
      }
    }

    checkUsername();
  }, [usernameBounce]);

  return (
    <>
      <FormInput
        forceMatch={status == "invalid" || status == "username-taken"}
        label="Username"
        type="text"
        value={username}
        setValue={setUsername}
        description={`This will be your unique identifier on the platform. Usernames can only contain [A-Z, a-z, 0-9, -, _], must be 3-50 characters long, and cannot start, end, or have consecutive dashes or underscores.`}
        name="username"
        message={
          status === "invalid"
            ? "Invalid username. Please read the description for the criteria."
            : status === "username-taken"
            ? "Username is already taken."
            : ""
        }
        style={`italic ${
          status == "valid" &&
          "text-green-11 border-green-800 focus:border-green-800"
        } ${
          (status == "invalid" || status == "username-taken") &&
          "text-red-300 border-red-300 focus:border-red-300"
        }`}
        logo={
          <>
            <p className="text-xs text-violet-11 font-medium italic">
              https://www.hubfol.io/u/
            </p>
            {status == "loading" && <Spinner className="mx-1 " />}
            {(status == "invalid" || status == "username-taken") && (
              <Cross2Icon className="mx-1 h-8 w-8" color="red" />
            )}
            {status == "valid" && (
              <CheckIcon className="mx-1 h-8 w-8" color="green" />
            )}
          </>
        }
        charLimit={50}
        required
      />
      <input type="hidden" name="username" value={usernameBounce} />
    </>
  );
}

function validateUsername(username: string) {
  // Check if username length is between 3 and 50 characters
  if (username.length < 3 || username.length > 50) {
    return false;
  }

  // Regular expression to match the criteria
  const regex = /^[A-Za-z0-9]+(?:[-_][A-Za-z0-9]+)*$/;

  // Test the username against the regex
  return regex.test(username);
}

export default UsernameInput;
