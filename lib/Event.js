/*
 * detectionizr
 * https://github.com/dotnetCarpenter/npm-detectionizr
 * @author  dotnetCarpenter
 * @version 13.7.1
 * Licensed under the WTFPL license.
 */
function Reactor() {
	"use strict"
	var events = [];

	this.on = function addEvent(event, fn, context) {
		events.push(new Event(event, fn, context));
	};

	this.off = function removeEvent(name) {
		events.forEach(function (event, i, all) {
			if(name === event.name)
				all.splice(i, 1);
		});
	};

	this.overwrite = function(event, fn, scope) {
		this.off(event);
		return this.on(event, fn, scope);
	};

	this.trigger = function(name /*, data */) {
		events.forEach(function(event) {
			if(event.name === name)
				event.fn.apply(event.context, Array.prototype.splice.call(arguments, 1));
		});
	};

	this.destroy = function cleanup() {
		events.forEach(function(e,i,all) {
			all[i] = null;	// explicitly de-reference
		});
		events.splice(0, events.length);	// empty array
	};
}

function Event(name, fn, context) {
	"use strict"
	this.name = name;
	this.fn = fn;
	this.context
}

module.exports = Reactor;
