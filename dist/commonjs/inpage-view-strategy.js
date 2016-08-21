'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.InpageViewStrategy = undefined;

var _class;

exports.inpageView = inpageView;

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

var _aureliaTemplating = require('aurelia-templating');

var _inpageTemplatingResources = require('./inpage-templating-resources');

var _aureliaLoader = require('aurelia-loader');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function inpageView(templateName, dependencies, dependencyBaseUrl) {
    var templatingResources = _aureliaDependencyInjection.Container.instance.get(_inpageTemplatingResources.InpageTemplatingResources);
    var markup = templatingResources.getTemplate(templateName);

    return (0, _aureliaTemplating.useViewStrategy)(markup ? new _aureliaTemplating.InlineViewStrategy(markup, dependencies, dependencyBaseUrl) : new InpageViewStrategy(templateName, templatingResources));
}

var InpageViewStrategy = exports.InpageViewStrategy = (0, _aureliaTemplating.viewStrategy)(_class = function () {
    function InpageViewStrategy(templateName, templatingResources) {
        _classCallCheck(this, InpageViewStrategy);

        this.templateName = templateName;
        this.templatingResources = templatingResources;
    }

    InpageViewStrategy.prototype.loadViewFactory = function loadViewFactory(viewEngine, compileInstruction, loadContext) {
        var _this = this;

        var entry = this.entry;

        if (entry && entry.factoryIsReady) {
            return Promise.resolve(entry.factory);
        }

        var template = this.parseTemplate('<template>Missing inpage template!</template>');

        entry = new _aureliaLoader.TemplateRegistryEntry(this.moduleId);
        entry.factory = viewEngine.viewCompiler.compile(template, viewEngine.appResources, compileInstruction);

        var unobserve = this.templatingResources.observe(this.templateName, function (markup) {

            var vf = viewEngine.viewCompiler.compile(_this.parseTemplate(markup), viewEngine.appResources, compileInstruction);
            entry.factory.template = vf.template;
            entry.factory.instructions = vf.instructions;

            unobserve();
        });

        return Promise.resolve(entry.factory);
    };

    InpageViewStrategy.prototype.parseTemplate = function parseTemplate(html) {

        var parser = document.createElement('div');
        parser.innerHTML = html;

        var temp = parser.firstElementChild;
        if (!temp || temp.nodeName !== 'TEMPLATE') {
            throw new Error('Template markup must be wrapped in a <template> element e.g. <template> <!-- markup here --> </template>');
        }

        return temp;
    };

    return InpageViewStrategy;
}()) || _class;