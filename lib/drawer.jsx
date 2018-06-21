import React from "react";
import PropTypes from "prop-types";
import { Motion, spring } from "react-motion";
import Hammer from "react-hammerjs";
import isFunction from "1-liners/isFunction";
import styles from "./styles";

const {
  bool,
  number,
  array,
  object,
  string,
  func,
  oneOfType
} = PropTypes;

export default class Drawer extends React.Component {
  static propTypes = {
    zIndex: number, // z-index of the drawer default is 10000
    noTouchOpen: bool, // can a user pan to open
    noTouchClose: bool, // can a user pan to close
    onChange: func, // called when the drawer is open
    drawerStyle: object, // additional drawer styles
    className: string, // additional drawer className
    overlayClassName: string, // additional overlay className
    config: PropTypes.shape({
      stiffness: number,
      damping: number,
      precision: number
    }), // configuration of the react-motion animation
    open: bool, // states if the drawer is open
    width: oneOfType([number, string]), // width of the drawer
    height: oneOfType([number, string]), // height of the drawer
    handleWidth: number, // width of the handle
    peakingWidth: number, // width that the drawer peaks on press
    panTolerance: number, // tolerance until the drawer starts to move
    right: bool, // drawer on the right side of the screen
    overlayColor: string, // color of the overlay
    fadeOut: bool, // fade out
    offset: number // offset
  };

  static defaultProps = {
    zIndex: 10000,
    noTouchOpen: false,
    noTouchClose: false,
    onChange: () => {},
    overlayColor: "rgba(0, 0, 0, 0.4)",
    config: { stiffness: 350, damping: 40 },
    open: false,
    width: 300,
    height: "100%",
    handleWidth: 20,
    peakingWidth: 50,
    panTolerance: 50,
    right: false,
    fadeOut: false,
    offset: 0
  };

  componentWillReceiveProps(nextProps) {
    const { open } = this.props;
    const { open: nextOpen } = nextProps;

    if (nextOpen !== open) {
      if (nextOpen) this.open();
      else this.close();
    }
  }

  state = {
    currentState: "CLOSED"
  };

  isState = s => s === this.state.currentState;
  isClosed = () => this.isState("CLOSED");
  isOpen = () => this.isState("OPEN");
  isOpening = () => this.isState("IS_OPENING");
  isClosing = () => this.isState("IS_CLOSING");

  peak() {
    const { onChange, handleWidth } = this.props;
    onChange(false);
    return this.setState({ currentState: "PEAK", x: handleWidth });
  }

  close() {
    this.props.onChange(false);
    return this.setState({ currentState: "CLOSED", x: 0 });
  }

  open() {
    const { onChange, width } = this.props;
    onChange(true);

    return this.setState({ currentState: "OPEN", x: this.calculateWidth() });
  }

  isClosingDirection(direction) {
    const { right } = this.props;
    const isClosing = direction === 2;

    if (right) return !isClosing;
    else return isClosing;
  }

  closingOrOpening(direction) {
    return this.isClosingDirection(direction) ? "IS_CLOSING" : "IS_OPENING";
  }

  inPanTolerance(deltaX) {
    const { currentState } = this.state;
    const { panTolerance } = this.props;

    return Math.abs(deltaX) <= panTolerance && currentState === "OPEN";
  }

  onPress = e => {
    if (this.props.noTouchOpen) return;
    e.preventDefault();
    this.peak();
  };

  onPressUp = e => {
    if (this.props.noTouchClose) return;
    e.preventDefault();
    this.close();
  };

  onPan = e => {
    if (this.isClosed() && this.props.noTouchOpen) return;
    if (this.isOpen() && this.props.noTouchClose) return;
    e.preventDefault();

    const { isFinal, pointers, direction, deltaX } = e;
    if (this.inPanTolerance(deltaX)) return;

    if (isFinal) {
      if (this.isOpening()) this.open();
      else if (this.isClosing()) this.close();
      return;
    }

    const { currentState } = this.state;
    const { right, peakingWidth, handleWidth } = this.props;
    const width = this.calculateWidth();
    const { clientX } = pointers[0];

    let x = right ? document.body.clientWidth - clientX : clientX;

    if (x + peakingWidth >= width) x = width - peakingWidth;

    const closingOrOpening = this.closingOrOpening(direction);
    const nextState = {
      PEAK: closingOrOpening,
      IS_OPENING: closingOrOpening,
      IS_CLOSING: closingOrOpening,
      OPEN: "IS_CLOSING",
      CLOSED: "PEAK"
    };

    this.setState({
      currentState: nextState[currentState],
      x: this.isClosed() ? peakingWidth : peakingWidth / 2 + x
    });
  };

  onOverlayTap = e => {
    e.preventDefault();
    if (this.isOpen()) this.close();
  };

  calculateWidth = () => {
    const width = this.props.width;
    return /\%/.test(width)
      ? document.body.clientWidth * (width.match(/\d*/) / 100)
      : width;
  };

  render() {
    const {
      config,
      drawerStyle,
      className,
      overlayClassName,
      width,
      children,
      offset
    } = this.props;
    const { currentState, x } = this.state;

    return (
      <Motion style={{ myProp: spring(Math.min(x + offset || 0, this.calculateWidth()), config) }}>
        {interpolated => {
          const { drawer, transform, overlay } = styles(
            interpolated.myProp,
            this.props
          );

          let computedStyle = {...drawer, ...drawerStyle };
          if (interpolated.myProp > 0) computedStyle.display = "block";
          else computedStyle.display = "none";

          return (
            <Hammer
              onPress={this.onPress}
              onPressUp={this.onPressUp}
              onPan={this.onPan}
              direction={Hammer.DIRECTION_HORIZONTAL}
            >
              <div style={transform}>
                <div className={className} style={computedStyle}>
                  {isFunction(children)
                    ? children(interpolated.myProp)
                    : children}

                  {!this.isClosed() &&
                    <Hammer
                      style={overlay}
                      className={overlayClassName}
                      onTap={this.onOverlayTap}
                    >
                      <span />
                    </Hammer>}
                </div>
              </div>
            </Hammer>
          );
        }}
      </Motion>
    );
  }
}
