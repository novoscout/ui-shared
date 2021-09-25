import { React, h, Component } from "../../lib/react-preact"
import cxs from "cxs/component"
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

  render(props) {
    let p = {...this.props}
    const url = (p || {}).href || (p || {}).url
    delete(p.href)
    delete(p.url)

    return (
      <_Link onClick={this.handleClickLink.bind(this,url)} {...p}>
        {p.children}
      </_Link>
    )
  }
}

const _Link = cxs(View)(function(props) {
  return props.theme.link
})

export default Link
export { Link }
