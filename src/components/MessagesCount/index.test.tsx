import React from 'react';
import { render } from '@testing-library/react';

import { OpenWebProvider } from '../OpenWebProvider';

import { MessagesCount, IProps as MessagesCountProps } from '.';

const spotId = 'sp_test';
const postId = 'post';

const moduleName = 'messages-count';
const messagesCountProps: MessagesCountProps = {
  spotId,
  postId,
};

// Clean DOM after each test to prevent duplications.
afterEach(() => {
  document.body.innerHTML = '';
});

describe('MessagesCount', () => {
  test('Should Render MessagesCount', () => {
    const { getByTestId } = render(<MessagesCount {...messagesCountProps} data-testid={moduleName} />);
    const conversation = getByTestId(moduleName);
    expect(conversation.dataset).toMatchObject({
      spotimModule: moduleName,
      postId: messagesCountProps.postId,
    });
  });

  test('Should Render MessagesCount within OpenWebProvider', () => {
    const { getByTestId } = render(
      <OpenWebProvider spotId={spotId} authentication={{}}>
        <MessagesCount {...messagesCountProps} data-testid={moduleName} />
      </OpenWebProvider>,
    );
    const conversation = getByTestId(moduleName);
    expect(conversation.dataset).toMatchObject({
      spotimModule: moduleName,
      postId: messagesCountProps.postId,
    });
  });
});
