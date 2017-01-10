'use strict';

System.register(['aurelia-framework', './inpage-templating-resources'], function (_export, _context) {
    "use strict";

    var inject, customAttribute, InpageTemplatingResources, _dec, _dec2, _class, AsTemplateCustomAttribute;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_aureliaFramework) {
            inject = _aureliaFramework.inject;
            customAttribute = _aureliaFramework.customAttribute;
        }, function (_inpageTemplatingResources) {
            InpageTemplatingResources = _inpageTemplatingResources.InpageTemplatingResources;
        }],
        execute: function () {
            _export('AsTemplateCustomAttribute', AsTemplateCustomAttribute = (_dec = customAttribute('as-template'), _dec2 = inject(Element, InpageTemplatingResources), _dec(_class = _dec2(_class = function AsTemplateCustomAttribute(element, inpageTemplatingResources) {
                _classCallCheck(this, AsTemplateCustomAttribute);

                inpageTemplatingResources.parseTemplate(element);
            }) || _class) || _class));

            _export('AsTemplateCustomAttribute', AsTemplateCustomAttribute);
        }
    };
});