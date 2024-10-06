import OAuthSignInButton from '@/components/OAuthSignInButton';
import { Button, Heading, Text } from '@radix-ui/themes';
import { FaGithub, FaGoogle } from 'react-icons/fa';

function page() {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="bg-gray-2 flex-1 max-w-[30rem] rounded border border-gray-4 p-4">
        <Heading>Sign in</Heading>
        <Text>Please select a sign-in option to sign in.</Text>
        <div className="flex flex-col gap-2 mt-4">
          <OAuthSignInButton
            color="red"
            variant="solid"
            OAuthType="google"
            label="Sign in with Google"
            logo={<FaGoogle />}
          />

          <OAuthSignInButton
            color="gray"
            variant="surface"
            OAuthType="github"
            label="Sign in with Github"
            logo={<FaGithub />}
          />
        </div>
      </div>
    </div>
  );
}

export default page;
