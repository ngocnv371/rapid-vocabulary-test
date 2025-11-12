import { useState, useEffect } from "react";
import { AppProvider } from "./src/contexts/AppContext";
import { App as ZApp, SnackbarProvider, ZMPRouter } from "zmp-ui";
import { ConfigProvider } from "./src/components/config-provider";
import { Layout } from "./src/components/layout";
import { useUserInfoLoader } from "./src/hooks/useUserInfoLoader";

export default function App() {
  const { user, profileId } = useUserInfoLoader();
  return (
    <AppProvider user={user} profileId={profileId}>
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
    </AppProvider>
  );
}
