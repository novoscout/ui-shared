import { React, h } from "../../lib/react-preact"
import { View } from "../View"


const Text = (props) => {
  return (
    <View elem="span" {...props}>{props.children}</View>
  )
}

export default Text
export { Text }
