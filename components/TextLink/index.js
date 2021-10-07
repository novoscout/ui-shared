import { React, h, Component } from "../../lib/react-preact"
import { View } from "../View"
import { mergeDeep } from "../../lib"

class TextLink extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let newProps = {...this.props}
    const url = (newProps || {}).href || (newProps || {}).url || (newProps || {}).uri
    delete(newProps.href)
    delete(newProps.url)
    delete(newProps.uri)

    delete(newProps.style)

    const style = mergeDeep(
      this.props.style || {},
      {cursor:"pointer"}
    )

    return (
      <a style={style} href={url} {...newProps}>
        {this.props.children}
      </a>
    )
  }
}

export default TextLink
export { TextLink }
