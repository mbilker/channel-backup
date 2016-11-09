"use strict";

const h = require('hyperscript');

const App = require('./App');

function avatarCSSEntry(id, avatar) {
  return `.avatar_${id}{content:url(${avatar});}`;
}

function Index({ avatars, messages, info }) {
  const style = Object.keys(avatars).map((id) => avatarCSSEntry(id, avatars[id])).join('');

  return h('html',
    h('head',
      h('title', `Channel Output for #${info.name}`),
      h('link', { rel: 'stylesheet', href: '02ed0b0996f3bfe922db.css' }),
      h('style', `body{overflow:visible;}.title-wrap{user-select:text;}${style}`)
    ),
    h('body', App({ messages, info }))
  );
}

module.exports = Index;
