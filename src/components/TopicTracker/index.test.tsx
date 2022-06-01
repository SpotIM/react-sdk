import React from 'react';
import { render } from '@testing-library/react';

import { OpenWebProvider } from '../OpenWebProvider';

import { TopicTracker, IProps as TopicTrackerProps } from '.';

const spotId = 'sp_test';
const postId = 'post';
const postUrl = 'www.example.com';
const topicTrackerProps: TopicTrackerProps = {
  spotId,
  postId,
  postUrl,
};

// Clean DOM after each test to prevent duplications.
afterEach(() => {
  document.body.innerHTML = '';
});

describe('Topic Tracker', () => {
  test('Should Render Topic Tracker', () => {
    const { getByTestId } = render(<TopicTracker {...topicTrackerProps} data-testid="topic-tracker" />);
    const topicTracker = getByTestId('topic-tracker');
    expect(topicTracker.dataset).toMatchObject({
      spotimModule: 'topic-tracker',
      postId: topicTrackerProps.postId,
      postUrl: topicTrackerProps.postUrl,
    });
  });

  test('Should Render Topic Tracker with keywords and authors', () => {
    const keywords = ['keyword1', 'keyword2'];
    const authors = ['author1', 'author2'];
    const props = { ...topicTrackerProps, keywords, authors, isSidebar: true };
    const { getByTestId } = render(<TopicTracker {...props} data-testid="topic-tracker" />);
    const topicTracker = getByTestId('topic-tracker');

    expect(topicTracker.dataset).toMatchObject({
      spotimModule: 'topic-tracker',
      postId: props.postId,
      postUrl: props.postUrl,
    });
    expect(topicTracker.dataset.keywords).toBe(keywords.join(','));
    expect(topicTracker.dataset.authors).toBe(authors.join(','));
    expect(topicTracker.dataset.verticalView).toBe('true');
  });

  test('Should Render Topic Tracker within OpenWebProvider', () => {
    const { getByTestId } = render(
      <OpenWebProvider spotId={spotId} authentication={{}}>
        <TopicTracker {...topicTrackerProps} data-testid="topic-tracker" />
      </OpenWebProvider>,
    );
    const topicTracker = getByTestId('topic-tracker');
    expect(topicTracker.dataset).toMatchObject({
      spotimModule: 'topic-tracker',
      postId: topicTrackerProps.postId,
      postUrl: topicTrackerProps.postUrl,
    });
  });
});
