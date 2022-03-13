import { useEffect } from 'react';

import { User } from '../../../types';
import { logout, startTTH, TStartTTH } from '../../../utils/TwoTokenHandshake';

export type TUseAuthentication = Partial<TStartTTH> & {
  onUserChanged?: (user: User) => void;
  onError?: (error: Error) => void;
};

export const useAuthentication = (authentication: TUseAuthentication) => {
  const { userId, performBEDHandshakeCallback, onUserChanged, onError } = authentication;

  useEffect(() => {
    if (userId && performBEDHandshakeCallback) {
      startTTH({
        performBEDHandshakeCallback,
        userId,
      })
        .then(onUserChanged)
        .catch(onError);
    } else {
      logout().then(onUserChanged).catch(onError);
    }
    // because we want it to run only when user id changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);
};
