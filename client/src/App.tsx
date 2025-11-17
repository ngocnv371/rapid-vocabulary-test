import { AppProvider } from "./contexts/AppContext";
import { App as ZApp, SnackbarProvider, ZMPRouter } from "zmp-ui";
import { ConfigProvider } from "./components/config-provider";
import { Layout } from "./components/layout";
import { HeartsProvider } from "./contexts/HeartsContext";

export default function App() {
  return (
    <AppProvider>
      <HeartsProvider>
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
    </AppProvider>
  );
}
