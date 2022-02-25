import { React, h } from "../../lib/react-preact"

const View = (props) => {
  // Remove props items that otherwise will end up in HTML.
  const { elem, theme, ...newProps } = props

  return React.createElement(elem ? elem : "div", newProps)
}

export default View
export { View }
