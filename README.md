# OpenWeb React SDK

This package is a wrapper around OpenWeb's products, with added functionality related to React. All products are exported as wrapped React component which responsible for initializing our cross-products shared functionalities and boot the product itself. Our SDK requires React and React-DOM with version 16+ installed on your application.

## Installation

```bash
yarn add @openweb/react
# or
npm install @openweb/react
```

## Usage

```typescript
import { Conversation } from '@openweb/react';

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
const App = () => {
  return (
    <OpenWebProvider spotId="sp_example">
      ////
      <Conversation
        postId="example_post"
        articleTags={['tag1', 'tag2', 'tag3']}
        postUrl="http://www.example.com"
      />
    </OpenWebProvider>
  );
};
```
