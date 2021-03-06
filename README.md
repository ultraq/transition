
Transition
==========

[![npm](https://img.shields.io/npm/v/@ultraq/transition.svg?maxAge=3600)](https://www.npmjs.com/package/@ultraq/transition)
[![License](https://img.shields.io/github/license/ultraq/transition.svg?maxAge=2592000)](https://github.com/ultraq/transition/blob/master/LICENSE.txt)

DIY transitions in JavaScript.


Installation
------------

```
npm install @ultraq/transition --save
```


Usage
-----

```javascript
import Transition from '@ultraq/transition';

let transition = new Transition(delta => {
  window.scrollTo(0, delta * 1000);
}, 500, BezierEasing(0.25, 0.1, 0.25, 1.0));
transition.start().then(() => {
  console.log('Done!');
});
```

The `Transition` constructor takes 3 parameters:

 - **callback**: A function that is called at every possible frame with a single
   parameter, a "delta" value between 0.0 and 1.0 to convey at what point the
   current frame through the transition is up to, based on the duration and the
   timing function.
 - **duration**: How long, in milliseconds, the transition should run for.
 - **timingFunction**: optional, the easing function used to calculate the delta
   passed to the transition function.  Defaults to a linear function if not
   specified.

The default timing function is provided by the [bezier-easing](https://github.com/gre/bezier-easing)
library, and so any other curves created by this library are guaranteed to work,
but any library that can define a bezier curve and, given some X value can
return Y on the curve, will suffice.

To kick off the transition, call the `start` method on the transition instance.
This will return a `Promise` that is resolved once the transition duration has
elapsed.
