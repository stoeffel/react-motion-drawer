react-motion-drawer :warning: WIP :warning:
=====================

> Navigation drawer built with the awesome [react-motion][rm] by [@chenglou][c] and [react-hammerjs][rh] by [@JedWatson][j]



## Usage

```js
import Drawer from 'react-motion-drawer';
```

```jsx
  <Drawer open={false} onChange={onChange}>
    {/* your content */}
  </Drawer>
```

## API

### Props

* `onChange: func`           - called when the drawer is open
* `drawerStyle: object`      - additional drawer styles
* `className: object`        - additional drawer className
* `overlayClassName: object` - additional overlay className
* `config: array`            - configuration of the react-motion animation
* `open: bool`               - states if the drawer is open
* `width: number`            - width of the drawer
* `height: number`           - height of the drawer
* `handleWidth: number`      - width of the handle
* `peakingWidth: number`     - width that the drawer peaks on press
* `panTolerance: number`     - tolerance until the drawer starts to move
* `right: bool`              - drawer on the right side of the screen
* `overlayColor: string`     - color of the overlay


## License

MIT © [Christoph Hermann](http://stoeffel.github.io)

[rm]: https://github.com/chenglou/react-motion
[rh]: https://github.com/JedWatson/react-hammerjs
[c]: https://github.com/chenglou
[j]: https://github.com/JedWatson
