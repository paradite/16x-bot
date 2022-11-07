# 16x Engineer Bot

A telegram bot designed for tech telegram groups.

Made by [16x.engineer](https://16x.engineer/).

## Features

**1. Define technical terms**

Send a message with `!bot` prefix, eg. `!bot TC`

<p float="left">
  <img src="https://github.com/paradite/16x-bot/blob/main/screenshots/define.png?raw=true" alt="Define technical terms" width="600"/>
</p>

**2. Reminder for using English**

<p float="left">
  <img src="https://github.com/paradite/16x-bot/blob/main/screenshots/language.png?raw=true" alt="Reminder for using English" width="600"/>
</p>

**3. Leetcode Daily Challenge Response** (by [MrMarciaOng](https://github.com/MrMarciaOng))

Send a screenshot with caption containing "#LCYYYYMMDD", eg. `#LC20221107`

<p float="left">
  <img src="https://github.com/paradite/16x-bot/blob/main/screenshots/leetcode.png?raw=true" alt="Leetcode Daily Challenge Response" width="600"/>
</p>

## Using the bot

**1. Use bot in a group chat**

1. Add [16x Engineer Bot](https://t.me/my_16x_engineer_bot) to your group chat.
2. Add the bot as an administrator (no special permissions needed).
3. Send a message in the chat, eg. `!bot TC` to verify it is working.

<p float="left">
  <img src="https://github.com/paradite/16x-bot/blob/main/screenshots/admin.jpg?raw=true" alt="Add the bot as an administrator" width="600"/>
</p>

**2. Chat with bot directly**

Search for `16x Engineer Bot` on Telegram and chat with it privately.

## Running the bot (Create your own bot)

node

```bash
$ TELEGRAM_TOKEN=XXX node index.js
```

pm2

```bash
$ TELEGRAM_TOKEN=XXX pm2 start index.js
```

with pgsql

```bash
$ PGUSER=dbuser \
  PGHOST=database.server.com \
  PGPASSWORD=secretpassword \
  PGDATABASE=mydb \
  TELEGRAM_TOKEN=XXX pm2 start index.js
```

## Contribute

PRs welcomed!
