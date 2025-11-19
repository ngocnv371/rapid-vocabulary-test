import { useCallback, useEffect } from "react";
import { useAppContext } from "../contexts/AppContext";
import { getItem, setItem } from "../services/storage";
import { authorize } from "zmp-sdk";
import { upsertProfile } from "../services/profile";

const USER_DENIAL_KEY = "user_denial";
function getUserDenial() {
  return !!getItem(USER_DENIAL_KEY);
}

function setUserDenial(denied: boolean) {
  setItem(USER_DENIAL_KEY, denied ? "1" : "");
}

export default function AskForProfilePermission() {
  const { user, reloadUser } = useAppContext();

  const reauthorize = useCallback(() => {
    console.log("Requesting profile permission from user...");
    authorize({
      scopes: ["scope.userInfo"],
    }).then(
      (result) => {
        console.log("User granted profile permission:", result);
        setUserDenial(false);
        upsertProfile(
          {
            zaloId: user?.id,
            name: user?.name,
            avatarUrl: user?.avatar,
          },
          () => {
            reloadUser();
          }
        );
      },
      (reason) => {
        console.log("User denied profile permission:", reason);
        setUserDenial(true);
      }
    );
  }, []);

  // load denial status
  useEffect(() => {
    // if no user, do nothing
    if (!user?.id) {
      return;
    }

    // if user has denied before, do nothing
    if (getUserDenial()) {
      return;
    }
    // ask for authorization
    reauthorize();
  }, [user?.id]);

  // don't show if user has avatar already
  if (user && user?.avatar !== "") {
    return null;
  }

  return (
    <button
      className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition"
      onClick={reauthorize}
    >
      Grant Profile Permission
    </button>
  );
}
