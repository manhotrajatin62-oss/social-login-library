import { useEffect, useState } from "react";
import Clerk from "./auth/clerk/Clerk";
import { supabase } from "./auth/supabase/supabase";
import SBLoginPage from "./auth/supabase/SBLoginPage";
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./auth/msal/msalConfig";

const App = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const msalInstance = new PublicClientApplication(msalConfig);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      },
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  if (loading) return <p>Loading...</p>;
  return (
    <>
      <Clerk />
      <MsalProvider instance={msalInstance}>
        {user ? (
          <div>
            <h1>Welcome {user.email}</h1>
            <button onClick={() => supabase.auth.signOut()}>Logout</button>
          </div>
        ) : (
          <SBLoginPage />
        )}
      </MsalProvider>
      {/* <FBLoginPage/> */}
    </>
  );
};

export default App;
