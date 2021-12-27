import React from 'react';
import { ProductWrapper } from '../ProductWrapper';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  postId: string;
  spotId?: string;
  postUrl?: string;
  articleTags?: string;
}

export const Conversation: React.FC<Props> = ({
  spotId,
  postId,
  postUrl,
  articleTags,
  ...attributes
}) => {
  return (
    <ProductWrapper spotId={spotId}>
      <div
        {...attributes}
        data-spotim-module="conversation"
        data-post-id={postId}
        data-post-url={postUrl}
        data-article-tags={articleTags}
      />
    </ProductWrapper>
  );
};
