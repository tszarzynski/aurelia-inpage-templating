var _class;

import { inject, Container } from 'aurelia-dependency-injection';
import { InlineViewStrategy, useViewStrategy, viewStrategy } from 'aurelia-templating';
import { InpageTemplatingResources } from './inpage-templating-resources';
import { TemplateRegistryEntry } from 'aurelia-loader';

export function inpageView(templateName, dependencies, dependencyBaseUrl) {
    let templatingResources = Container.instance.get(InpageTemplatingResources);
    let markup = templatingResources.getTemplate(templateName);

    return useViewStrategy(markup ? new InlineViewStrategy(markup, dependencies, dependencyBaseUrl) : new InpageViewStrategy(templateName, templatingResources));
}

export let InpageViewStrategy = viewStrategy(_class = class InpageViewStrategy {

    constructor(templateName, templatingResources) {
        this.templateName = templateName;
        this.templatingResources = templatingResources;
    }

    loadViewFactory(viewEngine, compileInstruction, loadContext) {

        let entry = this.entry;

        if (entry && entry.factoryIsReady) {
            return Promise.resolve(entry.factory);
        }

        let template = this.parseTemplate('<template>Missing inpage template!</template>');

        entry = new TemplateRegistryEntry(this.moduleId);
        entry.factory = viewEngine.viewCompiler.compile(template, viewEngine.appResources, compileInstruction);

        let unobserve = this.templatingResources.observe(this.templateName, markup => {

            let vf = viewEngine.viewCompiler.compile(this.parseTemplate(markup), viewEngine.appResources, compileInstruction);
            entry.factory.template = vf.template;
            entry.factory.instructions = vf.instructions;

            unobserve();
        });

        return Promise.resolve(entry.factory);
    }

    parseTemplate(html) {

        let parser = document.createElement('div');
        parser.innerHTML = html;

        let temp = parser.firstElementChild;
        if (!temp || temp.nodeName !== 'TEMPLATE') {
            throw new Error('Template markup must be wrapped in a <template> element e.g. <template> <!-- markup here --> </template>');
        }

        return temp;
    }
}) || _class;