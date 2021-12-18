import { h, Component } from "../../lib/react-preact"
import { View } from "../View"


class Swiper extends Component {
  constructor(props) {
    super(props)
    this.handleSwipeStart = this.handleSwipeStart.bind(this)
    this.handleSwipeEnd = this.handleSwipeEnd.bind(this)
    this.handleSwipeCancel = this.handleSwipeCancel.bind(this)
    this.handleSwipeMove = this.handleSwipeMove.bind(this)
    this.addListeners = this.addListeners.bind(this)
    this.removeListeners = this.removeListeners.bind(this)
    this.pointerCoords = this.pointerCoords.bind(this)
    this.state = {
      loading: true,
      allowSwipeX: true,
      allowSwipeY: true,
      startCoords: { x: 0, y: 0 },
      startThreshold: props.startThreshold || 50,
      endThreshold: props.endThreshold || 100,
    }
  }

  pointerCoords(e) {
    // Find the pointerCoords within a touch or mouse event.
    return {
      x: e.clientX || e.changedTouches[0].clientX || 0,
      y: e.clientY || e.changedTouches[0].clientY || 0
    }
  }

  addListeners() {
    this.base.addEventListener("mouseup", this.handleSwipeEnd)
    this.base.addEventListener("touchcancel", this.handleSwipeCancel)
    this.base.addEventListener("mousemove", this.handleSwipeMove)
    this.base.addEventListener("touchmove", this.handleSwipeMove)
  }

  removeListeners() {
    this.base.removeEventListener("mouseup", this.handleSwipeEnd)
    this.base.removeEventListener("touchcancel", this.handleSwipeCancel)
    this.base.removeEventListener("mousemove", this.handleSwipeMove)
    this.base.removeEventListener("touchmove", this.handleSwipeMove)
  }

  handleSwipeStart(e) {
    // e.preventDefault()
    const { x, y } = this.pointerCoords(e)
    this.addListeners()
    this.setState(function(state,props) {
      return {
        startCoords: { x, y }
      }
    })
    if (this.props && this.props.start) {
      this.props.start()
    }
  }

  handleSwipeEnd(e) {
    // e.preventDefault()
    this.removeListeners()
    this.setState({ allowSwipeX: true, allowSwipeY: true })
    if (this.props && this.props.end) {
      this.props.end()
    }
  }

  handleSwipeCancel(e) {
    // e.preventDefault()
    this.removeListeners()
    this.setState({ allowSwipeX: true, allowSwipeY: true })
    if (this.props && this.props.cancel) {
      this.props.cancel()
    }
  }

  async handleSwipeMove(e) {
    const { x, y } = this.pointerCoords(e)
    const xDeltaSigned = this.state.startCoords.x - x
    const xDelta = xDeltaSigned < 0 ? xDeltaSigned * -1 : xDeltaSigned
    const yDeltaSigned = this.state.startCoords.y - y
    const yDelta = yDeltaSigned < 0 ? yDeltaSigned * -1 : yDeltaSigned

    // // If reporting of only one axis at a time was requested,
    // // only report whichever moved the most.
    // if ((this.props || {}).uniaxial && this.state.allowSwipeX != false && this.state.allowSwipeY != false) {
    //   if (xDelta > yDelta) {
    //     await this.setState({allowSwipeY:false});
    //   } else if (xDelta < yDelta) {
    //     await this.setState({allowSwipeX:false});
    //   }
    // }
    // const direction = {
    //   left: this.state.allowSwipeX && x < this.state.startCoords.x,
    //   right: this.state.allowSwipeX && x > this.state.startCoords.x,
    //   up: this.state.allowSwipeY && y < this.state.startCoords.y,
    //   down: this.state.allowSwipeY && y > this.state.startCoords.y
    // }

    const direction = {}
    if (this.props.uniaxial) {
      if (xDelta > yDelta) {
        direction["left"] = x < this.state.startCoords.x
        direction["right"] = x > this.state.startCoords.x
        direction["up"] = false
        direction["down"] = false
      } else if (yDelta > xDelta) {
        direction["left"] = false
        direction["right"] = false
        direction["up"] = y < this.state.startCoords.y
        direction["down"] = y > this.state.startCoords.y
      }
    } else {
      direction["left"] = x < this.state.startCoords.x
      direction["right"] = x > this.state.startCoords.x
      direction["up"] = y < this.state.startCoords.y
      direction["down"] = y > this.state.startCoords.y
    }

    if (this.props && this.props.shouldPreventDefault) {
      this.props.shouldPreventDefault({
        start: this.state.startCoords,
        direction,
        x, y, xDelta, yDelta,
        allowSwipeX: this.state.allowSwipeX,
        allowSwipeY: this.state.allowSwipeY,
      }) && e.preventDefault()
    }

    if (xDelta > this.state.startThreshold || yDelta > this.state.startThreshold) {
      if (this.props && this.props.move) {
        this.props.move({
          direction: direction,
          start: this.state.startCoords,
          x: direction.left || direction.right ? x : this.state.startCoords.x,
          y: direction.up || direction.down ? y : this.state.startCoords.y
        })
      }
    }
  }

  componentDidMount() {
    this.setState({ loading: false })
  }

  componentWillUnmount() {
    this.removeListeners()
  }

  render() {
    if (this.state.loading) { return null }

    // Note to self: previous approach using HTML5 "draggable"
    // was more trouble than it was worth.

    return (
      <View
        ontouchstart={this.handleSwipeStart}
        ontouchend={this.handleSwipeEnd}
        className={this.props && this.props.className || null}
        >
        {this.props.children}
      </View>
    )
  }
}

const _Inner = (props) => {
  return (
    <View {...props}>
      {props.children}
    </View>
  )
}

Swiper.Inner = _Inner

export default Swiper
export { Swiper }
