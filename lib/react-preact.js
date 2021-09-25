var React = undefined;
var render = undefined;

try {
  React = require("ui-web/node_modules/preact")
  render = (React || {}).render || undefined;
} catch(e) {
  console.warn(e)
}

if (! React) {
  try {
    React = require("react")
    try {
      render = require("react-dom").render
    } catch(e) {
      console.warn(e)
    }
  } catch(e) {
    console.warn(e)
  }
}

const _r = React || {};
const Component = _r.Component || undefined;
const Fragment = _r.Fragment || undefined;
const createRef = _r.createRef || undefined;
const h = _r.h || undefined;

export default React;
export { React, Component, Fragment, createRef, render, h };
