YUI.add('inputex', function (Y, NAME) {

/**
 * The inputEx Library
 * @module inputex
 */
  var lang = Y.Lang;
  /**
   * The inputEx method lets you create a field from the JSON definition:
   * <pre>
   *    Y.inputEx({type: 'string', name: 'company', label: 'Your company' })
   * </pre>
   * Build a field from an object like: { type: 'color' or fieldClass: inputEx.ColorField, ... }<br />
   * If the neither type or fieldClass are found, it uses inputEx.StringField
   *
   * @class inputEx
   * @method inputEx
   * @static
   * @param {Object} fieldOptions
   * @param {inputEx.Group|inputEx.Form|inputEx.ListField|inputEx.CombineField} (optional) parentField The parent field instance
   * @return {inputEx.Field} Created field instance
   */
  Y.inputEx = function(fieldOptions, parentField) {
     var fieldClass = null,
         inputInstance;

    if(fieldOptions.type) {
       fieldClass = inputEx.getFieldClass(fieldOptions.type);

        if( !Y.Lang.isFunction(fieldClass) ){
           throw new Error("Missing inputEx module for type: '"+fieldOptions.type+"' ?");
        }
    }
    else {
       fieldClass = fieldOptions.fieldClass ? fieldOptions.fieldClass : inputEx.StringField;
    }

     // Instanciate the field
     inputInstance = new fieldClass(fieldOptions);

     // If the parentField argument is provided
     if(parentField) {
        inputInstance.setParentField(parentField);
     }

     // Add the flatten attribute if present in the params
     /*if(fieldOptions.flatten) {
        inputInstance._flatten = true;
     }*/

     return inputInstance;
  };

  var inputEx = Y.inputEx;

  Y.mix(Y.inputEx, {

     VERSION: "4.0.0",

     /**
      * Url to the spacer image. This url schould be changed according to your project directories
      * @property spacerUrl
      * @type String
      */
     spacerUrl: YUI_config.groups.inputex.base+"inputex/assets/skins/sam/images/space.gif", // 1x1 px

     /**
      * Field empty state constant
      * @property stateEmpty
      * @type String
      */
     stateEmpty: 'empty',

     /**
      * Field required state constant
      * @property stateRequired
      * @type String
      */
     stateRequired: 'required',

     /**
      * Field valid state constant
      * @property stateValid
      * @type String
      */
     stateValid: 'valid',

     /**
      * Field invalid state constant
      * @property stateInvalid
      * @type String
      */
     stateInvalid: 'invalid',

     /**
      * Associative array containing field messages => using intl module from YUI
      * @property messages
      */
     messages: null,

     /**
      * inputEx widget namespace
      * @class inputEx.widget
      * @static
      */
     widget: {},

     /**
      * inputEx mixin namespace
      * @class inputEx.mixin
      * @static
      */
     mixin: {},

     /**
      * Associative array containing common regular expressions
      * @property regexps
      */
     regexps: {
        email: /^[a-z0-9!\#\$%&'\*\-\/=\?\+\-\^_`\{\|\}~]+(?:\.[a-z0-9!\#\$%&'\*\-\/=\?\+\-\^_`\{\|\}~]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,6}$/i,
        url: /^(http|https):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(\:[0-9]{1,5})?(([0-9]{1,5})?\/.*)?$/i
     },

     /**
      * Hash between inputEx types and classes (ex: <code>inputEx.typeClasses.color = inputEx.ColorField</code>)<br />
      * Please register the types with the <code>registerType</code> method
      * @property typeClasses
      */
     typeClasses: {},

     /**
      * Property to globally turn on/off the browser autocompletion
      * Possible values: "on", "off"
      * @property browserAutocomplete
      */
     browserAutocomplete: "on",

     /**
      * When you create a new inputEx Field Class, you can register it to give it a simple type.
      * ex:   inputEx.registerType("color", inputEx.ColorField);
      * @method registerType
      * @static
      * @param {String} type String used as the inputEx field type
      * @param {Class} fieldClass Field Class to register as this type
      * @param {Array} groupOptions List of inputEx field description for each option
      * @param {Boolean} dontInherit Won't inherhit the parent field properties if set to true
      */
     registerType: function(type, fieldClass, groupOptions, dontInherit) {
        if(!lang.isString(type)) {
           throw new Error("inputEx.registerType: first argument must be a string");
        }
        if(!lang.isFunction(fieldClass)) {
           throw new Error("inputEx.registerType: second argument must be a function");
        }
        this.typeClasses[type] = fieldClass;

        // Setup the groupOptions property on the class
        var opts = [];
        if(lang.isArray(groupOptions)) { opts = groupOptions; }
        if(fieldClass.superclass && !dontInherit && lang.isArray(fieldClass.superclass.constructor.groupOptions) ) {
           opts = fieldClass.superclass.constructor.groupOptions.concat(opts);
        }
        fieldClass.groupOptions = opts;
     },

     /**
      * Returns the class for the given type
      * ex: inputEx.getFieldClass("color") returns inputEx.ColorField
      * @method getFieldClass
      * @static
      * @param {String} type String type of the field
      */
     getFieldClass: function(type) {
        return lang.isFunction(this.typeClasses[type]) ? this.typeClasses[type] : null;
     },

     /**
      * Get the inputex type for the given class (ex: <code>inputEx.getType(inputEx.ColorField)</code> returns "color")
      * @method getType
      * @static
      * @param {inputEx.Field} FieldClass An inputEx.Field or derivated class
      * @return {String} returns the inputEx type string or <code>null</code>
      */
     getType: function(FieldClass) {
        for(var type in this.typeClasses) {
           if(this.typeClasses.hasOwnProperty(type) ) {
              if(this.typeClasses[type] == FieldClass) {
                 return type;
              }
           }
        }
        return null;
     },


     /**
      * Return recursively the inputex modules from their 'type' property using (modulesByType from loader.js)
      * @method getRawModulesFromDefinition
      * @static
      */
     getRawModulesFromDefinition: function(inputexDef) {

        var type = inputexDef.type || 'string',
            module = YUI_config.groups.inputex.modulesByType[type],
            modules = [module || type],
            //set fields if they exist
            fields = inputexDef.fields ||
            //else see if we have elementType for lists - if neither then we end up with null
            inputexDef.elementType && inputexDef.elementType.fields;


        // recursive for group,forms,list,combine, etc...
        if(fields) {
           Y.Array.each(fields, function(field) {
                modules = modules.concat( this.getModulesFromDefinition(field) );
           }, this);
        }

        // TODO: inplaceedit  editorField

        return modules;
     },

     /**
      * Return unique modules definitions
      * @method getModulesFromDefinition
      * @static
      */
     getModulesFromDefinition: function(inputexDef) {
        var modules = this.getRawModulesFromDefinition(inputexDef);
        return Y.Object.keys(Y.Array.hash(modules));
     },

     /**
      * Load the modules from an inputEx definition
      * @method use
      * @static
      */
     use: function(inputexDef, cb) {
        var defs, modules = [];
        if (!Y.Array.test(inputexDef)){ defs = [inputexDef];}
        else {defs = inputexDef;}

        Y.each(defs, function(def){
            modules = modules.concat( this.getModulesFromDefinition(def));
        },this);
        modules.push(cb);
        Y.use.apply( Y, modules);
     },

     /**
      * Helper function to set DOM node attributes and style attributes.
      * @method sn
      * @static
      * @param {HTMLElement} el The element to set attributes to
      * @param {Object} domAttributes An object containing key/value pairs to set as node attributes (ex: {id: 'myElement', className: 'myCssClass', ...})
      * @param {Object} styleAttributes Same thing for style attributes. Please use camelCase for style attributes (ex: backgroundColor for 'background-color')
      */
     sn: function(el,domAttributes,styleAttributes){
        if(!el) { return; }
        var i;
        if(domAttributes){
           for(i in domAttributes){
              var domAttribute = domAttributes[i];
              if( lang.isFunction(domAttribute) ){
                 continue;
              }
              if(i=="className"){
                 i="class";
                 el.className=domAttribute;
              }
              if(domAttribute!==el.getAttribute(i)){
                 try{
                    if(domAttribute===false){
                       el.removeAttribute(i);
                    }else{
                       el.setAttribute(i,domAttribute);
                    }
                 }
                 catch(err){
                    //console.log("WARNING: WireIt.sn failed for "+el.tagName+", attr "+i+", val "+domAttribute);
                 }
              }
           }
        }

        if(styleAttributes){
           for(i in styleAttributes){
              if( lang.isFunction(styleAttributes[i]) ){
                 continue;
              }
              if(el.style[i]!=styleAttributes[i]){
                 el.style[i]=styleAttributes[i];
              }
           }
        }
     },


     /**
      * Helper function to create a DOM node. (wrapps the document.createElement tag and the inputEx.sn functions)
      * @method cn
      * @static
      * @param {String} tag The tagName to create (ex: 'div', 'a', ...)
      * @param {Object} [domAttributes] see inputEx.sn
      * @param {Object} [styleAttributes] see inputEx.sn
      * @param {String} [innerHTML] The html string to append into the created element
      * @return {HTMLElement} The created node
      */
     cn: function(tag, domAttributes, styleAttributes, innerHTML) {
          if (tag == 'input' && Y.UA.ie && Y.UA.ie < 9) { //only limit to input tag that has no tag body
              var strDom = '<' + tag;
              if (domAttributes!=='undefined'){
                  for (var k in domAttributes){
                      strDom += ' ' + (k === "className" ? "class" : k) + '="' + domAttributes[k] + '"';
                  }
              }
              strDom += '/' + '>';
              return document.createElement(strDom);

          } else {
              var el = document.createElement(tag);
              this.sn(el, domAttributes, styleAttributes);
              if (innerHTML) {
                  el.innerHTML = innerHTML;
              }
              return el;
          }
      },


     /**
      * Find the position of the given element. (This method is not available in IE 6)
      * @method indexOf
      * @static
      * @param {Object} el Value to search
      * @param {Array} arr The array to search
      * @param {Function} (optional) fn A function to define another way to test inclusion of el than === (returns a boolean)
      * @return {number} Element position, -1 if not found
      */
     indexOf: function(el,arr,fn) {

        var l=arr.length,i;

        if ( !lang.isFunction(fn) ) { fn = function(elt,arrElt) { return elt === arrElt; }; }

        for ( i = 0 ;i < l ; i++ ) {
           if ( fn.call({}, el, arr[i]) ) { return i; }
        }

        return -1;
     },

     /**
      * Create a new array without the null or undefined values
      * @method compactArray
      * @static
      * @param {Array} arr The array to compact
      * @return {Array} The new array
      */
     compactArray: function(arr) {
        var n = [], l=arr.length,i;
        for(i = 0 ; i < l ; i++) {
           if( !lang.isNull(arr[i]) && !lang.isUndefined(arr[i]) ) {
              n.push(arr[i]);
           }
        }
        return n;
     },

     /**
      * Return a string without accent (only on lowercase)
      * @method removeAccents
      * @static
      * @param {String} str The string
      * @return {String} String without accent
      */
     removeAccents: function (str) {
         return str.replace(/[ÀÁÂÃĀĂȦẢǍȀȂĄẠḀẦẤẪẨẰẮẴẲǠǞǺẬẶ]/g, 'A').
             replace(/[ÄÅǼǢ]/g, 'AE').
             replace(/[ḂƁḄḆƂƄ]/g, 'B').
             replace(/[ÇĆĈĊČƇḈ]/g, 'C').
             replace(/[ḊƊḌḎḐḒĎĐƉƋ]/g, 'D').
             replace(/[ÉÈÊẼĒĔĖËẺĚȄȆẸȨĘḘḚỀẾỄỂḔḖỆḜƎƐ]/g, 'E').
             replace(/[ḞƑ]/g, 'F').
             replace(/[ǴĜḠĞĠǦƓĢǤ]/g, 'G').
             replace(/[ĤḢḦȞǶḤḨḪĦ]/g, 'H').
             replace(/[ÌÍÎĨĪĬİÏỈǏỊĮȈȊḬƗḮ]/g, 'I').
             replace(/[Ĳ]/g, 'IJ').
             replace(/[Ĵ]/g, 'J').
             replace(/[ḰǨḴƘḲĶ]/g, 'K').
             replace(/[ĹḺḶĻḼĽĿŁḸ]/g, 'L').
             replace(/[ḾṀṂƜ]/g, 'M').
             replace(/[ÑǸŃṄŇŊƝṆŅṊṈȠ]/g, 'N').
             replace(/[ÖÒÓÔÕŌŎȮỎŐǑȌȎƠǪỌƟỒỐỖỔȰȪȬṌṎṐṒỜỚỠỞỢǬỘǾƆ]/g, 'O').
             replace(/[Œ]/g, 'OE').
             replace(/[ṔṖƤ]/g, 'P').
             replace(/[ŔṘŘȐȒṚŖṞṜƦ]/g, 'R').
             replace(/[ŚŜṠŠṢȘŞṤṦṨ]/g, 'S').
             replace(/[ṪŤƬƮṬȚŢṰṮŦ]/g, 'T').
             replace(/[ÜÙÚÛŨŪŬỦŮŰǓȔȖƯỤṲŲṶṴṸṺǛǗǕǙỪỨỮỬỰ]/g, 'U').
             replace(/[ṼṾƲ]/g, 'V').
             replace(/[ẀẂŴẆẄẈ]/g, 'W').
             replace(/[ẊẌ]/g, 'X').
             replace(/[ỲÝŶỸȲẎŸỶƳỴ]/g, 'Y').
             replace(/[ŹẐŻŽȤẒẔƵ]/g, 'Z').
             replace(/[àäåáâãāăȧảǎȁȃąạḁẚầấẫẩằắẵẳǡǟǻậặ]/g, 'a').
             replace(/[ǽǣ]/g, 'ae').
             replace(/[ḃɓḅḇƀƃƅ]/g, 'b').
             replace(/[ćĉċčƈçḉ]/g, 'c').
             replace(/[ḋɗḍḏḑḓďđƌȡ]/g, 'd').
             replace(/[èéêẽēĕėëẻěȅȇẹȩęḙḛềếễểḕḗệḝǝɛ]/g, 'e').
             replace(/[ḟƒ]/g, 'f').
             replace(/[ǵĝḡğġǧɠģǥ]/g, 'g').
             replace(/[ĥḣḧȟƕḥḩḫẖħ]/g, 'h').
             replace(/[ìíîĩīĭıïỉǐịįȉȋḭɨḯ]/g, 'i').
             replace(/[ĳ]/g, 'ij').
             replace(/[ĵǰ]/g, 'j').
             replace(/[ḱǩḵƙḳķ]/g, 'k').
             replace(/[ĺḻḷļḽľŀłƚḹȴ]/g, 'l').
             replace(/[ḿṁṃɯ]/g, 'm').
             replace(/[ñǹńṅňŋɲṇņṋṉŉƞȵ]/g, 'n').
             replace(/[öòóôõōŏȯỏőǒȍȏơǫọɵồốỗổȱȫȭṍṏṑṓờớỡởợǭộǿɔ]/g, 'o').
             replace(/[œ]/g, 'oe').
             replace(/[ṕṗƥ]/g, 'p').
             replace(/[ŕṙřȑȓṛŗṟṝ]/g, 'r').
             replace(/[śŝṡšṣșşṥṧṩſẛ]/g, 's').
             replace(/[ṫẗťƭʈƫṭțţṱṯŧȶ]/g, 't').
             replace(/[ùüúûũūŭủůűǔȕȗưụṳųṷṵṹṻǖǜǘǖǚừứữửự]/g, 'u').
             replace(/[ṽṿ]/g, 'v').
             replace(/[ẁẃŵẇẅẘẉ]/g, 'w').
             replace(/[ẋẍ]/g, 'x').
             replace(/[ỳýŷỹȳẏÿỷẙƴỵ]/g, 'y').
             replace(/[źẑżžȥẓẕƶ]/g, 'z');
     },

     /**
      * String replaced by some html entities
      * @method htmlEntities
      * @static
      * @param {String} str The string
      * @return {String} String replaced by some html entities
      */
     htmlEntities: function (str) {
        return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
     }
  });


}, '@VERSION@', {
    "requires": [
        "intl",
        "node",
        "plugin",
        "pluginhost-base",
        "pluginhost-config",
        "base-pluginhost",
        "node-pluginhost"
    ],
    "skinnable": true
});
