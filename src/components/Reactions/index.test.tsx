import React from 'react';
import { render } from '@testing-library/react';

import { OpenWebProvider } from '../OpenWebProvider';

import { Reactions, IProps as ConversationProps } from '.';

const spotId = 'sp_test';
const postId = 'post';
const postUrl = 'www.example.com';
const conversationProps: ConversationProps = {
  spotId,
  postId,
  postUrl,
};

// Clean DOM after each test to prevent duplications.
afterEach(() => {
  document.body.innerHTML = '';
});

describe('Conversation', () => {
  test('Should Render Conversation', () => {
    const { getByTestId } = render(<Reactions {...conversationProps} data-testid="conversation" />);
    const conversation = getByTestId('conversation');
    expect(conversation.dataset).toMatchObject({
      spotimModule: 'conversation',
      postId: conversationProps.postId,
      postUrl: conversationProps.postUrl,
    });
  });

  test('Should Render Conversation within OpenWebProvider', () => {
    const { getByTestId } = render(
      <OpenWebProvider spotId={spotId} authentication={{}}>
        <Reactions {...conversationProps} data-testid="conversation" />
      </OpenWebProvider>,
    );
    const conversation = getByTestId('conversation');
    expect(conversation.dataset).toMatchObject({
      spotimModule: 'conversation',
      postId: conversationProps.postId,
      postUrl: conversationProps.postUrl,
    });
  });
});
