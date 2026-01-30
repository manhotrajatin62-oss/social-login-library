import { useEffect, useState } from "react";
import Clerk from "./auth/clerk/Clerk";
import { supabase } from "./auth/supabase/supabase";
import SBLoginPage from "./auth/supabase/SBLoginPage";

const App = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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
      {user ? (
        <div>
          <h1>Welcome {user.email}</h1>
          <button onClick={() => supabase.auth.signOut()}>Logout</button>
        </div>
      ) : (
        <SBLoginPage />
      )}
      {/* <FBLoginPage/> */}
    </>
  );
};

export default App;
