import React from 'react';

import { ProductWrapper } from '../ProductWrapper';

export interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  postId: string;
  postUrl: string;
  spotId?: string;
  theme?: 'light' | 'dark';
  isSidebar?: boolean;
}

export const Reactions: React.FC<IProps> = ({ spotId, postId, postUrl, theme, isSidebar = false, ...attributes }) => {
  return (
    <ProductWrapper spotId={spotId}>
      <div
        {...attributes}
        data-spotim-app="reactions"
        data-post-id={postId}
        data-post-url={postUrl}
        data-vertical-view={isSidebar}
        data-theme={theme}
      />
    </ProductWrapper>
  );
};
