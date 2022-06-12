import React from 'react';

import { ProductWrapper } from '../ProductWrapper';

export interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  spotId?: string;
  theme?: 'light' | 'dark';
  isSidebar?: boolean;
  cardType?: 'counter' | 'form';
}

export const Spotlight: React.FC<IProps> = ({
  spotId,
  theme,
  isSidebar = undefined,
  cardType = undefined,
  ...attributes
}) => {
  return (
    <ProductWrapper spotId={spotId}>
      <div
        {...attributes}
        data-conversation-spotlight
        data-spotlight-sidebar={isSidebar}
        data-card-type={cardType}
        data-theme={theme}
      />
    </ProductWrapper>
  );
};
