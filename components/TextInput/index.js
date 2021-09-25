import { React, h } from "../../lib/react-preact"
import cxs from "cxs/component"
import { View } from "../View"


const TextInput = (props) => {
  const t = props.type ? String(props.type).toLowerCase() : "text"
  delete(props.type)
  return (
    <_TextInput elem="input" type={t} {...props}>{props.children}</_TextInput>
  )
}

const _TextInput = cxs(View)(function(props) {
  return props.theme.textInput
})

export default TextInput
export { TextInput }
