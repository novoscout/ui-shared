// Little utility library that simply imports/requires either
// React or Preact, depending on what is available, without
// generating errors (hopefully). My preference is for Preact
// and so the rest of the codebase takes a "preact-first"
// approach. You should be able to drop-in React instead, but
// be warned, I don't test against React so YMMV.

// The root var onto which everything will be glommed:
var React;

// Any functions that are accessed differently by Preact/React
// must be explicitly handled e.g. render.
var render;


// First try Preact.
try {
  React = require("ui-web/node_modules/preact");
  // Preact's render function is in the core module.
  render = (React || {}).render;
} catch(e) {
  console.warn(e);
}

// If that didn't work, try React.
if (! React) {
  try {
    React = require("react");
    try {
      // React's render function is in react-dom module.
      render = require("react-dom").render;
    } catch(e) {
      console.warn(e);
    }
  } catch(e) {
    console.warn(e);
  }
}

// Ensure that the differently-accessed functions are NOT in
// this list, e.g. render.
const {
  h,
  Children,
  Component,
  Fragment,
  Profiler,
  PureComponent,
  StrictMode,
  Suspense,
  cloneElement,
  createContext,
  createElement,
  createFactory,
  createRef,
  forwardRef,
  hydrate,
  isValidElement,
  lazy,
  memo,
  options,
  toChildArray,
  useCallback,
  useContext,
  useDebugValue,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  version
} = React || {};


// Default export:
export default React;


// Named exports, which should INCLUDE the differently-accessed
// functions e.g. render.
export {
  React,
  h,
  Children,
  Component,
  Fragment,
  Profiler,
  PureComponent,
  StrictMode,
  Suspense,
  cloneElement,
  createContext,
  createElement,
  createFactory,
  createRef,
  forwardRef,
  hydrate,
  isValidElement,
  lazy,
  memo,
  render,
  options,
  toChildArray,
  useCallback,
  useContext,
  useDebugValue,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  version
};
