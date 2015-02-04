YUI.add("inputex-string",function(e,t){var n=e.Lang,r=e.inputEx;r.StringField=function(e){r.StringField.superclass.constructor.call(this,e),this.options.typeInvite&&this.updateTypeInvite()},e.extend(r.StringField,r.Field,{setOptions:function(t){r.StringField.superclass.setOptions.call(this,t),this.messages=e.mix(this.messages,e.Intl.get("inputex-string")),this.options.regexp=t.regexp,this.options.size=t.size,this.options.maxLength=t.maxLength,this.options.minLength=t.minLength,this.options.typeInvite=t.typeInvite,this.options.readonly=t.readonly,this.options.autocomplete=n.isUndefined(t.autocomplete)?"default":t.autocomplete,this.options.trim=t.trim===!0?!0:!1},renderComponent:function(){this.wrapEl=r.cn("div",{className:"inputEx-StringField-wrapper"});var t={};t.type="text",t.id=this.divEl.id?this.divEl.id+"-field":e.guid(),this.options.size&&(t.size=this.options.size),this.options.name&&(t.name=this.options.name),this.options.readonly&&(t.readonly="readonly"),this.options.maxLength&&(t.maxLength=this.options.maxLength),this.options.autocomplete!=="default"&&(t.autocomplete=this.options.autocomplete),this.options.required&&(t.required="required",t["aria-required"]=!0),this.el=r.cn("input",t),this.wrapEl.appendChild(this.el),this.fieldContainer.appendChild(this.wrapEl)},setFieldName:function(e){this.el.name=e},initEvents:function(){e.on("change",this.onChange,this.el,this);if(e.UA.ie>0){var t=this.el;e.on("key",function(e){t.blur(),t.focus()},this.el,"down:13",this)}e.on("focus",this.onFocus,this.el,this),e.on("blur",this.onBlur,this.el,this),e.on("keypress",this.onKeyPress,this.el,this),e.on("keyup",this.onKeyUp,this.el,this)},getValue:function(){var e=this.options.typeInvite&&this.el.value==this.options.typeInvite?"":this.el.value;return this.options.trim&&(e=n.trim(e)),e},setValue:function(e,t){this.el.value=n.isNull(e)||n.isUndefined(e)?"":e,r.StringField.superclass.setValue.call(this,e,t)},validate:function(){var e=r.StringField.prototype.getValue.call(this);return r.StringField.superclass.validate.call(this)?!this.options.required&&this.isEmpty()?!0:this.options.regexp&&!e.match(this.options.regexp)?!1:this.options.minLength&&e.length<this.options.minLength?!1:!0:!1},disable:function(){return this.el.disabled=!0,r.StringField.superclass.disable.call(this)},enable:function(){return this.el.disabled=!1,r.StringField.superclass.enable.call(this)},focus:function(){if(!!this.el&&!n.isUndefined(this.el.focus))try{this.el.focus()}catch(e){}},getStateString:function(t){return this.options.minLength&&t===r.stateInvalid&&this.getValue().length<this.options.minLength?e.Lang.sub(this.messages.stringTooShort,{number:this.options.minLength}):r.StringField.superclass.getStateString.call(this,t)},setClassFromState:function(t){r.StringField.superclass.setClassFromState.call(this,t),this.options.typeInvite&&this.updateTypeInvite(),e.one(this.divEl).hasClass("inputEx-invalid")?e.one(this.el).setAttribute("aria-invalid","true"):e.one(this.divEl).hasClass("inputEx-valid")&&e.one(this.el).removeAttribute("aria-invalid","true")},updateTypeInvite:function(){e.one(this.divEl).hasClass("inputEx-focused")?e.one(this.divEl).hasClass("inputEx-typeInvite")&&(this.el.value="",this.previousState=null,e.one(this.divEl).removeClass("inputEx-typeInvite")):this.isEmpty()?(e.one(this.divEl).addClass("inputEx-typeInvite"),this.el.value=this.options.typeInvite):e.one(this.divEl).removeClass("inputEx-typeInvite")},onFocus:function(e){r.StringField.superclass.onFocus.call(this,e),this.options.typeInvite&&this.updateTypeInvite()},onBlur:function(e){r.StringField.superclass.onBlur.call(this,e)},onKeyPress:function(e){},onKeyUp:function(e){}}),r.registerType("string",r.StringField,[{type:"string",label:"Type invite",name:"typeInvite",value:""},{type:"integer",label:"Size",name:"size",value:20},{type:"integer",label:"Min. length",name:"minLength",value:0}])},"@VERSION@",{requires:["inputex-field","event-key"],ix_provides:"string",skinnable:!0,lang:["en","fr","de","ca","es","fr","it","nl","pl","pt-BR"]});
