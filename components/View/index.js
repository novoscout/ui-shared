import { React, h } from "../../lib/react-preact"

const View = (props) => {
  let newProps = {...props}
  const elem = newProps.elem ? String(newProps.elem).toLowerCase() : "div"

  // Remove items that otherwise will end up in HTML.
  delete newProps.elem

  return React.createElement(String(elem), newProps)
}

export default View
export { View }
