import { React, h } from "../../lib/react-preact"
import { View } from "../View"


const Ident = (props) => {
  const newProps = {...props}
  delete(newProps.style)
  return (
    <View style={props.style} {...newProps}>{props.children}</View>
  )
}

export default Ident
export { Ident }
