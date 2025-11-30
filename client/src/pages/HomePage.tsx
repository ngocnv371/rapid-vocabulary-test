import {
  Header,
  Icon,
  Page,
  useNavigate,
} from "zmp-ui";
import NavBar from "../components/NavBar";
import { useCallback } from "react";
import { useAppContext } from "../contexts/AppContext";
import UserAvatar from "../components/UserAvatar";
import { useTranslation } from "react-i18next";

function SmallCard({
  icon,
  title,
  desc,
  link,
}: {
  icon: string;
  title: string;
  desc: string;
  link?: string;
}) {
  const navigate = useNavigate();
  
  const handleClick = () => {
    if (link) {
      navigate(link);
    }
  };
  
  return (
    <div 
      onClick={handleClick}
      className="group text-center relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-md p-6 border border-white/20 hover:border-pink-400/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-pink-500/30 hover:bg-white/20 cursor-pointer"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative z-10">
        <div className="text-5xl mb-3 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 drop-shadow-lg">
          {icon}
        </div>
        <h3 className="text-lg font-bold text-white mb-2 drop-shadow-md">
          {title}
        </h3>
        <p className="text-sm text-white/80 drop-shadow-sm">{desc}</p>
      </div>
    </div>
  );
}

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { spiritAnimal, profile } = useAppContext();
  const { t } = useTranslation();
  
  const handleStartQuiz = useCallback(() => {
    if (!spiritAnimal) {
      navigate("/spirit-animal");
      return;
    }

    navigate("/quiz");
  }, [spiritAnimal]);

  return (
    <Page
      hideScrollbar
      className="relative min-h-screen w-full max-w-2xl mx-auto"
    >
      <Header title={t('home.title')} showBackIcon={false} />

      <div className="px-4 pb-20 ">
        {/* Hero Section */}
        <div className="text-center mb-8 animate-fade-in-up">
          <div className="relative mb-4 animate-float">
            <UserAvatar />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
            {profile?.name ? t('home.welcomeBack', { name: profile.name.split(" ")[0] }) : t('home.welcome') + "!"}
          </h1>
          <p className="text-purple-200 text-lg">
            {t('home.subtitle')}
          </p>
        </div>

        {/* Start Quiz CTA */}
        <div className="mb-10">
          <button
            onClick={handleStartQuiz}
            className="w-full relative overflow-hidden rounded-2xl bg-gradient-to-r from-pink-500 via-fuchsia-500 to-orange-500 py-6 px-8 group hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-pink-500/50 animate-pulse hover:animate-none"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-pink-400 via-fuchsia-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
            <div className="relative flex items-center justify-center gap-3">
              <Icon
                icon="zi-play"
                className="text-3xl text-white drop-shadow-lg"
              />
              <span className="text-2xl font-bold text-white drop-shadow-lg">
                {t('home.startButton')}
              </span>
            </div>
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 gap-4 mb-10">
          <SmallCard
            icon="⚡"
            title={t('home.quickTests')}
            desc={t('home.quickTestsDesc')}
            link="/quiz"
          />
          <SmallCard
            icon="🏆"
            title={t('home.compete')}
            desc={t('home.competeDesc')}
            link="/leaderboard"
          />
          <SmallCard
            icon="🎯"
            title={t('home.trackProgress')}
            desc={t('home.trackProgressDesc')}
            link={profile?.id ? `/profile/${profile.id}` : "/login"}
          />
          <SmallCard
            icon={spiritAnimal || "🦄"}
            title={t('home.yourSpirit')}
            desc={t('home.yourSpiritDesc')}
            link="/spirit-animal"
          />
        </div>

        {/* Call to Action Section */}
        <div className="text-center bg-white/10 backdrop-blur-md rounded-3xl p-8 border-2 border-white/20 shadow-xl">
          <div className="text-4xl mb-4">🌟</div>
          <h2 className="text-2xl font-bold text-white mb-3 drop-shadow-md">
            {t('home.ctaTitle')}
          </h2>
          <p className="text-base text-white/90 font-medium drop-shadow-sm">
            {t('home.ctaSubtitle')}
          </p>
        </div>
      </div>
      <div className="py-12"></div>

      <NavBar activeKey="home" />
    </Page>
  );
};

export default HomePage;
