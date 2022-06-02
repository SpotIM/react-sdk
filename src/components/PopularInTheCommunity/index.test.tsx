import React from 'react';
import { render } from '@testing-library/react';

import { OpenWebProvider } from '../OpenWebProvider';

import { PopularInTheCommunity, IProps as PitcProps } from '.';

const spotId = 'sp_test';
const postId = 'post';
const postUrl = 'www.example.com';
const pitcProps: PitcProps = {
  spotId,
  postId,
  postUrl,
};

// Clean DOM after each test to prevent duplications.
afterEach(() => {
  document.body.innerHTML = '';
});

describe('PopularInTheCommunity', () => {
  test('Should Render PopularInTheCommunity', () => {
    const { getByTestId } = render(<PopularInTheCommunity {...pitcProps} data-testid="pitc" />);
    const pitc = getByTestId('pitc');

    console.log('🚀 ~ file: index.test.tsx ~ line 27 ~ test ~ pitc.dataset');
    expect(pitc.dataset).toMatchObject({
      spotimModule: 'pitc',
      postId: pitcProps.postId,
      postUrl: pitcProps.postUrl,
    });
  });

  test('Should Render PopularInTheCommunity with sidebar and categories', () => {
    const { getByTestId } = render(<PopularInTheCommunity {...pitcProps} isSidebar data-testid="pitc" />);
    const pitc = getByTestId('pitc');
    expect(pitc.dataset).toMatchObject({
      spotimModule: 'pitc',
      verticalView: 'true',
      postId: pitcProps.postId,
      postUrl: pitcProps.postUrl,
    });
  });

  test('Should Render PopularInTheCommunity within OpenWebProvider', () => {
    const { getByTestId } = render(
      <OpenWebProvider spotId={spotId} authentication={{}}>
        <PopularInTheCommunity {...pitcProps} data-testid="pitc" />
      </OpenWebProvider>,
    );
    const pitc = getByTestId('pitc');
    expect(pitc.dataset).toMatchObject({
      spotimModule: 'pitc',
      postId: pitcProps.postId,
      postUrl: pitcProps.postUrl,
    });
  });
});
