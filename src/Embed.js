"use strict";

const h = require('hyperscript');

function Embed({ embed }) {
  return h('div.embed',
    h('div',
      h('a.embed-provider', { href: embed.url, target: '_blank', rel: 'noreferrer' }, embed.provider.name)
    ),
    h('div',
      h('a.embed-title', { href: embed.url, target: '_blank', rel: 'noreferrer' }, embed.title)
    ),
    h('div.embed-thumbnail.embed-thumbnail-video',
      h('img.image', { src: embed.proxy_url, href: embed.thumbnail.url }),
      h('div.embed-video-actions',
        h('div.embed-video-actions-inner',
          h('a.embed-video-popout', { href: embed.url, target: '_blank', rel: 'noreferrer' })
        )
      )
    )
  );
}

module.exports = Embed;
