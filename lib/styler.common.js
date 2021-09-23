// FIXME See https://github.com/styled-components/css-to-react-native
// FIXME Fix import/export, requires styler.default.whatever for use?

const cssColorNames = require("css-color-names")
const cssProperties = require("known-css-properties")

const _CSSUnits = new RegExp('[0-9]+\.*(ch|cm|dpi|dpcm|dppx|em|ex|in|mm|pc|pt|px|rem|vh|vmin|vmax|vw|%)$',"i");
const _alreadyContainsQuotes = new RegExp('[\'"]');
const _justANumber = new RegExp('[0-9]+');
const _beginsWithHash = new RegExp('^\#')

function _CSSObjToString(opt={obj:undefined,css:undefined}) {
  let obj = opt["obj"];
  let css = opt["css"];
  if (! typeof css || ! css) { css = "" }
  for(let key in obj) {
    if (! obj.hasOwnProperty(key)) {
      continue;
    }
    css += _kebabifyCSSProps(String(key)) + ":";
    if (typeof obj[key] === "string" || typeof obj[key] === "number") {
      css += String(_quotifyCSSProp(obj[key])) + "; "
    } else if (typeof obj[key] === "object") {
      let ret = _CSSObjToString({obj:obj[key],css:""});
      if (ret) {
        css += "{" + String(ret) + "}";
      }
    } else {
      css += String(obj[key]) + "; "
    }
  }
  return css.replace(/ $/,'')
}

function _kebabifyCSSProps(s) {
  if (typeof(s) !== "string")
    return s
  return s
    .replace(/^([A-Z])/,function(match) { return "-" + match.toLowerCase() })
    .replace(/([^a-zA-Z])([A-Z])/g,function(match,nonAlpha,letter) {
      return nonAlpha + "-" + letter.toLowerCase()
    })
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z])(?=[a-z])/g, '$1-$2')
    .toLowerCase();
}

function _camelifyCSSProps(s) {
  if (typeof(s) !== "string")
    return s
  return s
    .replace(/(-)([a-z])/g, function(match,hyphen,letter){ return String(letter).toUpperCase() })
}

function _quotifyCSSProp(s) {
  if (typeof s === "number") {
    if (String(s).match(/NaN$/) || String(s).match(/Infinity$/)) {
      return "" // This deliberately produces nonsensical CSS.
    }
    return Number(s)
  }

  if (_CSSUnits.test(s) ||
      _alreadyContainsQuotes.test(s) ||
      _justANumber.test(s) ||
      _beginsWithHash.test(s) ||
      (s in cssColorNames) ||
      cssProperties.all.includes(String(s).toLowerCase())
     ) {
    return s;
  }
  return '"' + String(s) + '"';
}

function _CSSStringToObj(s) {
  s = String(s)
  if (! s.match(":") && ! s.match(";")) {
    return false
  }
  let obj = {}
  s.split(";").forEach(function(x) {
    const k = String(x.split(":")[0]).replace(/^\s+/,'').replace(/\s+$/,'')
    let v = String(x.split(":")[1]).replace(/^\s+/,'').replace(/\s+$/,'')
    if (String(parseFloat(v)) === String(v)) {
      v = parseFloat(v)
    }
    v = _quotifyCSSProp(v)
    if (x && k && v) {
      obj[k] = v
    }
  })
  return obj
}

let styler = {
  CSSObjToString: _CSSObjToString,
  kebabifyCSSProps: _kebabifyCSSProps,
  camelifyCSSProps: _camelifyCSSProps,
  quotifyCSSProp: _quotifyCSSProp,
  CSSStringToObj: _CSSStringToObj
}

export default styler
export { styler }
