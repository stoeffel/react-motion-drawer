export default function(interpolated, props) {
  const { left, right, width, height, handleWidth, overlayColor } = props;
  let { clientWidth } = document.body;
  let { val } = interpolated;
  const opacity = val / width;

  if (right) val = width - val;
  else val = val - width;

  const drawer = {
    display: 'block',
    width: width,
    height: height,
    overflow: 'auto'
  };

  const transform = {
    boxSizing: 'content-box',
    pointer: 'cursor',
    position: 'absolute',
    display: 'block',
    zIndex: 1000,
    width: width,
    [right? 'paddingLeft': 'paddingRight']: handleWidth,
    maxWidth: width,
    height: height,
    top: 0,
    [right? 'right': 'left']: 0,
    margin: 0,
    transform: `translate3d(${val}px, 0, 0)`,
    WebkitTransform: `translate3d(${val}px, 0, 0)`
  };


  const overlayTransform = (right)? -width: width;
  const overlay = {
    zIndex: -2,
    pointer: 'cursor',
    position: 'absolute',
    width: clientWidth,
    height: '100%',
    background: overlayColor,
    opacity: opacity,
    top: 0,
    [right? 'right': 'left']: 0,
    margin: 0,
    transform: `translate3d(${overlayTransform}px, 0, 0)`,
    WebkitTransform: `translate3d(${overlayTransform}px, 0, 0)`
  };

  return { drawer, transform, overlay };
}
