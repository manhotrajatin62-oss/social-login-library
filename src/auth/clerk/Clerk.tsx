import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

const Clerk = () => {
  const publishable_key = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

  if (!publishable_key) {
    throw new Error("missing publishable key");
  }

  return (
    <ClerkProvider publishableKey={publishable_key}>
      <header>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>
    </ClerkProvider>
  );
};

export default Clerk;
