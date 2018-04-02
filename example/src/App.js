import Drawer from "../../lib/drawer.jsx";
import React, { Component } from "react";
import image from "url-loader!../planurahuette.jpg";

export default class App extends Component {
  state = {
    openLeft: false,
    openRight: false,
    drawerStyle: `
{
  "background": "#F9F9F9",
  "boxShadow": "rgba(0, 0, 0, 0.188235) 0px 10px 20px, rgba(0, 0, 0, 0.227451) 0px 6px 6px"
}`,
    relativeWidth: false,
    width: 300,
    noTouchOpen: false,
    noTouchClose: false,
  };

  setWidth = e => {
    this.setState({
      width: Number(e.target.value) || e.target.value
    });
  };

  setTouch = e => {
    this.setState({
      [e.target.name]: !e.target.checked
    })
  }

  setDrawerStyle = e => {
    e.preventDefault()
    this.setState({
      drawerStyle: this.drawerStyleRef.value
    })
  }

  render() {
    const {
      drawerStyle: stringDrawerStyle,
      openLeft,
      openRight,
      noTouchOpen,
      noTouchClose
    } = this.state;

    let drawerStyle = {}
    try {
      drawerStyle = JSON.parse(stringDrawerStyle)
    } catch (err) {
      console.error('Error parsing JSON: ', err)
    }

    const drawerProps = {
      overlayColor: "rgba(255,255,255,0.6)",
      drawerStyle
    };

    return (
      <div>
        {!openRight &&
          <Drawer
            {...drawerProps}
            width={this.state.width}
            fadeOut
            open={openLeft}
            onChange={open => this.setState({ openLeft: open })}
            noTouchOpen={noTouchOpen}
            noTouchClose={noTouchClose}
          >
            <div style={{ width: "100%" }}>
              <img src={image} />
            </div>
            <div style={{ padding: "2em" }}>
              <h3>Navigation</h3>
            </div>
          </Drawer>}
        {!openLeft &&
          <Drawer
            right
            width={this.state.width}
            {...drawerProps}
            open={openRight}
            onChange={open => this.setState({ openRight: open })}
            noTouchOpen={noTouchOpen}
            noTouchClose={noTouchClose}
          >
            {val => {
              var per = val / 300;
              return (
                <div
                  style={{
                    backgroundColor: `rgba(0, 184, 212, ${per})`,
                    width: "100%",
                    height: "100%"
                  }}
                />
              );
            }}
          </Drawer>}
        <div className="navbar-fixed">
          <nav>
            <div className="nav-wrapper cyan accent-4">
              <a href="#" className="brand-logo center">rm-drawer</a>
              <ul className="left">
                <li style={{ cursor: "pointer", height: "100%" }}>
                  <a
                    style={{ padding: 15 }}
                    className=""
                    onClick={() =>
                      this.setState({ openLeft: !openLeft, openRight: false })}
                  >
                    <i className="fa fa-bars" />
                  </a>
                </li>
              </ul>
              <ul className="right">
                <li style={{ cursor: "pointer", height: "100%" }}>
                  <a
                    style={{ padding: 15 }}
                    className=""
                    onClick={() =>
                      this.setState({ openRight: !openRight, openLeft: false })}
                  >
                    <i className="fa fa-bars" />
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
        <div className="options">
          <form className="row">
            <h5>Size Controls</h5>
            <p className="col s4">
              <label htmlFor="width">Set width</label>
              <input
                id="width"
                type="text"
                onChange={this.setWidth}
                value={this.state.width}
              />
            </p>
          </form>
          <form className="row">
            <h5>Touch Controls</h5>
            <p className="col s4">
              <input
                name="noTouchOpen"
                id="noTouchOpen"
                type="checkbox"
                onChange={this.setTouch}
                checked={!noTouchOpen}
              />
              <label htmlFor="noTouchOpen">Touch open</label>
            </p>
            <p className="col s4" >
              <input
                name="noTouchClose"
                id="noTouchClose"
                type="checkbox"
                onChange={this.setTouch}
                checked={!noTouchClose}
              />
              <label htmlFor="noTouchClose">Touch close</label>
            </p>
          </form>
          <form className="row">
            <h5>Custom Styles <small style={{ fontSize: 'small', color: '#777' }}>Must be JSON for the example</small></h5>
            <p className="col s8 input-field">
              <textarea
                id="drawerStyle"
                className="materialize-textarea"
                ref={ref => this.drawerStyleRef = ref}
                defaultValue={stringDrawerStyle}
              />
              <label htmlFor="drawerStyle">drawerStyle</label>
              <button
                className="waves-effect waves-light btn"
                onClick={this.setDrawerStyle}
              >
                Set drawerStyle
              </button>
            </p>
          </form>
        </div>
      </div>
    );
  }
}
