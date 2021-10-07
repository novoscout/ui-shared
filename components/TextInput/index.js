import { React, h } from "../../lib/react-preact"
import { View } from "../View"


const TextInput = (props) => {
  const t = props.type ? String(props.type).toLowerCase() : "text"
  delete(props.type)
  return (
    <View elem="input" type={t} {...props}>{props.children}</View>
  )
}

export default TextInput
export { TextInput }
