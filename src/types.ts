/* eslint-disable import/no-cycle */
import { OW_SDK_EVENT } from './common/utils';

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

export type OpenWebSDKEvent = CustomEvent<{ type: string; payload: any }>;

declare global {
  interface DocumentEventMap {
    [OW_SDK_EVENT]: OpenWebSDKEvent;
  }
}
