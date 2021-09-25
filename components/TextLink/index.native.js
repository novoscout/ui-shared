import { React, h, Component } from "../../lib/react-preact"
import { Text } from "../Text"
import { Linking } from "react-native"

const merge = require("deepmerge")

class TextLink extends Component {
  constructor(props) {
    super(props)
    this.handlePress = this.handlePress.bind(this)
  }

  handlePress = async(u) => {
    console.log("Press detected!")
    const supported = await Linking.canOpenURL(u)
    if (supported) {
      await Linking.openURL(u);
    } else {
      // FIXME Display alert
      console.warn("Could not open this URL: ",u)
    }
  }

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

    const style = merge.all([{textDecorationLine:"underline"},p.style || {}])
    delete(p.style)

    return (
      <Text style={style} onPress={() => this.handlePress(url)}>
        {p.children}
      </Text>
    )
  }
}

export default TextLink
export { TextLink }

