import { React, h } from "../../lib/react-preact"
import { View } from "../View"


const Nav = (props) => {
  const newProps = {...props}
  delete(newProps.style)
  return (
    <View style={this.props.style} {...newProps}>{props.children}</View>
  )
}

export default Nav
export { Nav }
