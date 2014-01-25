if (typeof __coverage__ === 'undefined') { __coverage__ = {}; }
if (!__coverage__['build/inputex-checkbox-multi-state/inputex-checkbox-multi-state.js']) {
   __coverage__['build/inputex-checkbox-multi-state/inputex-checkbox-multi-state.js'] = {"path":"build/inputex-checkbox-multi-state/inputex-checkbox-multi-state.js","s":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0,"13":0,"14":0,"15":0,"16":0,"17":0,"18":0,"19":0,"20":0,"21":0,"22":0,"23":0,"24":0,"25":0,"26":0,"27":0,"28":0,"29":0},"b":{"1":[0,0],"2":[0,0]},"f":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0},"fnMap":{"1":{"name":"(anonymous_1)","line":1,"loc":{"start":{"line":1,"column":40},"end":{"line":1,"column":59}}},"2":{"name":"(anonymous_2)","line":20,"loc":{"start":{"line":20,"column":15},"end":{"line":20,"column":33}}},"3":{"name":"(anonymous_3)","line":31,"loc":{"start":{"line":31,"column":20},"end":{"line":31,"column":31}}},"4":{"name":"(anonymous_4)","line":63,"loc":{"start":{"line":63,"column":21},"end":{"line":63,"column":32}}},"5":{"name":"(anonymous_5)","line":71,"loc":{"start":{"line":71,"column":17},"end":{"line":71,"column":29}}},"6":{"name":"(anonymous_6)","line":82,"loc":{"start":{"line":82,"column":13},"end":{"line":82,"column":24}}},"7":{"name":"(anonymous_7)","line":89,"loc":{"start":{"line":89,"column":13},"end":{"line":89,"column":45}}},"8":{"name":"(anonymous_8)","line":112,"loc":{"start":{"line":112,"column":10},"end":{"line":112,"column":21}}},"9":{"name":"(anonymous_9)","line":120,"loc":{"start":{"line":120,"column":12},"end":{"line":120,"column":23}}}},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":129,"column":57}},"2":{"start":{"line":15,"column":0},"end":{"line":125,"column":3}},"3":{"start":{"line":21,"column":6},"end":{"line":21,"column":77}},"4":{"start":{"line":24,"column":6},"end":{"line":24,"column":57}},"5":{"start":{"line":33,"column":6},"end":{"line":33,"column":26}},"6":{"start":{"line":34,"column":6},"end":{"line":34,"column":46}},"7":{"start":{"line":35,"column":6},"end":{"line":35,"column":46}},"8":{"start":{"line":36,"column":6},"end":{"line":36,"column":45}},"9":{"start":{"line":45,"column":6},"end":{"line":47,"column":6}},"10":{"start":{"line":47,"column":6},"end":{"line":49,"column":9}},"11":{"start":{"line":51,"column":6},"end":{"line":51,"column":46}},"12":{"start":{"line":52,"column":6},"end":{"line":52,"column":45}},"13":{"start":{"line":53,"column":6},"end":{"line":53,"column":47}},"14":{"start":{"line":55,"column":6},"end":{"line":55,"column":30}},"15":{"start":{"line":64,"column":6},"end":{"line":64,"column":59}},"16":{"start":{"line":72,"column":6},"end":{"line":73,"column":45}},"17":{"start":{"line":75,"column":6},"end":{"line":75,"column":30}},"18":{"start":{"line":83,"column":6},"end":{"line":83,"column":24}},"19":{"start":{"line":91,"column":6},"end":{"line":91,"column":47}},"20":{"start":{"line":92,"column":6},"end":{"line":95,"column":7}},"21":{"start":{"line":93,"column":9},"end":{"line":93,"column":66}},"22":{"start":{"line":94,"column":9},"end":{"line":94,"column":16}},"23":{"start":{"line":98,"column":6},"end":{"line":100,"column":65}},"24":{"start":{"line":101,"column":6},"end":{"line":101,"column":33}},"25":{"start":{"line":103,"column":6},"end":{"line":103,"column":25}},"26":{"start":{"line":105,"column":6},"end":{"line":105,"column":88}},"27":{"start":{"line":113,"column":6},"end":{"line":113,"column":21}},"28":{"start":{"line":121,"column":6},"end":{"line":121,"column":29}},"29":{"start":{"line":127,"column":0},"end":{"line":127,"column":50}}},"branchMap":{"1":{"line":45,"type":"binary-expr","locations":[{"start":{"line":45,"column":19},"end":{"line":45,"column":45}},{"start":{"line":45,"column":49},"end":{"line":45,"column":60}}]},"2":{"line":92,"type":"if","locations":[{"start":{"line":92,"column":6},"end":{"line":92,"column":6}},{"start":{"line":92,"column":6},"end":{"line":92,"column":6}}]}},"code":["(function () { YUI.add('inputex-checkbox-multi-state', function (Y, NAME) {","","/**"," *"," * @module checkbox-multi-state"," */","","/**"," * Create a checkbox with 3 states (checked, unchecked, middle)"," *"," * @class inputEx.CheckboxMultiState"," * @extends inputEx.Field"," * @constructor"," */","var CheckboxMultiState = new Y.Base.create(\"checkbox-multi-state\", Y.inputEx.Field, [], {","   /*","    * @method setOptions","    *","    */","   setOptions: function(options) {","      Y.inputEx.CheckboxMultiState.superclass.setOptions.call(this, options);","","      // specific options","      this.options.checkboxState = options.checkboxState;","","   },","   /*","    * @method renderComponent","    *","    */","   renderComponent: function() {","","      this.nextState = {};","      this.nextState[\"checked\"] = \"unchecked\";","      this.nextState[\"unchecked\"] = \"checked\";","      this.nextState[\"middle\"] = \"unchecked\";","","      /**","       * state of the check box","       *","       * @property state","       * @type {String}","       * @default \"unchecked\"","       */","      this.state = this.options.checkboxState || \"unchecked\"","","      var markup = Y.Lang.sub(Y.inputEx.CheckboxMultiState.TEMPLATE, {","         checkboxState: this.state","      });","","      this.markupNode = Y.Node.create(markup);","      this.el = this.markupNode.getDOMNode();","      this.fieldContainer.appendChild(this.el);","","      this._bindUIComponent();","","   },","   /*","    * @method _bindUIComponent","    * @private","    *","    */","   _bindUIComponent: function() {","      this.markupNode.on(\"click\", this._changeState, this);","   },","   /*","    * @method _changeState","    * @private","    *","    */","   _changeState: function(e) {","      var oldState = e.currentTarget.one(\"img\").get(\"src\").match(/images\\/(.+).gif/)[1],","         newState = this.nextState[oldState];","","      this.setValue(newState);","","   },","   /*","    * @method getState","    *","    */","   getValue: function() {","      return this.state;","   },","   /*","    * @method setValue","    *","    */","   setValue: function(state, sendUpdatedEvt) {","","      var keys = Y.Object.keys(this.nextState);","      if (keys.indexOf(state) === -1) {","         console.log(\"please provide an existing state : \", keys);","         return;","      }","","      // nom des gifs : check0, check1, check2 ","      var imgNode = this.markupNode.one(\"img\"),","         oldSrc = imgNode.get(\"src\"),","         newSrc = oldSrc.replace(/([^\\/]+).gif/, state + \".gif\");","      imgNode.set(\"src\", newSrc);","","      this.state = state;","","      Y.inputEx.CheckboxMultiState.superclass.setValue.call(this,state, sendUpdatedEvt);","   },","   /*","    * Return a DOM element","    * @method getEl","    * ","    */","   getEl: function() {","      return this.el;","   },","   /*","    * Return a Y.Node","    * @method getNode","    *","    */","   getNode: function() {","      return this.markupNode;","   }","}, {","   TEMPLATE: '' + '<div class=\"checkbox\">' + '<img src=\"/images/{checkboxState}.gif\" alt=\"\">' + '</div>'","});","","Y.inputEx.CheckboxMultiState = CheckboxMultiState;","","}, '@VERSION@', {\"requires\": [\"base\", \"inputex-field\"]});","","}());"]};
}
var __cov_VBqWIMgprKy_YJc3VZu69A = __coverage__['build/inputex-checkbox-multi-state/inputex-checkbox-multi-state.js'];
__cov_VBqWIMgprKy_YJc3VZu69A.s['1']++;YUI.add('inputex-checkbox-multi-state',function(Y,NAME){__cov_VBqWIMgprKy_YJc3VZu69A.f['1']++;__cov_VBqWIMgprKy_YJc3VZu69A.s['2']++;var CheckboxMultiState=new Y.Base.create('checkbox-multi-state',Y.inputEx.Field,[],{setOptions:function(options){__cov_VBqWIMgprKy_YJc3VZu69A.f['2']++;__cov_VBqWIMgprKy_YJc3VZu69A.s['3']++;Y.inputEx.CheckboxMultiState.superclass.setOptions.call(this,options);__cov_VBqWIMgprKy_YJc3VZu69A.s['4']++;this.options.checkboxState=options.checkboxState;},renderComponent:function(){__cov_VBqWIMgprKy_YJc3VZu69A.f['3']++;__cov_VBqWIMgprKy_YJc3VZu69A.s['5']++;this.nextState={};__cov_VBqWIMgprKy_YJc3VZu69A.s['6']++;this.nextState['checked']='unchecked';__cov_VBqWIMgprKy_YJc3VZu69A.s['7']++;this.nextState['unchecked']='checked';__cov_VBqWIMgprKy_YJc3VZu69A.s['8']++;this.nextState['middle']='unchecked';__cov_VBqWIMgprKy_YJc3VZu69A.s['9']++;this.state=(__cov_VBqWIMgprKy_YJc3VZu69A.b['1'][0]++,this.options.checkboxState)||(__cov_VBqWIMgprKy_YJc3VZu69A.b['1'][1]++,'unchecked');__cov_VBqWIMgprKy_YJc3VZu69A.s['10']++;var markup=Y.Lang.sub(Y.inputEx.CheckboxMultiState.TEMPLATE,{checkboxState:this.state});__cov_VBqWIMgprKy_YJc3VZu69A.s['11']++;this.markupNode=Y.Node.create(markup);__cov_VBqWIMgprKy_YJc3VZu69A.s['12']++;this.el=this.markupNode.getDOMNode();__cov_VBqWIMgprKy_YJc3VZu69A.s['13']++;this.fieldContainer.appendChild(this.el);__cov_VBqWIMgprKy_YJc3VZu69A.s['14']++;this._bindUIComponent();},_bindUIComponent:function(){__cov_VBqWIMgprKy_YJc3VZu69A.f['4']++;__cov_VBqWIMgprKy_YJc3VZu69A.s['15']++;this.markupNode.on('click',this._changeState,this);},_changeState:function(e){__cov_VBqWIMgprKy_YJc3VZu69A.f['5']++;__cov_VBqWIMgprKy_YJc3VZu69A.s['16']++;var oldState=e.currentTarget.one('img').get('src').match(/images\/(.+).gif/)[1],newState=this.nextState[oldState];__cov_VBqWIMgprKy_YJc3VZu69A.s['17']++;this.setValue(newState);},getValue:function(){__cov_VBqWIMgprKy_YJc3VZu69A.f['6']++;__cov_VBqWIMgprKy_YJc3VZu69A.s['18']++;return this.state;},setValue:function(state,sendUpdatedEvt){__cov_VBqWIMgprKy_YJc3VZu69A.f['7']++;__cov_VBqWIMgprKy_YJc3VZu69A.s['19']++;var keys=Y.Object.keys(this.nextState);__cov_VBqWIMgprKy_YJc3VZu69A.s['20']++;if(keys.indexOf(state)===-1){__cov_VBqWIMgprKy_YJc3VZu69A.b['2'][0]++;__cov_VBqWIMgprKy_YJc3VZu69A.s['21']++;console.log('please provide an existing state : ',keys);__cov_VBqWIMgprKy_YJc3VZu69A.s['22']++;return;}else{__cov_VBqWIMgprKy_YJc3VZu69A.b['2'][1]++;}__cov_VBqWIMgprKy_YJc3VZu69A.s['23']++;var imgNode=this.markupNode.one('img'),oldSrc=imgNode.get('src'),newSrc=oldSrc.replace(/([^\/]+).gif/,state+'.gif');__cov_VBqWIMgprKy_YJc3VZu69A.s['24']++;imgNode.set('src',newSrc);__cov_VBqWIMgprKy_YJc3VZu69A.s['25']++;this.state=state;__cov_VBqWIMgprKy_YJc3VZu69A.s['26']++;Y.inputEx.CheckboxMultiState.superclass.setValue.call(this,state,sendUpdatedEvt);},getEl:function(){__cov_VBqWIMgprKy_YJc3VZu69A.f['8']++;__cov_VBqWIMgprKy_YJc3VZu69A.s['27']++;return this.el;},getNode:function(){__cov_VBqWIMgprKy_YJc3VZu69A.f['9']++;__cov_VBqWIMgprKy_YJc3VZu69A.s['28']++;return this.markupNode;}},{TEMPLATE:''+'<div class="checkbox">'+'<img src="/images/{checkboxState}.gif" alt="">'+'</div>'});__cov_VBqWIMgprKy_YJc3VZu69A.s['29']++;Y.inputEx.CheckboxMultiState=CheckboxMultiState;},'@VERSION@',{'requires':['base','inputex-field']});
