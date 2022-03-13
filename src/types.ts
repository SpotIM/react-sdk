/* eslint-disable import/no-cycle */
import { OW_SDK_EVENT } from './common/utils';

export type OpenWebSDKEvent = CustomEvent<{ type: string; payload: any }>;

export interface IOpenWebBaseProps {
  spotId: string;
}

export interface User {
  id: string;
  displayName: string;
  imageId: string;
  username: string;
  isRegistered: boolean;
  isCommunityModerator: boolean;
  isJournalist: boolean;
  isModerator: boolean;
  isAdmin: boolean;
  ssoData: { isSubscriber?: string; [key: string]: any };
}

declare global {
  interface Window {
    SPOTIM?: {
      startTTH?: ({
        callback,
        userId,
      }: {
        callback: (codeA: string, completeTTHCallback: (codeB: string) => void) => void;
        userId: string;
      }) => Promise<User>;
      logout?: () => Promise<User>;
    };
  }
  interface DocumentEventMap {
    [OW_SDK_EVENT]: OpenWebSDKEvent;
  }
}
