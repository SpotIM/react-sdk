import { User } from '../../types';

const SPOTIM_API_READY = 'spot-im-api-ready';

type TPerformBEDHandshake = (codeA: string) => Promise<string>;

export type TStartTTH = {
  performBEDHandshakeCallback: TPerformBEDHandshake;
  userId: string;
};

export const startTTH = ({ performBEDHandshakeCallback, userId }: TStartTTH) =>
  new Promise<User>((resolve, reject) => {
    const startHandshake = async () => {
      const callback = async (codeA, completeTTHCallback) => {
        try {
          const codeB = await performBEDHandshakeCallback(codeA);

          if (codeB) {
            await completeTTHCallback(codeB);
          }
        } catch (err) {
          console.error('startTTH - error with performBEDHandshakeCallback', err);
          throw err;
        }
      };

      try {
        if (window?.SPOTIM?.startTTH) {
          const userData = await window.SPOTIM.startTTH({
            callback,
            userId,
          });

          resolve(userData);
          return;
        }

        throw new Error('startTTH - window.SPOTIM.startTTH is not visible on window');
      } catch (err) {
        console.error('startTTH - client side start sso failed with', err);
        reject(err);
      }
    };

    if (window?.SPOTIM?.startTTH) {
      startHandshake();
    } else {
      const startHandshakeOnApiReady = async () => {
        startHandshake();
        document.removeEventListener(SPOTIM_API_READY, startHandshakeOnApiReady);
      };

      document.addEventListener(SPOTIM_API_READY, startHandshakeOnApiReady, false);
    }
  });

export const logout = () =>
  new Promise<User>((resolve, reject) => {
    const logout = async () => {
      try {
        if (window.SPOTIM && window.SPOTIM.logout) {
          const currentUser = await window.SPOTIM.logout();

          resolve(currentUser);
          return;
        }

        throw new Error('logout TTH  - window.SPOTIM.logout is not visible on window');
      } catch (err) {
        console.error('logout TTH - logout failed', err);
        reject(err);
      }
    };

    if (window.SPOTIM && window.SPOTIM.logout) {
      logout();
    } else {
      const logoutOnApiReady = async () => {
        logout();
        document.removeEventListener(SPOTIM_API_READY, logoutOnApiReady);
      };

      document.addEventListener(SPOTIM_API_READY, logoutOnApiReady, false);
    }
  });
