import React, { useEffect } from 'react';

import { OpenWebContext } from '../../common/context';
import { OW_SDK_EVENT, subscribeToOpenWebEvents } from '../../common/utils';
import { OpenWebSDKEvent } from '../../types';
import { ProductWrapper } from '../ProductWrapper';

interface IProps {
  spotId: string;
  tracking?: { [eventName: string]: (event: OpenWebSDKEvent) => any };
}

export const OpenWebProvider: React.FC<IProps> = ({ spotId, children, tracking = {} }) => {
  useEffect(() => {
    const unsubscribe = subscribeToOpenWebEvents(tracking);

    return unsubscribe;
  }, [tracking]);

  return (
    <OpenWebContext.Provider value={{ spotId }}>
      <ProductWrapper>{children}</ProductWrapper>
    </OpenWebContext.Provider>
  );
};
