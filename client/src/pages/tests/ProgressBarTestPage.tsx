import React, { useState } from "react";
import ProgressBar from "../../components/ProgressBar";
import { Box, Button, Header, Page } from "zmp-ui";

const ProgressBarTestPage: React.FC = () => {
  const [current, setCurrent] = useState(0);

  return (
    <Page
      hideScrollbar
      className="relative min-h-screen w-full max-w-2xl mx-auto"
    >
      <Header title="Progress Bar Test" showBackIcon={true} />
      <ProgressBar value={current} />
      <Box className="p-4 space-y-4">
        <Button onClick={() => setCurrent((prev) => prev + 1)}>
          Increase Current
        </Button>
      </Box>
    </Page>
  );
};

export default ProgressBarTestPage;
