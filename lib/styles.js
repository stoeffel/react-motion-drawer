export default function(val, props) {
  const {
    zIndex,
    left,
    right,
    width,
    height,
    handleWidth,
    overlayColor,
    fadeOut,
    offset
  } = props;
  let clientWidth = 1000;
  if (typeof document !== "undefined") {
    clientWidth = document.body.clientWidth;
  }
  const opacity = (val - offset) / width;

  if (right) val = width - val;
  else val = val - width;

  const drawer = {
    display: "block",
    width: width,
    height: height,
    overflow: "auto"
  };

  const transform = {
    boxSizing: "content-box",
    pointer: "cursor",
    position: "fixed",
    display: "block",
    zIndex: zIndex,
    width: width,
    [right ? "paddingLeft" : "paddingRight"]: handleWidth,
    maxWidth: width,
    height: height,
    top: 0,
    [right ? "right" : "left"]: 0,
    margin: 0,
    transform: `translate3d(${val}px, 0, 0)`,
    WebkitTransform: `translate3d(${val}px, 0, 0)`,
    opacity: fadeOut ? opacity : 1
  };

  const overlayTransform = right ? -width : width;
  const overlay = {
    zIndex: -2,
    pointer: "cursor",
    position: "fixed",
    width: clientWidth,
    height: "100%",
    background: overlayColor,
    opacity: opacity,
    top: 0,
    [right ? "right" : "left"]: 0,
    margin: 0,
    transform: `translate3d(${overlayTransform}px, 0, 0)`,
    WebkitTransform: `translate3d(${overlayTransform}px, 0, 0)`
  };

  return { drawer, transform, overlay };
}
