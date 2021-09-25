import { React, h, Component } from "../../lib/react-preact"
import cxs from "cxs/component"
import { View } from "../View"

const merge = require("deepmerge")

class TextLink extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let p = {...this.props}
    const url = (p || {}).href || (p || {}).url || (p || {}).uri
    delete(p.href)
    delete(p.url)
    delete(p.uri)

    const style = p.style || {}
    delete(p.style)

    return (
      <a style={merge.all([{cursor:"pointer"},style])} href={url} {...p}>
        {p.children}
      </a>
    )
  }
}

export default TextLink
export { TextLink }
