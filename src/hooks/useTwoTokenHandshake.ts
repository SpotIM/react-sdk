import { User } from "../types";

const SPOTIM_API_READY = "spot-im-api-ready";

type TStartPublishersHandshake = (codeA: string) => Promise<{ codeB: string }>;

type TUseTwoTokenHandshake = {
  startPublishersHandshake: TStartPublishersHandshake;
};

type TLogin = () => Promise<User>;
type TLogout = () => Promise<User>;

export const useTwoTokenHandshake = ({
  startPublishersHandshake,
}: TUseTwoTokenHandshake): [TLogin, TLogout] => {
  if (!startPublishersHandshake) {
    throw new Error("useTwoTokenHandshake");
  }

  return [login({ startPublishersHandshake }), logout];
};

const login =
  ({
    startPublishersHandshake,
  }: {
    startPublishersHandshake: TStartPublishersHandshake;
  }) =>
  () =>
    new Promise<User>((resolve, reject) => {
      const startHandshake = async () => {
        const callback = async (codeA, completeSSOCallback) => {
          try {
            const { codeB } = await startPublishersHandshake(codeA);

            if (codeB) {
              completeSSOCallback(codeB);
            }
          } catch (err) {
            console.error("useTwoTokenHandshake - error with getCodeB", err);
            reject(err);
          }
        };

        try {
          const userData = await (window as any).SPOTIM.startSSO(callback);
          console.log("useTwoTokenHandshake - success with user:", userData);

          resolve(userData);
        } catch (err) {
          console.error(
            "useTwoTokenHandshake - client side start sso failed with",
            err
          );
          reject(err);
        }
      };

      if ((window as any).SPOTIM && (window as any).SPOTIM.startSSO) {
        startHandshake();
      } else {
        document.addEventListener(SPOTIM_API_READY, startHandshake, false);
      }
    });

const logout = () =>
  new Promise<User>(async (resolve, reject) => {
    const logout = async () => {
      try {
        const currentUser = await (window as any).SPOTIM.logout();
        console.log("useTwoTokenHandshake - logout success", currentUser);
        resolve(currentUser);
      } catch (err) {
        console.error("useTwoTokenHandshake - logout failed", err);
        reject(err);
      }
    };

    if ((window as any).SPOTIM && (window as any).SPOTIM.logout) {
      await logout();
    } else {
      document.addEventListener(
        SPOTIM_API_READY,
        async () => {
          await logout();
          document.removeEventListener(SPOTIM_API_READY, logout);
        },
        false
      );
    }
  });
