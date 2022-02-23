import { React, h } from "../../lib/react-preact"

const View = (props) => {
  const elem = props.elem ? String(props.elem) : "div"

  // Remove props items that otherwise will end up in HTML.
  const { elem:{}, ...newProps } = props

  return React.createElement(elem, newProps)
}

export default View
export { View }
