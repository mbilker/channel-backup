#!/usr/bin/node

const fs = require('fs');

const Redis = require('redis');
const redisBrain = Redis.createClient();

const Index = require('./src/Index');

const guildId = process.argv[2];
const channelId = process.argv[3];
console.log(guildId);
console.log(channelId);

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

  const app = Index({ avatars, messages, info }).outerHTML;
  const output = `<!DOCTYPE html>\n${app}`;

  fs.writeFileSync(filenameOut, output);

  redisBrain.quit();
  console.log(`written to ${filenameOut}`);
});
