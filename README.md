# ScrollyFills
#### Various importable functions to assist in polyfilling specced scroll features

<br>
<br>

## Polyfills

### `scrollend`
```js
import { scrollend } from 'scrollyfills';

// get a reference to a scrolling element
let someElementThatScrolls = document.querySelector('.scrolling');

// attach the polyfill to the element
scrollend(someElementThatScrolls);

// use the new event as if it's been there the whole time
someElementThatScrolls.addEventListener('scrollend', event => {
  console.log('scroll has ended');
});
```
