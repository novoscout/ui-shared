import { h, Component, createRef } from "../../lib/react-preact"
import { View } from "../View"


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
      x: e.clientX || e.changedTouches[0].clientX,
      y: e.clientY || e.changedTouches[0].clientY
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
        startCoords: { x: x, y: y }
      }
    })
    this.props.start && this.props.start(e)
  }

  handleSwipeEnd(e) {
    // e.preventDefault()
    this.removeListeners()
    this.setState({ allowSwipeX: true, allowSwipeY: true })
    this.props.end && this.props.end()
  }

  handleSwipeCancel(e) {
    // e.preventDefault()
    this.removeListeners()
    this.setState({ allowSwipeX: true, allowSwipeY: true })
    this.props.cancel && this.props.cancel()
  }

  handleSwipeMove(e) {
    const { x, y } = this.pointerCoords(e)
    const xDeltaSigned = this.state.startCoords.x - x
    const xDelta = xDeltaSigned < 0 ? xDeltaSigned * -1 : xDeltaSigned
    const yDeltaSigned = this.state.startCoords.y - y
    const yDelta = yDeltaSigned < 0 ? yDeltaSigned * -1 : yDeltaSigned

    this.props.shouldPreventDefault &&
      this.props.shouldPreventDefault({
        start: this.state.startCoords,
        x: x, y: y,
        xDelta: xDelta,
        yDelta: yDelta
      }) && e.preventDefault()

    // If reporting of only one axis at a time was requested,
    // only report whichever moved the most.
    if (this.props.uniaxial && this.state.allowSwipeX != false && this.state.allowSwipeY != false) {
      if (xDelta > yDelta) {
        this.setState(function(state,props){return{allowSwipeY:false}})
      } else if (xDelta < yDelta) {
        this.setState(function(state,props){return{allowSwipeX:false}})
      }
    }

    const direction = {
      left: this.state.allowSwipeX && this.state.startCoords.x > x,
      right: this.state.allowSwipeX && this.state.startCoords.x < x,
      up: this.state.allowSwipeY && this.state.startCoords.y > y,
      down: this.state.allowSwipeY && this.state.startCoords.y < y
    }

    if (xDelta > this.state.startThreshold || yDelta > this.state.startThreshold) {
      this.props.move && this.props.move(
        {
          direction: direction,
          start: this.state.startCoords,
          x: direction.left || direction.right ? x : this.state.startCoords.x,
          y: direction.up || direction.down ? y : this.state.startCoords.y
        }
      )
    }
  }

  componentDidMount() {
    this.setState({ loading: false })
  }

  componentDidUnmount() {
    this.removeListeners()
  }

  render() {
    if (this.state.loading) { return null }
    //    draggable="true"
    //    ondragstart={this.handleSwipeStart}
    //    ondragend={this.handleSwipeEnd}

    const newProps = {...this.props}
    delete(newProps.style)
    delete(newProps.uniaxial)

    return (
      <View
        ref={this.ref}
        style={this.props.style}
        ontouchstart={this.handleSwipeStart}
        ontouchend={this.handleSwipeEnd}
        {...newProps}
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
