YUI.add("inputex-select",function(e,t){var n=e.Lang,r=e.inputEx;r.SelectField=function(e){r.SelectField.superclass.constructor.call(this,e)},e.extend(r.SelectField,r.Field,{setOptions:function(e){var t,i,s;r.SelectField.superclass.setOptions.call(this,e),this.options.choices=n.isArray(e.choices)?e.choices:[],this.options.strictValues=e.strictValues!==!1;if(n.isArray(e.selectValues))for(t=0,i=e.selectValues.length;t<i;t+=1)s="",e.selectOptions&&!n.isUndefined(e.selectOptions[t])?s+=e.selectOptions[t]:s+=e.selectValues[t],this.options.choices.push({value:e.selectValues[t],label:s})},renderComponent:function(){var t,n;this.el=r.cn("select",{id:this.divEl.id?this.divEl.id+"-field":e.guid(),name:this.options.name||""}),this.choicesList=[];for(t=0,n=this.options.choices.length;t<n;t+=1)this.addChoice(this.options.choices[t]);this.fieldContainer.appendChild(this.el)},initEvents:function(){e.on("change",this.onChange,this.el,this),e.on("focus",this.onFocus,this.el,this),e.on("blur",this.onBlur,this.el,this)},setValue:function(e,t){var i,s,o,u,a=!1;this.options.strictValues||this.removeCustomChoices();for(i=0,s=this.choicesList.length;i<s;i+=1)this.choicesList[i].visible&&(o=this.choicesList[i],e===o.value?(o.node.selected="selected",a=!0):(o.node.selected="",n.isUndefined(u)&&(u=i)));a||(!this.options.strictValues&&e!==""?(o=this.addChoice({value:e,label:e,position:0}),o.node.selected="selected",o.custom=!0):n.isUndefined(u)||(o=this.choicesList[u],o.node.selected="selected",e=o.value)),r.SelectField.superclass.setValue.call(this,e,t)},removeCustomChoices:function(){var e,t,n;for(e=0,t=this.choicesList.length;e<t;e++)n=this.choicesList[e],n.custom&&(this.removeChoice(n),e--,t--)},getValue:function(){var e;return this.el.selectedIndex>=0?(e=r.indexOf(this.el.childNodes[this.el.selectedIndex],this.choicesList,function(e,t){return e===t.node}),this.choicesList[e].value):""},disable:function(){this.el.disabled=!0},enable:function(){this.el.disabled=!1},isDisabled:function(){return this.el.disabled},createChoiceNode:function(e){return r.cn("option",{value:e.value},null,e.label)},removeChoiceNode:function(e){this.el.removeChild(e)},disableChoiceNode:function(e){e.disabled="disabled"},enableChoiceNode:function(e){e.removeAttribute("disabled")},appendChoiceNode:function(t,n){var r,i;r=0;for(i=0;i<n;i+=1)this.choicesList[i].visible&&(r+=1);r<this.el.childNodes.length?e.one(this.el).insert(t,r):this.el.appendChild(t)},setFieldName:function(e){this.el.name=e}}),e.mix(r.SelectField.prototype,r.mixin.choice),r.registerType("select",r.SelectField,[{type:"list",name:"choices",label:"Choices",elementType:{type:"group",fields:[{label:"Value",name:"value",value:""},{label:"Label",name:"label"}]},value:[],required:!0}])},"@VERSION@",{requires:["inputex-field","inputex-choice"],ix_provides:"select"});
