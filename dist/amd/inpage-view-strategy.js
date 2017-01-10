define(['exports', 'aurelia-framework', './inpage-templating-resources', 'aurelia-loader', 'aurelia-pal'], function (exports, _aureliaFramework, _inpageTemplatingResources, _aureliaLoader, _aureliaPal) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.InpageViewStrategy = undefined;
    exports.inpageView = inpageView;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _class;

    function inpageView(templateName, dependencies, dependencyBaseUrl) {
        var templatingResources = _aureliaFramework.Container.instance.get(_inpageTemplatingResources.InpageTemplatingResources);
        var markup = templatingResources.getTemplate(templateName);

        return (0, _aureliaFramework.useViewStrategy)(markup ? new _aureliaFramework.InlineViewStrategy(markup, dependencies, dependencyBaseUrl) : new InpageViewStrategy(templateName, templatingResources));
    }

    var InpageViewStrategy = exports.InpageViewStrategy = (0, _aureliaFramework.viewStrategy)(_class = function () {
        function InpageViewStrategy(templateName, templatingResources) {
            _classCallCheck(this, InpageViewStrategy);

            this.templateName = templateName;
            this.templatingResources = templatingResources;
        }

        InpageViewStrategy.prototype.loadViewFactory = function loadViewFactory(viewEngine, compileInstruction, loadContext) {

            var entry = this.entry;

            if (entry && entry.factoryIsReady) {
                return Promise.resolve(entry.factory);
            }

            var template = _aureliaPal.DOM.createTemplateFromMarkup('<template>Missing inpage template: ' + this.templateName + '</template>');

            entry = new _aureliaLoader.TemplateRegistryEntry(this.moduleId);
            entry.factory = viewEngine.viewCompiler.compile(template, viewEngine.appResources, compileInstruction);

            var unobserve = this.templatingResources.observe(this.templateName, function (markup) {

                var vf = viewEngine.viewCompiler.compile(_aureliaPal.DOM.createTemplateFromMarkup(markup), viewEngine.appResources, compileInstruction);
                entry.factory.template = vf.template;
                entry.factory.instructions = vf.instructions;

                unobserve();
            });

            return Promise.resolve(entry.factory);
        };

        return InpageViewStrategy;
    }()) || _class;
});