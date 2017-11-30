
import BezierEasing from 'bezier-easing';

export const LINEAR = BezierEasing(0.00, 0.0, 1.00, 1.0);

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
			const start = Date.now();

			// TODO: Can't currently use the highResTimestamp parameter because iOS8 :(
			const animationId = window.requestAnimationFrame(function smoothAnimation() {
				let time = Date.now() - start;
				if (time < duration) {
					let delta = timingFunction(time / duration);
					callback(delta);
					window.requestAnimationFrame(smoothAnimation);
				}
				else {
					window.cancelAnimationFrame(animationId);
					resolve();
				}
			});
		});
	}
}
