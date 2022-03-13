import React from 'react';

import { TUseAuthentication, useAuthentication } from '../../common/hooks/useAuthentication';

type Props = {
  authentication: TUseAuthentication;
};

export const Authentication: React.FC<Props> = ({ authentication }) => {
  useAuthentication(authentication);

  return null;
};
