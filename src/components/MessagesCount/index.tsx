import React from 'react';
import { ProductWrapper } from '../ProductWrapper';

interface IProps extends React.HTMLAttributes<HTMLSpanElement> {
  postId: string;
  spotId?: string;
}

export const MessagesCount: React.FC<IProps> = ({
  spotId,
  postId,
  ...attributes
}) => {
  return (
    <ProductWrapper spotId={spotId}>
      <span
        {...attributes}
        data-spotim-module="messages-count"
        className={`spot-im-replies-count ${attributes.className || ''}`}
        data-post-id={postId}
      />
    </ProductWrapper>
  );
};
