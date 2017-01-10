var _class;

import { InlineViewStrategy, Container, useViewStrategy, viewStrategy } from 'aurelia-framework';
import { InpageTemplatingResources } from './inpage-templating-resources';
import { TemplateRegistryEntry } from 'aurelia-loader';
import { DOM } from 'aurelia-pal';

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

        let template = DOM.createTemplateFromMarkup(`<template>Missing inpage template: ${ this.templateName }</template>`);

        entry = new TemplateRegistryEntry(this.moduleId);
        entry.factory = viewEngine.viewCompiler.compile(template, viewEngine.appResources, compileInstruction);

        let unobserve = this.templatingResources.observe(this.templateName, markup => {

            let vf = viewEngine.viewCompiler.compile(DOM.createTemplateFromMarkup(markup), viewEngine.appResources, compileInstruction);
            entry.factory.template = vf.template;
            entry.factory.instructions = vf.instructions;

            unobserve();
        });

        return Promise.resolve(entry.factory);
    }
}) || _class;