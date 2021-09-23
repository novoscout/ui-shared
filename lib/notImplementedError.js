function NotImplementedError(message) {
  this.name = "NotImplementedError"
  this.message = (message || "")
}
NotImplementedError.prototype = Error.prototype

export default NotImplementedError
export { NotImplementedError }
