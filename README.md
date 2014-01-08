DataSaver
=======

## ABOUT
The jQuery plugin allows you to save data from form fields in the web storage.

This saves users from  a situation when they lost all data entered into the form. This can happen due to a crash browser, disconnection, reload the page, etc.

### Browser Support 
Plugin is supported in Internet Explorer 8+, Firefox 3.5+, Opera 10.5+, Chrome 4.0+, and Safari 4.0+.

## USAGE
DataSaver plugin uses the jQuery JavaScript library, only. So, include just these two javascript files in your header.

`<script src="js/jquery.js"></script>`

`<script src="js/jquery.DataSaver.js"></script>;`

Select elements whose data you want to save.

`<textarea class="saveme"> </textarea>`

After it, call the jQuery DataSaver plugin.

`$('.saveme').DataSaver();`

### Options:
You can pass an options object in plugin init method.
* **timeout** : Automatic save interval data (in milliseconds). If zero, it is not used (Default: 0);
* **events** : List of events that cause data save. If "undefined" or "", it is not used (Default: "change").

`$('.saveme').DataSaver({timeout: 1000, events: "change keyup"});`

### Methods:
You can call some methods. Just pass their name.
* **save** : Save the data in web storage;
* **load** : Load the data from web storage;
* **remove** : Remove the data from web storage. 

`$('.saveme').DataSaver('remove');`

### Events: 
You can listen DataSaver events. 
* DataSaver_save
* DataSaver_load
* DataSaver_remove
