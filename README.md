# OpenWeb React SDK

[![npm version](https://badge.fury.io/js/@open-web%2Freact-sdk.svg)](https://badge.fury.io/js/@open-web%2Freact-sdk)
[![CircleCI](https://circleci.com/gh/SpotIM/react-sdk/tree/main.svg?style=svg&circle-token=a7774f8ac064b67762ff264ae953e80e50bd4780)](https://circleci.com/gh/SpotIM/react-sdk/tree/main)
[![codecov](https://codecov.io/gh/SpotIM/react-sdk/branch/main/graph/badge.svg?token=WjfflSn6L5)](https://codecov.io/gh/SpotIM/react-sdk)

The OpenWeb React SDK package enables OpenWeb products to be added to React single-page applications. Through this package, an OpenWeb product is exported as a wrapped React component that is responsible for initializing shared cross-product functionalities and booting specific OpenWeb products.

## Requirements

- React v16+
- ReactDOM v16+
- [Spot ID](https://developers.openweb.com/docs/launcher-code#spot-id)

## Installation

```bash
yarn add @open-web/react-sdk
# or
npm install @open-web/react-sdk
```

## Usage

## Conversation Implementation

Conversation enables you to create a fluent conversation experience that fuels quality interactions with community and content and allows users to create valuable and engaging content.

### Single Conversation

Use the following steps to add a single Conversation to a single-page application:

1. Import `Conversation` from the OpenWeb React SDK and add a `Conversation` instance to the single-page application.

```typescript
import { Conversation } from "@open-web/react-sdk";

const CommentsSection = () => {
  return (
    <Conversation
      spotId="sp_example"
      postId="example_post"
      articleTags={["tag1", "tag2", "tag3"]}
      postUrl="http://www.example.com"
    />
  );
};
```

2. Define the Conversation props:
   - spotId
   - postId
   - articleTags
   - postUrl

### Multiple Conversations

Use the following steps to add multiple Conversations to a single-page application:

1. Import `OpenWebProvider` and `Conversation` from the OpenWeb React SDK and wrap the entire application – including each Conversation instance – with `OpenWebProvider`.
   The OpenWebProvider component allows you to define spotId one time for all Conversation instances within the app.

```typescript
import { OpenWebProvider, Conversation } from "@open-web/react-sdk";

const App = () => {
  return (
    <OpenWebProvider spotId="sp_example">
      <Conversation
        postId="example_post"
        articleTags={["tag1", "tag2", "tag3"]}
        postUrl="http://www.example.com"
      />
      ...
      <Conversation
        postId="example_post2"
        articleTags={["tag1", "tag2", "tag3"]}
        postUrl="http://www.example2.com"
      />
    </OpenWebProvider>
  );
};
```

2. Define the `spotId` prop of `OpenWebProvider`.
3. Define the props for each `Conversation`:
   - postId
   - articleTags
   - postUrl

💡 _NOTE: If you prefer not to wrap your app with the OpenWebProvider component, use the Single Conversation implementation instructions and add multiple Conversation instances to the single-page application._

## Messages Count Implementation

To show your users the engagement level of a specific Conversation, you can use the `MessagesCount` component to display the number of user comments that have been posted to the Conversation.

You can style the text returned from the component by defining the className attribute with the name of CSS class or by defining an inline style.

💡 _NOTE: The `MessagesCount` component does not need to be displayed with the Conversation it references. For example, you can preview an article with its title and number of posted comments._

1. Import `MessagesCount` from the OpenWeb React SDK.

```typescript
import { MessagesCount } from "@open-web/react-sdk";

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

2. Define the attributes of MessagesCount:
   - spotId
   - postId
   - (optional) className

## Two Token Authentication

### Start Two Token Handshake

To start the TTH one should call `startTTH` function with:

- `userId <string>`: A unique string that is stored as an internal state for OW's login system (client). The id let us know whether current user has changed and we need to perform login again.
- `performBEDHandshake <(codeA: string) => Promise<string>>`: A callback that recives Token A pass it to partner's BED. After the partner's performs the login with OW it sends back Token B (`code_b`) and returns that to OW's client.

```typescript
import { startTTH } from "@open-web/react-sdk";

const login = () => {
  startTTH({ userId, performBEDHandshake });
};
```

### Logout

To perform a logout, one should call the logout function.

```typescript
import { logout } from "@open-web/react-sdk";

const logoutFromOw = () => {
  logout();
};
```
