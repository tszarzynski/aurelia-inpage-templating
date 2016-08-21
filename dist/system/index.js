'use strict';

System.register(['./inpage-templating-resources.js', './inpage-view-strategy.js', './inpage-template-custom-attribute.js'], function (_export, _context) {
    "use strict";

    var InpageTemplatingResources;
    function configure(config, callback) {
        var resources = config.container.get(InpageTemplatingResources);
        resources.initialize();
        if (typeof callback === 'function') {
            callback(animator);
        }
    }

    _export('configure', configure);

    return {
        setters: [function (_inpageTemplatingResourcesJs) {
            InpageTemplatingResources = _inpageTemplatingResourcesJs.InpageTemplatingResources;
        }, function (_inpageViewStrategyJs) {
            var _exportObj = {};
            _exportObj.inpageView = _inpageViewStrategyJs.inpageView;

            _export(_exportObj);
        }, function (_inpageTemplateCustomAttributeJs) {
            var _exportObj2 = {};
            _exportObj2.AsTemplateCustomAttribute = _inpageTemplateCustomAttributeJs.AsTemplateCustomAttribute;

            _export(_exportObj2);
        }],
        execute: function () {}
    };
});