'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.InpageTemplatingResources = undefined;

var _dec, _class;

var _aureliaFramework = require('aurelia-framework');

var _aureliaLoaderDefault = require('aurelia-loader-default');

var _aureliaPal = require('aurelia-pal');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

_aureliaLoaderDefault.TextTemplateLoader.prototype.loadTemplate = function (loader, entry) {
    return loader.loadText(entry.address).then(function (text) {
        var template = entry.template = _aureliaPal.DOM.createTemplateFromMarkup(text);
        var inpageTemplates = template.content.querySelectorAll('[as-template]');
        if (inpageTemplates.length) {
            (function () {
                var templatingResources = _aureliaFramework.Container.instance.get(InpageTemplatingResources);
                inpageTemplates.forEach(function (element) {
                    return templatingResources.parseTemplate(element);
                });
            })();
        }
    });
};

var InpageTemplatingResources = exports.InpageTemplatingResources = (_dec = (0, _aureliaFramework.inject)(_aureliaFramework.ViewResources, _aureliaFramework.Container), _dec(_class = function () {
    function InpageTemplatingResources(viewResources, container) {
        _classCallCheck(this, InpageTemplatingResources);

        this._templates = {};
        this._observers = [];

        this.viewResources = viewResources;
        this.container = container;
    }

    InpageTemplatingResources.prototype.initialize = function initialize() {
        var _this = this;

        var inpageTemplates = Array.from(document.querySelectorAll('[as-template]'));

        inpageTemplates.forEach(function (element) {
            return _this.parseTemplate(element);
        });
    };

    InpageTemplatingResources.prototype.observe = function observe(templateName, listener) {
        var _this2 = this;

        var index = this._observers.push({ templateName: templateName, listener: listener }) - 1;
        var unobserve = function unobserve() {
            delete _this2._observers[index];
        };

        return unobserve;
    };

    InpageTemplatingResources.prototype.parseTemplate = function parseTemplate(element) {

        var templateName = element.getAttribute('as-template');

        if (!this.hasTemplate(templateName)) {
            var newElement = element.cloneNode(true);

            newElement.removeAttribute('id');
            newElement.classList.remove('au-target');

            this._walkTheDOM(newElement, function (node) {
                if (node.attributes) {
                    Array.from(node.attributes).forEach(function (item) {
                        var bindings = item.name.match(/(textcontent|src|srcset|fallback)\.(bind|one-way|two-way|one-time)/);

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

            var template = '<template>' + newElement.outerHTML + '</template>';
            this.addTemplate(templateName, template);
        }

        element.removeAttribute('as-template');
    };

    InpageTemplatingResources.prototype._walkTheDOM = function _walkTheDOM(node, func) {
        func(node);
        node = node.firstChild;
        while (node) {
            this._walkTheDOM(node, func);
            node = node.nextSibling;
        }
    };

    InpageTemplatingResources.prototype.addTemplate = function addTemplate(name, markup) {
        this._templates[name] = markup;

        this._observers.forEach(function (o) {
            if (o.templateName === name) {
                o.listener(markup);
            }
        });
    };

    InpageTemplatingResources.prototype.removeTemplate = function removeTemplate(name) {
        delete this._templates[name];
    };

    InpageTemplatingResources.prototype.hasTemplate = function hasTemplate(name) {
        return this._templates[name] ? true : false;
    };

    InpageTemplatingResources.prototype.getTemplate = function getTemplate(name) {
        return this._templates[name];
    };

    InpageTemplatingResources.prototype.getTemplateAsync = function getTemplateAsync(name) {
        return Promise.resolve(this._templates[name]);
    };

    return InpageTemplatingResources;
}()) || _class);