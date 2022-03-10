import React from 'react';

import { OpenWebContext } from '../../common/context';
import { TUseAuthentication } from '../../common/hooks/useAuthentication';
import { Authentication } from '../Authentication';

interface IProps {
  spotId: string;
  authentication?: TUseAuthentication;
}

export const OpenWebProvider: React.FC<IProps> = ({ spotId, authentication, children }) => {
  return (
    <OpenWebContext.Provider value={{ spotId }}>
      {!!authentication && <Authentication authentication={authentication} />}
      {children}
    </OpenWebContext.Provider>
  );
};
