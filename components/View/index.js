import { React, h } from "../../lib/react-preact"
import cxs from "cxs/component"

const merge = require("deepmerge")

const _View = (props) => {
  let newProps = {...props}
  const elem = newProps.elem ? String(newProps.elem).toLowerCase() : 'div'

  // Remove items that otherwise will end up in HTML.
  delete newProps.elem

  return React.createElement(String(elem), newProps)
}

const View = cxs(_View)(function(props) {
  const s = { position: "relative", flex: 1 }
  if (props.style) {
    return merge.all([s, props.style])
  } else {
    return s
  }
})

export default View
export { View }
