import HubfolioBanner from "@/components/HubfolioBanner";
import OAuthSignInButton from "@/components/OAuthSignInButton";
import { customThemeClerkAuthenticationComponents } from "@/utils";
import { SignIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

function page() {
  const session = auth();

  if (session)
    return (
      <div className="w-screen h-screen flex flex-col  justify-center p-4">
        <HubfolioBanner width={100} />
        <div className="flex-1 flex items-center w-full justify-center">
          <SignIn
            appearance={customThemeClerkAuthenticationComponents}
            forceRedirectUrl={"/api/fully-signed-in"}
          />
        </div>
      </div>
    );
}

export default page;
