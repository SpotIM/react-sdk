import React, { useEffect } from 'react';

import { OpenWebContext } from '../../common/context';
import { TUseAuthentication } from '../../common/hooks/useAuthentication';
import { subscribeToOpenWebEvents } from '../../common/utils';
import { OpenWebSDKEvent } from '../../types';
import { Authentication } from '../Authentication';
import { ProductWrapper } from '../ProductWrapper';

interface IProps {
  spotId: string;
  authentication?: TUseAuthentication;
  tracking?: { [eventName: string]: (event: OpenWebSDKEvent) => any };
  children?: React.ReactNode;
}

export const OpenWebProvider: React.FC<IProps> = ({ spotId, authentication, tracking = {}, children }) => {
  useEffect(() => {
    const unsubscribe = subscribeToOpenWebEvents(tracking);

    return unsubscribe;
  }, [tracking]);

  return (
    <OpenWebContext.Provider value={{ spotId }}>
      {!!authentication && <Authentication authentication={authentication} />}
      <ProductWrapper>{children}</ProductWrapper>
    </OpenWebContext.Provider>
  );
};
