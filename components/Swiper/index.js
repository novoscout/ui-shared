import { React, h, Component, createRef } from "../../lib/react-preact"
import { View } from "../View"
import cxs from "cxs/component"

class Swiper extends Component {
  constructor(props) {
    super(props)
    this.ref = createRef()
    this.handleDragStart = this.handleDragStart.bind(this)
    this.handleDragEnd = this.handleDragEnd.bind(this)
    this.nullSwipe = this.nullSwipe.bind(this)
    this.state = {
      dragging: false,
      firstTouch: { x: 0, y: 0 },
      loading: true,
      threshold: 50,
    }
  }

  nullSwipe(e) { }

  handleDragStart(e) {
    e.preventDefault()
    window.document.addEventListener("dragend", this.handleDragEnd, false)
    window.document.addEventListener("mouseup", this.handleDragEnd, false)
    this.setState(function(state,props) {
      return {
        dragging: true,
        firstTouch: {
          x: e.clientX,
          y: e.clientY
        }
      }
    })
  }

  handleDragEnd(e) {
    e.preventDefault()
    this.setState(function(state,props) {
      return { dragging: false }
    })
    window.document.removeEventListener("dragend", this.handleDragEnd)
    window.document.removeEventListener("mouseup", this.handleDragEnd)

    const xSwipe = this.state.firstTouch.x - e.clientX > 0 ? this.props.left || this.nullSwipe : this.props.right || this.nullSwipe
    const xDeltaSigned = this.state.firstTouch.x - e.clientX
    const xDelta = xDeltaSigned < 0 ? xDeltaSigned * -1 : xDeltaSigned
    const ySwipe = this.state.firstTouch.y - e.clientY > 0 ? this.props.up || this.nullSwipe : this.props.down || this.nullSwipe
    const yDeltaSigned = this.state.firstTouch.y - e.clientY
    const yDelta = yDeltaSigned < 0 ? yDeltaSigned * -1 : yDeltaSigned
    if (xDelta > this.state.threshold) {
      xSwipe()
    }
    if (yDelta > this.state.threshold) {
      ySwipe()
    }
  }

  componentDidMount() {
    if (this.props.threshold) {
      this.setState(function(state,props) {
        console.log("Fixing threshold in state")
        return { threshold: this.props.threshold }
      })
    }
    this.setState(function(state,props) {
      return { loading: false }
    })
    console.log(this.ref)
  }

  render() {
    return (
      <div
        ref={this.ref}
        style={this.props.style}
        draggable="true"
        ondragstart={this.handleDragStart}
        >{this.props.children}</div>
    )
  }
}

const _Swiper = cxs(View)(function(props) {
  return props.theme.swiper
})

export default Swiper
export { Swiper }
