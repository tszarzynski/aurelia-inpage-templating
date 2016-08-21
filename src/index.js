import {InpageTemplatingResources} from './inpage-templating-resources.js';

export {inpageView} from './inpage-view-strategy.js';
export {AsTemplateCustomAttribute} from './inpage-template-custom-attribute.js';

export function configure(config, callback) {
    let resources = config.container.get(InpageTemplatingResources);
    resources.initialize();
    if (typeof callback === 'function') { callback(animator); }
}