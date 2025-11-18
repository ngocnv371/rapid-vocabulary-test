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
    <div className="group text-center relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-md p-6 border border-white/20 hover:border-pink-400/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-pink-500/30 hover:bg-white/20">
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative z-10">
        <div className="text-5xl mb-3 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 drop-shadow-lg">
          {icon}
        </div>
        <h3 className="text-lg font-bold text-white mb-2 drop-shadow-md">
          {title}
        </h3>
        <p className="text-sm text-white/80 drop-shadow-sm">
          {desc}
        </p>
      </div>
    </div>
  );
}

const HomePage: React.FC = () => {
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
    <Page hideScrollbar className="relative min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      <Header title="Rapid Vocabulary Test" showBackIcon={false} />

      <div className="px-4 pb-20">
        {/* Hero Section */}
        <div className="text-center mt-8 mb-10">
          <div className="inline-block mb-6 animate-bounce">
            <div className="text-8xl drop-shadow-2xl filter hover:scale-110 transition-transform duration-300 cursor-pointer">
              📚
            </div>
          </div>
          <h1 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-pink-400 via-fuchsia-300 to-orange-400 bg-clip-text text-transparent leading-tight drop-shadow-lg">
            Master Your Vocabulary
          </h1>
          <p className="text-lg text-white/90 max-w-md mx-auto font-medium drop-shadow-md">
            Challenge yourself with rapid-fire word tests and climb the
            leaderboard! 🚀
          </p>
        </div>

        {/* Start Quiz CTA */}
        <div className="mb-10">
          <button
            onClick={handleStartQuiz}
            className="w-full relative overflow-hidden rounded-2xl bg-gradient-to-r from-pink-500 via-fuchsia-500 to-orange-500 py-5 px-6 group hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-pink-500/50"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-pink-400 via-fuchsia-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
            <div className="relative flex items-center justify-center gap-3">
              <Icon icon="zi-play" className="text-2xl text-white drop-shadow-lg" />
              <span className="text-xl font-bold text-white drop-shadow-lg">
                Let's Go! 🎯
              </span>
            </div>
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 gap-4 mb-10">
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
            icon="🎯"
            title="Track Progress"
            desc="Monitor your improvement"
          />
          <SmallCard
            icon={spiritAnimal || "🦄"}
            title="Your Spirit"
            desc="Unique animal avatar"
          />
        </div>

        {/* Call to Action Section */}
        <div className="text-center bg-white/10 backdrop-blur-md rounded-3xl p-8 border-2 border-white/20 shadow-xl">
          <div className="text-4xl mb-4">🌟</div>
          <h2 className="text-2xl font-bold text-white mb-3 drop-shadow-md">
            Ready to Test Your Skills?
          </h2>
          <p className="text-base text-white/90 font-medium drop-shadow-sm">
            Join thousands of learners improving their vocabulary daily
          </p>
        </div>
      </div>
      <div className="py-12"></div>

      <NavBar activeKey="home" />
    </Page>
  );
};

export default HomePage;