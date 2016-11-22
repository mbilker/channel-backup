"use strict";

const h = require('hyperscript');

function Attachment(attachment) {
  if (attachment.width || attachment.height) {
    return h('div.attachment-image',
      h('a', { href: attachment.url, target: '_blank', rel: 'noreferrer' },
        h('img.image', { src: attachment.proxy_url, href: attachment.proxy_url })
      )
    );
  } else {
    return h('div.attachment',
      h('div.icon.icon-file.document'),
      h('div.attachment-inner',
        h('a', { href: attachment.url, target: '_blank', rel: 'noreferrer' }, attachment.filename),
        h('div.metadata', `${(attachment.size / 1000).toFixed(2)} KB`)
      )
    );
  }
}

module.exports = Attachment;
