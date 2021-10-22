import { React, h, Component } from "../../lib/react-preact"
import { View } from "../View"


class Link extends Component {
  constructor(props) {
    super(props)
  }

  handleClickLink = (url,e) => {
    // e.preventDefault() // FIXME Necessary?
    console.log("Got click!")
    if (e.ctrlKey) {
      window.open(url,"_blank")
    } else {
      window.location.href=url
    }
  }

  render() {
    let newProps = {...this.props}
    delete(newProps.style)
    const url = (newProps || {}).href || (newProps || {}).url
    delete(newProps.href)
    delete(newProps.url)

    return (
      <View style={this.props.style} onClick={this.handleClickLink.bind(this,url)} {...newProps}>
        {this.props.children}
      </View>
    )
  }
}

export default Link
export { Link }
