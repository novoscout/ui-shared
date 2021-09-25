import React, { Component } from "../../lib/react-preact"
import { View } from "../View"

// const merge = require("deepmerge")

class Swiper extends Component {
  constructor(props) {
    super(props)
    this.handleTouchStart = this.handleTouchStart.bind(this)
    this.handleTouchEnd = this.handleTouchEnd.bind(this)
    this.nullSwipe = this.nullSwipe.bind(this)
    this.state = {
      threshold: 50,
      firstTouch: { x: 0, y: 0 }
    }
  }

  nullSwipe(e) { }

  handleTouchStart(e) {
    e.persist()
    this.setState(function(state,props) {
      return { firstTouch: {
        x: e.nativeEvent.pageX,
        y: e.nativeEvent.pageY
      }}
    })
  }

  handleTouchEnd(e) {
    e.persist()
    const xSwipe = this.state.firstTouch.x - e.nativeEvent.pageX > 0 ? this.props.left || this.nullSwipe : this.props.right || this.nullSwipe
    const xDeltaSigned = this.state.firstTouch.x - e.nativeEvent.pageX
    const xDelta = xDeltaSigned < 0 ? xDeltaSigned * -1 : xDeltaSigned
    const ySwipe = this.state.firstTouch.y - e.nativeEvent.pageY > 0 ? this.props.up || this.nullSwipe : this.props.down || this.nullSwipe
    const yDeltaSigned = this.state.firstTouch.y - e.nativeEvent.pageY
    const yDelta = yDeltaSigned < 0 ? yDeltaSigned * -1 : yDeltaSigned
    if (xDelta > this.state.threshold) {
      xSwipe()
    }
    if (yDelta > this.state.threshold) {
      ySwipe()
    }
  }

  render() {
    if (this.props.threshold) {
      this.setState(function(state,props) {
        return { threshold: this.props.threshold }
      })
    }
    return (
      <View
        style={this.props.style}
        onTouchStart={this.handleTouchStart}
        onTouchEnd={this.handleTouchEnd}
        >{this.props.children}</View>
    )
  }
}

export default Swiper
export { Swiper }
