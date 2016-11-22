#!/usr/bin/node

const fs = require('fs');

const Redis = require('redis');
const redisBrain = Redis.createClient();

const Index = require('./src/Index');

const currentDiscordStylesheet = '1559544d86ab79d622a3';

const guildId = process.argv[2];
const channelId = process.argv[3];
console.log(guildId);
console.log(channelId);

function createIRCLog(messages) {
  return messages.map((message) =>
    message.content.split('\n').map((content) =>
     `<${message.author.username}> ${content}`
    ).join('\n')
  ).join('\n');
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

  const jsonOut = `${baseFilenameOut}.json`;
  fs.writeFileSync(jsonOut, text);

  const filenameOut = `${baseFilenameOut}.html`;
  const app = Index(currentDiscordStylesheet, { avatars, messages, info }).outerHTML;
  const output = `<!DOCTYPE html>\n${app}`;
  fs.writeFileSync(filenameOut, output);

  const logFilenameOut = `${baseFilenameOut}.log`;
  const log = createIRCLog(messages);
  fs.writeFileSync(logFilenameOut, log);

  redisBrain.quit();
  console.log(`written to ${filenameOut}`);
});
