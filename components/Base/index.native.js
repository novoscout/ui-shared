import React from "../../lib/react-preact"
import { View } from "react-native"

const Base = (props) => {
  return (
      <View>{props.children}</View>
  )
}

export default Base
export { Base }
