'use strict';

System.register(['aurelia-dependency-injection', 'aurelia-templating', './inpage-templating-resources', 'aurelia-loader'], function (_export, _context) {
    "use strict";

    var inject, Container, InlineViewStrategy, useViewStrategy, viewStrategy, InpageTemplatingResources, TemplateRegistryEntry, _class, InpageViewStrategy;

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
        setters: [function (_aureliaDependencyInjection) {
            inject = _aureliaDependencyInjection.inject;
            Container = _aureliaDependencyInjection.Container;
        }, function (_aureliaTemplating) {
            InlineViewStrategy = _aureliaTemplating.InlineViewStrategy;
            useViewStrategy = _aureliaTemplating.useViewStrategy;
            viewStrategy = _aureliaTemplating.viewStrategy;
        }, function (_inpageTemplatingResources) {
            InpageTemplatingResources = _inpageTemplatingResources.InpageTemplatingResources;
        }, function (_aureliaLoader) {
            TemplateRegistryEntry = _aureliaLoader.TemplateRegistryEntry;
        }],
        execute: function () {
            _export('InpageViewStrategy', InpageViewStrategy = viewStrategy(_class = function () {
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

                    entry = new TemplateRegistryEntry(this.moduleId);
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
            }()) || _class);

            _export('InpageViewStrategy', InpageViewStrategy);
        }
    };
});