import Drawer from '../../lib/drawer.jsx';
import React, { Component } from 'react';

const style = {
  background: '#F9F9F9',
  boxShadow: 'rgba(0, 0, 0, 0.188235) 0px 10px 20px, rgba(0, 0, 0, 0.227451) 0px 6px 6px'
};

export default class App extends Component {
  state = {
    openLeft: false,
    openRight: false
  };

  render() {
    const { openLeft, openRight } = this.state;
    const drawerProps = {
      overlayColor: 'rgba(255,255,255,0.4)',
      drawerStyle: style
    };

    return (
      <div>
      { !openRight &&
      <Drawer {...drawerProps} open={openLeft} onChange={open => this.setState({ openLeft: open})}>
        <div style={{ padding: '2em' }}>
           <button onClick={() => console.log('click')}>
            click
           </button>
         </div>
      </Drawer> }
      { !openLeft &&
      <Drawer right={true} {...drawerProps} open={openRight} onChange={open => this.setState({ openRight: open})}>
          <div style={{ padding: '2em' }}>
          <button onClick={() => console.log('click')}>
          click
          </button>
          <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
          <li>5</li>
          <li>6</li>
          <li>7</li>
          <li>8</li>
          <li>9</li>
          <li>10</li>
          <li>11</li>
          <li>12</li>
          <li>13</li>
          <li>14</li>
          <li>15</li>
          <li>16</li>
          <li>17</li>
          <li>18</li>
          <li>19</li>
          <li>20</li>
          <li>21</li>
          <li>22</li>
          <li>23</li>
          <li>24</li>
          <li>25</li>
          <li>26</li>
          <li>27</li>
          <li>28</li>
          <li>29</li>
          <li>30</li>
          <li>31</li>
          <li>32</li>
          <li>33</li>
          </ul>
          </div>
          </Drawer> }
      <div className="navbar-fixed">
      <nav>
        <div className="nav-wrapper cyan accent-4">
          <a href="#" className="brand-logo center">rm-drawer</a>
          <ul className="left">
            <li>
            <a className='' onClick={()=>this.setState({openLeft:!openLeft, openRight: false})}>
              <i style={{ lineHeight: '64px' }} className="material-icons">menu</i>
            </a>
            </li>
          </ul>
          <ul className="right">
            <li>
            <a className='' onClick={()=>this.setState({openRight:!openRight, openLeft: false})}>
              <i style={{ lineHeight: '64px' }} className="material-icons">menu</i>
            </a>
            </li>
          </ul>
        </div>
      </nav>
      </div>
      test
      </div>
    );
  }
}
