import {
  BottomNavigation,
  Box,
  Button,
  Header,
  Icon,
  Page,
  useNavigate,
} from "zmp-ui";
import NavBar from "../components/NavBar";
import { useCallback } from "react";
import { useAppContext } from "../contexts/AppContext";

function SmallCard({
  icon,
  title,
  desc,
}: {
  icon: string;
  title: string;
  desc: string;
}) {
  return (
    <Box className="feature-card">
      <div className="feature-icon">{icon}</div>
      <h3 className="feature-title">{title}</h3>
      <p className="feature-desc">{desc}</p>
    </Box>
  );
}

// TODO: refactor home page to use tailwind 
export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { spiritAnimal } = useAppContext();
  const handleStartQuiz = useCallback(() => {
    if (!spiritAnimal) {
      navigate("/spirit-animal");
      return;
    }

    navigate("/quiz");
  }, [spiritAnimal]);

  return (
    <Page hideScrollbar className="home-page">
      <Header title="Rapid Vocabulary Test" showBackIcon={false} />

      <Box className="home-container" p={4}>
        {/* Hero Section */}
        <Box className="hero-section" mt={6} mb={8}>
          <div className="hero-icon animate-float">
            <span style={{ fontSize: "64px" }}>📚</span>
          </div>
          <h1 className="hero-title">Master Your Vocabulary</h1>
          <p className="hero-subtitle">
            Challenge yourself with rapid-fire word tests and climb the
            leaderboard!
          </p>
        </Box>

        {/* Start Quiz CTA */}
        <Box mb={6}>
          <Button
            variant="primary"
            size="large"
            fullWidth
            className="start-quiz-btn animate-glow-pulse"
            onClick={handleStartQuiz}
          >
            <Box
              flex
              flexDirection="row"
              alignItems="center"
              justifyContent="center"
              style={{ gap: "8px" }}
            >
              <Icon icon="zi-play" style={{ fontSize: "20px" }} />
              <span style={{ fontSize: "18px", fontWeight: "600" }}>
                Let's go!
              </span>
            </Box>
          </Button>
        </Box>

        {/* Features Grid */}
        <Box className="features-grid" mb={8}>
          <SmallCard
            icon="⚡"
            title="Quick Tests"
            desc="Fast-paced vocabulary challenges"
          />
          <SmallCard
            icon="🏆"
            title="Compete"
            desc="Rise through the leaderboard"
          />
          <SmallCard
            icon="🏆"
            title="Compete"
            desc="Rise through the leaderboard"
          />
          <SmallCard
            icon="🎯"
            title="Track Progress"
            desc="Monitor your improvement"
          />

          <SmallCard
            icon={spiritAnimal || "🦄"}
            title="Your Spirit"
            desc="Unique animal avatar"
          />
        </Box>

        {/* Quick Stats */}
        <Box className="stats-section" mb={4}>
          <h2 className="stats-title">Ready to Test Your Skills?</h2>
          <p className="stats-desc">
            Join thousands of learners improving their vocabulary daily
          </p>
        </Box>
      </Box>

      <NavBar activeKey="home" />
    </Page>
  );
};
