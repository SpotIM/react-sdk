import { IOpenWebBaseProps, OpenWebSDKEvent } from '../types';

export const LAUNCHER_SCRIPT_BASE_URL = 'https://launcher.spot.im/spot';
export const OW_SDK_EVENT = 'ow-sdk-event';
const LAUNCHER_SCRIPT_SELECTOR = 'data-spotim-module="spotim-launcher"';

export type LauncherOptions = IOpenWebBaseProps & {
  autoRun?: boolean;
  hostEl?: HTMLElement | null;
  onLoad?: () => void;
  onError?: () => void;
};

export const addLauncherScript = ({
  spotId,
  hostEl,
  autoRun = false,
  onLoad = () => {},
  onError = () => {},
  ...attributes
}: LauncherOptions) => {
  const launcherScript = document.querySelector<HTMLScriptElement>(`script[${LAUNCHER_SCRIPT_SELECTOR}]`);

  if (launcherScript) {
    return launcherScript;
  }

  const host = hostEl || document.body;
  const script = document.createElement('script');
  script.src = `${LAUNCHER_SCRIPT_BASE_URL}/${spotId}`;
  script.async = true;
  script.onload = onLoad;
  script.onerror = onError;
  script.dataset.spotimModule = 'spotim-launcher';
  script.dataset.spotimAutorun = String(autoRun);
  script.dataset.disableConversationHeader = 'true';

  Object.entries(attributes).forEach(([key, value]) => {
    if (value) {
      script.dataset[key] = String(value);
    }
  });

  host.appendChild(script);

  return script;
};

export const subscribeToOpenWebEvents = (tracking = {}) => {
  const listener = (event: OpenWebSDKEvent) => {
    const { type } = event.detail;
    tracking[type]?.(event);
  };

  document.addEventListener(OW_SDK_EVENT, listener);

  return () => document.removeEventListener(OW_SDK_EVENT, listener);
};
