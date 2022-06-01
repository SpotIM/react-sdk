import React from 'react';

import { ProductWrapper } from '../ProductWrapper';

export enum OWProduct {
  POPULAR_IN_THE_COMMUNITY = 'pitc',
  REACTIONS = 'reactions',
  TOPIC_TRACKER = 'topic-tracker',
  SPOTLIGHT = 'spotlight',
}

export interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  productName: OWProduct;
  postId: string;
  postUrl: string;
  spotId?: string;
  theme?: 'light' | 'dark';
  isSidebar?: boolean;
  categories?: string[];
}

export const Product: React.FC<IProps> = ({
  spotId,
  productName,
  postId,
  postUrl,
  theme,
  isSidebar = false,
  categories,
  ...attributes
}) => {
  return (
    <ProductWrapper spotId={spotId}>
      <div
        {...attributes}
        data-spotim-module={productName}
        data-post-id={postId}
        data-post-url={postUrl}
        data-vertical-view={isSidebar}
        data-theme={theme}
      />
    </ProductWrapper>
  );
};
