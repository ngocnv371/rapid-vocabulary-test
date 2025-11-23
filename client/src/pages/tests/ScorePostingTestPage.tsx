import { Header, Page, Button, Box, Text } from "zmp-ui";
import React, { useState } from "react";
import { useAppContext } from "@/src/contexts/AppContext";
import { postScore } from "../../services/leaderboard";
import { useNavigate } from 'react-router-dom';

const ScorePostingTestPage: React.FC = () => {
  const { profileId } = useAppContext();
  const [lastScore, setLastScore] = useState<number | null>(null);
  const [clickCount, setClickCount] = useState(0);
  const navigate = useNavigate();

  const handlePostRandomScore = () => {
    if (!profileId) {
      console.error("No profile ID available");
      return;
    }

    const randomScore = Math.floor(Math.random() * 100) + 1;
    setLastScore(randomScore);
    setClickCount(prev => prev + 1);
    postScore(profileId, randomScore);
  };

  return (
    <Page>
      <Header 
        title="Score Posting Test" 
        showBackIcon={true}
        onBackClick={() => navigate('/test')}
      />
      <Box className="p-4 space-y-4">
        <Box className="bg-blue-50 p-4 rounded-lg text-gray-800">
          <Text.Title className="mb-2">Test Instructions</Text.Title>
          <Text className="text-sm">
            This page tests the score posting buffer mechanism. Click the button repeatedly to send random scores.
          </Text>
          <Text className="text-sm mt-2">
            <strong>Expected behavior:</strong>
          </Text>
          <ul className="text-sm mt-1 ml-4 list-disc">
            <li>First score posts immediately</li>
            <li>Subsequent scores within 1 minute are buffered</li>
            <li>Only the highest buffered score is kept</li>
            <li>Buffered score posts automatically after 1 minute</li>
          </ul>
        </Box>

        <Box className="bg-gray-50 p-4 rounded-lg text-gray-800">
          <Text className="text-sm">
            <strong>Profile ID:</strong> {profileId || "Not logged in"}
          </Text>
          <Text className="text-sm mt-1">
            <strong>Button clicks:</strong> {clickCount}
          </Text>
          <Text className="text-sm mt-1">
            <strong>Last attempted score:</strong> {lastScore !== null ? lastScore : "None"}
          </Text>
        </Box>

        <Button
          fullWidth
          variant="primary"
          onClick={handlePostRandomScore}
          disabled={!profileId}
        >
          Post Random Score
        </Button>

        {!profileId && (
          <Text className="text-center text-red-500 text-sm">
            Please log in to test score posting
          </Text>
        )}

        <Box className="bg-yellow-50 p-4 rounded-lg mt-4">
          <Text className="text-xs text-gray-600">
            Check the browser console for detailed logs about score posting, buffering, and throttling.
          </Text>
        </Box>
      </Box>
    </Page>
  );
};

export default ScorePostingTestPage;
