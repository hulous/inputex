if (typeof _yuitest_coverage == "undefined"){
    _yuitest_coverage = {};
    _yuitest_coverline = function(src, line){
        var coverage = _yuitest_coverage[src];
        if (!coverage.lines[line]){
            coverage.calledLines++;
        }
        coverage.lines[line]++;
    };
    _yuitest_coverfunc = function(src, name, line){
        var coverage = _yuitest_coverage[src],
            funcId = name + ":" + line;
        if (!coverage.functions[funcId]){
            coverage.calledFunctions++;
        }
        coverage.functions[funcId]++;
    };
}
_yuitest_coverage["build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js",
    code: []
};
_yuitest_coverage["build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js"].code=["YUI.add('inputex-calendarNavigationPlugin', function (Y, NAME) {","","var pluginName = \"calendarNavigationPlugin\";","","Y.Plugin.CalendarNavigationPlugin = Y.Base.create(pluginName, Y.Plugin.Base, [], {","","    initializer: function() {","        this.get(\"host\").get(\"boundingBox\").delegate(\"click\", Y.bind(this.onHeaderClick, this), \".yui3-calendar-header-label\");","    },","    /**","     * Prepare the panel","     *","     * @method onHeaderClick","     */","    onHeaderClick: function() {","","        var strings = this.get(\"string\"),","            that = this,","            calendarContentBox, bodyNode, panel;","","        if(!this.panel_container) {","            this.panel_container = Y.Node.create('<div class=\"yui3-calendar-navplugin-widget\"></div>');","            calendarContentBox = this.get(\"host\").get(\"contentBox\");","            calendarContentBox.append(this.panel_container);","            bodyNode = Y.Node.create('<div class=\"yui3-widget-bd\"></div>');","","            this.panel_container.append(bodyNode);","","","            panel = new Y.Panel({","                headerContent: strings.select,","                srcNode: this.panel_container,","                visible: false,","                centered: calendarContentBox,","                modal: true,","                maskNode: this.panel_container,","                // hideOn","                // override the default behavior which is to hide the panel with the esc key","                // because some problem on ie7","                hideOn: [{}],","                buttons: [{","                    value: strings.ok,","                    section: Y.WidgetStdMod.FOOTER,","                    classNames: \"ok-button\",","                    action: Y.bind(this.saveAndHidePanel, this)","                }, {","                    value: strings.cancel,","                    section: Y.WidgetStdMod.FOOTER,","                    action: Y.bind(this.cancelAndHidePanel, this)","                }]","","            }).render();","","            var inputexGroup = new Y.inputEx.Group({","                parentEl: bodyNode,","                fields: [{","                    type: \"select\",","                    name: \"month\",","                    label: strings.month,","                    choices: this._prepareMonthsData()","                }, {","                    className: \"select-year\",","                    name: \"year\",","                    label: strings.year,","                    required: true,","                    showMsg: true,","                    regexp: /^[0-9]{4}$/","                }]","            });","","","            this.get(\"host\").get(\"boundingBox\").on('keyup', function(e) {","                if(that._isPanelVisible()) {","                    //enter","                    if(e.keyCode === 13) {","                        that.saveAndHidePanel(e);","                    }","                }","            });","","            this.set(\"panel\", panel);","            this.set(\"inputexGroup\", inputexGroup);","","            // The  position of the mask is setted in javascript","            // So we can use css to change it's value","            Y.one(\".yui3-widget-mask\").setStyle(\"position\", \"absolute\");","        }","","        this.showPanel();","    },","    /**","     *","     * @method saveAndHidePanel","     */","    saveAndHidePanel: function(e) {","","        e.halt(true);","","        if(this.validateFormInPanel()) {","            // set the choosen values to the calendar","            var dateToUpdate = this.get(\"host\").get(\"date\"),","                selectedData = this.get(\"inputexGroup\").getValue();","","            dateToUpdate.setMonth(selectedData.month);","            if(selectedData.year) {","                dateToUpdate.setFullYear(selectedData.year);","            }","            this.get(\"host\").set(\"date\", dateToUpdate);","            this.hidePanel();","        }","    },","    /**","     *","     * @method cancelAndHidePanel","     */","    cancelAndHidePanel: function(e) {","","        e.halt(true);","        this.hidePanel();","","    },","    /**","     *","     * @method validateFormInPanel","     */","    validateFormInPanel: function() {","        return this.get(\"inputexGroup\").validate();","    },","    /**","     *","     * @method hidePanel","     */","    hidePanel: function() {","        this.get(\"panel\").hide();","    },","    /**","     *","     * @method showPanel","     */","    showPanel: function() {","        var date = this.get(\"host\").get(\"date\");","        this.get(\"inputexGroup\").setValue({","           month: date.getMonth(),","           year: date.getFullYear()","        });","        this.get(\"panel\").show();","    },","","    _prepareMonthsData: function() {","        var i = 0,","            month, listOfMonths = this.get(\"string\").monthsList;","        var monthsField = this.monthsField = [];","","        for(i = 0; i < 12; i++) {","            month = listOfMonths[i];","            monthsField.push({","                label: month,","                value: i","            });","        }","        return monthsField;","    },","    /**","     * Is the Panel visible ?","     *","     * @method _isPanelVisible","     * @private","     * return isPanelVisible","     */","    _isPanelVisible: function() {","        var panel = this.get(\"panel\"),","            isPanelVisible;","        if(panel) {","            isPanelVisible = panel.get(\"visible\");","        }","        return isPanelVisible;","    }","","}, {","    /**","     * Namespace of this component.","     *","     * @property NS","     * @type String","     * @static","     */","    ATTRS: {","        /**","         * I18N","         *","         * @attribute string","         * @type Object","         */","        string: {","            valueFn: function() {","                return Y.Intl.get(\"inputex-\" + pluginName);","            }","        },","        /**","         *","         * @attribute panel","         * @type Object","         */","        panel: {},","        /**","         * represents the inputex group inside the panel","         *","         * @attribute string","         * @type Object","         */","        inputexGroup: {}","    },","    /**","     * Namespace of this component.","     *","     * @property NS","     * @type String","     * @static","     */","    NS: \"calNavPlug\"","});","","}, '@VERSION@', {","    \"requires\": [","        \"intl\",","        \"plugin\",","        \"panel\",","        \"inputex-group\",","        \"inputex-select\",","        \"inputex-string\"","    ],","    \"skinnable\": true,","    \"lang\": [","        \"en\",","        \"fr\"","    ]","});"];
_yuitest_coverage["build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js"].lines = {"1":0,"3":0,"5":0,"8":0,"17":0,"21":0,"22":0,"23":0,"24":0,"25":0,"27":0,"30":0,"54":0,"72":0,"73":0,"75":0,"76":0,"81":0,"82":0,"86":0,"89":0,"97":0,"99":0,"101":0,"104":0,"105":0,"106":0,"108":0,"109":0,"118":0,"119":0,"127":0,"134":0,"141":0,"142":0,"146":0,"150":0,"152":0,"154":0,"155":0,"156":0,"161":0,"171":0,"173":0,"174":0,"176":0,"196":0};
_yuitest_coverage["build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js"].functions = {"initializer:7":0,"(anonymous 2):72":0,"onHeaderClick:15":0,"saveAndHidePanel:95":0,"cancelAndHidePanel:116":0,"validateFormInPanel:126":0,"hidePanel:133":0,"showPanel:140":0,"_prepareMonthsData:149":0,"_isPanelVisible:170":0,"valueFn:195":0,"(anonymous 1):1":0};
_yuitest_coverage["build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js"].coveredLines = 47;
_yuitest_coverage["build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js"].coveredFunctions = 12;
_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 1);
YUI.add('inputex-calendarNavigationPlugin', function (Y, NAME) {

_yuitest_coverfunc("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", "(anonymous 1)", 1);
_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 3);
var pluginName = "calendarNavigationPlugin";

_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 5);
Y.Plugin.CalendarNavigationPlugin = Y.Base.create(pluginName, Y.Plugin.Base, [], {

    initializer: function() {
        _yuitest_coverfunc("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", "initializer", 7);
_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 8);
this.get("host").get("boundingBox").delegate("click", Y.bind(this.onHeaderClick, this), ".yui3-calendar-header-label");
    },
    /**
     * Prepare the panel
     *
     * @method onHeaderClick
     */
    onHeaderClick: function() {

        _yuitest_coverfunc("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", "onHeaderClick", 15);
_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 17);
var strings = this.get("string"),
            that = this,
            calendarContentBox, bodyNode, panel;

        _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 21);
if(!this.panel_container) {
            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 22);
this.panel_container = Y.Node.create('<div class="yui3-calendar-navplugin-widget"></div>');
            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 23);
calendarContentBox = this.get("host").get("contentBox");
            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 24);
calendarContentBox.append(this.panel_container);
            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 25);
bodyNode = Y.Node.create('<div class="yui3-widget-bd"></div>');

            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 27);
this.panel_container.append(bodyNode);


            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 30);
panel = new Y.Panel({
                headerContent: strings.select,
                srcNode: this.panel_container,
                visible: false,
                centered: calendarContentBox,
                modal: true,
                maskNode: this.panel_container,
                // hideOn
                // override the default behavior which is to hide the panel with the esc key
                // because some problem on ie7
                hideOn: [{}],
                buttons: [{
                    value: strings.ok,
                    section: Y.WidgetStdMod.FOOTER,
                    classNames: "ok-button",
                    action: Y.bind(this.saveAndHidePanel, this)
                }, {
                    value: strings.cancel,
                    section: Y.WidgetStdMod.FOOTER,
                    action: Y.bind(this.cancelAndHidePanel, this)
                }]

            }).render();

            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 54);
var inputexGroup = new Y.inputEx.Group({
                parentEl: bodyNode,
                fields: [{
                    type: "select",
                    name: "month",
                    label: strings.month,
                    choices: this._prepareMonthsData()
                }, {
                    className: "select-year",
                    name: "year",
                    label: strings.year,
                    required: true,
                    showMsg: true,
                    regexp: /^[0-9]{4}$/
                }]
            });


            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 72);
this.get("host").get("boundingBox").on('keyup', function(e) {
                _yuitest_coverfunc("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", "(anonymous 2)", 72);
_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 73);
if(that._isPanelVisible()) {
                    //enter
                    _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 75);
if(e.keyCode === 13) {
                        _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 76);
that.saveAndHidePanel(e);
                    }
                }
            });

            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 81);
this.set("panel", panel);
            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 82);
this.set("inputexGroup", inputexGroup);

            // The  position of the mask is setted in javascript
            // So we can use css to change it's value
            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 86);
Y.one(".yui3-widget-mask").setStyle("position", "absolute");
        }

        _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 89);
this.showPanel();
    },
    /**
     *
     * @method saveAndHidePanel
     */
    saveAndHidePanel: function(e) {

        _yuitest_coverfunc("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", "saveAndHidePanel", 95);
_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 97);
e.halt(true);

        _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 99);
if(this.validateFormInPanel()) {
            // set the choosen values to the calendar
            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 101);
var dateToUpdate = this.get("host").get("date"),
                selectedData = this.get("inputexGroup").getValue();

            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 104);
dateToUpdate.setMonth(selectedData.month);
            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 105);
if(selectedData.year) {
                _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 106);
dateToUpdate.setFullYear(selectedData.year);
            }
            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 108);
this.get("host").set("date", dateToUpdate);
            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 109);
this.hidePanel();
        }
    },
    /**
     *
     * @method cancelAndHidePanel
     */
    cancelAndHidePanel: function(e) {

        _yuitest_coverfunc("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", "cancelAndHidePanel", 116);
_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 118);
e.halt(true);
        _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 119);
this.hidePanel();

    },
    /**
     *
     * @method validateFormInPanel
     */
    validateFormInPanel: function() {
        _yuitest_coverfunc("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", "validateFormInPanel", 126);
_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 127);
return this.get("inputexGroup").validate();
    },
    /**
     *
     * @method hidePanel
     */
    hidePanel: function() {
        _yuitest_coverfunc("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", "hidePanel", 133);
_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 134);
this.get("panel").hide();
    },
    /**
     *
     * @method showPanel
     */
    showPanel: function() {
        _yuitest_coverfunc("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", "showPanel", 140);
_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 141);
var date = this.get("host").get("date");
        _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 142);
this.get("inputexGroup").setValue({
           month: date.getMonth(),
           year: date.getFullYear()
        });
        _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 146);
this.get("panel").show();
    },

    _prepareMonthsData: function() {
        _yuitest_coverfunc("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", "_prepareMonthsData", 149);
_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 150);
var i = 0,
            month, listOfMonths = this.get("string").monthsList;
        _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 152);
var monthsField = this.monthsField = [];

        _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 154);
for(i = 0; i < 12; i++) {
            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 155);
month = listOfMonths[i];
            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 156);
monthsField.push({
                label: month,
                value: i
            });
        }
        _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 161);
return monthsField;
    },
    /**
     * Is the Panel visible ?
     *
     * @method _isPanelVisible
     * @private
     * return isPanelVisible
     */
    _isPanelVisible: function() {
        _yuitest_coverfunc("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", "_isPanelVisible", 170);
_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 171);
var panel = this.get("panel"),
            isPanelVisible;
        _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 173);
if(panel) {
            _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 174);
isPanelVisible = panel.get("visible");
        }
        _yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 176);
return isPanelVisible;
    }

}, {
    /**
     * Namespace of this component.
     *
     * @property NS
     * @type String
     * @static
     */
    ATTRS: {
        /**
         * I18N
         *
         * @attribute string
         * @type Object
         */
        string: {
            valueFn: function() {
                _yuitest_coverfunc("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", "valueFn", 195);
_yuitest_coverline("build/inputex-calendarNavigationPlugin/inputex-calendarNavigationPlugin.js", 196);
return Y.Intl.get("inputex-" + pluginName);
            }
        },
        /**
         *
         * @attribute panel
         * @type Object
         */
        panel: {},
        /**
         * represents the inputex group inside the panel
         *
         * @attribute string
         * @type Object
         */
        inputexGroup: {}
    },
    /**
     * Namespace of this component.
     *
     * @property NS
     * @type String
     * @static
     */
    NS: "calNavPlug"
});

}, '@VERSION@', {
    "requires": [
        "intl",
        "plugin",
        "panel",
        "inputex-group",
        "inputex-select",
        "inputex-string"
    ],
    "skinnable": true,
    "lang": [
        "en",
        "fr"
    ]
});
