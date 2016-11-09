"use strict";

const h = require('hyperscript');
const linkify = require('linkifyjs/string');

const Embed = require('./Embed');

function textToLinks(content) {
  return linkify(content, {
    attributes: {
      rel: 'noreferrer'
    },
    validate: {
      url: function(value) {
        return /^(http)s?:\/\//.test(value);
      }
    }
  });
}

function MessageGroup({ message }) {
  const embeds = message.embeds.map((embed) => Embed({ embed }));
  const contentNode = h('div.markup', message.content);
  contentNode.innerHTML = textToLinks(contentNode.innerHTML);

  const botTag = message.author.bot ? h('span.bot-tag', 'BOT') : null;

  return h('div.message-group',
    h(`div.avatar-large.animate.avatar_${message.author.id}`),
    h('div.comment',
      h('div.body',
        h('h2',
          h('span.username-wrapper',
            h('strong', message.author.username),
            botTag
          ),
          h('span.highlight-separator', ' - '),
          h('span.timestamp', message.timestamp)
        ),
        h('div.message-text', contentNode),
        h('div.accessory', embeds)
      )
    )
  );
}

module.exports = MessageGroup;
