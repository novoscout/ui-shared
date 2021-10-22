import { React, h, Component } from "../../lib/react-preact"


class TextLink extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let newProps = {...this.props}
    const href = (newProps || {}).href || (newProps || {}).url ||
          (newProps || {}).uri
    delete(newProps.href)
    delete(newProps.url)
    delete(newProps.uri)

    delete(newProps.style)

    return (
      <a style={this.props.style} href={href} {...newProps}>
        {this.props.children}
      </a>
    )
  }
}

export default TextLink
export { TextLink }
