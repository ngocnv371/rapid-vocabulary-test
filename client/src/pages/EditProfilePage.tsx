import { useState } from "react";
import { Header, Page, Input, Button, useSnackbar, useNavigate } from "zmp-ui";
import { useAppContext } from "@/src/contexts/AppContext";
import { supabase } from "@/src/services/supabase";
import NavBar from "../components/NavBar";
import LanguageSwitcher from "../components/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import Spinner from "../components/Spinner";

const EditProfilePage: React.FC = () => {
  const { t } = useTranslation();
  const { profile, reloadProfile } = useAppContext();
  const { openSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState(profile?.name || "");
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (!displayName.trim()) {
      openSnackbar({
        text: t("editProfile.nameRequired"),
        type: "error",
        duration: 3000,
      });
      return;
    }

    if (displayName.length > 50) {
      openSnackbar({
        text: t("editProfile.nameTooLong"),
        type: "error",
        duration: 3000,
      });
      return;
    }

    if (!profile?.id) {
      openSnackbar({
        text: t("editProfile.notLoggedIn"),
        type: "error",
        duration: 3000,
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase
        .from("profiles")
        .update({ name: displayName.trim() })
        .eq("id", profile.id);

      if (error) {
        console.error("Error updating profile:", error);
        openSnackbar({
          text: t("editProfile.updateError"),
          type: "error",
          duration: 3000,
        });
      } else {
        openSnackbar({
          text: t("editProfile.updateSuccess"),
          type: "success",
          duration: 3000,
        });
        reloadProfile();
        navigate("/profile");
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      openSnackbar({
        text: t("editProfile.updateError"),
        type: "error",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/profile");
  };

  return (
    <Page
      hideScrollbar
      className="relative min-h-screen w-full max-w-2xl mx-auto"
    >
      <Header title={t("editProfile.title")} />
      <LanguageSwitcher />
      
      <div className="p-6 min-h-screen">
        {/* Animated background orbs */}
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute z-[-10] bottom-0 right-1/4 w-80 h-80 bg-pink-600/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>

        <div className="relative max-w-md mx-auto mt-8">
          {/* Card container */}
          <div className="bg-gradient-to-br from-purple-600/30 to-pink-600/30 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white/20">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-300 to-purple-200 mb-6 text-center">
              {t("editProfile.heading")}
            </h2>

            {/* Input field */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-purple-200 mb-2">
                {t("editProfile.displayNameLabel")}
              </label>
              <Input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder={t("editProfile.placeholder")}
                className="w-full bg-white/10 border-purple-400/30 text-white placeholder-purple-300/50 rounded-xl focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50"
                maxLength={50}
                disabled={isLoading}
              />
              <p className="text-xs text-purple-300/70 mt-1">
                {displayName.length}/50 {t("editProfile.characters")}
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex gap-4">
              <Button
                onClick={handleCancel}
                disabled={isLoading}
                className="flex-1 bg-gray-600/50 hover:bg-gray-600/70 text-white font-semibold py-3 rounded-xl border border-gray-500/30 transition-all duration-300"
              >
                {t("editProfile.cancel")}
              </Button>
              <Button
                onClick={handleSave}
                disabled={isLoading}
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 border border-purple-400/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Spinner />
                    {t("editProfile.saving")}
                  </span>
                ) : (
                  t("editProfile.save")
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <NavBar activeKey="profile" />
    </Page>
  );
};

export default EditProfilePage;
