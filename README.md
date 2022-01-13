# OpenWeb React SDK

[![npm version](https://badge.fury.io/js/@open-web%2Freact-sdk.svg)](https://badge.fury.io/js/@open-web%2Freact-sdk)
[![CircleCI](https://circleci.com/gh/SpotIM/react-sdk/tree/main.svg?style=svg&circle-token=a7774f8ac064b67762ff264ae953e80e50bd4780)](https://circleci.com/gh/SpotIM/react-sdk/tree/main)
[![codecov](https://codecov.io/gh/SpotIM/react-sdk/branch/main/graph/badge.svg?token=WjfflSn6L5)](https://codecov.io/gh/SpotIM/react-sdk)

This package is a wrapper around OpenWeb's products, with added functionality related to React. All products are exported as wrapped React component which responsible for initializing our cross-products shared functionalities and boot the product itself. Our SDK requires React and React-DOM with version 16+ installed on your application.

## Installation

```bash
yarn add @open-web/react-sdk
# or
npm install @open-web/react-sdk
```

## Usage

### Conversation

```typescript
import { Conversation } from '@open-web/react-sdk';

const CommentsSection = () => {
  return (
    <Conversation
      spotId="sp_example"
      postId="example_post"
      articleTags={['tag1', 'tag2', 'tag3']}
      postUrl="http://www.example.com"
    />
  );
};
```

Make sure to provide `spotId` to any imported OpenWeb product rendered on your app.

You can also wrap your app with `OpenWebProvider` component and omit the `spotId` prop from the child product components:

```typescript
import { OpenWebProvider, Conversation } from '@open-web/react-sdk';

const App = () => {
  return (
    <OpenWebProvider spotId="sp_example">
      <Conversation
        postId="example_post"
        articleTags={['tag1', 'tag2', 'tag3']}
        postUrl="http://www.example.com"
      />
    </OpenWebProvider>
  );
};
```

### Messages Count

In case you want to preview the amount of messages for a specific conversation, you can use the MessagesCount component.
You can style the text returned from the component as you want, by providing `className` or by inline style.
Note: The message count can be displayed separated from your conversation. If you want to preview a particular article title with the number of comments posted in it, for instance.

```typescript
import { MessagesCount } from '@open-web/react-sdk';

const App = () => {
  return (
    <MessagesCount
      spotId="sp_example"
      postId="example_post"
      className="yourClassName"
    />
  );
};
```
