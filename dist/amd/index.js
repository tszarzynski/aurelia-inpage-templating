define(['exports', './inpage-view-strategy.js', './inpage-template-custom-attribute.js', './inpage-templating-resources.js'], function (exports, _inpageViewStrategy, _inpageTemplateCustomAttribute, _inpageTemplatingResources) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.AsTemplateCustomAttribute = exports.inpageView = undefined;
    Object.defineProperty(exports, 'inpageView', {
        enumerable: true,
        get: function () {
            return _inpageViewStrategy.inpageView;
        }
    });
    Object.defineProperty(exports, 'AsTemplateCustomAttribute', {
        enumerable: true,
        get: function () {
            return _inpageTemplateCustomAttribute.AsTemplateCustomAttribute;
        }
    });
    exports.configure = configure;
    function configure(config, callback) {
        var resources = config.container.get(_inpageTemplatingResources.InpageTemplatingResources);
        resources.initialize();
        if (typeof callback === 'function') {
            callback(animator);
        }
    }
});