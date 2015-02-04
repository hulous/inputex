if (typeof __coverage__ === 'undefined') { __coverage__ = {}; }
if (!__coverage__['build/inputex-domain-name/inputex-domain-name.js']) {
   __coverage__['build/inputex-domain-name/inputex-domain-name.js'] = {"path":"build/inputex-domain-name/inputex-domain-name.js","s":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0},"b":{"1":[0,0]},"f":{"1":0,"2":0,"3":0},"fnMap":{"1":{"name":"(anonymous_1)","line":1,"loc":{"start":{"line":1,"column":31},"end":{"line":1,"column":50}}},"2":{"name":"(anonymous_2)","line":16,"loc":{"start":{"line":16,"column":26},"end":{"line":16,"column":44}}},"3":{"name":"(anonymous_3)","line":22,"loc":{"start":{"line":22,"column":15},"end":{"line":22,"column":33}}}},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":59,"column":3}},"2":{"start":{"line":7,"column":3},"end":{"line":8,"column":27}},"3":{"start":{"line":16,"column":0},"end":{"line":18,"column":2}},"4":{"start":{"line":17,"column":3},"end":{"line":17,"column":69}},"5":{"start":{"line":20,"column":0},"end":{"line":36,"column":3}},"6":{"start":{"line":23,"column":6},"end":{"line":23,"column":72}},"7":{"start":{"line":26,"column":6},"end":{"line":26,"column":78}},"8":{"start":{"line":27,"column":6},"end":{"line":27,"column":111}},"9":{"start":{"line":28,"column":6},"end":{"line":28,"column":70}},"10":{"start":{"line":29,"column":6},"end":{"line":29,"column":74}},"11":{"start":{"line":39,"column":0},"end":{"line":39,"column":65}}},"branchMap":{"1":{"line":27,"type":"cond-expr","locations":[{"start":{"line":27,"column":51},"end":{"line":27,"column":68}},{"start":{"line":27,"column":71},"end":{"line":27,"column":110}}]}},"code":["(function () { YUI.add('inputex-domain-name', function (Y, NAME) {","","","/**"," * @module inputex-url"," */","   var lang    = Y.Lang,","       inputEx = Y.inputEx;","","/**"," * Simple domain name field"," * @class inputEx.DomainNameField"," * @extends inputEx.StringField"," * @constructor"," */","inputEx.DomainNameField = function(options) {","   inputEx.DomainNameField.superclass.constructor.call(this,options);","};","","Y.extend(inputEx.DomainNameField, inputEx.StringField, {","","   setOptions: function(options) {","      inputEx.DomainNameField.superclass.setOptions.call(this, options);","","      //I18N","      this.messages = Y.mix(this.messages, Y.Intl.get(\"inputex-domain-name\"));","      this.options.className = options.className ? options.className : \"inputEx-Field inputEx-DomainNameField\";","      this.options.regexp = /^[a-z0-9]+(\\-?[a-z0-9]+)*\\.[a-z]{2,5}$/i;","      this.options.description = this.messages.domainNameFieldDescription;","","      // TODO, add options :","      //  * unicode support","      //  * subdomain support","   }","","});","","// Register this class as \"url\" type","inputEx.registerType(\"domain-name\", inputEx.DomainNameField, []);","","","}, '@VERSION@', {","    \"requires\": [","        \"intl\",","        \"inputex-string\"","    ],","    \"lang\": [","        \"en\",","        \"fr\",","        \"ca\",","        \"de\",","        \"es\",","        \"it\",","        \"nl\",","        \"pl\",","        \"pt-BR\"","    ],","    \"ix_provides\": \"domain-name\"","});","","}());"]};
}
var __cov_0AfAq2MOl2$AY3L1bKBP4w = __coverage__['build/inputex-domain-name/inputex-domain-name.js'];
__cov_0AfAq2MOl2$AY3L1bKBP4w.s['1']++;YUI.add('inputex-domain-name',function(Y,NAME){__cov_0AfAq2MOl2$AY3L1bKBP4w.f['1']++;__cov_0AfAq2MOl2$AY3L1bKBP4w.s['2']++;var lang=Y.Lang,inputEx=Y.inputEx;__cov_0AfAq2MOl2$AY3L1bKBP4w.s['3']++;inputEx.DomainNameField=function(options){__cov_0AfAq2MOl2$AY3L1bKBP4w.f['2']++;__cov_0AfAq2MOl2$AY3L1bKBP4w.s['4']++;inputEx.DomainNameField.superclass.constructor.call(this,options);};__cov_0AfAq2MOl2$AY3L1bKBP4w.s['5']++;Y.extend(inputEx.DomainNameField,inputEx.StringField,{setOptions:function(options){__cov_0AfAq2MOl2$AY3L1bKBP4w.f['3']++;__cov_0AfAq2MOl2$AY3L1bKBP4w.s['6']++;inputEx.DomainNameField.superclass.setOptions.call(this,options);__cov_0AfAq2MOl2$AY3L1bKBP4w.s['7']++;this.messages=Y.mix(this.messages,Y.Intl.get('inputex-domain-name'));__cov_0AfAq2MOl2$AY3L1bKBP4w.s['8']++;this.options.className=options.className?(__cov_0AfAq2MOl2$AY3L1bKBP4w.b['1'][0]++,options.className):(__cov_0AfAq2MOl2$AY3L1bKBP4w.b['1'][1]++,'inputEx-Field inputEx-DomainNameField');__cov_0AfAq2MOl2$AY3L1bKBP4w.s['9']++;this.options.regexp=/^[a-z0-9]+(\-?[a-z0-9]+)*\.[a-z]{2,5}$/i;__cov_0AfAq2MOl2$AY3L1bKBP4w.s['10']++;this.options.description=this.messages.domainNameFieldDescription;}});__cov_0AfAq2MOl2$AY3L1bKBP4w.s['11']++;inputEx.registerType('domain-name',inputEx.DomainNameField,[]);},'@VERSION@',{'requires':['intl','inputex-string'],'lang':['en','fr','ca','de','es','it','nl','pl','pt-BR'],'ix_provides':'domain-name'});
