var _dec, _dec2, _class;

import { inject } from 'aurelia-dependency-injection';
import { customAttribute } from 'aurelia-templating';
import { InpageTemplatingResources } from './inpage-templating-resources';

export let AsTemplateCustomAttribute = (_dec = customAttribute('as-template'), _dec2 = inject(Element, InpageTemplatingResources), _dec(_class = _dec2(_class = class AsTemplateCustomAttribute {
    constructor(element, inpageTemplatingResources) {
        inpageTemplatingResources.parseTemplate(element);
    }
}) || _class) || _class);