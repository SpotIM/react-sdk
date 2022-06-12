import React from 'react';

import { ProductWrapper } from '../ProductWrapper';

export interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  postId: string;
  postUrl: string;
  spotId?: string;
  theme?: 'light' | 'dark';
  isSidebar?: boolean;
  keywords?: string[];
  authors?: string[];
}

export const TopicTracker: React.FC<IProps> = ({
  spotId,
  postId,
  postUrl,
  theme,
  isSidebar = false,
  keywords,
  authors,
  ...attributes
}) => {
  return (
    <ProductWrapper spotId={spotId}>
      <div
        {...attributes}
        data-spotim-module="topic-tracker"
        data-post-id={postId}
        data-post-url={postUrl}
        data-vertical-view={isSidebar}
        data-keywords={keywords?.join(',')}
        data-authors={authors?.join(',')}
        data-theme={theme}
      />
    </ProductWrapper>
  );
};
