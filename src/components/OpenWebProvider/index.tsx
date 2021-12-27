import React, { forwardRef } from 'react';
import { OpenWebContext } from '../../common/context';

interface IProps {
  spotId: string;
}

export const OpenWebProvider: React.FC<IProps> = forwardRef(
  ({ spotId, children }, ref) => {
    return (
      <OpenWebContext.Provider value={{ spotId }}>
        {children}
      </OpenWebContext.Provider>
    );
  }
);
