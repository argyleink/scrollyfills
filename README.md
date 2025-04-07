# ScrollyFills
#### Various importable functions to assist in polyfilling specced scroll features

<br>

## Polyfills

### `scrollend`
`npm i scrollyfills`

```js
import 'scrollyfills';

// use the new event as if it's been there the whole time
someElementThatScrolls.addEventListener('scrollend', event => {
  console.log('scroll has ended');
});
```
