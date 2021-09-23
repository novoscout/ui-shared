var React
var Component
var render
var h

try {
  React = require("ui-web/node_modules/preact")
  Component = React.Component
  render = React.render
  h = React.h
} catch(e) {
  console.error("react/preact lib failed on require preact")
  console.error(e)
  throw e
}

if (! React) {
  try {
    React = require("react")
    Component = React.Component
    try {
      render = require("react-dom").render
    } catch(e) {
      console.error("react/preact lib failed requiring render")
      console.error(e)
      throw e
    }
  } catch(e) {
    console.warn("react/preact lib could not load default... should be fine in a native build.")
    console.warn(e)
  }
}

const Fragment = React.Fragment


export default React
export { React, h, render, Component, Fragment }
