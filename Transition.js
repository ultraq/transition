/* 
 * Copyright 2015, Emanuel Rabina (http://www.ultraq.net.nz/)
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import BezierEasing from 'bezier-easing';

export const LINEAR = BezierEasing(0.00, 0.0, 1.00, 1.0);
export const EASE   = BezierEasing(0.25, 0.1, 0.25, 1.0);

/**
 * Create CSS-like transitions in Javascript.  Used if the thing you want to
 * animate can't actually be performed in CSS.
 * 
 * @author Emanuel Rabina
 */
export default class Transition {

	/**
	 * Create a new `Transition` with the given transition function/algorithm,
	 * duration, and easing function.  This does not start a transition - use the
	 * {@link Transition#start} function to kick it off.
	 * 
	 * @param {Function} callback
	 *   A function that is called at every possible frame with a single parameter,
	 *   a "delta" value between 0.0 and 1.0 to convey at what point the current
	 *   frame through the transition is up to, based on the timing function.
	 * @param {Number} duration
	 *   How long, in milliseconds, the transition should run for.
	 * @param {BezierEasing} [timingFunction=LINEAR]
	 *   The easing function used to calculate the delta passed to the transition
	 *   function, defaults to a linear function if not specified.
	 */
	constructor(callback, duration, timingFunction = LINEAR) {

		this.callback       = callback;
		this.duration       = duration;
		this.timingFunction = timingFunction;
	}

	/**
	 * Starts the transition.
	 * 
	 * @return {Promise}
	 *   A Promise that is resolved when the transition has completed.
	 */
	start() {

		const {callback, duration, timingFunction} = this;
		return new Promise(resolve => {
			const start = performance.now();
			const animationId = requestAnimationFrame(function animation(timestamp) {
				let elapsed = timestamp - start;
				if (elapsed < duration) {
					callback(timingFunction(elapsed / duration));
					requestAnimationFrame(animation);
				}
				else {
					cancelAnimationFrame(animationId);
					resolve();
				}
			});
		});
	}
}
