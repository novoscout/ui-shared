import { React, h } from "../../lib/react-preact"
import { View } from "../View"


const Summary = (props) => {
  return (
    <View elem="summary" {...props}>{props.children}</View>
  )
}

export default Summary
export { Summary }
