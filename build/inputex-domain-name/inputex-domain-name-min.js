YUI.add("inputex-domain-name",function(e,t){var n=e.Lang,r=e.inputEx;r.DomainNameField=function(e){r.DomainNameField.superclass.constructor.call(this,e)},e.extend(r.DomainNameField,r.StringField,{setOptions:function(t){r.DomainNameField.superclass.setOptions.call(this,t),this.messages=e.mix(this.messages,e.Intl.get("inputex-domain-name")),this.options.className=t.className?t.className:"inputEx-Field inputEx-DomainNameField",this.options.regexp=/^[a-z0-9]+(\-?[a-z0-9]+)*\.[a-z]{2,5}$/i,this.options.description=this.messages.domainNameFieldDescription}}),r.registerType("domain-name",r.DomainNameField,[])},"@VERSION@",{requires:["intl","inputex-string"],lang:["en","fr","ca","de","es","it","nl","pl","pt-BR"],ix_provides:"domain-name"});
