import { React, Component } from "../../lib/react-preact"
import { TouchableOpacity } from "react-native"

class Link extends Component {
  constructor(props) {
    super(props)
    this.handlePress = this.handlePress.bind(this)
  }

  handlePress = (url,e) => {}

  render() {
    let p = {...this.props}
    const url = (p || {}).href || (p || {}).url || (p || {}).uri
    delete(p.href)
    delete(p.url)
    delete(p.uri)

    delete(p.onPress)
    delete(p.linkDefault)
    delete(p.onLongPress)
    delete(p.linkStyle)

    const style = p.style || {}
    delete p.style

    return (
      <TouchableOpacity style={style} onPress={() => this.handlePress(url)}>
        {this.props.children}
      </TouchableOpacity>
    )
  }
}

export default Link
export { Link }
