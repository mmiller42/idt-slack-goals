# idt-slack-goals
CLI tool for IDoneThis with ability to post your list of goals to Slack.

* List your goals and accomplishments for today
* Post your list of goals on Slack
* Add a new goal for today
* Add a new accomplishment for today
* Mark an existing goal for today as complete

## Installation
```sh
npm install -g idt-slack-goals
```

## Environment Setup
Define the following environment variables in your shell profile.

##### `IDT_TEAM_ID`

In order to obtain your team ID in IDoneThis:

1. Log into IDoneThis.

1. You should be directed to a screen where you can see your and your teammates' tasks.

1. Your team ID is the last parameter in the URL.

   For example, if the URL is:
   
   ```
   https://beta.idonethis.com/t/123456789
   ```
   
   Then your team ID is `123456789`.

##### `IDT_USER_ID`

In order to obtain your user ID in IDoneThis:

1. Log into IDoneThis.

1. You should be directed to a screen where you can see your and your teammates' tasks.

1. Click on your avatar to visit your profile.

1. Your user ID is the last parameter in the URL.

   For example, if the URL is:

   ```
   https://beta.idonethis.com/o/123456789/u/987654321
   ```

   Then your user ID is `987654321`.

##### `IDT_TOKEN`

To obtain your IDoneThis API token:

1. Log into IDoneThis.

1. Click *Account settings* in the navigation on the left.

1. Scroll to the *API Token* section.

1. Note the API token in the box.

##### `IDT_SLACK_HOOK`

To obtain a Slack WebHook URL:

1. Log into the Slack web interface.

1. Visit the [Incoming WebHooks](https://brightbytes.slack.com/apps/A0F7XDUAZ-incoming-webhooks) app page.

1. Click _Add Configuration_.

1. Choose a channel to post your IDoneThis update into.

1. Your Slack hook will be the part of the *Webhook URL* **after** `https://hooks.slack.com/services/`.

   For example, if your Webhook URL is:
   
   ```
   https://hooks.slack.com/services/ABCD123456/DEFG789012/HIJK345678
   ```

   Then your Slack hook is `ABCD123456/DEFG789012/HIJK345678`.

## Usage

For brevity, you may want to add this to your shell profile:

```sh
alias idt="idt-slack-goals"
```

The examples below will assume you are using the alias; if not, replace `idt` with `idt-slack-goals`.

### List all goals and accomplishments

```sh
idt list
```

### Post your list of goals on Slack

```sh
idt slack
```

### Add a goal

```sh
idt goal 'Write unit tests'
```

### Add a task you've already completed

```sh
idt done 'Fixed bug on autocomplete widget'
```

### Mark an existing task as completed

This will locate the first goal for today that contains the given string and mark it as completed.

```sh
idt complete 'unit test'
```
