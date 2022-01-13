import React from 'react';
import { ProductWrapper } from '../ProductWrapper';

export interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  postId: string;
  postUrl: string;
  spotId?: string;
  articleTags?: string | string[];
  socialReviews?: boolean;
  theme?: 'light' | 'dark';
  authorId?: string;
  scrollToComment?: string;
  scrollToReply?: string;
}

export const Conversation: React.FC<IProps> = ({
  spotId,
  postId,
  postUrl,
  articleTags,
  socialReviews,
  theme,
  authorId,
  scrollToComment,
  scrollToReply,
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
        data-social-reviews={socialReviews}
        data-theme={theme}
        data-author-id={authorId}
        data-spot-im-scroll-to-comment={scrollToComment}
        data-spot-im-scroll-to-reply={scrollToReply}
      />
    </ProductWrapper>
  );
};
