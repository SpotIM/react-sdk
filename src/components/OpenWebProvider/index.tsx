import React, { forwardRef } from 'react';
import { OpenWebContext } from '../../common/context';

interface IProps {
  spotId: string;
}

export const OpenWebProvider: React.FC<IProps> = ({ spotId, children }) => {
  return (
    <OpenWebContext.Provider value={{ spotId }}>
      {children}
    </OpenWebContext.Provider>
  );
};
