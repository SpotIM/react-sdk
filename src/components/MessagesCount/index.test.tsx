import { MessagesCount, IProps as MessagesCountProps } from '.';
import { getByTestId, render, screen } from '@testing-library/react';
import { OpenWebProvider } from '../OpenWebProvider';

const spotId = 'sp_test';
const postId = 'post';
const postUrl = 'www.example.com';

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
    const { getByTestId } = render(
      <MessagesCount {...messagesCountProps} data-testid={moduleName} />
    );
    const conversation = getByTestId(moduleName);
    expect(conversation.dataset).toMatchObject({
      spotimModule: moduleName,
      postId: messagesCountProps.postId,
    });
  });

  test('Should Render MessagesCount within OpenWebProvider', () => {
    const { getByTestId } = render(
      <OpenWebProvider spotId={spotId}>
        <MessagesCount {...messagesCountProps} data-testid={moduleName} />
      </OpenWebProvider>
    );
    const conversation = getByTestId(moduleName);
    expect(conversation.dataset).toMatchObject({
      spotimModule: moduleName,
      postId: messagesCountProps.postId,
    });
  });
});
