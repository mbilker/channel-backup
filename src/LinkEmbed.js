"use strict";

const h = require('hyperscript');

function LinkEmbed(embed) {
  return !!embed.author ? h('div.embed-wrapper',
    h('div.embed-color-pill'),
    h('div.embed.embed-link',
      h('div.embed-inner',
        h('div.embed-author',
          h('a.embed-author-name', { href: embed.url, target: '_blank', rel: 'noreferrer' }, embed.author.name)
        ),
        h('div.embed-description', embed.description)
      )
    )
  ) : null;
}

module.exports = LinkEmbed;
