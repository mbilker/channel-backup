"use strict";

const h = require('hyperscript');

const Embed = require('./Embed');

function MessageGroup({ message }) {
  const embeds = message.embeds.map((embed) => Embed({ embed }));

  return h('div.message-group',
    h(`div.avatar-large.animate.avatar_${message.author.id}`),
    h('div.comment',
      h('div.body',
        h('h2',
          h('span.username-wrapper',
            h('strong', message.author.username)
          ),
          h('span.highlight-separator', ' - '),
          h('span.timestamp', message.timestamp)
        ),
        h('div.message-text',
          h('div.markup', message.content)
        ),
        h('div.accessory', embeds)
      )
    )
  );
}

module.exports = MessageGroup;
