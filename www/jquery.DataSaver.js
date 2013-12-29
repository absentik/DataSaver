/*
 * jQuery DataSaver plugin 0.0.1 
 * 
 * Author: Seleznev Alexander (ABSENT) 
 * Email: absenteg@gmail.com 
 * Website: http://whoisabsent.ru 
 *  
 * Licensed under the MIT license. 
 * http://www.opensource.org/licenses/mit-license.php 
 */

(function($){
	
	var pluginName = "DataSaver";
	var methods = {
		init : function(options) { 
			var settings = $.extend({ 
				timeout: 0, 
				events: "change"
			}, options);
			
			return this.each(function(i, element){
				start(element, settings.timeout, settings.events);
			});
		},

		//Load data from localStorage
		load : function() { 
			return this.each(function(i, element){
				load(element);
			});
		},

		//Save data in localStorage
		save : function() { 
			return this.each(function(i, element){
				save(element);
			});
		},

		//Remove data in localStorage
		remove : function() { 
			return this.each(function(i, element){
				remove(element);
			});
		}
	};
	
	$.fn.DataSaver = function(method) {
		if (typeof(Storage)=== "undefined") {
			$.error("Your browser doesn't support web storage.");
		}

		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method "' +  method + '" does not exist on ' + pluginName + '.');
		}
	};
	
	
	
	function start(selector, timeout, events) {
		load(selector);

		if (typeof events !== "undefined" && events.length > 0) {
			events = events.split(',').join(' ');
			$(selector).on(events, function(e) {
				save(selector);
			});
		}

		if (typeof timeout === "number" && timeout > 0) {
			setInterval(function() {
				save(selector);
			}, timeout);
		}
	}

	function save(selector) {
		var key = getKey(selector);
		var val;

		switch (selector.tagName) {
			case "INPUT":
				var type = $(selector).attr("type").toUpperCase();
				switch (type) {
					case "CHECKBOX":
						val = $(selector).prop('checked');
					break;

					case "RADIO":
						val = $(selector).val(); //keys for all radio[name] should match
					break;

					default:
						val = $(selector).val();
					break;
				}
			break;

			case "SELECT":
				val = $(selector).val();
			break;

			case "TEXTAREA":
				val = $(selector).val();
			break;
		}

		if (typeof val !== "undefined") {
			localStorage[key] = val;
		}
	}

	function load(selector) {
		var key = getKey(selector);
		var val = localStorage[key];

		if (val != null) {
			switch (selector.tagName) {
				case "INPUT":
					var type = $(selector).attr("type").toUpperCase();
					switch (type) {
						case "CHECKBOX":
							$(selector).prop('checked', (val === "true"));
						break;

						case "RADIO":
							$("input[type=radio][name="+selector.name+"]" + "[value=" + val + "]").prop('checked', true);
						break;

						default:
							$(selector).val(val);
						break;
					}
				break;

				case "SELECT":
					val = val.split(','); //for multiple select
					$(selector).val(val);
				break;

				case "TEXTAREA":
					$(selector).val(val);
				break;
			}
		}
	}

	function remove(selector) {
		var key = getKey(selector);
		localStorage.removeItem(key);
	}


	//Generate or return storageKey for element
	function getKey(selector) {
		var key = selector.storageKey;
		if (typeof key === "undefined") {
			var url = {
				host: window.location.host,
				pathname: window.location.pathname
			};
			var element = {
				tagName: selector.tagName, 
				name: selector.name
			}
			if ($(selector).is(":radio")) {
				element.type = selector.type;
			}
			else {
				element.id = selector.id;
				element.className = selector.className;
			}

			key = [pluginName, JSON.stringify(url), JSON.stringify(element)].join(".");
			selector.storageKey = key;
		}

		return key;
	}
	
})(jQuery);