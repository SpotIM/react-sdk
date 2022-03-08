import { useEffect } from 'react';

import { logout, startTTH, TStartTTH } from '../TwoTokenHandshake';

export const useAuthentication = (authentication: Partial<TStartTTH>) => {
  const { userId, performBEDHandshakeCallback } = authentication;

  useEffect(() => {
    if (userId && performBEDHandshakeCallback) {
      startTTH({
        performBEDHandshakeCallback,
        userId,
      });
    } else {
      logout();
    }
    // because we want it to run only when user id changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);
};
