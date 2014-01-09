/*
 * jQuery DataSaver plugin 0.0.5 
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
				load(element);

				if (typeof settings.events !== "undefined" && settings.events.length > 0) {
					settings.events = settings.events.split(',').join(' ');
					element[pluginName + "_events"] = settings.events;
					$(document.body).on(settings.events, element, function() {
						save(element);
					});
				}

				if (typeof settings.timeout === "number" && settings.timeout > 0) {
					element[pluginName + "_timeout"] = setInterval(function() {
						save(element);
					}, settings.timeout);
				}
			});
		},

		//Stop the DataSaver
		die : function() {
			return this.each(function(i, element){
				$(document.body).off(element[pluginName + "_events"]);
				clearInterval(element[pluginName + "_timeout"]);
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
		if (!('localStorage' in window && window['localStorage'] !== null)) {
			$.error("Your browser doesn't support localStorage.");
		}

		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method "' +  method + '" does not exist on ' + pluginName + '.');
		}
	};
	

	function save(element) {
		var key = getKey(element);
		var val;

		switch (element.tagName) {
			case "INPUT":
				var type = $(element).attr("type").toUpperCase();
				switch (type) {
					case "CHECKBOX":
						val = $(element).prop('checked');
					break;

					case "RADIO":
						val = $(element).val(); //keys for all radio[name] should match
					break;

					default:
						val = $(element).val();
					break;
				}
			break;

			case "SELECT":
				val = $(element).val();
			break;

			case "TEXTAREA":
				val = $(element).val();
			break;
		}

		if (typeof val !== "undefined") {
			localStorage[key] = val;
		}

		$(element).trigger(pluginName + "_save");
	}

	function load(element) {
		var key = getKey(element);
		var val = localStorage[key];

		if (val != null) {
			switch (element.tagName) {
				case "INPUT":
					var type = $(element).attr("type").toUpperCase();
					switch (type) {
						case "CHECKBOX":
							$(element).prop('checked', (val === "true"));
						break;

						case "RADIO":
							$("input[type=radio][name="+element.name+"]" + "[value=" + val + "]").prop('checked', true);
						break;

						default:
							$(element).val(val);
						break;
					}
				break;

				case "SELECT":
					val = val.split(','); //for multiple select
					$(element).val(val);
				break;

				case "TEXTAREA":
					$(element).val(val);
				break;
			}
		}

		$(element).trigger(pluginName + "_load");
	}

	function remove(element) {
		var key = getKey(element);
		localStorage.removeItem(key);
		$(element).trigger(pluginName + "_remove");
	}


	//Generate or return DataSaver_key for element
	function getKey(element) {
		var keyName = pluginName + "_key";
		var key = element[keyName];
		if (typeof key === "undefined") {
			var url = {
				host: window.location.host,
				pathname: window.location.pathname
			};

			var node = {
				tagName: element.tagName, 
				name: element.name
			}
			if ($(element).is(":input")) {
				node.type = element.type;
			}
			if (!$(element).is(":radio")) {
				node.id = element.id;
				node.className = element.className;
			}

			key = [pluginName, JSON.stringify(url), JSON.stringify(node)].join(".");
			element[keyName] = key;
		}

		return key;
	}
	
})(jQuery);