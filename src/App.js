"use strict";

const h = require('hyperscript');

const TitleBar = require('./TitleBar');
const MessageGroup = require('./MessageGroup');

function App({ messages, info }) {
  const messageComponents = messages.map((message) => MessageGroup({ message }));

  return h('div.app.theme-dark',
    h('div.chat',
      TitleBar({ info }),
      h('div.scroller.messages', messageComponents)
    )
  );
}

module.exports = App;
