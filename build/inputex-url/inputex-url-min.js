YUI.add("inputex-url",function(e,t){var n=e.Lang,r=e.inputEx;r.UrlField=function(e){r.UrlField.superclass.constructor.call(this,e)},e.extend(r.UrlField,r.StringField,{setOptions:function(t){r.UrlField.superclass.setOptions.call(this,t),this.messages=e.mix(this.messages,e.Intl.get("inputex-url")),this.options.className=t.className?t.className:"inputEx-Field inputEx-UrlField",this.messages.invalid=t.messages&&t.messages.invalid?t.messages.invalid:this.messages.invalidUrl,this.options.favicon=n.isUndefined(t.favicon)?"https:"===document.location.protocol?!1:!0:t.favicon,this.options.regexp=t.regexp?t.regexp:r.regexps.url},render:function(){r.UrlField.superclass.render.call(this),this.options.favicon||e.one(this.el).addClass("nofavicon"),this.options.favicon&&(this.favicon=r.cn("img",{src:r.spacerUrl}),this.fieldContainer.insertBefore(this.favicon,this.fieldContainer.childNodes[0]),e.on("click",function(){this.focus()},this.favicon,this))},setClassFromState:function(e){r.UrlField.superclass.setClassFromState.call(this,e),this.options.favicon&&this.updateFavicon(this.previousState===r.stateValid?this.getValue():null)},updateFavicon:function(e){var t=e?e.match(/https?:\/\/[^\/]*/)+"/favicon.ico":r.spacerUrl,n=this;t!==this.favicon.src&&(r.sn(this.favicon,null,{visibility:"hidden"}),this.favicon.src=t,this.timer&&clearTimeout(this.timer),this.timer=setTimeout(function(){n.displayFavicon()},1e3))},displayFavicon:function(){r.sn(this.favicon,null,{visibility:this.favicon.naturalWidth!==0?"visible":"hidden"})},hideFavicon:function(){this.favicon.hide()},hide:function(){r.UrlField.superclass.hide.call(null,this),this.hideFavicon()}}),r.registerType("url",r.UrlField,[{type:"boolean",label:"Display favicon",name:"favicon",value:!0}])},"@VERSION@",{requires:["inputex-string"],ix_provides:"url",skinnable:!0,lang:["en","fr","de","ca","es","fr","it","nl","pl","pt-BR"]});
