DataSaver
=======

## ABOUT
The jQuery plugin allows you to save data from form fields in the web storage.

This saves users from  a situation when they lost all data entered into the form. This can happen due to a crash browser, disconnection, reload the page, etc.

### Browser Support 
Plugin is supported in Internet Explorer 8+, Firefox 3.5+, Opera 10.5+, Chrome 4.0+, and Safari 4.0+.

## USAGE
DataSaver plugin uses the jQuery JavaScript library, only. So, include just these two javascript files in your header.

<pre>
&lt;script src="js/jquery.js"&gt;&lt;/script&gt;
&lt;script src="js/jquery.DataSaver.js">&lt;/script&gt;
</pre>

Select elements whose data you want to save.

<pre>&lt;textarea class="saveme"&gt; &lt;/textarea&gt;</pre>

After it, call the jQuery DataSaver plugin.

<pre>$('.saveme').DataSaver();</pre>

### Options:
You can pass an options object in plugin init method.
* `timeout` : Automatic save interval data (in milliseconds). If zero, it is not used (Default: `0`);
* `events` : List of events that cause data save. If `undefined` or `''`, it is not used (Default: `change`).

<pre>$('.saveme').DataSaver({timeout: 1000, events: "change keyup"});</pre>

### Methods:
You can call some methods. Just pass their name.
* `save` : Save the data in web storage;
* `load` : Load the data from web storage;
* `remove` : Remove the data from web storage; 
* `die` : Stop the DataSaver. 

<pre>$('.saveme').DataSaver('remove');</pre>

### Events: 
You can listen DataSaver events. 
* `DataSaver_save`
* `DataSaver_load`
* `DataSaver_remove`

You can also get localStorage key (`DataSaver_key`) and value: 

<pre>
$(document).on("DataSaver_save DataSaver_load DataSaver_remove", function(e) {
    console.log(e.type);
    console.log(e.target.DataSaver_key + " : " + localStorage[e.target.DataSaver_key]);
    console.log("");
});
</pre>

## EXAMPLE
[View example](http://htmlpreview.github.io/?https://github.com/absentik/DataSaver/blob/master/index.html#example_form)
