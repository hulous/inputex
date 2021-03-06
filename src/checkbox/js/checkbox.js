/**
 * @module inputex-checkbox
 */
var inputEx = Y.inputEx;

/**
 * Create a checkbox.
 * @class inputEx.CheckBox
 * @extends inputEx.Field
 * @constructor
 * @param {Object} options Added options for CheckBoxes:
 * <ul>
 *   <li>sentValues: 2D vector of values for checked/unchecked states (default is [true, false])</li>
 * </ul>
 */
inputEx.CheckBox = function(options) {
   inputEx.CheckBox.superclass.constructor.call(this,options);
};
   
Y.extend(inputEx.CheckBox, inputEx.Field, {
   
   /**
    * Adds the CheckBox specific options
    * @method setOptions
    * @param {Object} options Options object as passed to the constructor
    */
   setOptions: function(options) {
      inputEx.CheckBox.superclass.setOptions.call(this, options);
      
      // Overwrite options:
      this.options.className = options.className ? options.className : 'inputEx-Field inputEx-CheckBox';
      
      this.options.rightLabel = options.rightLabel || '';
      
      // Added options
      this.sentValues = options.sentValues || [true, false];
      this.options.sentValues = this.sentValues; // for compatibility
      this.checkedValue = this.sentValues[0];
      this.uncheckedValue = this.sentValues[1];
   },
   
   /**
    * Render the checkbox and the hidden field
    * @method renderComponent
    */
   renderComponent: function() {
   
      var checkBoxId = this.divEl.id ? this.divEl.id+'-field' : Y.guid();
      this.el = inputEx.cn('input', { id: checkBoxId, type: 'checkbox', className: 'inputEx-CheckBox-checkbox' });

      this.fieldContainer.appendChild(this.el);
   
      this.rightLabelEl = inputEx.cn('label', {"for": checkBoxId, className: 'inputEx-CheckBox-rightLabel'}, null, this.options.rightLabel);
      this.fieldContainer.appendChild(this.rightLabelEl);
   
      // Keep state of checkbox in a hidden field (format : this.checkedValue or this.uncheckedValue)
      // This is useful for non-javascript form submit (it allows custom checked/unchecked values to be submitted)
      this.hiddenEl = inputEx.cn('input', {type: 'hidden', name: this.options.name || '', value: this.uncheckedValue});
      this.fieldContainer.appendChild(this.hiddenEl);
   },
      
   /**
    * Clear the previous events and listen for the "change" event
    * @method initEvents
    */
   initEvents: function() {
      
      // Awful Hack to work in IE8 and below: the "change" event is only fired when focus is lost
      // and not immediately... so we listen for "click" instead, and setTimeout to give time for
      // the input to reflect the new value (changed after the firing of the "click" event!).
      if (Y.UA.ie && Y.UA.ie < 9) {
         Y.one(this.el).on("click", function (e) { Y.later(10, this, function () { this.onChange(e); }); }, this);
      } else {
        Y.one(this.el).on("change", this.onChange, this, true);
      }
      
      Y.one(this.el).on("focus", this.onFocus, this, true);
      Y.one(this.el).on("blur", this.onBlur, this, true);
   },
      
   /**
    * Function called when the checkbox is toggled
    * @method onChange
    * @param {Event} e The original 'change' event
    */
   onChange: function (e) {
      
      this.hiddenEl.value = this.el.checked ? this.checkedValue : this.uncheckedValue;
   
      // will fire the updated event
      inputEx.CheckBox.superclass.onChange.call(this, e);

      // trick: usually class is set on blur, but when clicking a checkbox the input won't
      //        gain focus so no blur event will ever be fired... so do it on change (blur
      //        event is still fired if focusing the input via keyboard's tab)
      this.setClassFromState();
   },
   
   /**
    * Get the state value
    * @method getValue
    * @return {Any} one of [checkedValue,uncheckedValue]
    */
   getValue: function() {
      return this.el.checked ? this.checkedValue : this.uncheckedValue;
   },
   
   // checkbox is considered "empty" when not checked, this way the "required"
   // option will be equivalent to enforcing the checking of the box.
   isEmpty: function () {
      return !this.el.checked;
   },

   /**
    * Set the value of the checkedbox
    * @method setValue
    * @param {Any} value The value schould be one of [checkedValue,uncheckedValue]
    * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the
    *                  'updated' event or not (default is true, pass false to NOT send the event)
    */
   setValue: function(value, sendUpdatedEvt) {

      if (
            value === this.checkedValue ||
            (
               typeof(value) === 'string' &&
               typeof(this.checkedValue) === 'boolean' &&
               value === String(this.checkedValue)
            )
         ) {

         this.hiddenEl.value = this.checkedValue;
         
         // check checkbox (all browsers)
         this.el.checked = true;
         
         // hacks for IE6, because input is not operational at init,
         // so "this.el.checked = true" would work for default values !
         // (but still work for later setValue calls)
         if (Y.UA.ie === 6) {
            this.el.setAttribute("defaultChecked","checked"); // for IE6
         }
      }
      else {
         // DEBUG :
         /*if (value!==this.uncheckedValue && lang.isObject(console) && lang.isFunction(console.log) ) {
            console.log("inputEx.CheckBox: value is *"+value+"*, schould be in ["+this.checkedValue+","+this.uncheckedValue+"]");
         }*/
         this.hiddenEl.value = this.uncheckedValue;
         
         // uncheck checkbox (all browsers)
         this.el.checked = false;
         
         // hacks for IE6, because input is not operational at init,
         // so "this.el.checked = false" would work for default values !
         // (but still work for later setValue calls)
         if (Y.UA.ie === 6) {
            this.el.removeAttribute("defaultChecked"); // for IE6
         }
      }
      
      // Call Field.setValue to set class and fire updated event
      inputEx.CheckBox.superclass.setValue.call(this,value, sendUpdatedEvt);
   },
   
   /**
    * Disable the field
    * @method disable
    */
   disable: function() {
      this.el.disabled = true;
      return inputEx.CheckBox.superclass.disable.call(this);
   },

   /**
    * Enable the field
    * @method enable
    */
   enable: function() {
      this.el.disabled = false;
      return inputEx.CheckBox.superclass.enable.call(this);
   }
   
});

// Register this class as "boolean" type
inputEx.registerType("boolean", inputEx.CheckBox, [
   {type: 'string', label: 'Right Label', name: 'rightLabel'}
]);
