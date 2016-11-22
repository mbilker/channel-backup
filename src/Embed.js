"use strict";

const h = require('hyperscript');

function Embed({ embed }) {
  let thumbnail = null;
  if (embed.thumbnail) {
    const popout = embed.type === 'video' ? h('div.embed-video-actions',
      h('div.embed-video-actions-inner',
        h('a.embed-video-popout', { href: embed.url, target: '_blank', rel: 'noreferrer' })
      )
    ) : null;

    thumbnail = h(`div.embed-thumbnail.embed-thumbnail-${embed.type}`,
      h('img.image', { src: embed.proxy_url, href: embed.thumbnail.url }),
      popout
    );
  }

  return h('div.embed-wrapper',
    h('div.embed-color-pill'),
    h('div.embed',
      h('div',
        h('a.embed-provider', { href: embed.url, target: '_blank', rel: 'noreferrer' }, embed.provider.name)
      ),
      h('div',
        h('a.embed-title', { href: embed.url, target: '_blank', rel: 'noreferrer' }, embed.title)
      ),
      thumbnail
    )
  );
}

module.exports = Embed;
