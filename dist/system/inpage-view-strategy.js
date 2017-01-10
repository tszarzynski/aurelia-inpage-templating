'use strict';

System.register(['aurelia-framework', './inpage-templating-resources', 'aurelia-loader', 'aurelia-pal'], function (_export, _context) {
    "use strict";

    var InlineViewStrategy, Container, useViewStrategy, viewStrategy, InpageTemplatingResources, TemplateRegistryEntry, DOM, _class, InpageViewStrategy;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function inpageView(templateName, dependencies, dependencyBaseUrl) {
        var templatingResources = Container.instance.get(InpageTemplatingResources);
        var markup = templatingResources.getTemplate(templateName);

        return useViewStrategy(markup ? new InlineViewStrategy(markup, dependencies, dependencyBaseUrl) : new InpageViewStrategy(templateName, templatingResources));
    }

    _export('inpageView', inpageView);

    return {
        setters: [function (_aureliaFramework) {
            InlineViewStrategy = _aureliaFramework.InlineViewStrategy;
            Container = _aureliaFramework.Container;
            useViewStrategy = _aureliaFramework.useViewStrategy;
            viewStrategy = _aureliaFramework.viewStrategy;
        }, function (_inpageTemplatingResources) {
            InpageTemplatingResources = _inpageTemplatingResources.InpageTemplatingResources;
        }, function (_aureliaLoader) {
            TemplateRegistryEntry = _aureliaLoader.TemplateRegistryEntry;
        }, function (_aureliaPal) {
            DOM = _aureliaPal.DOM;
        }],
        execute: function () {
            _export('InpageViewStrategy', InpageViewStrategy = viewStrategy(_class = function () {
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

                    var template = DOM.createTemplateFromMarkup('<template>Missing inpage template: ' + this.templateName + '</template>');

                    entry = new TemplateRegistryEntry(this.moduleId);
                    entry.factory = viewEngine.viewCompiler.compile(template, viewEngine.appResources, compileInstruction);

                    var unobserve = this.templatingResources.observe(this.templateName, function (markup) {

                        var vf = viewEngine.viewCompiler.compile(DOM.createTemplateFromMarkup(markup), viewEngine.appResources, compileInstruction);
                        entry.factory.template = vf.template;
                        entry.factory.instructions = vf.instructions;

                        unobserve();
                    });

                    return Promise.resolve(entry.factory);
                };

                return InpageViewStrategy;
            }()) || _class);

            _export('InpageViewStrategy', InpageViewStrategy);
        }
    };
});