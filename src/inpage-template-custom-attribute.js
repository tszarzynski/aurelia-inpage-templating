/*
    Custom attribute used to mark a piece of markup as template
 */
import {inject, customAttribute} from 'aurelia-framework';
import {InpageTemplatingResources} from './inpage-templating-resources';

@customAttribute('as-template')
@inject(Element, InpageTemplatingResources)
export class AsTemplateCustomAttribute {
    constructor(element, inpageTemplatingResources) {
        inpageTemplatingResources.parseTemplate(element);
    }
}