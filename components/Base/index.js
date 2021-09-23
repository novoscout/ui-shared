import React from "../../lib/react-preact"
import cxs from 'cxs/component'

const merge = require("deepmerge")

const _Base = (props) => {
  let newProps = {...props}
  const elem = newProps.elem ? newProps.elem : 'div'.toLowerCase()

  // Remove items that otherwise will end up in HTML.
  delete newProps.elem

  return React.createElement(String(elem), newProps)
}

const Base = cxs(_Base)(function(props) {
  const s = { position: "relative" }
  if (props.style) {
    return merge.all([s, props.style])
  } else {
    return s
  }
})

export default Base
export { Base }
