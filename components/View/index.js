import { React, h } from "../../lib/react-preact"

const View = (props) => {
  const elem = props.elem ? String(props.elem) : "div"

  // Remove items that otherwise will end up in HTML.
  let newProps = {...props}

  delete newProps.elem

  return React.createElement(elem, newProps)
}

export default View
export { View }
