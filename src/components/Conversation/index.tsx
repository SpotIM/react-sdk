import React from 'react';
import { ProductWrapper } from '../ProductWrapper';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  postId: string;
  postUrl: string;
  spotId?: string;
  articleTags?: string | string[];
}

export const Conversation: React.FC<Props> = ({
  spotId,
  postId,
  postUrl,
  articleTags,
  ...attributes
}) => {
  const tags = articleTags
    ? Array.isArray(articleTags)
      ? articleTags.join(',')
      : articleTags
    : null;

  return (
    <ProductWrapper spotId={spotId}>
      <div
        {...attributes}
        data-spotim-module="conversation"
        data-post-id={postId}
        data-post-url={postUrl}
        data-article-tags={tags}
      />
    </ProductWrapper>
  );
};
