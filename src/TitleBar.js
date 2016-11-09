"use strict";

const h = require('hyperscript');

function TitleBar({ info }) {
  return h('div.title-wrap',
    h('div.title',
      h('span.channel-name', info.name)
    ),
    h('div.topic', info.topic)
  );
}

module.exports = TitleBar;
