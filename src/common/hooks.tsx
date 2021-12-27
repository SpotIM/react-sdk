import { useEffect } from 'react';
import { IOpenWebBaseProps } from '../types';
import { addLauncherScript } from './utils';

export const useLauncher = (params: IOpenWebBaseProps) => {
  useEffect(() => {
    const onUnmount = addLauncherScript(params);
    return () => onUnmount();
  }, []);
};
