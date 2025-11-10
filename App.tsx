import { useState, useEffect } from "react";
import { supabase } from "./services/supabase";
import type { Session } from "@supabase/supabase-js";
import { HeartsProvider } from "./contexts/HeartsContext";
import { App as ZApp, SnackbarProvider, ZMPRouter } from "zmp-ui";
import { ConfigProvider } from "./components/config-provider";
import { Layout } from "./components/layout";

export default function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <HeartsProvider session={session}>
      <ConfigProvider
        cssVariables={{
          "--zmp-background-color": "#f4f5f6",
        }}
      >
        <ZApp>
          <SnackbarProvider>
            <ZMPRouter>
              <Layout />
            </ZMPRouter>
          </SnackbarProvider>
        </ZApp>
      </ConfigProvider>
    </HeartsProvider>
  );
}
