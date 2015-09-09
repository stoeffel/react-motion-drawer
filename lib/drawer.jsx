import { Component, PropTypes } from 'react';
import { Spring } from 'react-motion';
import Hammer from 'react-hammerjs';
import extend from '1-liners/extend';
import isFunction from '1-liners/isFunction';
import styles from './styles';

const { bool, number, array, object, string, func } = PropTypes;

export default class Drawer extends Component {

  static propTypes = {
    onChange: func,           // called when the drawer is open
    drawerStyle: object,            // additional drawer styles
    className: object,        // additional drawer className
    overlayClassName: object, // additional overlay className
    config: array,            // configuration of the react-motion animation
    open: bool,               // states if the drawer is open
    width: number,            // width of the drawer
    height: number,           // height of the drawer
    handleWidth: number,      // width of the handle
    peakingWidth: number,     // width that the drawer peaks on press
    panTolerance: number,     // tolerance until the drawer starts to move
    right: bool,              // drawer on the right side of the screen
    overlayColor: string,     // color of the overlay
  };

  static defaultProps = {
    onChange: () => {},
    overlayColor: 'rgba(0, 0, 0, 0.4)',
    config: [350, 40],
    open: false,
    width: 300,
    height: '100%',
    handleWidth: 20,
    peakingWidth: 50,
    panTolerance: 50,
    right: false,
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
    currentState: 'CLOSED'
  };

  isState(s)  { return s === this.state.currentState; }
  isClosed()  { return this.isState('CLOSED'); }
  isOpen()    { return this.isState('OPEN'); }
  isOpening() { return this.isState('IS_OPENING'); }
  isClosing() { return this.isState('IS_CLOSING'); }

  onPress(e) {
    e.preventDefault();
    this.peak();
  }

  onPressUp(e) {
    e.preventDefault();
    this.close();
  }

  peak() {
    const { onChange, handleWidth } = this.props;
    onChange(false);
    return this.setState({ currentState: 'PEAK', x: handleWidth });
  }

  close() {
    this.props.onChange(false);
    return this.setState({ currentState: 'CLOSED', x: 0 });
  }

  open() {
    const { onChange, width } = this.props;
    onChange(true);
    return this.setState({ currentState: 'OPEN', x: width });
  }

  isClosingDirection(direction) {
    const { right } = this.props;
    const isClosing = direction === 2;

    if (right) return !isClosing;
    else return isClosing;
  }

  closingOrOpening(direction) {
    return this.isClosingDirection(direction)? 'IS_CLOSING': 'IS_OPENING';
  }

  inPanTolerance(deltaX) {
    const { currentState } = this.state;
    const { panTolerance } = this.props;

    return  Math.abs(deltaX) <= panTolerance && currentState === 'OPEN';
  }

  onPan(e) {
    e.preventDefault();

    const { isFinal, pointers, direction, deltaX } = e;
    if (this.inPanTolerance(deltaX)) return;

    if (isFinal) {
      if (this.isOpening()) this.open();
      else if (this.isClosing()) this.close();
      return;
    }

    const { currentState } = this.state;
    const { right, peakingWidth, width, handleWidth } = this.props;
    const { clientX } = pointers[0];

    let x = right? document.body.clientWidth - clientX: clientX;

    if (x + peakingWidth >= width) x = width - peakingWidth;

    const closingOrOpening = this.closingOrOpening(direction);
    const nextState = {
      PEAK: closingOrOpening,
      IS_OPENING: closingOrOpening,
      IS_CLOSING: closingOrOpening,
      OPEN: 'IS_CLOSING',
      CLOSED: 'PEAK'
    };

    this.setState({
      currentState: nextState[currentState],
      x: this.isClosed()? peakingWidth: peakingWidth / 2 + x
    });
  }

  onOverlayTap(e) {
    e.preventDefault();
    if (this.isOpen()) this.close();
  }

  render() {
    const { config, drawerStyle, className, overlayClassName, width, children } = this.props;
    const { currentState, x } = this.state;

    return (
        <Spring endValue={{val: x, config: config}}>
          {interpolated => {
            const { drawer, transform, overlay } = styles(interpolated, this.props);

            return (
              <Hammer style={transform}
                onPress={this.onPress.bind(this)}
                onPressUp={this.onPressUp.bind(this)}
                onPan={this.onPan.bind(this)} vertical={false}>

                { interpolated.val > 0 &&
                  <div className={className} style={extend(drawer, drawerStyle)}>
                    { isFunction( children )?
                      children(interpolated)
                      : children }
                  </div> }

                { !this.isClosed() &&
                  <Hammer style={overlay} className={overlayClassName} onTap={this.onOverlayTap.bind(this)} /> }
              </Hammer>
              );}
          }
        </Spring>
    );
  }
}
