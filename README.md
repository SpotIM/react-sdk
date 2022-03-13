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
import { OpenWebProvider, Conversation } from '@open-web/react-sdk';

const App = () => {
  return (
    <OpenWebProvider spotId="sp_example">
      <Conversation postId="example_post" articleTags={['tag1', 'tag2', 'tag3']} postUrl="http://www.example.com" />
      ...
      <Conversation postId="example_post2" articleTags={['tag1', 'tag2', 'tag3']} postUrl="http://www.example2.com" />
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
import { MessagesCount } from '@open-web/react-sdk';

const App = () => {
  return <MessagesCount spotId="sp_example" postId="example_post" className="yourClassName" />;
};
```

2. Define the attributes of MessagesCount:
   - spotId
   - postId
   - (optional) className

## Two Token Authentication

To use TTH add the `authentication` property to the `OpenWebProvider`.
`authentication` object holds the current user ID who is logged into the partner and the callback the performs BED to BED handshake with OpenWeb as follows:

- `userId <string | undefined>`: A unique string that is stored as an internal state for OW's login system (client). The id let us know whether current user has changed and we need to perform login again. When `userId=undefined` the provider performs a `logout`.
- `performBEDHandshakeCallback <(codeA: string) => Promise<string>>`: A callback that recives Token A pass it to partner's BED. After the partner's performs the login with OW it sends back Token B (`code_b`) and returns that to OW's client.
- `onUserChanged? <(user: User) => void`: A callback that is invoked on current user change. User holds the current user details.
- `onError? <(err: Error) => void`: A callback that is invoked on error occurred.

```typescript
//...
   <OpenWebProvider spotId="<SPOT_ID>" authentication={{
      userId: 'test-user-unique-id or undefined when user is logged out'
      performBEDHandshakeCallback: (codeA) => {console.log("see below implementation proposal for more details")}
      onUserChanged={(user) => {console.log("Current User in OW is -", user)}}
      onError={(err) => {console.log("Oh NO! something wrong happened -", err)}}
    }}>
//...
```

### Start Two Token Handshake manually

To start the TTH one should call `startTTH` function with:

- `userId <string>`: A unique string that is stored as an internal state for OW's login system (client). The id let us know whether current user has changed and we need to perform login again.
- `performBEDHandshakeCallback <(codeA: string) => Promise<string>>`: A callback that recives Token A pass it to partner's BED. After the partner's performs the login with OW it sends back Token B (`code_b`) and returns that to OW's client.

```typescript
import { startTTH } from '@open-web/react-sdk';

const login = () => {
  startTTH({ userId, performBEDHandshakeCallback });
};

// An example for the performBEDHandshakeCallback callback function
const performBEDHandshakeCallback = async (codeA: string) => {
  const { code_b: codeB } = await fetch(`https://opeweb.partner.example/start-handshake`, {
    method: 'POST',
    body: JSON.stringify({
      // codeA that the callback gets and should be passed to OW's BED
      code_a: codeA,
      // We want to let the BED we want to login with a certain user - that is, the user we should do the BED handshake with OW.
      userId,
    }),
  }).then(function (res) {
    return res.json();
  });

  // codeB has been received from OW's BED and it is returned to OW's client to complete the handshake.
  return codeB;
};
```

### Logout manually

To perform a logout, one should call the logout function.

```typescript
import { logout } from '@open-web/react-sdk';

const logoutFromOw = () => {
  logout();
};
```

## Tracking OpenWeb's Custom Events

OpenWeb provides multiple custom events indicates when a particular event occurred. It can be useful in tracking engagement or for triggering unrelated functionality outside of OpenWeb's products.

List of all of our events can be found here: https://developers.openweb.com/docs/event-listener-reference

### Usage

Tracking events can be enabled only when using OpenWebProvider implementation, by passing tracking as prop to OpenWebProvider component.

The `tracking` prop is an object mapping between event-name (listed [here](https://developers.openweb.com/docs/event-listener-reference)) to handler function. Each function will be triggered when the event is dispatched by any of OpenWeb's products. The custom event is passed to the function as its only argument.

In case the event has any associated payload to it, it can be accessed by referencing to `event.detail.payload`.

```typescript
import { OpenWebProvider } from '@open-web/react-sdk';

const App = () => {
  return (
    <OpenWebProvider
      spotId={'sp_example'}
      tracking={{
        ['event-name']: event => {
          console.log('Do Something with this event!', event);
        },
      }}
    ></OpenWebProvider>
  );
};
```
