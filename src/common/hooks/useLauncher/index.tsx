import { useEffect } from 'react';

import { IOpenWebBaseProps } from '../../../types';
import { addLauncherScript } from '../../utils';

export const useLauncher = (params: IOpenWebBaseProps) => {
  useEffect(() => {
    addLauncherScript(params);
  }, []);
};
