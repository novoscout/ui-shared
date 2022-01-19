import { React, h } from "../../lib/react-preact"
import { View } from "../View"


const Details = (props) => {
  return (
    <View elem="details" {...props}>{props.children}</View>
  )
}

export default Details
export { Details }
