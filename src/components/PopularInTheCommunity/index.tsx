import React from 'react';

import { ProductWrapper } from '../ProductWrapper';

export interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  postId: string;
  postUrl: string;
  spotId?: string;
  theme?: 'light' | 'dark';
  isSidebar?: boolean;
  categories?: string[];
}

export const PopularInTheCommunity: React.FC<IProps> = ({
  spotId,
  postId,
  postUrl,
  theme,
  isSidebar = undefined,
  categories,
  ...attributes
}) => {
  return (
    <ProductWrapper spotId={spotId}>
      <div
        {...attributes}
        data-spotim-module="pitc"
        data-post-id={postId}
        data-post-url={postUrl}
        data-vertical-view={isSidebar}
        data-theme={theme}
        data-categories={categories?.join(',')}
      />
    </ProductWrapper>
  );
};
