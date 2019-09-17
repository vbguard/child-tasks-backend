const React = require('react');
const ReactDOM = require('react-dom');
const Content = require('./Content');

module.exports = function (data, containerId) {
  const container = document.getElementById(containerId || 'content');
  ReactDOM.render(<Content {...data} />, container);
};