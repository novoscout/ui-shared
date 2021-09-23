let styler = require("./styler.common.js")

styler.webToRN = (s,target={}) => {
  // Takes a CSS-in-JS style object and sanitises it for React Native.

  // Styles that are not meant to appear in React Native.
  const killNative = [ "cursor" ]

  // Strip out stuff that is not meant
  // to appear in React Native styles.
  // FIXME height should remain if units are pixels
  killNative.forEach( (item,idx) => {
    if (item in s) {
      delete(s[item])
    }
  })

  // RN Uses flex exclusively.
  const enforceFlex = { "display": "flex" }
  for (item in enforceFlex) {
    if (item in s) {
      if (! String(s[item]).toLowerCase().match(/^flex/)) {
        s[item] = enforceFlex[item]
      }
    }
  }

  return s
}

export { styler }
export default styler
