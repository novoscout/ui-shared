import { React, h, Component } from "../../lib/react-preact"
import { View } from "../View"


const Button = (props) => {
  let newProps = {...props}
  delete(newProps.style)

  return (
    <View elem="button" style={props.style} {...newProps}>
      {props.children}
    </View>
  )
}

export default Button
export { Button }
