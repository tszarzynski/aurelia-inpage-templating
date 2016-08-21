/*
    Inpage Template
 */
import {inject} from 'aurelia-dependency-injection';
import {customAttribute} from 'aurelia-templating';
import {InpageTemplatingResources} from './inpage-templating-resources';

@customAttribute('as-template')
@inject(Element, InpageTemplatingResources)
export class AsTemplateCustomAttribute {
    constructor(element, inpageTemplatingResources) {
        inpageTemplatingResources.parseTemplate(element);
    }
}