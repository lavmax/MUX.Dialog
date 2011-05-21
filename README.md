MUX.Dialog
==========

Lightweight, beautiful and clean Mootools plugin to show dialogs on your sites and web-apps.

- Rich functionality, which means that it supports keyboard events, dragging, sizing, elastic and fixed size etc.
- Clean and simple API to customize your dialogs.

3. Styleable with CSS, so you can overwrite almost all styles in your CSS file (see example).
4. Full documentation below.

Demo is here <a href="http://lavmax.github.com/MUX.Dialog">http://lavmax.github.com/MUX.Dialog</a>

![Screenshot](http://lavmax.github.com/MUX.Dialog/dialog.png)


How to Use
----------

The best description is an example.

	// Creating a simplest loader
	var loader = new MUX.Loader.Bar();
	loader.start(); // Starts and shows the loader
	loader.stop(); // Stops and hides the loader
	
	// You can also use start() and stop() for html element
	$('my-loaders-id').start();
	$('my-loaders-id').stop();
	
	// You can get loader's element using $
	$(loader).inject(document.body);
	// is the same as
	loader.elem.inject(document.body);
	

Documentation
-------------

For full documentation see [Docs/MUX.Loaders.md](https://github.com/lavmax/MUX.Loaders/blob/master/Docs/MUX.Loaders.md).


/* 
 * MUX.Window
 * version: 0.1
 * author: Max Lavrov (lavmax@gmail.com)

1. Nice from the box.
2. Fully functional. That means that keyboard events, drag, sizing, elastic and fixed size etc. functions are done and you shouldn't worry about it.
3. Well documented.
4. Lightweight. You don't need to attach heavy library or framework just to show nice message or form.
5. Transparent and compact API.
6. Stylable with CSS. There are almost no element styles in the code, you can change the view modifying/overriding CSS file.
*/

Inspired by Mootools and MochaUI.

API

PROTOTYPE PROPERTIES
zIndex (int, defaults to 10000);

OPTIONS
+ title: Types - string, boolean. Default - true. String with window header title. False - don't show window header. True - means that header is visible but empty. Empty string results that header is hidden.
+ modal: (boolean). Default - true. Defines if window is modal or not.
+ resizable: (boolean). Default - false. Defines if window can be manually resized by user. Window can be resized by pulling the right-bottom corner. IMPORTANT! By default window is elastic that means that it changes its size depends on content size and in this case it is not resizable. Setting resizable to true changes window into non-elastic mode, so content should be elastic and adjust to the wrapper (window) size, so when user will resize the window content should properly resize itself. You should remember this when designing content's styles.
+ closable: (boolean). Default - true. Defines if window can be closed with default header cross and Esc or not.
+ defaultButton: (int, null). Defaults to null, optional. Index/id of the default button. Id should be used for buttons with id, for other - zero-based index from left to right. You can't use index for buttons with id. Defining this property sets keydown event listener for content element of the window that catches enter pressed and fires buttons click event.
+ autoOpen: (boolean). Default - true. Defines if window is opened after creation, otherwise use method open() of created object.
+ showHeader: (boolean, 'invisible'). Default - true. Show/hide window's header. 'invisible' means that header will have the same background as a window and will not be visible by itself but Close button (if applicable) will be visible.
+ showFooter: (boolean, 'auto'). Default - 'auto'. Show/hide window's footer. If 'auto' footer is displayed if there is at least one button.
+ loader: ('none', 'manual', 'auto, defaults to 'auto). Manages ajax-loader animated icon near buttons. It users MUX.Loader.XXX classes. If these classes are not loaders this option will be ignored. If 'none' - no loader is available. If 'manual' loader will be available and you should start and stop it in your code using this.loader.start() and this.loader.stop(). If 'auto' it plays with onSubmit event, starts animation when event fired and stops when dialog is closed. If submition failed (e.g. didn't pass validation) and you don't need to close dialog you should stop animation manually using this.loader.stop().
+ size: { (object). Internal content size without header, footer and content padding. Int values work for both resizable and non resizable window modes, but in most cases have sense only for resizable windows. For non resizable window just omit this option or set values to 'auto'.
	+ x: (int). Defines initial width of the window in pixels.
	+ y: (int). Defines initial height of the window in pixels.
}
+ position: { (object)
	left: (int, 'center'). Default - 'center'. Defines initial left coordinate of the window. Defines initial left coordinate of the window. 'center' means that center of the window will be in the center of browser's window.
	top: (int, 'auto', 'center'). Default - 'auto'. Defines initial top coordinate of the window. 'auto' - calculated that window appears in the top third of browser's window. 'center' means that center of the window will be in the center of browser's window.
}
+ content: (element, string). Default - none. Element will be placed in the content element of the window. String is treated like an URL for getting html by Request.HTML.
+ buttons: [ (array of objects). Buttons array with objects discribes buttons. Buttons are placed from left to right.
	{
		+ title: (string, required). Button sign.
		+ style: ('ellipse', 'rectangle', 'link', 'native', 'auto'). Default - 'auto'. 'auto' means that object defines user's OS and for MS Windows users shows rectangle buttons, for others (Mac OS, Linux etc.) - ellipse. 'link' means that button looks like a link without background and borders but has the same height as other buttons to look good in footer. CSS styles are NOT acceptable in this property. See MUX.Button class for more info about buttons.
		+ click: (function, 'close', 'submit'). Default - none. Function that is fired on button click. 'close' fires standart close() function of the window. 'submit' fires onSubmit dialog's event.
	}, ...],

INSTANCE PROPERTIES
+ box
+ header
+ content
+ footer
+ loader
+ buttons

INSTANCE METHODS
+ open()
+ close(delay)
+ position()
+ moveToTop()

INSTANCE EVENTS
+ onOpen - on open fires when content is loaded if ajax. Content is already injectec to the window but still invisible. Window will position after firing the event.
+ onClose - do some common things on close. This is better way, than writting in button Close handler, because user can click built-in window close button or press Esc.
+ onSubmit - this event helps to keep your code more structured. You can also use functions as click handlers for buttons.

[TODO] Documentation.


[TODO] For ajax content show loader in empty window for slow connections
[TODO] Pressing Tab at last button should move focus at first input of the content or first button in buttonset (now move away from window). See jQuery UI.
[TODO] Sometimes it is possible to select dummy space in the header.

[TODO] New UI essentioal classes
[TODO] - Notification
[TODO] - Tooltip (may be common class with Notification)
[TODO] ? Input widh icon

*/

