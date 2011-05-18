// Element method to set date time in 'time ago' format to inner text and update it periodically
Element.implement({
	muxTimeago: function(emptyValue, autoUpdate)
	{
		if (!this.hasAttribute('timestamp'))
			return this;
		
		var timestamp = this.get('timestamp');
		if (timestamp)
		{
			autoUpdate = !(autoUpdate === false);
			var date = new Date(timestamp);
			
			this.set('text', date.timeDiffInWords());
			
			// If element has no title put date into title to have full date like a tooltip
			if (!this.get('title'))
				this.set('title', date.toString())
			
			// If element is in DOM repeat again
			if (autoUpdate && this.getParent('body'))
			{
				var interval = 0;
				var minutesDiff = (new Date() - date)/1000/60;
				if (minutesDiff < 46) 
					interval = 60000;
				else if (minutesDiff < 60) 
					interval = 30 * 60000;
				
				if (interval)
					this.timeago.delay(interval, this, [emptyValue, autoUpdate]);
			}
		}
		else
			this.set('text', emptyValue);

		return this;
	}
});

// Implement MUX Slider
Element.Properties.muxSlider = {

	set: function(options){
		this.get('muxSlider').cancel().setOptions(options);
		return this;
	},

	get: function(){
		var slider = this.retrieve('muxSlider');
		if (!slider) {
			slider = new Fx.Tween(null, {
				link: 'chain',
				duration: 'short',
				onChainComplete: function()
				{
					// remove styles after fold out
					var wrapper = this.element;
					if ((wrapper.hasClass('vertical') && wrapper.offsetHeight) || (wrapper.hasClass('horizontal') && wrapper.offsetWidth))
					{
						wrapper.style.overflow = null;
						wrapper.style.height = null;
						wrapper.style.opacity = null;
					}
				}
			});
			this.store('muxSlider', slider);
		}
		return slider;
	}

};

Element.implement({
	muxSlide: function(inOut, options)
	{
		var slider = this.get('muxSlider');

		options = options || {};
		slider.setOptions(options);
		
		// Get wrapper element
		if (!slider.element || options.wrapper)
		{
			var wrapper = options.wrapper || 'mux-slider-wrapper';
			if (typeof wrapper === 'string')
				slider.element = this.getParent('.' + wrapper);
			else
				slider.element = options.wrapper;
		}
		
		if (!slider.element)
			return this;
		
		// Detect slide dimension
		if (slider.element.hasClass('horizontal'))
		{
			var dimension = 'width';
		}
		else // Default dimension is height
		{
			slider.element.addClass('vertical');
			var dimension = 'height';
		}
		
		// Set overflow that will be reset when animation complete
		slider.element.style.overflow = 'hidden';
		
		// Define target animation size
		if (inOut === 'out' || inOut === 'hide')
			var size = 0;
		else if (dimension === 'width')
			var size = this.getSize().x + this.getStyle('margin-left').toInt() + this.getStyle('margin-right').toInt();
		else
			var size = this.getSize().y + this.getStyle('margin-top').toInt() + this.getStyle('margin-bottom').toInt();
		
		// Start animation
		if (inOut === 'in' || inOut === 'out')
 			slider.start(dimension, size);
 		else if (inOut === 'show' || inOut === 'hide')
 			slider.set(dimension, size);
		else if (inOut === 'toggle')
		{
			var flag = this.retrieve('muxSlide:flag', slider.element.getStyle(dimension).toInt() == 0);
			slider.start(dimension, flag ? size : 0);
			this.store('muxSlide:flag', !flag);
		}
		
		// Delete toggle flag if not toggle
		if (inOut !== 'toggle')
			this.eliminate('muxSlide:flag');
		
	 	return this;
	}
});

// Adding crossbrowser afterpaste event handler
$.extend(Element.NativeEvents, {
	'paste': 2, 'input': 2
});

Element.Events.afterpaste = {
	base: (Browser.opera || (Browser.firefox && Browser.version < 3)) ? 'input': 'paste',
	condition: function(event) {
		this.fireEvent('afterpaste', event, 1);
		return false;
	}
};

