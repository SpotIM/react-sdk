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
