import React from 'react';

import { OpenWebContext } from '../../common/context';
import { TStartTTH } from '../../utils/TwoTokenHandshake';
import { useAuthentication } from '../../utils/useAuthentication';

interface IProps {
  spotId: string;
  authentication: Partial<TStartTTH>;
}

export const OpenWebProvider: React.FC<IProps> = ({ spotId, authentication, children }) => {
  useAuthentication(authentication);

  return <OpenWebContext.Provider value={{ spotId }}>{children}</OpenWebContext.Provider>;
};
