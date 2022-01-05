import React from 'react';
import { useOpenWebContext } from '../../common/context';
import { IOpenWebBaseProps } from '../../types';
import { useLauncher } from '../../common/hooks';

export const ProductWrapper: React.FC<Partial<IOpenWebBaseProps>> = ({
  spotId: _spotId,
  children,
  ...rest
}) => {
  const owContext = useOpenWebContext();
  const spotId = _spotId || owContext.spotId;

  if (!spotId) {
    throw new Error(`[OpenWeb] Couldn't find spot-id for OpenWeb products.`);
  }

  useLauncher({ ...owContext, ...rest, spotId });

  return <>{children}</>;
};
