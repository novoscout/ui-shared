import { React, h } from "../../lib/react-preact"
import cxs from "cxs/component"
import { View } from "../View"


const Text = (props) => {
  return (
    <_Text elem="span" {...props}>{props.children}</_Text>
  )
}

const _Text = cxs(View)(function(props) {
  return props.theme.text
})

export default Text
export { Text }
