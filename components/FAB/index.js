import { React, h, Component } from "../../lib/react-preact"
import { View } from "../View"


class FAB extends Component {
  constructor(props) {
    super(props)
    this.handleToggle = this.handleToggle.bind(this)
    this.state = {
      loading: true,
      expanded: false
    }
  }

  componentDidMount() {
    this.setState({loading:false})
  }

  handleToggle(e) {
    this.setState(function(state,props) {
      const ret = { expanded: ! state.expanded }

      // If the composing element has a defined props.handleToggle
      // then call it here, passing the new state.expanded.
      props.handleToggle && props.handleToggle(ret)

      // Return the new state.
      return ret
    })
  }

  render() {
    if (this.state.loading) { return null }
    let newProps = {...this.props}
    delete(newProps.style)
    delete(newProps.expanded)

    return (
      <View
        onclick={this.handleToggle}
        style={this.props.style}
        {...newProps}>
        {this.props.children}
      </View>
    )
  }
}

export default FAB
export { FAB }
