# idt-slack-goals
CLI tool that posts today's IDoneThis goals in Slack

## Installation
```sh
npm install -g idt-slack-goals
```

## Environment Setup
Define the following environment variables in your shell profile.

| Variable         | Description                                           |
| ---------------- | ----------------------------------------------------- |
| `IDT_USER_ID`    | Your user ID in IDoneThis.                            |
| `IDT_API_KEY`    | Your IDoneThis API token.                             |
| `IDT_SLACK_HOOK` | The part of your Slack WebHook URL after `services/`. |

### `IDT_USER_ID`

In order to obtain your user ID in IDoneThis:

1. Log into IDoneThis.
1. Visit the homepage for your team via the navigation on the left.
1. You should see a list of avatars at the bottom with everyone on your team, with your avatar first.
1. Click your avatar to visit your profile. Your user ID is the last parameter in the URL.

   For example, if the URL is:

   ```
   https://beta.idonethis.com/o/123456789/u/987654321
   ```

   Then your user ID is `987654321`.

### `IDT_API_KEY`

To obtain your IDoneThis API key:

1. Log into IDoneThis.
1. Click *Account settings* in the navigation on the left.
1. Scroll to the *API Token* section.
1. Note the API token in the box.

### `IDT_SLACK_HOOK`

To obtain a Slack WebHook URL:

1. Log into the Slack web interface.
1. Visit the [Incoming WebHooks](https://brightbytes.slack.com/apps/A0F7XDUAZ-incoming-webhooks) app page.
1. Click _Add Configuration_.
1. Choose a channel to post your IDoneThis update into.
1. Note the part of the *Webhook URL* **after** `https://hooks.slack.com/services/`.

## Usage

Run this command from your shell to post today's IDT goals in the Slack channel:

```sh
idt-slack-goals
```
