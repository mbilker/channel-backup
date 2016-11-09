#!/usr/bin/node

const fs = require('fs');

const Redis = require('redis');
const redisBrain = Redis.createClient();

const App = require('./src/App');

const guildId = process.argv[2];
const channelId = process.argv[3];
console.log(guildId);
console.log(channelId);

function construct(info, avatars, body) {
  return `<!DOCTYPE html>
<html>
<head>
  <title>Channel Output for #${info.name}</title>
  <link rel="stylesheet" href="02ed0b0996f3bfe922db.css">
  <style>
    body {
      overflow: visible;
    }
    .title-wrap {
      user-select: text;
    }
${avatars}
  </style>
</head>
<body>
${body}
</body>
</html>`;
}

function avatarStyleDeclaration(id, avatar) {
  return `    .avatar_${id} {
      content: url(${avatar});
    }`;
}

redisBrain.get(`cardinal.${guildId}.channelbackup.${channelId}`, (err, text) => {
  if (err) {
    console.error('failed to retrieve messages');
    console.error(err);
    redisBrain.quit();
    return;
  }

  const { avatars, messages, info } = JSON.parse(text);
  const baseFilenameOut = `channel_backup_${channelId}`
  const filenameOut = `${baseFilenameOut}.html`;

  const jsonOut = `${baseFilenameOut}.json`;
  fs.writeFileSync(jsonOut, text);

  const avatarComponents = Object.keys(avatars).map((id) => {
    return avatarStyleDeclaration(id, avatars[id]);
  }).join('\n');
  const body = App({ messages, info }).outerHTML;

  const output = construct(info, avatarComponents, body);
  fs.writeFileSync(filenameOut, output);

  redisBrain.quit();
  console.log(`written to ${filenameOut}`);
});
