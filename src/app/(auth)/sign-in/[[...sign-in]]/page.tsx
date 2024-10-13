import HubfolioBanner from '@/components/HubfolioBanner';
import OAuthSignInButton from '@/components/OAuthSignInButton';
import { customThemeClerkAuthenticationComponents } from '@/utils';
import { SignIn } from '@clerk/nextjs';

function page() {
  return (
    <div className="w-screen h-screen flex flex-col  justify-center p-4">
      <div className="shrink">
        <HubfolioBanner width={8} />
      </div>
      <div className="flex-1 flex items-center w-full justify-center">
        <SignIn
          appearance={customThemeClerkAuthenticationComponents}
          forceRedirectUrl={'/api/fully-signed-in'}
        />
      </div>
    </div>
  );
}

export default page;
