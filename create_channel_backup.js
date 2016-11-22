#!/usr/bin/node

const fs = require('fs');

const Redis = require('redis');
const redisBrain = Redis.createClient();

const promisify = require('./promisify');

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

promisify(redisBrain, 'get');
promisify(redisBrain, 'hkeys');
promisify(redisBrain, 'hget');
promisify(redisBrain, 'llen');
promisify(redisBrain, 'lrange');


const mainRedisKey = `cardinal.${guildId}.channelbackup.${channelId}`;
const avatarsKey = `${mainRedisKey}.avatars`;
const messagesKey = `${mainRedisKey}.messages`;
const infoKey = `${mainRedisKey}.info`;
redisBrain.get(infoKey, (err, text) => {
  if (err) {
    console.error('failed to retrieve messages');
    console.error(err);
    redisBrain.quit();
    return;
  }

  const info = JSON.parse(text);

  const promises = [];

  promises.push(redisBrain.hkeysAsync(avatarsKey).then(([ keys ]) => {
    const avatars = {};
    return Promise.all(keys.map((key) => {
      return redisBrain.hgetAsync(avatarsKey, key).then(([ avatar ]) => {
        avatars[key] = avatar;
      });
    })).then(() => {
      return avatars;
    });
  }));

  promises.push(redisBrain.llenAsync(messagesKey).then(([ len ]) => {
    return redisBrain.lrangeAsync(messagesKey, 0, len).then(([ messages ]) => {
      return messages.map((message) => JSON.parse(message));
    });
  }));

  Promise.all(promises).then(([ avatars, messages ]) => {
    //console.log(avatars);
    //console.log(messages);

    const baseFilenameOut = `channel_backup_${channelId}`;

    const jsonOut = `${baseFilenameOut}.json`;
    fs.writeFileSync(jsonOut, text);

    const filenameOut = `${baseFilenameOut}.html`;
    const app = Index(currentDiscordStylesheet, { avatars, messages, info }).outerHTML;
    const output = `<!DOCTYPE html>\n${app}`;
    fs.writeFileSync(filenameOut, output);

    const logFilenameOut = `${baseFilenameOut}.log`;
    const log = createIRCLog(messages);
    fs.writeFileSync(logFilenameOut, log);
    console.log(`written to ${filenameOut}`);

    redisBrain.quit();
  }).catch((err) => {
    console.error(err);
  });

  //const { avatars, messages, info } = JSON.parse(text);
  //redisBrain.quit();
});
