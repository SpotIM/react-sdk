import React from 'react';
import { render } from '@testing-library/react';

import { OpenWebProvider } from '../OpenWebProvider';

import { Reactions, IProps as ReactionsProps } from '.';

const spotId = 'sp_test';
const postId = 'post';
const postUrl = 'www.example.com';
const reactionsProps: ReactionsProps = {
  spotId,
  postId,
  postUrl,
};

// Clean DOM after each test to prevent duplications.
afterEach(() => {
  document.body.innerHTML = '';
});

describe('Reactions', () => {
  test('Should Render Reactions', () => {
    const { getByTestId } = render(<Reactions {...reactionsProps} data-testid="reactions" />);
    const reactions = getByTestId('reactions');
    expect(reactions.dataset).toMatchObject({
      spotimModule: 'reactions',
      spotimApp: 'reactions',
      postId: reactionsProps.postId,
      postUrl: reactionsProps.postUrl,
    });
  });

  test('Should Render Reactions with sidebar', () => {
    const { getByTestId } = render(<Reactions {...reactionsProps} isSidebar data-testid="reactions" />);
    const reactions = getByTestId('reactions');
    expect(reactions.dataset).toMatchObject({
      spotimModule: 'reactions',
      spotimApp: 'reactions',
      verticalView: 'true',
      postId: reactionsProps.postId,
      postUrl: reactionsProps.postUrl,
    });
  });

  test('Should Render Conversation within OpenWebProvider', () => {
    const { getByTestId } = render(
      <OpenWebProvider spotId={spotId} authentication={{}}>
        <Reactions {...reactionsProps} data-testid="reactions" />
      </OpenWebProvider>,
    );
    const reactions = getByTestId('reactions');
    expect(reactions.dataset).toMatchObject({
      spotimModule: 'reactions',
      spotimApp: 'reactions',
      postId: reactionsProps.postId,
      postUrl: reactionsProps.postUrl,
    });
  });
});
