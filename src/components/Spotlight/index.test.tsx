import React from 'react';
import { render } from '@testing-library/react';

import { OpenWebProvider } from '../OpenWebProvider';

import { Spotlight, IProps as SpotlightProps } from '.';

const spotId = 'sp_test';

const productProps: SpotlightProps = {
  spotId,
};

// Clean DOM after each test to prevent duplications.
afterEach(() => {
  document.body.innerHTML = '';
});

describe('Spotlight', () => {
  test('Should Render Spotlight', () => {
    const { getByTestId } = render(<Spotlight {...productProps} data-testid="spotlight" />);
    const spotlight = getByTestId('spotlight');

    expect(spotlight.dataset).toMatchObject({
      conversationSpotlight: 'true',
    });
  });

  test('Should Render Spotlight with sidebar attribute', () => {
    const { getByTestId } = render(<Spotlight {...productProps} isSidebar data-testid="spotlight" />);
    const spotlight = getByTestId('spotlight');

    expect(spotlight.dataset).toMatchObject({
      conversationSpotlight: 'true',
      spotlightSidebar: 'true',
    });
  });

  test('Should Render Spotlight with card type', () => {
    const { getByTestId } = render(<Spotlight {...productProps} cardType="counter" data-testid="spotlight" />);
    const spotlight = getByTestId('spotlight');

    expect(spotlight.dataset).toMatchObject({
      conversationSpotlight: 'true',
      cardType: 'counter',
    });
  });

  test('Should Render Spotlight within OpenWebProvider', () => {
    const { getByTestId } = render(
      <OpenWebProvider spotId={spotId} authentication={{}}>
        <Spotlight {...productProps} data-testid="spotlight" />
      </OpenWebProvider>,
    );
    const spotlight = getByTestId('spotlight');
    expect(spotlight.dataset).toMatchObject({
      conversationSpotlight: 'true',
    });
  });
});
