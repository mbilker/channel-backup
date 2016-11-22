"use strict";

const h = require('hyperscript');

const App = require('./App');

function avatarCSSEntry(id, avatar) {
  return `.avatar_${id}{content:url(${avatar});}`;
}

function Index(currentDiscordStylesheet, { avatars, messages, info }) {
  const style = Object.keys(avatars).map((id) => avatarCSSEntry(id, avatars[id])).join('');

  return h('html',
    h('head',
      h('title', `Channel Output for #${info.name}`),
      h('link', { rel: 'stylesheet', href: `${currentDiscordStylesheet}.css` }),
      h('style', `body{overflow:visible;}.title-wrap{user-select:text;}${style}`)
    ),
    h('body', App({ messages, info }))
  );
}

module.exports = Index;
