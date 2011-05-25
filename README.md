MUX.Dialog
==========

Lightweight, beautiful and clean Mootools plugin to show dialogs on your sites and web-apps. Inspired by Mootools and MochaUI.

1. Rich functionality, which means that it supports keyboard events, dragging, sizing, elastic and fixed size modes etc.
2. Clean and simple API to customize your dialogs.
3. Set styles with CSS, which means that you can overwrite almost all styles in your CSS files (see example).
4. Events to add your code into dialog's behavior.
5. Work from the box with [MUX.Loaders](https://github.com/lavmax/MUX.Loaders) but doesn't require if you don't need them.
6. Full documentation below.

![Screenshot](http://lavmax.github.com/MUX.Dialog/dialog.png)


How to Use
----------

Simple alert

	new MUX.Dialog({
		title: 'Alert!',
		content: new Element('p', {html: 'Beware, this is an alert!'}),
		buttons: [{
			title: 'OK',
			click: 'close'
		}]
	});

More examples of dialogs and code see here <http://lavmax.github.com/MUX.Dialog>

MUX.Dialog Docs
---------------

### Implements

[Events](http://mootools.net/docs/core/Class/Class.Extras#Events), [Options](http://mootools.net/docs/core/Class/Class.Extras#Options)

### Prototype properties
**zIndex** - (`int`, defaults to `10000`) Defines start zIndex property for all dialog's HTML element. It's recommended to set dialog's zIndex as the largest for your project. Example `MUX.Dialog.prototype.zIndex = 100000;`. 

### Syntax

	var dialog = new MUX.Dialog([options]);

### Options

**title** - (`string`) Header's title text.  
**modal** - (`boolean`, defaults to `true`) Turn on/off modal mode.  
**resizable** - (`boolean`, defaults to `false`) If dialog can be manually resized by user. The dialog can be resized by dragging the right-bottom corner. Non-resizable mode means that it changes its size depends on content and is not resizable manually. `true` turns dialog into non-elastic mode, so content should be elastic and adjust to the dialog size, so when user will resize the window content should properly resize itself.  
**closable** - (`boolean`, defaults to `true`) If the dialog can be closed by default close button in the header and by Esc or not.  
**autoOpen** - (`boolean`, defaults to `true`) Setting to `true` opens the dialog right after creation, otherwise use `open()` of created object.  
**showHeader** - (`boolean` or `'invisible'`, defaults to `true`) Show/hide dialog's header. 'invisible' mode means that header will have the same background as a window and will not be visible by itself. The `Close` button (if applicable) will be visible.  
**showFooter** - (`boolean` or `'auto'`, defaults to `'auto'`) Show/hide dialogs's footer. If `'auto'` footer is displayed if there is at least one button defined in options.  
**size** - (`object`) Internal content size without header, footer and content padding. Possible keys are:  

- **x** - (`int`) Initial width in pixels.  
- **y** - (`int`) Initial height in pixels.  

**position** - (`object`) Initial position of the dialog. Possible keys are:

- **left** - (`int` or `'center'`, defaults to `'center'`) Left coordinate in pixels. If `'center'` dialog will be at the center of  browser's window horizontally.
- **top** - (`int` or `'center'` or `'auto'`, defaults to `'auto'`) Top coordinate in pixels. If `'center'` dialog will be at the center of browser's window vertically. If `'auto'` places dialog 100 pixels from the top or at the center of browser's window - what is higher.

**content** - (`element` or `string`) Element will be placed in the content element. String is treated like an URL for getting HTML by `Request.HTML`.  
**buttons** - (`array` of objects) Buttons are placed from left to right. Each object defines dialog button and can have keys:

- **title** (`string`) Button text.
- **click** - (function or `'close'` or `'submit'`) Function that is fired on button click. 'close' fires dialog's `close()` method. 'submit' fires dialog's `submit` event.
- **style** - (`'ellipse'` or `'rectangle'` or `'native'` or `'link'` or `'auto'`, defaults to `'auto'`). Button look. CSS styles are NOT acceptable in this property. 'auto' means that button style will depend on user's OS and browser. 'link' means that button looks like a link, just text without background and borders. For more information see `MUX.Button` class below.

**defaultButton** - (`int` or `undefined`, defaults to `undefined`) Index (from left to right) of the default dialog's button. Defining this property sets `keydown` event listener for the content element that catches `Enter` pressed and fires button click event.  
**loader** - (`'none'` or `'manual'` or `'auto'`, defaults to `'auto'`). Adds AJAX animation icon near buttons. It users [MUX.Loader.XXX](https://github.com/lavmax/MUX.Loaders) classes. If these classes are not attached this option will be ignored. If `'none'` - no loader is available. If `'manual'` loader will be available and you should start and stop it from code. If `'auto'` it plays with `onSubmit` event, starts animation when event fired and stops when dialog is closing. If submission failed (e.g. didn't pass validation) and you don't need to close dialog you should stop animation manually. For more information see MUX.Loaders documentation.

### Instance Properties
**box** - (`element`) General dialog element without modal overlay.  
**header** - (`element`) Header element.  
**content** - (`element`) Content element.  
**footer** - (`element`) Footer element.  
**loader** - (`MUX.Loader.XXX` or `undefined`) Loader object if `MUX.Loaders` library is attached and `loader` option is set to `manual` or `auto`. Otherwise `undefined`.  
**buttons** - (`array` of `MUX.Button` objects) Dialog buttons from left to right.

### Instance Methods
**open()** - Opens dialog if it was closed or created with `autoOpen` set to `false`. Returns dialog instance.  
**close([delay])** - Close dialog and destroys elements. Parameter sets close delay in ms and in if is set the dialog is close with fading. You can use `close(1)` to close with fading without delay.  
**position()**  - Position dialog onto initial coordinates according to options. Returns dialog instance.  
**moveToTop()** - Moves dialog to the top of other dialogs. Returns dialog instance.  

### Instance Events
**open** - (option `onOpen`) Fires when content is loaded (if ajax) and placed, the dialog is open but still invisible. Dialog will position after firing the event.  
**close** - (option `onClose`) On close dialog. This is the right place to write some common things to execute on close.  
**submit** - (option `onSubmit`) This event fires on click buttons with `'submit'` value for `'click'` option and helps to keep your code more structured. 

MUX.Button Docs
---------------
MUX.Button is a separate class that is used in MUX.Dialog but could be also uses by itself if you like it.

### Implements

[Options](http://mootools.net/docs/core/Class/Class.Extras#Options)

### Syntax

	var button = new MUX.Button([options]);

### Options

**title** - (`string`) Button text.  
**click** - (`function`) Function that is fired on button click.  
**style** - (`'ellipse'` or `'rectangle'` or `'native'` or `'auto'` or `'link'`, defaults to `'auto'`) Button look style. `'ellipse'` means rounded buttons, `'rectangle'` means rectangle button with a little bit rounded corners, `'native'` means native button look, which depends on browser and OS, `'link'` means that button looks like a link (text with underline on hover), `'auto'` means that button look will be detected automatically depends on browser and OS.  
**context** - (`object`) `click` function will fire in context of given object and `this` will point to it. If `undefined` or `null` `this` will point to button element.   
