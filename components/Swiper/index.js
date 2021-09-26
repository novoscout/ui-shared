import { h, Component, createRef } from "../../lib/react-preact"
import { View } from "../View"
import cxs from "cxs/component"

import { mergeDeep } from "../../lib"


class Swiper extends Component {
  constructor(props) {
    super(props)
    this.ref = createRef()
    this.handleSwipeStart = this.handleSwipeStart.bind(this)
    this.handleSwipeEnd = this.handleSwipeEnd.bind(this)
    this.handleSwipeCancel = this.handleSwipeCancel.bind(this)
    this.handleSwipeMove = this.handleSwipeMove.bind(this)
    this.addListeners = this.addListeners.bind(this)
    this.removeListeners = this.removeListeners.bind(this)
    this.coords = this.coords.bind(this)
    this.state = {
      dragging: false,
      startCoords: { x: 0, y: 0 },
      loading: true,
      threshold: props.threshold || 50,
    }
  }

  addListeners() {
    document.addEventListener("mouseup", this.handleSwipeEnd, false)
    document.addEventListener("touchcancel", this.handleSwipeCancel, false)
    document.addEventListener("mousemove", this.handleSwipeMove, false)
    document.addEventListener("touchmove", this.handleSwipeMove, false)
  }

  removeListeners() {
    document.removeEventListener("mouseup", this.handleSwipeEnd)
    document.removeEventListener("touchcancel", this.handleSwipeCancel)
    document.removeEventListener("mousemove", this.handleSwipeMove)
    document.removeEventListener("touchmove", this.handleSwipeMove)
  }

  coords(e) {
    // Find the coords within a touch or mouse event.
    return {
      x: e.clientX || e.changedTouches[0].clientX,
      y: e.clientY || e.changedTouches[0].clientY
    }
  }

  handleSwipeStart(e) {
    // FIXME Need to let touch/click/etc events through to e.g. links.
    e.preventDefault()
    const { x, y } = this.coords(e)
    this.addListeners()
    this.setState(function(state,props) {
      return { startCoords: { x, y } }
    })
  }

  handleSwipeEnd(e) {
    e.preventDefault()
    const { x, y } = this.coords(e)
    const xSwipe = this.state.startCoords.x - x > 0 ? this.props.left : this.props.right
    const xDeltaSigned = this.state.startCoords.x - x
    const xDelta = xDeltaSigned < 0 ? xDeltaSigned * -1 : xDeltaSigned
    const ySwipe = this.state.startCoords.y - y > 0 ? this.props.up : this.props.down
    const yDeltaSigned = this.state.startCoords.y - y
    const yDelta = yDeltaSigned < 0 ? yDeltaSigned * -1 : yDeltaSigned
    if (xDelta > this.state.threshold) {
      xSwipe && xSwipe()
    }
    if (yDelta > this.state.threshold) {
      ySwipe && ySwipe()
    }
    this.setState({ dragging: false })
    this.removeListeners()
  }

  handleSwipeCancel(e) {
    e.preventDefault()
    this.setState({ dragging: false })
    this.removeListeners()
  }

  handleSwipeMove(e) {
    // Prevent some console noise, see
    // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
    if (e.type == "mousemove") { e.preventDefault() }
    this.setState({ dragging: true })
  }

  componentDidMount() {
    this.setState({ loading: false })
  }

  componentDidUnmount() {
    this.removeListeners()
  }

  render() {
    if (this.state.loading) { return null }
    return (
      <View
        ref={this.ref}
        style={ mergeDeep({}, {touchAction: "pan-x pan-y pinch-zoom"}, this.props.style) }
        draggable="true"

        ondragstart={this.handleSwipeStart}
        ondragend={this.handleSwipeEnd}

        ontouchstart={this.handleSwipeStart}
        ontouchend={this.handleSwipeEnd}

        >{this.props.children}</View>
    )
  }
}

const _Swiper = cxs(View)(function(props) {
  return props.theme.swiper
})

export default Swiper
export { Swiper }
