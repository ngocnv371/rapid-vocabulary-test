import { Header, Page, Button, Box, Text } from "zmp-ui";
import React, { useCallback, useEffect, useState } from "react";
import { getAccessToken } from "zmp-sdk";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/src/services/supabase";

const AccessTokenTestPage: React.FC = () => {
  const [token, setToken] = useState<string>("");
  const navigate = useNavigate();

  // test the token against zalo api
  const testToken = useCallback((token: string) => {
    supabase.functions
      .invoke("zalo-auth", {
        body: { zaloAccessToken: token },
      })
      .then((response) => {
        if (response.error) {
          console.error("Token verification failed:", response.error);
        } else {
          console.log("Token verification succeeded:", response.data);
        }
      });
  }, []);

  const handleGetToken = async () => {
    try {
      const accessToken = await getAccessToken();
      console.log("Access Token:", accessToken);
      setToken(accessToken);
      testToken(accessToken);
    } catch (error) {
      console.error("Error getting access token:", error);
      setToken(
        "Error: " + (error instanceof Error ? error.message : String(error))
      );
    }
  };

  return (
    <Page
      hideScrollbar
      className="relative min-h-screen w-full max-w-2xl mx-auto relative"
    >
      <Header
        title="Access Token Test"
        showBackIcon={true}
        onBackClick={() => navigate("/test")}
      />
      <Box className="p-4 space-y-4">
        <Box className="bg-blue-50 p-4 rounded-lg text-gray-800">
          <Text.Title className="mb-2">Test Instructions</Text.Title>
          <Text className="text-sm">
            This page tests the Zalo Mini App access token retrieval using the
            getAccessToken() function from zmp-sdk.
          </Text>
          <Text className="text-sm mt-2">
            <strong>Expected behavior:</strong>
          </Text>
          <ul className="text-sm mt-1 ml-4 list-disc">
            <li>Click the button to retrieve the access token</li>
            <li>Token will be displayed below if successful</li>
            <li>Check console for detailed logs</li>
            <li>Error messages will be shown if retrieval fails</li>
          </ul>
        </Box>

        <Button fullWidth variant="primary" onClick={handleGetToken}>
          Get Access Token
        </Button>

        <Box className="bg-green-50 p-4 rounded-lg">
          <Text className="text-sm font-semibold mb-2">Access Token:</Text>
          <Text className="text-xs break-all font-mono text-gray-800">
            {token || "-"}
          </Text>
        </Box>

        <Box className="bg-yellow-50 p-4 rounded-lg mt-4">
          <Text className="text-xs text-gray-600">
            Check the browser console for detailed logs about token retrieval.
          </Text>
        </Box>
      </Box>
    </Page>
  );
};

export default AccessTokenTestPage;
