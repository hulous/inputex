YUI.add('inputex-color', function (Y, NAME) {

/**
 * @module inputex-color
 */
   var inputEx = Y.inputEx,
       lang = Y.Lang;
	
/**
 * Create a Color picker input field
 * @class inputEx.ColorField
 * @extends inputEx.Field
 * @constructor
 * @param {Object} options Added options for ColorField :
 * <ul>
 *   <li>colors: list of colors to load as palette</li>
 *   <li>palette: default palette to be used (if colors option not provided)</li>
 *   <li>cellPerLine: how many colored cells in a row on the palette</li>
 *   <li>ratio: screen-like ratio to display the palette, syntax: [with,height], default: [16,9] (if cellPerLine not provided)</li>
 *   <li>zIndex: zIndex of the overlay</li>
 * </ul>
 */
inputEx.ColorField = function(options) {
	inputEx.ColorField.superclass.constructor.call(this,options);
};
Y.extend(inputEx.ColorField, inputEx.Field, {
   
	/**
	 * Adds the 'inputEx-ColorField' default className
	 * @method setOptions
	 * @param {Object} options Options object as passed to the constructor
	 */
   setOptions: function(options) {
   	inputEx.ColorField.superclass.setOptions.call(this, options);
   	
   	// Overwrite options
   	this.options.className = options.className ? options.className : 'inputEx-Field inputEx-ColorField';
      this.options.zIndex = options.zIndex || 4;
   	
   	// Added options
   	this.options.palette = options.palette;
   	this.options.colors = options.colors;
   	
   	if (options.ratio) { this.options.ratio = options.ratio;}
   	if (options.cellPerLine) { this.options.cellPerLine = options.cellPerLine;}
   },
   
   /**
    * @method renderOverlay
    */
   renderOverlay: function() {
      
	   // Create overlay
      this.oOverlay = new Y.Overlay({
         visible:false,
         zIndex: this.options.zIndex
      });
      this.oOverlay.render(this.fieldContainer);
      
      this.oOverlay.on('visibleChange', function (e) {

         if (e.newVal) { // show
            // align
            this.oOverlay.set("align", {node:this.button,  points:[Y.WidgetPositionAlign.TL, Y.WidgetPositionAlign.BL]});

            // Activate outside event handler
            this.outsideHandler = this.oOverlay.get('boundingBox').on('mousedownoutside', function (e) {
               this.oOverlay.hide();
            }, this);
         }
         else { // hide
            this.outsideHandler.detach();
         }

      }, this);
   },

   /**
    * @method _toggleOverlay
    * @private
    */
   _toggleOverlay: function(e) {
       // PreventDefault to prevent submit in a form
       e.preventDefault();

       // palette may not have been rendered yet
       this.renderPalette();

       this.oOverlay[this.oOverlay.get('visible') ? 'hide' : 'show']();
   },

	/**
	 * Render the color button and the colorpicker popup
	 * @method renderComponent
	 */
	renderComponent: function() {
	   
	   // A hidden input field to store the color code 
	   this.el = inputEx.cn('input', {
	      type: 'hidden', 
	      name: this.options.name || '', 
	      value: this.options.value || '#FFFFFF' });
	   	   
	   // Create a colored area
	   this.colorEl = inputEx.cn('div', {className: 'inputEx-ColorField-colorArea'}, {backgroundColor: this.el.value});
	
      // This element wraps the input node in a float: none div
      this.wrapEl = inputEx.cn('div', {className: 'inputEx-ColorField-Wrapper'});
	   this.wrapEl.appendChild(this.el);
	   this.wrapEl.appendChild(this.colorEl);

      
      // Create button
      // this.button = Y.Node.create("<button>&nbsp;</button>").addClass("inputEx-ColorField-button");
      this.button = Y.Node.create('<span class="inputEx-ColorField-ButtonWrapper"><span class="first-child"><button type="button" class="inputEx-ColorField-Button"></button></span></span>');
      this.button.appendTo(this.wrapEl);

      
      // toggle Menu when clicking on the button
      this.button.on('click',this._toggleOverlay, this, true);
      
      // toggle Menu when clicking on colorEl
      Y.one(this.colorEl).on('click',this._toggleOverlay,this,true);
      
	   // Elements are bound to divEl
      this.fieldContainer.appendChild(this.wrapEl);
	},
	
	/**
	 * @method renderPalette
	 */
	renderPalette: function() {
      
      if(!this.oOverlay) {
         this.renderOverlay();
      }
      
      // render once !
      if (this.paletteRendered) { return; }
      
      var defaultPalette, overlayBody;

      // set default palette to be used
      defaultPalette = this.options.palette || 1;

      // set colors available
      this.colors = this.options.colors || this.setDefaultColors(defaultPalette);
      this.length = this.colors.length;

      // set PopUp size ratio (default 16/9 ratio)
      this.ratio = this.options.ratio || [16,9];

      // set color grid dimensions
      this.cellPerLine = this.options.cellPerLine || Math.ceil(Math.sqrt(this.length*this.ratio[0]/this.ratio[1]));
      this.cellPerColumn = Math.ceil(this.length/this.cellPerLine);

      // Render the color grid
      this.colorGrid = this.renderColorGrid();
      this.oOverlay.set('bodyContent', this.colorGrid);

      this.paletteRendered = true;
      
      // Select the square in the created palette from the value
      // This must be done after "this.paletteRendered = true".
      this.markSelectedColor();
	},
	
	/**
	 * Set the colors to set in the picker 
	 * @method setDefaultColors
	 * @param {int} index Index of the palette to use
	 * @return {Array} List of colors to choose from
	 */
	setDefaultColors: function(index) {
		return inputEx.ColorField.palettes[index-1];
	},
	      
	/**
	 * This creates a color grid
	 * @method renderColorGrid
	 */
	renderColorGrid: function() {
	   
	   var grid, square, i;
	   
	   // remember squares
	   this.squares = [];
	
	   // container
	   grid = inputEx.cn('div', {className: 'inputEx-ColorField-Grid'});
	   	   
	   for(i = 0 ; i < this.length ; i++) {
	      
	      square = inputEx.cn('div', {className: 'inputEx-ColorField-square'},{backgroundColor: this.colors[i] });
	   	grid.appendChild(square);
			
	   	this.squares.push(square);
	   	
	   	// <br clear='both'/> insertion to end a line
	   	// ( + always after the last colored square)
	   	if (i%this.cellPerLine === this.cellPerLine-1 || i === this.length-1) {
            grid.appendChild(inputEx.cn('br',{clear:'both'}));
         }
      }
      
      var colorGrid = Y.one(grid);
      
      // click event delegation
      colorGrid.delegate("click",Y.bind(this.onColorClick,this),"div.inputEx-ColorField-square");
        
	   return colorGrid;
	},
	   
	/**
	 * Handle a color selection
	 * @method onColorClick
	 * @param {Event} e The original click event
	 */
	onColorClick: function(e,square,container) {
		
		// Stop the event to prevent a selection
		e.halt();
	   
	   // Overlay closure
      this.oOverlay.hide();
       
	   // SetValue
		var color = e.currentTarget.getStyle('backgroundColor');
		var hexaColor = inputEx.ColorField.ensureHexa(color);
		
	   this.setValue(hexaColor);
	},
	
	/**
	 * Set the value
	 * @method setValue
	 * @param {String} value Color to set
	 * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the 'updated' event or not (default is true, pass false to NOT send the event)
	 */
	setValue: function(value, sendUpdatedEvt) {
		
	   this.el.value = value;
	
		this.markSelectedColor(value);

		// Call Field.setValue to set class and fire updated event
		inputEx.ColorField.superclass.setValue.call(this,value, sendUpdatedEvt);
	},
	   
	/**
	 * Return the color value
	 * @method getValue
	 * @return {String} Color value
	 */
	getValue: function() {
	   return this.el.value;
	},
	
	/**
	 * Call overlay when field is removed
	 * @method close
	 */
	close: function() {
      if (this.oOverlay) {
         this.oOverlay.hide();
      }
	},
	
	/**
    * Purge all event listeners and remove the component from the dom
    * @method destroy
    */
   destroy: function() {
      
      // colorEl listener
      //Event.purgeElement(this.colorEl);
      
      // remove squares' mousedown listener(s)
      if (this.colorGrid) {
         //Event.purgeElement(this.colorGrid,true);
      }
      
      inputEx.ColorField.superclass.destroy.call(this);
      
   },

   /**
    * @method markSelectedColor
    */
	markSelectedColor: function(value) {
		
		var i;
		
		value = value || this.getValue();
		
		// mark the colored square in the palette as 'selected'
		if (!!value && this.paletteRendered) {
			
			value = value.toLowerCase(); // normalize case for following test
			
			for (i=0; i<this.length; i++) {
				
				// test color in lower case
				if (this.colors[i].toLowerCase() === value) {
					Y.one(this.squares[i]).addClass('selected');
				} else {
					Y.one(this.squares[i]).removeClass('selected');
				}
				
			}
			
		}
		
		// set background color on colorEl
		Y.one(this.colorEl).setStyle('backgroundColor', this.el.value);
		
	}
	  
}); 
	
/**
 * Default palettes
 * @property palettes
 */
inputEx.ColorField.palettes = [
   ["#FFEA99","#FFFF66","#FFCC99","#FFCAB2","#FF99AD","#FFD6FF","#FF6666","#E8EEF7","#ADC2FF","#ADADFF","#CCFFFF","#D6EAAD","#B5EDBC","#CCFF99"],
   ["#DEDFDE","#FFFF6B","#EFCB7B","#FFBE94","#FFB6B5","#A5E3FF","#A5CBFF","#99ABEF","#EFB2E7","#FF9AAD","#94E7C6","#A5FFD6","#CEFFA5","#E7EF9C","#FFE38C"],
   ["#000000","#993300","#333300","#003300","#003366","#000080","#333399","#333333","#800000","#FF6600","#808000","#008000","#008080","#0000FF","#666699","#808080","#FF0000","#FF9900","#99CC00","#339966","#33CCCC","#3366FF","#800080","#969696","#FF00FF","#FFCC00","#FFFF00","#00FF00","#00FFFF","#00CCFF","#993366","#C0C0C0","#FF99CC","#FFCC99","#FFFF99","#CCFFCC","#CCFFFF","#99CCFF","#CC99FF","#F0F0F0"],
   ["#FFFFCC","#FFFF99","#CCFFCC","#CCFF66","#99FFCC","#CCFFFF","#66CCCC","#CCCCFF","#99CCFF","#9999FF","#6666CC","#9966CC","#CC99FF","#FFCCFF","#FF99FF","#CC66CC","#FFCCCC","#FF99CC","#FFCCCC","#CC6699","#FF9999","#FF9966","#FFCC99","#FFFFCC","#FFCC66","#FFFF99","#CCCC66"],
   ["#D0D0D0","#31A8FA","#8EC1E5","#58D7CF","#89E2BB","#A7F7F8","#F6B77C","#FE993F","#FE6440","#F56572","#FA9AA3","#F7B1CA","#E584AF","#D1C3EF","#AB77B8","#C69FE7","#90D28A","#C2F175","#EDEA9A","#F3DF70","#F8D1AE","#F98064","#F54F5E","#EC9099","#F0B5BA","#EDA0BB","#D375AC","#BC8DBE","#8C77B8"],
   // idem in pastel tone (colors above with opacity 0.6 on white background)
   ["#EEEEEE","#84CBFC","#BCDAF0","#9BE7E3","#B9EED7","#CBFBFB","#FAD4B1","#FFC28C","#FFA28D","#F9A3AB","#FCC3C8","#FBD1E0","#F0B6CF","#E4DBF6","#CDAED5","#DDC6F1","#BDE4B9","#DBF7AD","#F5F3C3","#F8ECAA","#FBE4CF","#FCB3A2","#F9969F","#F4BDC2","#F6D3D6","#F5C6D7","#E5ADCE","#D7BBD8","#BAAED5"]
];	

//  -> ensure color has hexadecimal format like "#FF8E00"
inputEx.ColorField.ensureHexa = function (color) {
   var rgb, hexaColor;
   
   // remove spaces
   color = color.replace(/\s/g, "");
   
   // Firefox, Safari
   //   -> format "rgb(255,143,28)"
   if (!!color.match(/^rgb\((?:\d{1,3},){2}\d{1,3}\)$/)) {
      
	   // Convert integer (int or string) to hexadecimal (2 chars)
	   //   ex: "214" -> "d6"
      var DecToHex = function(dec) {
         var r = parseInt(dec,10).toString(16);
         if (r.length == 1) { r = "0" + r; }
         return r;
      };
   
      rgb = color.split(/([(,)])/);
      hexaColor = '#'+DecToHex(rgb[2])+DecToHex(rgb[4])+DecToHex(rgb[6]);
   
   // IE, Opera
   //   -> format "#FE6D34"
   } else if (!!color.match(/^#[\da-fA-F]{6}$/)) {
      hexaColor = color;
      
   } else {
      // defaults to white if invalid color
      hexaColor = "#FFFFFF";
   }
   
   return hexaColor;
};

// Register this class as "color" type
inputEx.registerType("color", inputEx.ColorField, []);


}, '@VERSION@', {
    "requires": [
        "inputex-field",
        "node-event-delegate",
        "event-outside",
        "overlay"
    ],
    "skinnable": true,
    "ix_provides": "color"
});
