let styler = require("./styler.common.js")

styler.className = require("cxs")

styler.RNToWeb = (s,target={web:true}) => {
  // Takes a JS style object that might be used by React Native
  // and sanitises it for web or elsewhere.

  // Dimensions that must be converted to pixels
  // unless otherwise specified.
  const pixelDims = [
    "borderWidth",
    "fontSize",
    "height","maxHeight","minHeight",
    "margin","marginTop","marginBottom","marginLeft","marginRight",
    "padding","paddingTop","paddingBottom","paddingLeft","paddingRight",
    "width","maxWidth","minWidth"
  ]

  // Fix units. React Native does not specify units, but
  // they are (mostly?) in pixels.
  pixelDims.forEach( (item,idx) => {
    if (item in s && (typeof s[item] === "number"))
      s[item] = String(s[item]) + "px"
  })

  if ( ! s["display"] ) {
    s["display"] = "flex"
  }

  s = styler.CSSObjToString({obj:s})

  return s
}

export default styler
export { styler }
