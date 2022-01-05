import { IOpenWebBaseProps } from '../types';

const LAUNCHER_SCRIPT_BASE_URL = 'https://launcher.spot.im/spot';
const LAUNCHER_SCRIPT_SELECTOR = 'data-spotim-module="spotim-launcher"';

const unmountLauncher = (script: HTMLScriptElement) => {
  script.parentNode?.removeChild(script);
};

export const addLauncherScript = ({
  spotId,
  hostEl,
  autoRun = false,
  onLoad = () => {},
  onError = () => {},
  ...attributes
}: IOpenWebBaseProps & {
  autoRun?: boolean;
  hostEl?: HTMLElement | null;
  onLoad?: () => void;
  onError?: () => void;
}) => {
  const launcherScript = document.querySelector<HTMLScriptElement>(
    `script[${LAUNCHER_SCRIPT_SELECTOR}]`
  );

  if (launcherScript) {
    return () => unmountLauncher(launcherScript);
  }

  const host = hostEl || document.body;
  const script = document.createElement('script');
  script.src = `${LAUNCHER_SCRIPT_BASE_URL}/${spotId}`;
  script.async = true;
  script.onload = onLoad;
  script.onerror = onError;
  script.dataset.spotimModule = 'spotim-launcher';
  script.dataset.spotimAutorun = String(autoRun);

  for (const key in attributes) {
    const value = attributes[key];
    if (value) {
      script.dataset[key] = String(value);
    }
  }

  host.appendChild(script);

  return () => unmountLauncher(script);
};
