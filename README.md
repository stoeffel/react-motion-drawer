<h1 align="center">react-motion-drawer</h1>

<p align="center">

  <a href="#example">Example</a> |
  <a href="#usage">Usage</a> |
  <a href="#api">API</a> |
  <a href="CHANGELOG.md">Changelog</a>
  <br><br>
  <img  align="center" src="./media/drawer.gif">
</p>

> Navigation drawer built with the awesome [react-motion][rm] by [@chenglou][c] and [react-hammerjs][rh] by [@JedWatson][j]

[![npm version](https://badge.fury.io/js/react-motion-drawer.svg)](https://badge.fury.io/js/react-motion-drawer)

## Example

A live demo is available [here](https://react-motion-drawer.netlify.com/)!

To run the example locally, run:
```bash
$ yarn
$ yarn serve
```

## Installation

Via npm:
```
npm install react-motion-drawer
```

## Usage

```js
import Drawer from 'react-motion-drawer';
```

```jsx
  <Drawer open={false} onChange={onChange}>
    <ul>
      <li>Home</li>
      <li>About</li>
      <li>Settings</li>
    </ul>
  </Drawer>
```

If you want the drawer on the right side of the screen you need the following css.

```css
  body {
    overflow: hidden;
  }
```

### Hooking into the animation

You can hook into the animation by passing a function as the child component.

```jsx
  <Drawer open={false} width={300} onChange={onChange}>
    { val =>
      <ul style={{ opacity: 300 / val }}>
        <li>Home</li>
        <li>About</li>
        <li>Settings</li>
      </ul>
    }
  </Drawer>
```

## API

### Props

| Prop Name            | type    | default                  | description                                              |
|----------------------|---------|--------------------------|----------------------------------------------------------|
| zIndex               | number  |  `10000`                 |       z-index of the drawer                              |
| noTouchOpen          | bool    |  `false`                 |       can a user pan to open                             |
| noTouchClose         | bool    |  `false`                 |       can a user pan to close                            |
| onChange             | func    |  `() => {}`              |       called when the drawer is open                     |
| drawerStyle          | object  |  `null`                  |       additional drawer styles                           |
| className            | object  |  `null`                  |       additional drawer className                        |
| overlayClassName     | object  |  `null`                  |       additional overlay className                       |
| config               | object  |  `null`                  |       configuration of the react-motion animation        |
| open                 | bool    |  `false`                 |       states if the drawer is open                       |
| width                | number  |  `300`                   |       width of the drawer                                |
| height               | number  |  `100%`                  |       height of the drawer                               |
| handleWidth          | number  |  `20`                    |       width of the handle                                |
| peakingWidth         | number  |  `50`                    |       width that the drawer peaks on press               |
| panTolerance         | number  |  `50`                    |       tolerance until the drawer starts to move          |
| right                | bool    |  `false`                 |       drawer on the right side of the screen             |
| overlayColor         | string  |  `'rgba(0, 0, 0, 0.4)'`  |       color of the overlay                               |
| fadeOut              | bool    |  `false`                 |       fade out                                           |
| offset               | number  |  `0`                     |       offset of the drawer                               |


## License

MIT © [Christoph Hermann](http://stoeffel.github.io)

[rm]: https://github.com/chenglou/react-motion
[rh]: https://github.com/JedWatson/react-hammerjs
[c]: https://github.com/chenglou
[j]: https://github.com/JedWatson
