import { React, h } from "../../lib/react-preact"
import { View } from "../View"


const Toolbar = (props) => {
  let newProps = {...props}
  delete(newProps.style)

  return (
    <View style={props.style} {...newProps}>
      {props.children}
    </View>
  )
}

export default Toolbar
export { Toolbar }
