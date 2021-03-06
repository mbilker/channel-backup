"use strict";

const h = require('hyperscript');

const LinkEmbed = require('./LinkEmbed');
const VideoEmbed = require('./VideoEmbed');

function Embed(embed) {
  const provider = !!embed.provider ? h('div',
    h('a.embed-provider', { href: embed.url, target: '_blank', rel: 'noreferrer' }, embed.provider.name)
  ) : null;

  const popout = embed.type === 'video' ? h('div.embed-video-actions',
    h('div.embed-video-actions-inner',
      h('a.embed-video-popout', { href: embed.url, target: '_blank', rel: 'noreferrer' })
    )
  ) : null;

  const thumbnail = !!embed.thumbnail ? h(`div.embed-thumbnail.embed-thumbnail-${embed.type}`,
    h('img.image', { src: embed.proxy_url, href: embed.thumbnail.url }),
    popout
  ) : null;

  const embedSelector = embed.type === 'link' ? 'div.embed.embed-link' : 'div.embed';

  switch (embed.type) {
    case 'video':
      return VideoEmbed(embed);
    case 'link':
      return LinkEmbed(embed);
    default:
      break;
  }

  return h('div.embed-wrapper',
    h('div.embed-color-pill'),
    h(embedSelector,
      provider,
      h('div',
        h('a.embed-title', { href: embed.url, target: '_blank', rel: 'noreferrer' }, embed.title)
      ),
      thumbnail
    )
  );
}

module.exports = Embed;
