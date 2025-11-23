import { Header, Page, Box, Text } from "zmp-ui";
import React from "react";
import { useNavigate } from 'react-router-dom';

interface TestItem {
  id: string;
  title: string;
  description: string;
  path: string;
  icon: string;
}

const tests: TestItem[] = [
  {
    id: 'score-posting',
    title: 'Score Posting Test',
    description: 'Test the score posting buffer mechanism and throttling behavior',
    path: '/test/score-posting',
    icon: '🎯'
  },
  {
    id: 'access-token',
    title: 'Access Token Test',
    description: 'Test Zalo Mini App access token retrieval',
    path: '/test/access-token',
    icon: '🔑'
  }
];

const TestPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Page>
      <Header title="Test Hub" />
      <Box className="p-4 space-y-4">
        <Box className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg text-gray-800">
          <Text.Title className="mb-2">🧪 Development Test Hub</Text.Title>
          <Text className="text-sm">
            Select a test below to verify different features and functionalities of the app.
          </Text>
        </Box>

        <Box className="space-y-3">
          {tests.map((test) => (
            <Box
              key={test.id}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => navigate(test.path)}
            >
              <div className="flex items-start gap-3">
                <div className="text-3xl">{test.icon}</div>
                <div className="flex-1">
                  <Text className="font-semibold text-gray-800 mb-1">
                    {test.title}
                  </Text>
                  <Text className="text-sm text-gray-600">
                    {test.description}
                  </Text>
                </div>
                <div className="text-gray-400">→</div>
              </div>
            </Box>
          ))}
        </Box>

        <Box className="bg-yellow-50 p-4 rounded-lg mt-6">
          <Text className="text-xs text-gray-600">
            💡 <strong>Tip:</strong> Check the browser console for detailed logs when running tests.
          </Text>
        </Box>
      </Box>
    </Page>
  );
};

export default TestPage;
