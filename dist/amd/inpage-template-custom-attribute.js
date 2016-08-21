define(['exports', 'aurelia-dependency-injection', 'aurelia-templating', './inpage-templating-resources'], function (exports, _aureliaDependencyInjection, _aureliaTemplating, _inpageTemplatingResources) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.AsTemplateCustomAttribute = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _dec2, _class;

    var AsTemplateCustomAttribute = exports.AsTemplateCustomAttribute = (_dec = (0, _aureliaTemplating.customAttribute)('as-template'), _dec2 = (0, _aureliaDependencyInjection.inject)(Element, _inpageTemplatingResources.InpageTemplatingResources), _dec(_class = _dec2(_class = function AsTemplateCustomAttribute(element, inpageTemplatingResources) {
        _classCallCheck(this, AsTemplateCustomAttribute);

        inpageTemplatingResources.parseTemplate(element);
    }) || _class) || _class);
});