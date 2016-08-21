'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AsTemplateCustomAttribute = exports.inpageView = undefined;

var _inpageViewStrategy = require('./inpage-view-strategy.js');

Object.defineProperty(exports, 'inpageView', {
    enumerable: true,
    get: function get() {
        return _inpageViewStrategy.inpageView;
    }
});

var _inpageTemplateCustomAttribute = require('./inpage-template-custom-attribute.js');

Object.defineProperty(exports, 'AsTemplateCustomAttribute', {
    enumerable: true,
    get: function get() {
        return _inpageTemplateCustomAttribute.AsTemplateCustomAttribute;
    }
});
exports.configure = configure;

var _inpageTemplatingResources = require('./inpage-templating-resources.js');

function configure(config, callback) {
    var resources = config.container.get(_inpageTemplatingResources.InpageTemplatingResources);
    resources.initialize();
    if (typeof callback === 'function') {
        callback(animator);
    }
}