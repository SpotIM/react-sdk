import React from 'react';

import { useOpenWebContext } from '../../common/context';
import { IOpenWebBaseProps } from '../../types';
import { useLauncher } from '../../common/hooks/useLauncher';

export const ProductWrapper: React.FC<Partial<IOpenWebBaseProps & { children?: React.ReactNode }>> = ({
  spotId: _spotId,
  children,
  ...rest
}) => {
  const owContext = useOpenWebContext();
  const spotId = _spotId || owContext.spotId;

  if (!spotId) {
    document.dispatchEvent(
      new CustomEvent(`ow-event`, {
        detail: {
          type: 'error',
          payload: {
            msg: `[OpenWeb] Couldn't find spot-id for OpenWeb products.`,
          },
        },
      }),
    );

    return null;
  }

  useLauncher({ ...owContext, ...rest, spotId });

  return <>{children}</>;
};
