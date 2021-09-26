import React, { Component } from "../../lib/react-preact"
import { View } from "../View"

class Swiper extends Component {
  constructor(props) {
    super(props)
    this.handleSwipeStart = this.handleSwipeStart.bind(this)
    this.handleSwipeEnd = this.handleSwipeEnd.bind(this)
    this.nullSwipe = this.nullSwipe.bind(this)
    this.state = {
      threshold: props.threshold || 50,
      startCoords: { x: 0, y: 0 }
    }
  }

  nullSwipe(e) { }

  handleSwipeStart(e) {
    e.persist()
    this.setState(function(state,props) {
      return { startCoords: {
        x: e.nativeEvent.pageX,
        y: e.nativeEvent.pageY
      }}
    })
  }

  handleSwipeEnd(e) {
    e.persist()
    const xSwipe = this.state.startCoords.x - e.nativeEvent.pageX > 0 ? this.props.left || this.nullSwipe : this.props.right || this.nullSwipe
    const xDeltaSigned = this.state.startCoords.x - e.nativeEvent.pageX
    const xDelta = xDeltaSigned < 0 ? xDeltaSigned * -1 : xDeltaSigned
    const ySwipe = this.state.startCoords.y - e.nativeEvent.pageY > 0 ? this.props.up || this.nullSwipe : this.props.down || this.nullSwipe
    const yDeltaSigned = this.state.startCoords.y - e.nativeEvent.pageY
    const yDelta = yDeltaSigned < 0 ? yDeltaSigned * -1 : yDeltaSigned
    if (xDelta > this.state.threshold) {
      xSwipe()
    }
    if (yDelta > this.state.threshold) {
      ySwipe()
    }
  }

  render() {
    return (
      <View
        style={this.props.style}
        onTouchStart={this.handleSwipeStart}
        onTouchEnd={this.handleSwipeEnd}
        >{this.props.children}</View>
    )
  }
}

export default Swiper
export { Swiper }
