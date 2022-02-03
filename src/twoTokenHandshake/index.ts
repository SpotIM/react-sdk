import { User } from "../types";

const SPOTIM_API_READY = "spot-im-api-ready";

type TPerformBEDHandshake = (codeA: string) => Promise<string>;

export const startTTH = ({
  performBEDHandshake,
  userId,
}: {
  performBEDHandshake: TPerformBEDHandshake;
  userId: string;
}) =>
  new Promise<User>((resolve, reject) => {
    const startHandshake = async () => {
      const callback = async (codeA, completeSSOCallback) => {
        try {
          const codeB = await performBEDHandshake(codeA);

          if (codeB) {
            completeSSOCallback(codeB);
          }
        } catch (err) {
          console.error("startTTH - error with getCodeB", err);
          reject(err);
        }
      };

      try {
        const userData = await (window as any).SPOTIM.startTTH({
          callback,
          userId,
        });
        console.log("startTTH - success with user:", userData);

        resolve(userData);
      } catch (err) {
        console.error("startTTH - client side start sso failed with", err);
        reject(err);
      }
    };

    if ((window as any).SPOTIM && (window as any).SPOTIM.startTTH) {
      startHandshake();
    } else {
      const startHandshakeOnApiReady = async () => {
        startHandshake();
        document.removeEventListener(
          SPOTIM_API_READY,
          startHandshakeOnApiReady
        );
      };

      document.addEventListener(
        SPOTIM_API_READY,
        startHandshakeOnApiReady,
        false
      );
    }
  });

export const logout = () =>
  new Promise<User>(async (resolve, reject) => {
    const logout = async () => {
      try {
        const currentUser = await (window as any).SPOTIM.logout();
        console.log("startTTH - logout success", currentUser);

        resolve(currentUser);
      } catch (err) {
        console.error("startTTH - logout failed", err);
        reject(err);
      }
    };

    if ((window as any).SPOTIM && (window as any).SPOTIM.logout) {
      logout();
    } else {
      const logoutOnApiReady = async () => {
        logout();
        document.removeEventListener(SPOTIM_API_READY, logoutOnApiReady);
      };

      document.addEventListener(SPOTIM_API_READY, logoutOnApiReady, false);
    }
  });
