import {inject, ViewResources, Container} from 'aurelia-framework';
import {TextTemplateLoader} from 'aurelia-loader-default';
import {DOM} from 'aurelia-pal';

TextTemplateLoader.prototype.loadTemplate = function(loader, entry) {
    return loader.loadText(entry.address).then(function(text) {
        let template = entry.template = DOM.createTemplateFromMarkup(text);
        let inpageTemplates = template.content.querySelectorAll('[as-template]');
        if (inpageTemplates.length) {
            let templatingResources = Container.instance.get(InpageTemplatingResources);
            inpageTemplates.forEach((element) => templatingResources.parseTemplate(element) );
        }
    });
};


/*
    Stores in-page templates
 */
@inject(ViewResources, Container)
export class InpageTemplatingResources {

    _templates = {};
    _observers =  [];

    constructor(viewResources, container) {
        this.viewResources = viewResources;
        this.container = container;
    }

    initialize() {
        // find inpage teplates in document
        let inpageTemplates = Array.from(document.querySelectorAll('[as-template]'));

        inpageTemplates.forEach((element) => this.parseTemplate(element) );
    }

    observe(templateName, listener) {
        let index = this._observers.push({templateName, listener}) - 1;
        let unobserve = () => { delete this._observers[index]; };

        return unobserve;
    }

    parseTemplate(element) {

        let templateName = element.getAttribute('as-template');

        if (!this.hasTemplate(templateName)) {
            let newElement = element.cloneNode(true);

            newElement.removeAttribute('id');
            newElement.classList.remove('au-target');

            this._walkTheDOM(newElement, (node) => {
                if (node.attributes) {
                    Array.from(node.attributes).forEach((item) => {
                        let bindings = item.name.match(/(textcontent|src|srcset|fallback)\.(bind|one-way|two-way|one-time)/);

                        if (bindings) {
                            node.removeAttribute(bindings[1]);
                            node.textContent = '';
                            item.value = item.value.replace(/\&\s*progressiveRepeater:[\s\S]+:[\s\S]+/, '');
                        }
                    });
                }
            });
            newElement.removeAttribute('as-template');
            newElement.removeAttribute('as-element');

            let template = `<template>${newElement.outerHTML}</template>`;
            this.addTemplate(templateName, template);
        }

        element.removeAttribute('as-template');
    }

    _walkTheDOM(node, func) {
        func(node);
        node = node.firstChild;
        while (node) {
            this._walkTheDOM(node, func);
            node = node.nextSibling;
        }
    }

    addTemplate(name, markup) {
        this._templates[name] = markup;

        this._observers.forEach((o) => {
            if (o.templateName === name) {
                o.listener(markup);
            }
        });
    }

    removeTemplate(name) {
        delete this._templates[name];
    }

    hasTemplate(name) {
        return this._templates[name] ? true : false;
    }

    getTemplate(name) {
        return this._templates[name];
    }

    getTemplateAsync(name) {
        return Promise.resolve(this._templates[name]);
    }
}