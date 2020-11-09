self["webpackChunk"](["vendors~chunks/docs-app-mjs"],{

/***/ "./node_modules/neo.mjs/src/container/Panel.mjs":
/*!******************************************************!*\
  !*** ./node_modules/neo.mjs/src/container/Panel.mjs ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Panel; });
/* harmony import */ var _Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Base.mjs */ "./node_modules/neo.mjs/src/container/Base.mjs");
/* harmony import */ var _Toolbar_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Toolbar.mjs */ "./node_modules/neo.mjs/src/container/Toolbar.mjs");



/**
 * An extended Container supporting multiple docked header toolbars
 * @class Neo.container.Panel
 * @extends Neo.container.Base
 */
class Panel extends _Base_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
    static getConfig() {return {
        /**
         * @member {String} className='Neo.container.Panel'
         * @protected
         */
        className: 'Neo.container.Panel',
        /**
         * @member {String} ntype='panel'
         * @protected
         */
        ntype: 'panel',
        /**
         * @member {String[]} cls=['neo-panel','neo-container']
         */
        cls: ['neo-panel', 'neo-container'],
        /**
         * @member {Object} containerConfig=null
         */
        containerConfig: null,
        /**
         * @member {Object} headerDefaults=null
         */
        headerDefaults: null,
        /**
         * @member {Array} headers=null
         */
        headers: null,
        /**
         * @member {Object} items={ntype: 'vbox', align: 'stretch'}
         */
        _layout: {
            ntype: 'vbox',
            align: 'stretch'
        },
        /**
         * @member {Boolean} verticalHeadersFirst=false
         */
        verticalHeadersFirst: false
    }}

    /**
     *
     * @param {Object} config
     */
    constructor(config) {
        super(config);

        let me = this,
            hf = config && config.verticalHeadersFirst === true || me.verticalHeadersFirst === true;

        if (hf) {
            me.layout = {
                ntype: 'hbox',
                align: 'stretch'
            };
        }
    }

    /**
     *
     */
    createItems() {
        let me                   = this,
            hf                   = me.verticalHeadersFirst === false,
            headers              = me.headers || [],
            bottomHeaders        = headers.filter(header => {return header.dock === (hf ?'bottom': 'right')}),
            leftHeaders          = headers.filter(header => {return header.dock === (hf ?'left'  : 'top')}),
            rightHeaders         = headers.filter(header => {return header.dock === (hf ?'right' : 'bottom')}),
            topHeaders           = headers.filter(header => {return header.dock === (hf ?'top'   : 'left')}),
            hasHorizontalHeaders = bottomHeaders.length > 0 || topHeaders  .length > 0,
            hasVerticalHeaders   = leftHeaders  .length > 0 || rightHeaders.length > 0,
            items                = me.items,
            horizontalItems      = [],
            verticalItems        = [],
            config;

        if (headers.length < 1) {
            Neo.error('Panel without headers, please use a Container instead', me.id);
        }

        topHeaders.forEach(header => {
            verticalItems.push(Panel.createHeaderConfig(header));
        });

        if (hasVerticalHeaders && (hf && hasHorizontalHeaders || !hf && hasHorizontalHeaders)) {
            leftHeaders.forEach(header => {
                horizontalItems.push(Panel.createHeaderConfig(header));
            });

            config = {
                ntype       : 'container',
                flex        : 1,
                items       : items,
                itemDefaults: me.itemDefaults,
                ...me.containerConfig || {}
            };

            horizontalItems.push({...me.headerDefaults, ...config});

            rightHeaders.forEach(header => {
                horizontalItems.push(Panel.createHeaderConfig(header));
            });

            verticalItems.push({
                ntype : 'container',
                items : horizontalItems,
                layout: {
                    ntype: (hf ? 'hbox' : 'vbox'),
                    align: 'stretch'
                }
            });
        } else {
            config = {
                ntype       : 'container',
                flex        : 1,
                items       : items,
                itemDefaults: me.itemDefaults,
                ...me.containerConfig || {}
            };

            verticalItems.push({...me.headerDefaults, ...config});
        }

        bottomHeaders.forEach(header => {
            verticalItems.push(Panel.createHeaderConfig(header));
        });

        me.items = verticalItems;

        me.itemDefaults = null;

        super.createItems();
    }

    /**
     *
     * @param {Object} header the header config
     * @returns {Object}
     */
    static createHeaderConfig(header) {
        let config = {
            ntype: 'toolbar',
            flex : '0 1 auto'
        };

        if (header.text) {
            config.items = [
                {
                    ntype: 'label',
                    cls  : ['neo-panel-header-text', 'neo-label'],
                    text : header.text
                }
            ];

            delete header.text;
        }

        // assuming all labels inside a Panel Header are meant to be titles -> look the same way
        if (Neo.isArray(header.items)) {
            header.items.forEach(item => {
                if (item.ntype === 'label') {
                    item.cls = ['neo-panel-header-text', 'neo-label'];
                }
            });
        }

        return {...config, ...header};
    }
}

Neo.applyClassConfig(Panel);



/***/ }),

/***/ "./node_modules/neo.mjs/src/controller/Component.mjs":
/*!***********************************************************!*\
  !*** ./node_modules/neo.mjs/src/controller/Component.mjs ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Component; });
/* harmony import */ var _Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Base.mjs */ "./node_modules/neo.mjs/src/controller/Base.mjs");
/* harmony import */ var _manager_Component_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../manager/Component.mjs */ "./node_modules/neo.mjs/src/manager/Component.mjs");
/* harmony import */ var _manager_DomEvent_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../manager/DomEvent.mjs */ "./node_modules/neo.mjs/src/manager/DomEvent.mjs");
/* harmony import */ var _core_Logger_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/Logger.mjs */ "./node_modules/neo.mjs/src/core/Logger.mjs");
/* harmony import */ var _util_Function_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../util/Function.mjs */ "./node_modules/neo.mjs/src/util/Function.mjs");






/**
 * @class Neo.controller.Component
 * @extends Neo.controller.Base
 */
class Component extends _Base_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
    static getConfig() {return {
        /**
         * @member {String} className='Neo.controller.Component'
         * @protected
         */
        className: 'Neo.controller.Component',
        /**
         * @member {String} ntype='view-controller'
         * @protected
         */
        ntype: 'component-controller',
        /**
         * @member {Object} references=null
         * @protected
         */
        references: null,
        /**
         * @member {Object} view_=null
         * @protected
         */
        view_: null
    }}

    /**
     *
     * @param {Object} config
     */
    constructor(config) {
        super(config);

        let me = this;

        me.references = {};

        _util_Function_mjs__WEBPACK_IMPORTED_MODULE_4__["default"].createSequence(me.view, 'onConstructed', me.onViewConstructed, me);
    }

    /**
     * Triggered when accessing the view config
     * @param {Boolean} value
     * @param {Boolean} oldValue
     * @protected
     */
    beforeGetView(value, oldValue) {
        return Neo.get(value);
    }

    /**
     * Triggered before the view config gets changed
     * @param {Boolean} value
     * @param {Boolean} oldValue
     * @protected
     */
    beforeSetView(value, oldValue) {
        return value.id;
    }

    /**
     *
     * @param {String} [ntype]
     * @returns {Neo.controller.Component|null}
     */
    getParent(ntype) {
        let me      = this,
            view    = me.view,
            parents = _manager_Component_mjs__WEBPACK_IMPORTED_MODULE_1__["default"].getParents(view),
            i       = 0,
            len     = parents.length,
            controller;

        for (; i < len; i++) {
            controller = parents[i].controller;

            if (controller) {
                if (ntype) {
                    if (ntype === controller.ntype) {
                        return controller;
                    }
                } else {
                    return controller;
                }
            }
        }

        return null;
    }

    /**
     *
     * @param {String} handlerName
     * @returns {Neo.controller.Component|null}
     */
    getParentHandlerScope(handlerName) {
        let me      = this,
            view    = me.view,
            parents = _manager_Component_mjs__WEBPACK_IMPORTED_MODULE_1__["default"].getParents(view),
            i       = 0,
            len     = parents.length,
            controller;

        for (; i < len; i++) {
            controller = parents[i].controller;

            if (controller && controller[handlerName]) {
                return controller;
            }
        }

        return null;
    }

    /**
     * todo: cleanup no longer existing references
     * todo: update changed references (e.g. container.remove() then container.add() using the same key)
     * @param {String} name
     * @returns {*}
     */
    getReference(name) {
        let me          = this,
            componentId = me.references[name],
            component;

        if (componentId) {
            component = Neo.getComponent(componentId);
        }

        if (!component) {
            component = me.view.down({reference: name});

            if (component) {
                me.references[name] = component.id;
            }
        }

        return component || null;
    }

    /**
     *
     * @param {Neo.component.Base} view
     */
    onViewConstructed(view) {
        let me        = this,
            childCall = !!view,
            domListeners, eventHandler, fn, parentController;

        view = view || me.view;

        view.domListeners = Neo.clone(view.domListeners, true, true); // ensure there is no interference on prototype level
        domListeners = view.domListeners;

        if (domListeners) {
            if (!Array.isArray(domListeners)) {
                domListeners = [domListeners];
            }

            domListeners.forEach(domListener => {
                Object.entries(domListener).forEach(([key, value]) => {
                    eventHandler = null;

                    if (key !== 'scope' && key !== 'delegate') {
                        if (Neo.isString(value)) {
                            eventHandler = value;
                        } else if (Neo.isObject(value) && value.hasOwnProperty('fn') && Neo.isString(value.fn)) {
                            eventHandler = value.fn;
                        }

                        if (eventHandler) {
                            if (!me[eventHandler]) {
                                parentController = me.getParentHandlerScope(eventHandler);

                                if (!parentController) {
                                    _core_Logger_mjs__WEBPACK_IMPORTED_MODULE_3__["default"].logError('Unknown domEvent handler for', view, eventHandler);
                                } else {
                                    fn               = parentController[eventHandler].bind(parentController);
                                    domListener[key] = fn;

                                    _manager_DomEvent_mjs__WEBPACK_IMPORTED_MODULE_2__["default"].updateListenerPlaceholder({
                                        componentId       : view.id,
                                        eventHandlerMethod: fn,
                                        eventHandlerName  : eventHandler,
                                        eventName         : key,
                                        scope             : parentController
                                    });
                                }
                            } else {
                                fn               = me[eventHandler].bind(me);
                                domListener[key] = fn;

                                _manager_DomEvent_mjs__WEBPACK_IMPORTED_MODULE_2__["default"].updateListenerPlaceholder({
                                    componentId       : view.id,
                                    eventHandlerMethod: fn,
                                    eventHandlerName  : eventHandler,
                                    eventName         : key,
                                    scope             : me
                                });
                            }
                        }
                    }
                });
            });
        }

        if (view.listeners) {
            Object.entries(view.listeners).forEach(([name, listener]) => {
                if (Array.isArray(listener)) {
                    listener.forEach(key => {
                        eventHandler = null;

                        if (Neo.isObject(key) && key.hasOwnProperty('fn') && Neo.isString(key.fn)) {
                            eventHandler = key.fn;

                            if (!me[eventHandler]) {
                                _core_Logger_mjs__WEBPACK_IMPORTED_MODULE_3__["default"].logError('Unknown event handler for', view, eventHandler);
                            } else {
                                key.fn = me[eventHandler].bind(me);
                            }
                        }
                    });
                }
            });
        }

        if (view.items) {
            view.items.forEach(item => {
                if (!item.controller) {
                    me.onViewConstructed(item);
                }
            });
        }

        if (!childCall) {
            me.onViewParsed();
        }
    }

    /**
     * Override this method inside your view controllers as a starting point in case you need references
     * (instead of using onConstructed() inside your controller)
     */
    onViewParsed() {

    }

    /**
     *
     * @param {Object} config
     */
    parseConfig(config) {
        let me           = this,
            view         = config || me.view,
            domListeners = view.domListeners,
            eventHandler;

        if (domListeners) {
            if (!Array.isArray(domListeners)) {
                domListeners = [domListeners];
            }

            domListeners.forEach(domListener => {
                Object.entries(domListener).forEach(([key, value]) => {
                    eventHandler = null;

                    if (key !== 'scope' && key !== 'delegate') {
                        if (Neo.isString(value)) {
                            eventHandler = value;
                        } else if (Neo.isObject(value) && value.hasOwnProperty('fn') && Neo.isString(value.fn)) {
                            eventHandler = value.fn;
                        }

                        if (eventHandler) {
                            if (!me[eventHandler]) {
                                _core_Logger_mjs__WEBPACK_IMPORTED_MODULE_3__["default"].logError('Unknown domEvent handler for', view, eventHandler);
                            } else {console.log('#', key, me.id);
                                console.log('parseConfig', eventHandler);
                                domListener[key] = me[eventHandler].bind(me);
                            }
                        }
                    }
                });
            });
        }

        if (view.listeners) {
            Object.entries(view.listeners).forEach(([key, value]) => {
                eventHandler = null;

                if (key !== 'scope' && key !== 'delegate') {
                    if (Neo.isString(value)) {
                        eventHandler = value;
                    } else if (Neo.isObject(value) && value.hasOwnProperty('fn') && Neo.isString(value.fn)) {
                        eventHandler = value.fn;
                    }

                    if (eventHandler) {
                        if (!me[eventHandler]) {
                            _core_Logger_mjs__WEBPACK_IMPORTED_MODULE_3__["default"].logError('Unknown event handler for', view, eventHandler);
                        } else {
                            view.listeners[key] = me[eventHandler].bind(me);
                        }
                    }
                }
            });
        }

        if (view.headers) {
            view.headers.forEach(header => {
                if (!header.controller) {
                    me.parseConfig(header);
                }
            });
        }

        if (view.items) {
            view.items.forEach(item => {
                if (!item.controller) {
                    me.parseConfig(item);
                }
            });
        }
    }
}

Neo.applyClassConfig(Component);



/***/ }),

/***/ "./node_modules/neo.mjs/src/data/Model.mjs":
/*!*************************************************!*\
  !*** ./node_modules/neo.mjs/src/data/Model.mjs ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Model; });
/* harmony import */ var _core_Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Base.mjs */ "./node_modules/neo.mjs/src/core/Base.mjs");


/**
 * @class Neo.data.Model
 * @extends Neo.core.Base
 */
class Model extends _core_Base_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
    static getConfig() {return {
        /**
         * @member {String} className='Neo.data.Model'
         * @protected
         */
        className: 'Neo.data.Model',
        /**
         * @member {String} ntype='model'
         * @protected
         */
        ntype: 'model',
        /**
         * @member {Array} fields_=[]
         * @protected
         */
        fields_: [],
        /**
         * @member {String} keyProperty_='id'
         * @protected
         */
        keyProperty_: 'id',
        /**
         * @member {String|null} storeId=null
         * @protected
         */
        storeId: null,
        /**
         * Set this config to true in case you want to track modified fields.
         * Be aware that this will double the amount of data inside each record,
         * since each field will get an original value flag.
         * @member {Boolean} trackModifiedFields=false
         */
        trackModifiedFields: false
    }}

    /**
     *
     * @param {Array} value
     * @param {Array} oldValue
     */
    afterSetFields(value, oldValue) {
        // todo
        // console.log('afterSetFields', value, oldValue);
    }

    /**
     * Finds a field config by a given field name
     * @param {String} key
     * @returns {Object|null} The field config object or null if no match was found
     */
    getField(key) {
        let me  = this,
            i   = 0,
            len = me.fields.length;

        for (; i < len; i++) {
            if (me.fields[i].name === key) {
                return me.fields[i];
            }
        }

        return null;
    }
}

Neo.applyClassConfig(Model);



/***/ }),

/***/ "./node_modules/neo.mjs/src/data/RecordFactory.mjs":
/*!*********************************************************!*\
  !*** ./node_modules/neo.mjs/src/data/RecordFactory.mjs ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Base.mjs */ "./node_modules/neo.mjs/src/core/Base.mjs");
/* harmony import */ var _core_Logger_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/Logger.mjs */ "./node_modules/neo.mjs/src/core/Logger.mjs");
/* harmony import */ var _Model_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Model.mjs */ "./node_modules/neo.mjs/src/data/Model.mjs");




let instance;

/**
 * @class Neo.data.RecordFactory
 * @extends Neo.core.Base
 * @singleton
 */
class RecordFactory extends _core_Base_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
    static getConfig() {return {
        /**
         * @member {String} className='Neo.data.RecordFactory'
         * @protected
         */
        className: 'Neo.data.RecordFactory',
        /**
         * @member {Boolean} singleton=true
         * @protected
         */
        singleton: true,
        /**
         * The internal record prefix for original field values.
         * Only used in case the model has trackModifiedFields set to true.
         * @member {String} ovPrefix='ov_'
         */
        ovPrefix: 'ov_',
        /**
         * @member {String} recordNamespace='Neo.data.record.'
         */
        recordNamespace: 'Neo.data.record.'
    }}

    /**
     *
     * @param {Neo.data.Model} model
     * @param {Object} config
     * @returns {Object}
     */
    createRecord(model, config) {
        let recordClass = Neo.ns(this.recordNamespace + model.className);

        if (!recordClass) {
            recordClass = this.createRecordClass(model);
        }

        return new recordClass(config);
    }

    /**
     *
     * @param {Neo.data.Model} model
     * @returns {Object}
     */
    createRecordClass(model) {
        if (model instanceof _Model_mjs__WEBPACK_IMPORTED_MODULE_2__["default"]) {
            let className = this.recordNamespace + model.className,
                ns        = Neo.ns(className),
                key, nsArray;

            model.trackModifiedFields = true; // todo: remove, just for testing

            if (!ns) {
                nsArray = className.split('.');
                key     = nsArray.pop();
                ns      = Neo.ns(nsArray, true);
                ns[key] = class Record {
                    constructor(config) {
                        let me = this,
                            properties;

                        Object.defineProperties(me, {
                            _isModified: {
                                value   : false,
                                writable: true
                            }
                        });

                        if (Array.isArray(model.fields)) {
                            model.fields.forEach(field => {
                                let parsedValue = instance.parseRecordValue(field, config[field.name]),
                                    symbol      = Symbol(field.name);

                                properties = {
                                    [symbol]: {
                                        value   : parsedValue,
                                        writable: true
                                    },
                                    [field.name]: {
                                        configurable: true,
                                        enumerable  : true,
                                        get() {
                                            return this[symbol];
                                        },
                                        set(value) {
                                            let me       = this,
                                                oldValue = me[symbol];

                                            if (instance.hasChanged(value, oldValue)) {
                                                value = instance.parseRecordValue(field, value);

                                                me[symbol] = value;

                                                me._isModified = true;
                                                me._isModified = instance.isModified(me, model.trackModifiedFields);

                                                instance.onRecordChange({
                                                    field   : field.name,
                                                    model   : model,
                                                    oldValue: oldValue,
                                                    record  : me,
                                                    value   : value
                                                });
                                            }
                                        }
                                    }
                                };

                                // adding the original value of each field
                                if (model.trackModifiedFields) {
                                    properties[instance.ovPrefix + field.name] = {
                                        value: parsedValue
                                    }
                                }

                                Object.defineProperties(me, properties);
                            });
                        }
                    }
                };


                return ns[key];
            }

            return ns;
        }
    }

    /**
     * Checks if the value of a config has changed
     * todo: we could compare objects & arrays for equality
     * @param {*} value
     * @param {*} oldValue
     * @returns {Boolean}
     * @private
     */
    hasChanged(value, oldValue) {
        if (Array.isArray(value)) {
            return true;
        } else if (Neo.isObject(value)) {
            if (oldValue instanceof Date && value instanceof Date) {
                return oldValue.valueOf() !== value.valueOf();
            }

            return true;
        }

        return oldValue !== value;
    }

    /**
     *
     * @param {Object} record
     * @param {Boolean} trackModifiedFields
     * @returns {Boolean} true in case a change was found
     */
    isModified(record, trackModifiedFields) {
        if (trackModifiedFields) {
            let fields = Object.keys(record),
                i      = 0,
                len    = fields.length,
                field;

            for (; i < len; i++) {
                field = fields[i];

                if (record[field] !== record[this.ovPrefix + field]) {
                    return true;
                }
            }

            return false;
        }

        return record._isModified;
    }

    /**
     *
     * @param {Object} record
     * @param {String} fieldName
     * @returns {Boolean|null} null in case the model does not use trackModifiedFields, true in case a change was found
     */
    isModifiedField(record, fieldName) {
        if (!record.hasOwnProperty(fieldName)) {
            _core_Logger_mjs__WEBPACK_IMPORTED_MODULE_1__["default"].logError('The record does not contain the field', fieldName, record);
        }

        if (record.hasOwnProperty(this.ovPrefix + fieldName)) {
            return record[fieldName] !== record[this.ovPrefix + fieldName];
        }

        return null;
    }

    /**
     * Tests if a given object is an instance of a class created by this factory
     * @param {Object} obj
     * @returns {Boolean}
     */
    isRecord(obj) {
        return obj && obj.constructor && obj.constructor.name && obj.constructor.name === 'Record';
    }

    /**
     * Gets triggered after changing the value of a record field.
     * E.g. myRecord.foo = 'bar';
     * @param {Object} opts
     * @param {String} opts.field The name of the field which got changed
     * @param {Neo.data.Model} opts.model The model instance of the changed record
     * @param {*} opts.oldValue
     * @param {Object} opts.record
     * @param {*} opts.value
     */
    onRecordChange(opts) {
        let store = Neo.get(opts.model.storeId);

        if (store) {
            store.onRecordChange(opts);
        }
    }

    /**
     * todo: parse value for more field types
     * @param {Object} field
     * @param {*} value
     * @returns {*}
     */
    parseRecordValue(field, value) {
        const type = field.type && field.type.toLowerCase();

        if (type === 'date') {
            return new Date(value);
        }

        return value;
    }
}

Neo.applyClassConfig(RecordFactory);

instance = Neo.create(RecordFactory);

Neo.applyToGlobalNs(instance);

/* harmony default export */ __webpack_exports__["default"] = (instance);

/***/ }),

/***/ "./node_modules/neo.mjs/src/data/Store.mjs":
/*!*************************************************!*\
  !*** ./node_modules/neo.mjs/src/data/Store.mjs ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Store; });
/* harmony import */ var _collection_Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../collection/Base.mjs */ "./node_modules/neo.mjs/src/collection/Base.mjs");
/* harmony import */ var _util_ClassSystem_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/ClassSystem.mjs */ "./node_modules/neo.mjs/src/util/ClassSystem.mjs");
/* harmony import */ var _Model_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Model.mjs */ "./node_modules/neo.mjs/src/data/Model.mjs");
/* harmony import */ var _core_Observable_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/Observable.mjs */ "./node_modules/neo.mjs/src/core/Observable.mjs");
/* harmony import */ var _RecordFactory_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./RecordFactory.mjs */ "./node_modules/neo.mjs/src/data/RecordFactory.mjs");






/**
 * @class Neo.data.Store
 * @extends Neo.collection.Base
 */
class Store extends _collection_Base_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
    static getStaticConfig() {return {
        /**
         * True automatically applies the core/Observable.mjs mixin
         * @member {Boolean} observable=true
         * @static
         */
        observable: true
    }}

    static getConfig() {return {
        /**
         * @member {String} className='Neo.data.Store'
         * @protected
         */
        className: 'Neo.data.Store',
        /**
         * @member {String} ntype='store'
         * @protected
         */
        ntype: 'store',
        /**
         * @member {Boolean} autoLoad=false
         */
        autoLoad: false,
        /**
         * @member {Array|null} data_=null
         */
        data_: null,
        /**
         * @member {Array|null} initialData_=null
         */
        initialData_: null,
        /**
         * @member {Boolean} isGrouped=false
         */
        isGrouped: false,
        /**
         * @member {Boolean} isLoaded=false
         */
        isLoaded: false,
        /**
         * @member {Boolean} isLoading=false
         */
        isLoading: false,
        /**
         * @member {Neo.data.Model} model_=null
         */
        model_: null,
        /**
         * True to let the backend handle the filtering.
         * Useful for buffered stores
         * @member {Boolean} remoteFilter=false
         */
        remoteFilter: false,
        /**
         * True to let the backend handle the sorting.
         * Useful for buffered stores
         * @member {Boolean} remoteSort=false
         */
        remoteSort: false,
        /**
         * Url for Ajax requests
         * @member {String|null} url=null
         */
        url: null
    }}

    constructor(config) {
        super(config);

        let me = this;

        // todo
        me.on({
            mutate: me.onCollectionMutate,
            sort  : me.onCollectionSort,
            scope : me
        });
    }

    /**
     *
     */
    onConstructed() {
        super.onConstructed();

        let me = this;

        if (me.data) {
            me.afterSetData(me.data);
        }

        if (me.autoLoad) {
            setTimeout(() => { // todo
                me.load();
            }, 100);
        }
    }

    /**
     *
     * @param value
     * @param oldValue
     * @protected
     */
    afterSetData(value, oldValue) {
        let me = this;

        if (me.configsApplied) {
            if (value) {
                if (oldValue) {
                    me.clear();
                } else {
                    me.initialData = [...value];
                }

                me.add(value);
            }
        }
    }

    /**
     *
     * @param value
     * @param oldValue
     * @protected
     */
    afterSetInitialData(value, oldValue) {
        // console.log('afterSetInitialData', value, oldValue);
    }

    /**
     *
     * @param value
     * @param oldValue
     * @protected
     */
    afterSetModel(value, oldValue) {
        if (value) {
            value.storeId = this.id;
            _RecordFactory_mjs__WEBPACK_IMPORTED_MODULE_4__["default"].createRecordClass(value);
        }
    }

    /**
     *
     * @param value
     * @param oldValue
     * @protected
     * @returns {*}
     */
    beforeSetData(value, oldValue) {
        let me = this;

        if (value) {
            if (!Array.isArray(value)) {
                value = [value];
            }

            // todo: add a config to make the cloning optional
            value = Neo.clone(value, true);

            value.forEach((key, index) => {
                if (!_RecordFactory_mjs__WEBPACK_IMPORTED_MODULE_4__["default"].isRecord(key)) {
                    value[index] = _RecordFactory_mjs__WEBPACK_IMPORTED_MODULE_4__["default"].createRecord(me.model, key);
                }
            });

            // console.log('beforeSetData', value);
        }

        return value;
    }

    /**
     *
     * @param value
     * @param oldValue
     * @protected
     * @returns {*}
     */
    beforeSetInitialData(value, oldValue) {
        if (!value && oldValue) {
            return oldValue;
        }

        return value;
    }

    /**
     *
     * @param {Neo.data.Model} value
     * @param {Neo.data.Model} oldValue
     * @protected
     * @returns {Neo.data.Model}
     */
    beforeSetModel(value, oldValue) {
        if (oldValue) {
            oldValue.destroy();
        }

        return _util_ClassSystem_mjs__WEBPACK_IMPORTED_MODULE_1__["default"].beforeSetInstance(value, _Model_mjs__WEBPACK_IMPORTED_MODULE_2__["default"]);
    }

    /**
     *
     * @param {Object} config
     */
    createRecord(config) {
        _RecordFactory_mjs__WEBPACK_IMPORTED_MODULE_4__["default"].createRecord(config);
    }

    load() {
        let me = this;

        Neo.Xhr.promiseJson({
            url: me.url
        }).then(data => {
            me.data = Array.isArray(data.json) ? data.json : data.json.data;
            // we do not need to fire a load event => onCollectionMutate()
        }).catch(err => {
            console.log('Error for Neo.Xhr.request', err, me.id);
        });
    }

    /**
     *
     * @param {Object} opts
     */
    onCollectionMutate(opts) {
        let me = this;

        if (me.configsApplied) {
            // console.log('onCollectionMutate', opts);
            me.fire('load', me.items);
        }
    }

    /**
     * todo: add will fire mutate and sort right after another
     */
    onCollectionSort() {
        let me = this;

        if (me.configsApplied) {
            // console.log('onCollectionSort', me.collection.items);
            // me.fire('load', me.items);
        }
    }

    /**
     * Gets triggered after changing the value of a record field.
     * E.g. myRecord.foo = 'bar';
     * @param {Object} opts
     * @param {String} opts.field The name of the field which got changed
     * @param {Neo.data.Model} opts.model The model instance of the changed record
     * @param {*} opts.oldValue
     * @param {Object} opts.record
     * @param {*} opts.value
     */
    onRecordChange(opts) {
        this.fire('recordChange', opts);
    }

    /**
     *
     * @param {Object} opts
     * @param {String} opts.direction
     * @param {String} opts.property
     */
    sort(opts={}) {
        let me = this;

        if (me.remoteSort) {
            // todo
        } else {
            // console.log('sort', opts.property, opts.direction, me.configsApplied);

            if (me.configsApplied) {
                if (opts.direction) {
                    me.sorters = [{
                        direction: opts.direction,
                        property : opts.property
                    }];
                } else {
                    me.startUpdate();
                    me.clear();
                    me.sorters = [];
                    me.add([...me.initialData]);
                    me.endUpdate();
                    me.fire('sort');
                }
            }
        }
    }
}

Neo.applyClassConfig(Store);



/***/ }),

/***/ "./node_modules/neo.mjs/src/form/field/Base.mjs":
/*!******************************************************!*\
  !*** ./node_modules/neo.mjs/src/form/field/Base.mjs ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Base; });
/* harmony import */ var _component_Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../component/Base.mjs */ "./node_modules/neo.mjs/src/component/Base.mjs");


/**
 * Abstract base class for form fields
 * @class Neo.form.field.Base
 * @extends Neo.component.Base
 */
class Base extends _component_Base_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
    static getConfig() {return {
        /**
         * @member {String} className='Neo.form.field.Base'
         * @protected
         */
        className: 'Neo.form.field.Base',
        /**
         * @member {String} ntype='basefield'
         * @protected
         */
        ntype: 'basefield',
        /**
         * @member {*} value_=null
         */
        value_: null
    }}

    /**
     * Triggered after the value config got changed
     * @param {*} value
     * @param {*} oldValue
     */
    afterSetValue(value, oldValue) {
        if (oldValue !== undefined) {
            this.fire('change', {
                component: this,
                oldValue : oldValue,
                value    : value
            });
        }
    }

    /**
     *
     * @returns {*} this.value
     */
    getSubmitValue() {
        return this.value;
    }

    /**
     *
     * @returns {Boolean}
     */
    isValid() {
        return true;
    }
}

/**
 * The change event fires after the value config gets changed
 * @event change
 * @param {*} value
 * @param {*} oldValue
 * @returns {Object}
 */

Neo.applyClassConfig(Base);



/***/ }),

/***/ "./node_modules/neo.mjs/src/form/field/Search.mjs":
/*!********************************************************!*\
  !*** ./node_modules/neo.mjs/src/form/field/Search.mjs ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Search; });
/* harmony import */ var _Text_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Text.mjs */ "./node_modules/neo.mjs/src/form/field/Text.mjs");


/**
 * @class Neo.form.field.Search
 * @extends Neo.form.field.Text
 */
class Search extends _Text_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
    static getConfig() {return {
        /**
         * @member {String} className='Neo.form.field.Search'
         * @protected
         */
        className: 'Neo.form.field.Search',
        /**
         * @member {String} ntype='searchfield'
         * @protected
         */
        ntype: 'searchfield',
        /**
         * @member {Array} cls=['neo-searchfield', 'neo-textfield']
         */
        cls: ['neo-searchfield', 'neo-textfield'],
        /**
         * Value for the hideLabel_ textfield config
         * @member {Boolean} hideLabel=true
         */
        hideLabel: true,
        /**
         * Value for the placeholderText_ textfield config
         * @member {String} placeholderText='Search'
         */
        placeholderText: 'Search',
    }}
}

Neo.applyClassConfig(Search);



/***/ }),

/***/ "./node_modules/neo.mjs/src/form/field/Text.mjs":
/*!******************************************************!*\
  !*** ./node_modules/neo.mjs/src/form/field/Text.mjs ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Text; });
/* harmony import */ var _Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Base.mjs */ "./node_modules/neo.mjs/src/form/field/Base.mjs");
/* harmony import */ var _trigger_Base_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./trigger/Base.mjs */ "./node_modules/neo.mjs/src/form/field/trigger/Base.mjs");
/* harmony import */ var _trigger_Clear_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./trigger/Clear.mjs */ "./node_modules/neo.mjs/src/form/field/trigger/Clear.mjs");
/* harmony import */ var _util_Array_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../util/Array.mjs */ "./node_modules/neo.mjs/src/util/Array.mjs");
/* harmony import */ var _util_VDom_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../util/VDom.mjs */ "./node_modules/neo.mjs/src/util/VDom.mjs");
/* harmony import */ var _util_VNode_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../util/VNode.mjs */ "./node_modules/neo.mjs/src/util/VNode.mjs");







/**
 * @class Neo.form.field.Text
 * @extends Neo.form.field.Base
 */
class Text extends _Base_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
    static getStaticConfig() {return {
        /**
         * Valid values for labelPosition
         * @member {String[]} labelPositions=['bottom', 'inline', 'left', 'right', 'top']
         * @protected
         * @static
         */
        labelPositions: ['bottom', 'inline', 'left', 'right', 'top']
    }}

    static getConfig() {return {
        /**
         * @member {String} className='Neo.form.field.Text'
         * @protected
         */
        className: 'Neo.form.field.Text',
        /**
         * @member {String} ntype='textfield'
         * @protected
         */
        ntype: 'textfield',
        /**
         * Internal variable to store the actual width for the label centerBorderEl
         * (only needed for labelPosition: 'inline')
         * @member {Number|null} centerBorderElWidth=null
         * @protected
         */
        centerBorderElWidth: null,
        /**
         * True shows a clear trigger in case the field has a non empty value.
         * @member {Boolean} clearable_=true
         */
        clearable_: true,
        /**
         * True will reset the field to its initial value config.
         * Recommended for fields with required: true
         * @member {Boolean} clearToOriginalValue=false
         */
        clearToOriginalValue_: false,
        /**
         * @member {String[]} cls=['neo-textfield']
         */
        cls: ['neo-textfield'],
        /**
         * @member {Boolean} hideLabel_=false
         */
        hideLabel_: false,
        /**
         * @member {String} inputType_='text'
         */
        inputType_: 'text',
        /**
         * @member {String} labelPosition_='left'
         */
        labelPosition_: 'left',
        /**
         * @member {String} labelText_='LabelText'
         */
        labelText_: 'LabelText',
        /**
         * defaults to px
         * @member {Number|String} labelWidth_=150
         */
        labelWidth_: 150,
        /**
         * @member {String|null} placeholderText_=null
         */
        placeholderText_: null,
        /**
         * @member {Boolean} required_=false
         */
        required_: false,
        /**
         * @member {Object|Object[]|null} triggers_=null
         */
        triggers_: null,
        /**
         * @member {Object} _vdom
         */
        _vdom: {
            cn: [{
                tag  : 'label',
                cls  : ['neo-textfield-label'],
                style: {}
            }, {
                tag         : 'input',
                autocomplete: 'off',
                autocorrect : 'off',
                cls         : ['neo-textfield-input'],
                flag        : 'neo-real-input',
                spellcheck  : 'false',
                style       : {}
            }]
        }
    }}

    /**
     *
     * @param {Object} config
     */
    constructor(config) {
        super(config);

        let me           = this,
            domListeners = Neo.clone(me.domListeners, true, true),
            vdom         = me.vdom,
            inputEl      = me.getInputEl(),
            labelEl      = me.getLabelEl();

        inputEl.id = labelEl.for = me.id + '-input';

        me.vdom = vdom;

        domListeners.push({
            input: {
                fn   : me.onInputValueChange,
                scope: me
            }
        });

        me.domListeners = domListeners;
    }

    /**
     *
     * @param {Object} config
     * @param {Boolean} [preventOriginalConfig] True prevents the instance from getting an originalConfig property
     * @returns {Object} config
     */
    mergeConfig(...args) {
        let me       = this,
            config   = super.mergeConfig(...args),
            triggers = config.triggers || me.triggers;

        me[triggers ? 'triggers' : '_triggers'] = triggers;

        delete config.triggers;
        return config;
    }

    /**
     * Triggered after the clearable config got changed
     * @param {Boolean} value
     * @param {Boolean} oldValue
     * @protected
     */
    afterSetClearable(value, oldValue) {
        let me = this,
            triggers;

        if (value) {
            triggers = me.triggers || [];
            triggers.unshift(_trigger_Clear_mjs__WEBPACK_IMPORTED_MODULE_2__["default"]);
            me.triggers = triggers;
        } else {
            me.removeTrigger('clear');
        }
    }

    /**
     * Triggered after the clearToOriginalValue config got changed
     * @param {Boolean} value
     * @param {Boolean} oldValue
     * @protected
     */
    afterSetClearToOriginalValue(value, oldValue) {
        this.fire('changeClearToOriginalValue', {
            oldValue: oldValue,
            value   : value
        });
    }

    /**
     * Triggered after the hideLabel config got changed
     * @param {Boolean} value
     * @param {Boolean} oldValue
     * @protected
     */
    afterSetHideLabel(value, oldValue) {
        let me   = this,
            vdom = me.vdom;

        vdom.cn[0].removeDom = value;
        me._vdom = vdom; // silent update

        me.updateInputWidth();
    }

    /**
     * Triggered after the inputType config got changed
     * @param {String} value
     * @param {String} oldValue
     * @protected
     */
    afterSetInputType(value, oldValue) {
        this.changeInputElKey('type', value);
    }

    /**
     * Triggered after the labelPosition config got changed
     * @param {String} value
     * @param {String} oldValue
     * @protected
     */
    afterSetLabelPosition(value, oldValue) {
        let me  = this,
            cls = me.cls,
            centerBorderElCls, isEmpty, vdom;

        _util_Array_mjs__WEBPACK_IMPORTED_MODULE_3__["default"].remove(cls, 'label-' + oldValue);
        _util_Array_mjs__WEBPACK_IMPORTED_MODULE_3__["default"].add(cls, 'label-' + value);
        me[oldValue === 'inline' || value === 'inline' ? '_cls' : 'cls'] = cls; // silent update if needed

        if (oldValue === 'inline') {
            vdom = me.vdom;

            vdom.cn[0] = me.getLabelEl(); // remove the wrapper

            vdom.cn[0].width = me.labelWidth;

            me._vdom = vdom; // silent update
            me.updateInputWidth();
        } else if (value === 'inline') {
            centerBorderElCls = ['neo-center-border'];
            isEmpty           = me.isEmpty();
            vdom              = me.vdom;

            if (!isEmpty) {
                centerBorderElCls.push('neo-float-above');
            }

            delete vdom.cn[0].width;

            vdom.cn[0] = {
                cls: ['neo-label-wrapper'],
                cn : [{
                    cls: ['neo-left-border']
                }, {
                    cls: centerBorderElCls,
                    cn : [vdom.cn[0]]
                }, {
                    cls: ['neo-right-border']
                }]
            };

            me._vdom = vdom; // silent update
            me.updateInputWidth();

            if (!isEmpty) {
                setTimeout(() => {
                    me.updateCenterBorderElWidth(false);
                }, 20);
            }
        }
    }

    /**
     * Triggered after the labelText config got changed
     * @param {String} value
     * @param {String} oldValue
     * @protected
     */
    afterSetLabelText(value, oldValue) {
        let me      = this,
            isEmpty = me.isEmpty(),
            vdom    = me.vdom;

        me.getLabelEl().innerHTML = value;

        if (me.hideLabel) {
            me._vdom = vdom; // silent update
        } else {
            if (me.labelPosition === 'inline') {
                if (!isEmpty) {
                    delete me.getCenterBorderEl().width;
                }

                me.promiseVdomUpdate(vdom).then(() => {
                    me.updateCenterBorderElWidth(isEmpty);
                });
            } else {
                me.vdom = vdom;
            }
        }
    }

    /**
     * Triggered after the labelWidth config got changed
     * @param {Number|String} value
     * @param {Number|String} oldValue
     * @protected
     */
    afterSetLabelWidth(value, oldValue) {
        if (this.labelPosition !== 'inline') {
            let me    = this,
                vdom  = me.vdom,
                label = vdom.cn[0];

            label.width = value;

            me._vdom = vdom; // silent update

            if (!me.hideLabel) {
                me.updateInputWidth();
            }
        }
    }

    /**
     * Triggered after the mounted config got changed
     * @param {Boolean} value
     * @param {Boolean} oldValue
     * @protected
     */
    afterSetMounted(value, oldValue) {
        super.afterSetMounted(value, oldValue);

        if (value && this.labelPosition === 'inline') {
            this.updateCenterBorderElWidth();
        }
    }

    /**
     * Triggered after the placeholderText config got changed
     * @param {String|null} value
     * @param {String|null} oldValue
     * @protected
     */
    afterSetPlaceholderText(value, oldValue) {
        this.changeInputElKey('placeholder', value === '' ? null : value);
    }

    /**
     * Triggered after the required config got changed
     * @param {Boolean} value
     * @param {Boolean} oldValue
     * @protected
     */
    afterSetRequired(value, oldValue) {
        this.changeInputElKey('required', value);
    }

    /**
     * Triggered after the triggers config got changed
     * @param {Object[]} value
     * @param {Object[]} oldValue
     * @protected
     */
    afterSetTriggers(value, oldValue) {
        let me           = this,
            vdom         = me.vdom,
            inputEl      = vdom.cn[1], // inputEl or inputWrapperEl
            preTriggers  = [],
            postTriggers = [],
            width;

        // console.log(value && [...value], oldValue && [...oldValue]);

        if (oldValue) {
            oldValue.forEach(item => {
                if (!me.getTrigger(item.type)) {
                    item.destroy();
                }
            });
        }

        if (value.length > 0) {
            value.forEach(item => {
                if (item.align === 'start') {
                    preTriggers.push(item);
                } else {
                    postTriggers.push(item);
                }
            });

            postTriggers.sort((a, b) => b.weight - a.weight); // DESC
            preTriggers .sort((a, b) => a.weight - b.weight); // ASC

            postTriggers = postTriggers.map(a => a.vdom);
            preTriggers  = preTriggers .map(a => a.vdom);

            if (inputEl.tag === 'input') {
                // wrap the input tag
                vdom.cn[1] = {
                    cls  : ['neo-input-wrapper'],
                    cn   : [...preTriggers, inputEl, ...postTriggers],
                    id   : me.id + '-input-wrapper',
                    width: inputEl.width
                };

                delete inputEl.width;
            } else {
                inputEl.cn = [...preTriggers, me.getInputEl(), ...postTriggers];
            }
        } else {
            if (inputEl.tag !== 'input') {
                // replacing the input wrapper div with the input tag
                width = inputEl.width;
                vdom.cn[1] = me.getInputEl();
                vdom.cn[1].width = width;
            }
        }

        me.promiseVdomUpdate().then(() => {
            me.updateTriggerVnodes();
        });
    }

    /**
     * Triggered after the value config got changed
     * todo: add validation logic
     * @param {String} value
     * @param {String} oldValue
     * @protected
     */
    afterSetValue(value, oldValue) {
        let me   = this,
            vdom = me.vdom;

        super.afterSetValue(value, oldValue);

        me.getInputEl().value = value;

        if (!!value !== !!oldValue) { // change from empty to non empty
            _util_Array_mjs__WEBPACK_IMPORTED_MODULE_3__["default"][value && value.toString().length > 0 ? 'add' : 'remove'](me._cls, 'neo-has-content');
        }

        _util_Array_mjs__WEBPACK_IMPORTED_MODULE_3__["default"][me.originalConfig.value !== value ? 'add' : 'remove'](me._cls, 'neo-is-dirty');

        me.vdom = vdom;
    }

    /**
     * Triggered after the width config got changed
     * @param {Number|String} value
     * @param {Number|String} oldValue
     * @protected
     */
    afterSetWidth(value, oldValue) {
        super.afterSetWidth(value, oldValue);
        this.updateInputWidth();
    }

    /**
     * Return a shallow copy of the triggers config
     * @param {Array|null} value
     * @protected
     */
    beforeGetTriggers(value) {
        if (Array.isArray(value)) {
            return [...value];
        }

        return value;
    }

    /**
     * Triggered before the labelPosition config gets changed
     * @param {String} value
     * @param {String} oldValue
     * @protected
     * @returns {String}
     */
    beforeSetLabelPosition(value, oldValue) {
        return this.beforeSetEnumValue(value, oldValue, 'labelPosition');
    }

    /**
     * Triggered before the triggers config gets changed
     * @param {Object|Object[]} value
     * @param {Object[]} oldValue
     * @returns {Object[]} the parsed triggers config
     * @protected
     * @returns {Object|Object[]}
     */
    beforeSetTriggers(value, oldValue) {
        if (!value) {
            value = [];
        } else if (!Array.isArray(value)) {
            value = [value];
        }

        let me = this;

        value.forEach((item, index) => {
            if (item.isClass) {
                value[index] = Neo.create(item, {
                    id   : me.getTriggerId(item.prototype.type),
                    field: me
                });
            } else if (!(item instanceof _trigger_Base_mjs__WEBPACK_IMPORTED_MODULE_1__["default"])) {
                if (!item.module && !item.ntype) {
                    item.ntype = 'trigger';
                }

                if (item.module) {
                    item.className = item.module.prototype.className;
                    item.id        = me.getTriggerId(item.module.prototype.type);
                }

                value[index] = Neo[item.className ? 'create' : 'ntype']({...item, field: me});
            }
        });

        return value;
    }

    /**
     * Changes the value of a inputEl vdom object attribute or removes it in case it has no value
     * @param {String} key
     * @param {Array|Number|Object|String|null} value
     */
    changeInputElKey(key, value) {
        let me   = this,
            vdom = me.vdom;

        if (value || value === 0) {
            me.getInputEl()[key] = value;
        } else {
            delete me.getInputEl()[key];
        }

        me.vdom = vdom;
    }

    /**
     * Resets the field to its original value or null depending on the clearToOriginalValue config
     */
    clear() {
        let me = this;

        me.value = me.clearToOriginalValue ? me.originalConfig.value : null;
        me.fire('clear');
    }

    /**
     *
     * @returns {Object|null}
     */
    getCenterBorderEl() {
        let el = _util_VDom_mjs__WEBPACK_IMPORTED_MODULE_4__["default"].findVdomChild(this.vdom, {cls: 'neo-center-border'});
        return el && el.vdom;
    }

    /**
     *
     * @returns {Object|null}
     */
    getInputEl() {
        let el = _util_VDom_mjs__WEBPACK_IMPORTED_MODULE_4__["default"].findVdomChild(this.vdom, {flag: 'neo-real-input'});
        return el && el.vdom;
    }

    /**
     *
     * @returns {String}
     */
    getInputElId() {
        return this.id + '-input';
    }

    /**
     * Calculates the new inputWidth based on the labelWidth & total width
     * @returns {Number|null} null in case this.width is unknown
     */
    getInputWidth() {
        let me          = this,
            ignoreLabel = me.hideLabel || me.labelPosition === 'bottom' || me.labelPosition === 'inline' || me.labelPosition === 'top',
            labelWidth  = ignoreLabel ? 0 : me.labelWidth,
            width       = me.width;

        if (labelWidth && width) {
            return parseInt(width) - parseInt(labelWidth);
        } else if (width) {
            return width;
        }

        return null;
    }

    /**
     *
     * @returns {Object|null}
     */
    getLabelEl() {
        let el = _util_VDom_mjs__WEBPACK_IMPORTED_MODULE_4__["default"].findVdomChild(this.vdom, {tag: 'label'});
        return el && el.vdom;
    }

    /**
     *
     * @param {String} type
     * @returns {Neo.form.field.trigger.Base|null}
     */
    getTrigger(type) {
        let me       = this,
            triggers = me.triggers || [],
            i        = 0,
            len      = triggers.length;

        for (; i < len; i++) {
            if (triggers[i].type === type) {
                return triggers[i];
            }
        }

        return null;
    }

    /**
     *
     * @param {String} id
     * @returns {Neo.form.field.trigger.Base|null}
     */
    getTriggerById(id) {
        let me       = this,
            triggers = me.triggers || [],
            i        = 0,
            len      = triggers.length;

        for (; i < len; i++) {
            if (triggers[i].id === id) {
                return triggers[i];
            }
        }

        return null;
    }

    /**
     *
     * @param {String} type
     * @protected
     * @returns {String} The trigger node id
     */
    getTriggerId(type) {
        return this.id + '-trigger-' + type;
    }

    /**
     * Finds a trigger by a given type config
     * @param {String} type
     * @returns {Boolean}
     */
    hasTrigger(type) {
        let triggers = this.triggers || [],
            i        = 0,
            len      = triggers.length;

        for (; i < len; i++) {
            if (triggers[i].type === type) {
                return true;
            }
        }

        return false;
    }

    /**
     *
     * @returns {Boolean}
     */
    isEmpty() {
        return !(this.value && this.value.toString().length > 0);
    }

    /**
     *
     * @returns {Boolean}
     */
    isValid() {
        let me = this;

        if (me.required && (!me.value || me.value && me.value.length < 1)) {
            return false;
        }

        return super.isValid();
    }

    /**
     *
     * @param {Array} path
     * @protected
     */
    onFocusEnter(path) {
        let me  = this,
            cls = me.cls,
            vdom;

        _util_Array_mjs__WEBPACK_IMPORTED_MODULE_3__["default"].add(cls, 'neo-focus');
        me.cls = cls;

        if (me.labelPosition === 'inline') {
            if (me.centerBorderElWidth) {
                vdom = me.vdom;
                me.getCenterBorderEl().width = me.centerBorderElWidth;
                me.vdom = vdom;
            } else {
                me.updateCenterBorderElWidth(false);
            }
        }
    }

    /**
     *
     * @param {Array} path
     * @protected
     */
    onFocusLeave(path) {
        let me             = this,
            centerBorderEl = me.getCenterBorderEl(), // labelPosition: 'inline'
            cls            = me.cls,
            vdom;

        _util_Array_mjs__WEBPACK_IMPORTED_MODULE_3__["default"].remove(cls, 'neo-focus');

        if (centerBorderEl && me.isEmpty()) {
            me._cls = cls; // silent update
            vdom = me.vdom;
            delete centerBorderEl.width;
            me.vdom = vdom;
        } else {
            me.cls = cls;
        }
    }

    /**
     * @param {Object} data
     * @protected
     */
    onInputValueChange(data) {
        let me       = this,
            value    = data.value,
            oldValue = me.value,
            vnode    = _util_VNode_mjs__WEBPACK_IMPORTED_MODULE_5__["default"].findChildVnode(me.vnode, {nodeName: 'input'});

        if (vnode) {
            // required for validation -> revert a wrong user input
            vnode.vnode.attributes.value = value;
        }

        if (value !== oldValue) {
            me.value = value;
        }
    }

    /**
     * Removes all triggers of a given type
     * @param {String} type
     * @param {Boolean} [silent=false] true prevents a vdom update
     * @param {Array} [triggerSource] pass a shallow copy of this.triggers
     * @returns {Boolean} true in case a trigger was found & removed
     */
    removeTrigger(type, silent=false, triggerSource) {
        let me       = this,
            hasMatch = false,
            triggers = triggerSource || me.triggers || [],
            i        = 0,
            len      = triggers.length,
            trigger;

        for (; i < len; i++) {
            trigger = triggers[i];

            if (trigger.type === type) {
                _util_Array_mjs__WEBPACK_IMPORTED_MODULE_3__["default"].remove(triggers, trigger);
                len--;
                hasMatch = true;
            }
        }

        if (hasMatch && !silent) {
            me.triggers = triggers;
        }

        return hasMatch;
    }

    /**
     * Used for labelPosition: 'inline' to adjust the top border matching to the length of the label
     * @param {Boolean} [silent=false] true to get the value, but not apply it to the DOM
     * @protected
     */
    updateCenterBorderElWidth(silent=false) {
        let me = this;

        if (me.mounted) {
            Neo.main.DomAccess.getBoundingClientRect({
                id: me.getCenterBorderEl().id
            }).then(data => {
                me.centerBorderElWidth = Math.round(data.width * .7) + 8;

                if (!silent) {
                    let vdom = me.vdom;

                    me.getCenterBorderEl().width = me.centerBorderElWidth;
                    me.vdom = vdom;
                }
            });
        }
    }

    /**
     * Calculates the new inputWidth based on the labelWidth & total width
     * @protected
     */
    updateInputWidth() {
        let me         = this,
            inputWidth = me.getInputWidth(),
            vdom       = me.vdom;

        if (inputWidth !== null && inputWidth !== me.width) {
            vdom.cn[1].width = inputWidth;
        } else {
            delete vdom.cn[1].width;
        }

        me.vdom = vdom;
    }

    /**
     * Since triggers do not get rendered, assign the relevant props
     * todo: this could be handled by component.Base
     */
    updateTriggerVnodes() {
        let me           = this,
            triggerRoot  = me.vnode && me.vnode.childNodes[1],
            childNodes   = triggerRoot && triggerRoot.childNodes || [],
            trigger;

        childNodes.forEach(vnode => {
            trigger = me.getTriggerById(vnode.id);

            if (trigger) {
                Object.assign(trigger, {
                    vnode    : vnode,
                    _rendered: true,
                    _mounted : true
                });
            }
        });
    }
}

Neo.applyClassConfig(Text);



/***/ }),

/***/ "./node_modules/neo.mjs/src/form/field/trigger/Base.mjs":
/*!**************************************************************!*\
  !*** ./node_modules/neo.mjs/src/form/field/trigger/Base.mjs ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Base; });
/* harmony import */ var _component_Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../component/Base.mjs */ "./node_modules/neo.mjs/src/component/Base.mjs");
/* harmony import */ var _util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../util/Array.mjs */ "./node_modules/neo.mjs/src/util/Array.mjs");



/**
 * Base class for form field Triggers
 * @class Neo.form.field.trigger.Base
 * @extends Neo.component.Base
 */
class Base extends _component_Base_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
    static getStaticConfig() {return {
        /**
         * Valid values for align
         * @member {String[]} alignValues=['end', 'start']
         * @protected
         * @static
         */
        alignValues: ['end', 'start']
    }}

    static getConfig() {return {
        /**
         * @member {String} className='Neo.form.field.trigger.Base'
         * @protected
         */
        className: 'Neo.form.field.trigger.Base',
        /**
         * @member {String} ntype='trigger'
         * @protected
         */
        ntype: 'trigger',
        /**
         * @member {String} align_='end'
         */
        align_: 'end',
        /**
         * @member {String[]} cls=['neo-field-trigger']
         */
        cls: ['neo-field-trigger'],
        /**
         * @member {Neo.form.field.Base|null} field=null
         */
        field: null,
        /**
         * @member {Boolean} hidden_=false
         */
        hidden_: false,
        /**
         * @member {String|null} iconCls_=null
         */
        iconCls_: null,
        /**
         * The scope of the trigger handler
         * @member {Neo.core.Base|null} scope=null
         */
        scope: null,
        /**
         * @member {Boolean} showOnHover=false
         */
        showOnHover: false,
        /**
         * Internal flag used by field.getTrigger()
         * @member {String} type='base'
         * @protected
         */
        type: 'base',
        /**
         * @member {Object} _vdom={tabIndex: -1}
         */
        _vdom: {
            tabIndex: -1
        },
        /**
         * @member {Number} weight_=10
         */
        weight_: 10
    }}

    /**
     *
     * @param {Object} config
     */
    constructor(config) {
        super(config);

        let me             = this,
            domListeners   = Neo.clone(me.domListeners, true, true),
            fieldListeners;

        domListeners.push({
            click: {
                fn   : me.onTriggerClick,
                scope: me
            }
        });

        if (me.showOnHover) {
            me.hiden = true;

            me.field.on('constructed', () => {
                fieldListeners = !me.field.domListeners ? [] : Neo.clone(me.field.domListeners, true, true);
                fieldListeners.push({
                    mouseenter: {
                        fn    : me.onMouseEnter,
                        scope : me
                    }
                }, {
                    mouseleave: {
                        fn    : me.onMouseLeave,
                        scope : me
                    }
                });
                me.field.domListeners = fieldListeners;
                
            }, me);
        }

        me.domListeners = domListeners;
    }

    /**
     * Triggered after the align config got changed
     * @param {String} value
     * @param {String} oldValue
     * @protected
     */
    afterSetAlign(value, oldValue) {
        let cls = this.cls;

        _util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__["default"][value === 'start' ? 'add' : 'remove'](cls, 'neo-align-start');
        this.cls = cls;
    }

    /**
     * Triggered after the hidden config got changed
     * @param {Boolean} value
     * @param {Boolean} oldValue
     * @protected
     */
    afterSetHidden(value, oldValue) {
        let vdom  = this.vdom,
            style = vdom.style || {};

        style.display = value ? 'none' : 'inline-block';
        this.vdom  = vdom;
    }

    /**
     * Triggered after the iconCls config got changed
     * @param {String} value
     * @param {String} oldValue
     * @protected
     */
    afterSetIconCls(value, oldValue) {
        let cls = this.cls;

        _util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__["default"].remove(cls, oldValue);

        if (value && value !== '') {
            _util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__["default"].add(cls, value);
        }

        this.cls = cls;
    }

    /**
     * Triggered before the align config gets changed
     * @param {String} value
     * @param {String} oldValue
     * @protected
     */
    beforeSetAlign(value, oldValue) {
        return this.beforeSetEnumValue(value, oldValue, 'align', 'alignValues');
    }

    /**
     *
     */
    destroy() {
        delete this.field;
        super.destroy();
    }

    /**
     *
     */
    onMouseEnter() {
        this.hidden = false;
    }

    /**
     *
     */
    onMouseLeave() {
        this.hidden = true;
    }

    /**
     * click domEvent listener
     * @param {Object} data
     * @protected
     */
    onTriggerClick(data) {
        let me    = this,
            scope = me.scope || me;

        if (me.handler) {
            scope[me.handler].call(scope);
        }
    }
}

Neo.applyClassConfig(Base);



/***/ }),

/***/ "./node_modules/neo.mjs/src/form/field/trigger/Clear.mjs":
/*!***************************************************************!*\
  !*** ./node_modules/neo.mjs/src/form/field/trigger/Clear.mjs ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Clear; });
/* harmony import */ var _Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Base.mjs */ "./node_modules/neo.mjs/src/form/field/trigger/Base.mjs");
/* harmony import */ var _util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../util/Array.mjs */ "./node_modules/neo.mjs/src/util/Array.mjs");



/**
 * Clear Trigger to remove the input value of TextFields or subclasses
 * @class Neo.form.field.trigger.Clear
 * @extends Neo.form.field.trigger.Base
 */
class Clear extends _Base_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
    static getConfig() {return {
        /**
         * @member {String} className='Neo.form.field.trigger.Clear'
         * @protected
         */
        className: 'Neo.form.field.trigger.Clear',
        /**
         * @member {String} ntype='trigger-clear'
         * @protected
         */
        ntype: 'trigger-clear',
        /**
         * @member {String[]} cls=['neo-field-trigger', 'neo-trigger-clear']
         */
        cls: ['neo-field-trigger', 'neo-trigger-clear'],
        /**
         * @member {String|null} iconCls='fa fa-times'
         */
        iconCls: 'fa fa-times',
        /**
         * Internal flag used by field.getTrigger()
         * @member {String} type='clear'
         * @protected
         */
        type: 'clear',
        /**
         * @member {Number} weight_=20
         */
        weight: 20
    }}

    /**
     *
     */
    onConstructed() {
        super.onConstructed();

        let me = this;

        me.field.on({
            change                    : me.onFieldChange,
            changeClearToOriginalValue: me.onFieldChange,
            scope                     : me
        });

        me.hidden = me.getHiddenState();
    }

    /**
     * Triggered after the hidden config got changed
     * @param {Boolean} value
     * @param {Boolean} oldValue
     * @protected
     */
    afterSetHidden(value, oldValue) {
        let cls = this.cls;

        _util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__["default"][value ? 'add' : 'remove'](cls, 'neo-is-hidden');
        this.cls = cls;
    }

    /**
     *
     * @returns {Boolean} true in case the trigger should be hidden
     */
    getHiddenState() {
        let me    = this,
            field = me.field,
            value = field.value;

        if (field.clearToOriginalValue) {
            return value === field.originalConfig.value;
        } else {
            if (value === 0) {
                value = '0';
            }

            return !field.value || value.toString().length < 1;
        }
    }

    /**
     *
     * @param {Object} opts
     */
    onFieldChange(opts) {
        this.hidden = this.getHiddenState();
    }

    /**
     *
     * @param {Object} data
     */
    onTriggerClick(data) {
        this.field.clear();
    }
}

Neo.applyClassConfig(Clear);



/***/ }),

/***/ "./node_modules/neo.mjs/src/list/Base.mjs":
/*!************************************************!*\
  !*** ./node_modules/neo.mjs/src/list/Base.mjs ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Base; });
/* harmony import */ var _util_ClassSystem_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/ClassSystem.mjs */ "./node_modules/neo.mjs/src/util/ClassSystem.mjs");
/* harmony import */ var _component_Base_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../component/Base.mjs */ "./node_modules/neo.mjs/src/component/Base.mjs");
/* harmony import */ var _selection_ListModel_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../selection/ListModel.mjs */ "./node_modules/neo.mjs/src/selection/ListModel.mjs");
/* harmony import */ var _util_Array_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/Array.mjs */ "./node_modules/neo.mjs/src/util/Array.mjs");
/* harmony import */ var _data_Store_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../data/Store.mjs */ "./node_modules/neo.mjs/src/data/Store.mjs");






/**
 * @class Neo.list.Base
 * @extends Neo.component.Base
 */
class Base extends _component_Base_mjs__WEBPACK_IMPORTED_MODULE_1__["default"] {
    static getConfig() {return {
        /**
         * @member {String} className='Neo.list.Base'
         * @protected
         */
        className: 'Neo.list.Base',
        /**
         * @member {String} ntype='list'
         * @protected
         */
        ntype: 'list',
        /**
         * True will destroy the used collection / store when the component gets destroyed
         * @member {Boolean} autoDestroyStore=true
         */
        autoDestroyStore: true,
        /**
         * @member {String[]} cls=['neo-list-container','neo-list']
         */
        cls: ['neo-list-container', 'neo-list'],
        /**
         * @member {Boolean} disableSelection_=false
         */
        disableSelection_: false,
        /**
         * @member {String} displayField='name'
         */
        displayField: 'name',
        /**
         * @member {Boolean} draggable_=false
         */
        draggable_: false,
        /**
         * @member {Neo.draggable.list.DragZone|null} dragZone=null
         */
        dragZone: null,
        /**
         * @member {Object} dragZoneConfig=null
         */
        dragZoneConfig: null,
        /**
         * @member {Boolean} highlightFilterValue=true
         */
        highlightFilterValue: true,
        /**
         * @member {String} itemCls='neo-list-item'
         */
        itemCls: 'neo-list-item',
        /**
         * Additional used keys for the selection model
         * @member {Object} keys
         */
        keys: {},
        /**
         * Either pass a selection.Model module, an instance or a config object
         * @member {Object|Neo.selection.Model} selectionModel_=null
         */
        selectionModel_: null,
        /**
         * Set this to true in case a select event should only update _vdom (e.g. when used inside a form.field.Select
         * @member {Boolean} silentSelect=false
         */
        silentSelect: false,
        /**
         * @member {Neo.data.Store|null} store_=null
         */
        store_: null,
        /**
         * True will add a checkbox in front of each list item
         * @member {Boolean} stacked_=true
         */
        useCheckBoxes_: false,
        /**
         * @member {Object} _vdom={tag:'ul',cn:[]}
         */
        _vdom: {
            tag: 'ul',
            cn : []
        }
    }}

    /**
     *
     * @param {Object} config
     */
    constructor(config) {
        super(config);

        let me           = this,
            domListeners = me.domListeners;

        domListeners.push({
            click: {fn: me.onClick, scope: me}
        });

        me.domListeners = domListeners;
    }

    onConstructed() {
        super.onConstructed();

        let me = this;

        if (me.selectionModel) {
            me.selectionModel.register(me);
        }
    }

    /**
     * Triggered after the disableSelection config got changed
     * @param {Boolean} value
     * @param {Boolean} oldValue
     * @protected
     */
    afterSetDisableSelection(value, oldValue) {
        let me = this;

        if (value && me.rendered && me.selectionModel) {
            me.selectionModel.deselectAll();
        }
    }

    /**
     * Triggered after the draggable config got changed
     * @param {Boolean} value
     * @param {Boolean} oldValue
     * @protected
     */
    afterSetDraggable(value, oldValue) {
        let me = this;

        if (value && !me.dragZone) {
            Promise.all(/*! import() | src/draggable/list/DragZone-mjs.js */[__webpack_require__.e("vendors~src/draggable/list/DragZone-mjs.js~src/draggable/tab/header/toolbar/SortZone-mjs.js~src/drag~e3af9737"), __webpack_require__.e("src/draggable/list/DragZone-mjs.js")]).then(__webpack_require__.bind(null, /*! ../draggable/list/DragZone.mjs */ "./node_modules/neo.mjs/src/draggable/list/DragZone.mjs")).then(module => {
                me.dragZone = Neo.create({
                    module : module.default,
                    appName: me.appName,
                    owner  : me,
                    ...me.dragZoneConfig || {}
                });
            });
        }
    }

    /**
     * Triggered after the selectionModel config got changed
     * @param {Neo.selection.Model} value
     * @param {Neo.selection.Model} oldValue
     * @protected
     */
    afterSetSelectionModel(value, oldValue) {
        if (this.rendered) {
            value.register(this);
        }
    }

    /**
     * Triggered after the store config got changed
     * @param {Neo.data.Store} value
     * @param {Neo.data.Store} oldValue
     * @protected
     */
    afterSetStore(value, oldValue) {
        let me = this;

        if (value) {
            value.on({
                filter: me.onStoreFilter,
                load  : me.onStoreLoad,
                scope : me
            });

            if (value.getCount() > 0) {
                me.onStoreLoad();
            }
        }
    }

    /**
     * Triggered after the useCheckBoxes config got changed
     * @param {Boolean} value
     * @param {Boolean} oldValue
     * @protected
     */
    afterSetUseCheckBoxes(value, oldValue) {
        let me  = this,
            cls = me.cls;

        _util_Array_mjs__WEBPACK_IMPORTED_MODULE_3__["default"][value ? 'add' : 'remove'](cls, 'neo-use-checkicons');
        me.cls = cls;
    }

    /**
     * Triggered before the selectionModel config gets changed.
     * @param {Neo.selection.Model} value
     * @param {Neo.selection.Model} oldValue
     * @returns {Neo.selection.Model}
     * @protected
     */
    beforeSetSelectionModel(value, oldValue) {
        if (oldValue) {
            oldValue.destroy();
        }

        return _util_ClassSystem_mjs__WEBPACK_IMPORTED_MODULE_0__["default"].beforeSetInstance(value, _selection_ListModel_mjs__WEBPACK_IMPORTED_MODULE_2__["default"]);
    }

    /**
     * Triggered before the store config gets changed.
     * @param {Object|Neo.data.Store} value
     * @param {Object|Neo.data.Store} oldValue
     * @returns {Neo.data.Store}
     * @protected
     */
    beforeSetStore(value, oldValue) {
        if (oldValue) {
            oldValue.destroy();
        }

        return _util_ClassSystem_mjs__WEBPACK_IMPORTED_MODULE_0__["default"].beforeSetInstance(value);
    }

    /**
     * Override this method for custom list items
     * @param {Object} record
     * @returns {Object} The list item object
     */
    createItem(record) {
        let me          = this,
            itemContent = me.createItemContent(record);

        const item = {
            tag     : 'li',
            cls     : [me.itemCls],
            id      : me.getItemId(record[me.getKeyProperty()]),
            tabIndex: -1
        };

        item[typeof itemContent === 'string' ? 'html' : 'cn'] = itemContent;

        return item;
    }

    /**
     * Override this method for custom renderers
     * @param {Object} record
     * @returns {Object[]|String} Either an vdom cn array or a html string
     */
    createItemContent(record) {
        let me       = this,
            itemText = record[this.displayField],
            filter;

        if (me.highlightFilterValue) {
            filter = me.store.getFilter(me.displayField);

            if (filter && filter.value !== null && filter.value !== '') {
                itemText = itemText.replace(new RegExp(filter.value, 'gi'), function(match) {
                    return '<span class="neo-highlight-search">' + match + '</span>';
                });
            }
        }

        return itemText;
    }

    /**
     * @param {Boolean} [silent=false]
     */
    createItems(silent=false) {
        let me   = this,
            vdom = me.vdom;

        vdom.cn = [];

        me.store.items.forEach(item => {
            vdom.cn.push(me.createItem(item));
        });

        if (silent) {
            me._vdom = vdom;
        } else {
            me.promiseVdomUpdate().then(() => {
                me.fire('createItems');
            });
        }
    }

    /**
     *
     */
    destroy() {
        let me = this;

        if (me.selectionModel) {
            me.selectionModel.destroy();
        }

        if (me.store && me.autoDestroyStore) {
            me.store.destroy();
        }

        super.destroy();
    }

    /**
     * Calls focus() on the top level DOM node of this component or on a given node via id
     * @param {String} [id]
     */
    focus(id) {
        super.focus(id);

        if (id) {
            // remote method access
            Neo.main.DomAccess.scrollIntoView({
                behavior: 'auto',
                id      : id || this.id
            });
        }
    }

    /**
     *
     * @param {Number|String} id
     * @returns {String}
     */
    getItemId(id) {
        return this.id + '__' + id;
    }

    /**
     *
     * @param {String} vnodeId
     * @returns {String|Number} itemId
     */
    getItemRecordId(vnodeId) {
        let itemId   = vnodeId.split('__')[1],
            model    = this.store.model,
            keyField = model && model.getField(model.keyProperty);

        if (keyField && (keyField.type.toLowerCase() === 'integer' || keyField.type.toLowerCase() === 'number')) {
            itemId = parseInt(itemId);
        }

        return itemId;
    }

    /**
     * Support collections & stores
     * @returns {String}
     */
    getKeyProperty() {
        return this.store.keyProperty || this.store.model.keyProperty;
    }

    /**
     *
     * @param {Object} data
     */
    onClick(data) {
        let me = this;

        if (data.path[0].id === me.id) {
            me.onContainerClick(data);
        }  else if (data.path[0].cls.includes(me.itemCls)) {
            me.onItemClick(data);
        }
    }

    /**
     *
     * @param {Object} data
     */
    onContainerClick(data) {
        /**
         * The containerClick event fires when a click occurs on the component, but not on a list item
         * @event containerClick
         * @param {String[]} cls the classList of the target node (converted to an array)
         * @param {String} id the target dom id
         * @param {String[]} path the event path
         * @returns {Object}
         */
        this.fire('containerClick', data);
    }

    /**
     *
     * @param {Object} data
     */
    onItemClick(data) {
        let me     = this,
            nodeId = data.path[0].id;

        if (!me.disableSelection && me.selectionModel) {
            me.selectionModel.select(nodeId);
        }

        /**
         * The itemClick event fires when a click occurs on a list item
         * @event itemClick
         * @param {String} id the record matching the list item
         * @returns {Object}
         */
        me.fire('itemClick', me.store.get(me.getItemRecordId(nodeId)));
    }

    /**
     *
     */
    onStoreFilter() {
        this.createItems();
    }

    /**
     *
     */
    onStoreLoad() {
        let me = this;

        if (!me.mounted && me.rendering) {
            const listenerId = me.on('rendered', () => {
                me.un('rendered', listenerId);
                me.createItems();
            });
        } else {
            me.createItems();
        }
    }

    /**
     * Convenience shortcut
     * @param {Number} index
     */
    selectItem(index) {
        let me = this;

        if (!me.disableSelection && me.selectionModel) {
            me.selectionModel.selectAt(index);
        }
    }
}

Neo.applyClassConfig(Base);



/***/ }),

/***/ "./node_modules/neo.mjs/src/selection/ListModel.mjs":
/*!**********************************************************!*\
  !*** ./node_modules/neo.mjs/src/selection/ListModel.mjs ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ListModel; });
/* harmony import */ var _Model_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Model.mjs */ "./node_modules/neo.mjs/src/selection/Model.mjs");


/**
 * @class Neo.selection.ListModel
 * @extends Neo.selection.Model
 */
class ListModel extends _Model_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
    static getConfig() {return {
        /**
         * @member {String} className='Neo.selection.ListModel'
         * @protected
         */
        className: 'Neo.selection.ListModel',
        /**
         * @member {String} ntype='selection-listmodel'
         * @protected
         */
        ntype: 'selection-listmodel',
        /**
         * @member {Boolean} stayInList=true
         */
        stayInList: true
    }}

    /**
     *
     * @param {Object} data
     */
    onKeyDownDown(data) {
        if (!this.view.disableSelection) {
            this.onNavKey(data, 1);
        }
    }

    /**
     *
     * @param {Object} data
     */
    onKeyDownLeft(data) {
        this.onKeyDownUp(data);
    }

    /**
     *
     * @param {Object} data
     */
    onKeyDownRight(data) {
        this.onKeyDownDown(data);
    }

    /**
     *
     * @param {Object} data
     */
    onKeyDownUp(data) {
        if (!this.view.disableSelection) {
            this.onNavKey(data, -1);
        }
    }

    /**
     *
     * @param {Object} data
     * @param {Number} step
     */
    onNavKey(data, step) {
        let me               = this,
            item             = data.path[0],
            view             = me.view,
            store            = view.store,
            maxItems         = store.getCount(),
            preventSelection = false,
            index, itemId, record, recordId;

        if (item.cls.includes(view.itemCls)) {
            recordId = view.getItemRecordId(item.id);
            index    = store.indexOf(recordId) + step;

            if (index < 0) {
                if (me.stayInList) {
                    index = maxItems - 1;
                } else {
                    preventSelection = true;
                    view.fire('selectPreFirstItem');
                }
            } else if (index >= maxItems) {
                if (me.stayInList) {
                    index = 0;
                } else {
                    preventSelection = true;
                    view.fire('selectPostLastItem');
                }
            }
        } else {
            index = 0;
        }

        if (!preventSelection) {
            record = store.getAt(index);
            itemId = view.getItemId(record[me.view.getKeyProperty()]);

            me.select(itemId);
            view.focus(itemId);
            view.fire('itemNavigate', record);
        } else {
            me.deselectAll();
        }
    }

    /**
     *
     * @param {Neo.component.Base} component
     */
    register(component) {
        super.register(component);

        let me   = this,
            id   = me.id,
            view = me.view;

        if (view.keys) {
            view.keys._keys.push(
                {fn: 'onKeyDownDown'  ,key: 'Down'  ,scope: id},
                {fn: 'onKeyDownLeft'  ,key: 'Left'  ,scope: id},
                {fn: 'onKeyDownRight' ,key: 'Right' ,scope: id},
                {fn: 'onKeyDownUp'    ,key: 'Up'    ,scope: id}
            );
        }
    }

    /**
     *
     * @param {Number} index
     */
    selectAt(index) {
        let view      = this.view,
            recordKey = view.store.getKeyAt(index),
            itemId    = recordKey && view.getItemId(recordKey);

        if (itemId) {
            this.select(itemId);
            view.focus(itemId);
        }
    }

    /**
     *
     */
    unregister() {
        let me   = this,
            id   = me.id,
            view = me.view;

        if (view.keys) {
            view.keys.removeKeys([
                {fn: 'onKeyDownDown'  ,key: 'Down'  ,scope: id},
                {fn: 'onKeyDownLeft'  ,key: 'Left'  ,scope: id},
                {fn: 'onKeyDownRight' ,key: 'Right' ,scope: id},
                {fn: 'onKeyDownUp'    ,key: 'Up'    ,scope: id}
            ]);
        }

        super.unregister();
    }
}

Neo.applyClassConfig(ListModel);



/***/ }),

/***/ "./node_modules/neo.mjs/src/selection/Model.mjs":
/*!******************************************************!*\
  !*** ./node_modules/neo.mjs/src/selection/Model.mjs ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Model; });
/* harmony import */ var _core_Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Base.mjs */ "./node_modules/neo.mjs/src/core/Base.mjs");
/* harmony import */ var _util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/Array.mjs */ "./node_modules/neo.mjs/src/util/Array.mjs");
/* harmony import */ var _core_Observable_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/Observable.mjs */ "./node_modules/neo.mjs/src/core/Observable.mjs");




/**
 * @class Neo.selection.Model
 * @extends Neo.core.Base
 */
class Model extends _core_Base_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
    static getStaticConfig() {return {
        /**
         * True automatically applies the core/Observable.mjs mixin
         * @member {Boolean} observable=true
         * @static
         */
        observable: true
    }}

    static getConfig() {return {
        /**
         * @member {String} className='Neo.selection.Model'
         * @protected
         */
        className: 'Neo.selection.Model',
        /**
         * @member {String} ntype='selection-model'
         * @protected
         */
        ntype: 'selection-model',
        /**
         * Placeholder for extended classes to add a custom css rule to this owner component
         * @member {String|null} cls=null
         * @protected
         */
        cls: null,
        /**
         * @member {Array} items=[]
         * @protected
         */
        items: [],
        /**
         * @member {String} selectedCls='selected'
         */
        selectedCls: 'neo-selected',
        /**
         * @member {Boolean} singleSelect=true
         */
        singleSelect: true,
        /**
         * Internally saves the view id, but the getter will return the matching instance
         * @member {Object} view_=null
         * @protected
         */
        view_: null
    }}

    /**
     * Gets triggered before getting the value of the view config
     * @returns {Neo.component.Base}
     */
    beforeGetView() {
        return Neo.getComponent(this._view);
    }

    /**
     * Gets triggered before setting the value of the view config
     * @returns {String} the view id
     */
    beforeSetView(value) {
        return value && value.id;
    }

    /**
     *
     */
    addDomListener() {}

    /**
     *
     * @param {Object} item
     * @param {Boolean} [silent] true to prevent a vdom update
     * @param {Array} [itemCollection]
     * @param {String} [selectedCls]
     */
    deselect(item, silent, itemCollection, selectedCls) {
        let me   = this,
            view = me.view,
            vdom = view.vdom,
            node = view.getVdomChild(item), // todo: support for nodes (right now limited to ids)
            cls;

        if (node) {
            cls = node.cls || [];
            _util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__["default"].remove(cls, selectedCls || me.selectedCls);
            node.cls = cls;
        }

        _util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__["default"].remove(itemCollection || me.items, item);

        if (!silent) {
            view.vdom = vdom;
        }
    }

    /**
     *
     * @param {Boolean} [silent] true to prevent a vdom update
     */
    deselectAll(silent) {
        let me    = this,
            items = [...me.items],
            view  = me.view,
            vdom  = view.vdom;

        items.forEach(item => {
            me.deselect(item, true);
        });

        if (!silent && items.length > 0) {
            view.vdom = vdom;
        }
    }

    /**
     *
     */
    destroy() {
        this.unregister();
        super.destroy();
    }

    /**
     *
     * @returns {Array} this.items
     */
    getSelection() {
        return this.items;
    }

    /**
     *
     * @returns {Boolean} true in case there is a selection
     */
    hasSelection() {
        return this.items.length > 0;
    }

    /**
     *
     * @param {String} id
     * @returns {Boolean} true in case the item is selected
     */
    isSelected(id) {
        return this.items.indexOf(id) > -1;
    }

    /**
     *
     * @param {Neo.component.Base} component
     */
    register(component) {
        let me  = this,
            cls = component.cls || [];

        if (me.cls && !cls.includes(me.cls)) {
            cls.push(me.cls);
            component.cls = cls;
        }

        me.view = component;
        me.addDomListener();
    }

    /**
     *
     */
    removeDomListeners() {
        let me           = this,
            component    = me.view,
            domListeners = [...component.domListeners];

        component.domListeners.forEach(listener => {
            if (listener.scope === me) {
                _util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__["default"].remove(domListeners, listener);
            }
        });

        component.domListeners = domListeners;
    }

    /**
     *
     * @param {Object|Object[]|String[]} items
     * @param {Array} [itemCollection]
     * @param {String} [selectedCls]
     */
    select(items, itemCollection, selectedCls) {
        items = Array.isArray(items) ? items : [items];

        let me   = this,
            view = me.view,
            vdom = view.vdom,
            cls;

        if (me.singleSelect) {
            me.deselectAll(true);
        }

        items.forEach(node => {
            if (typeof node === 'string') {
                node = view.getVdomChild(node);
            }

            if (node) {
                cls = node.cls || [];
                _util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__["default"].add(cls, selectedCls || me.selectedCls);
                node.cls = cls;
            }
        });

        _util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__["default"].add(itemCollection || me.items, items);

        view[view.hasOwnProperty('silentSelect') && view.silentSelect === true ? '_vdom' : 'vdom'] = vdom;
    }

    /**
     *
     * @param {Object} item
     */
    toggleSelection(item) {
        let me = this;

        if (me.isSelected(item)) {
            me.deselect(item);
        } else {
            me.select(item);
        }
    }

    /**
     *
     */
    unregister() {
        let me  = this,
            cls = me.view.cls || [];

        if (me.cls && cls.includes(me.cls)) {
            _util_Array_mjs__WEBPACK_IMPORTED_MODULE_1__["default"].remove(cls, me.cls);
            me.view.cls = cls;
        }

        me.deselectAll();

        me.removeDomListeners();
    }
}

Neo.applyClassConfig(Model);



/***/ }),

/***/ "./node_modules/neo.mjs/src/tree/List.mjs":
/*!************************************************!*\
  !*** ./node_modules/neo.mjs/src/tree/List.mjs ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Tree; });
/* harmony import */ var _list_Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../list/Base.mjs */ "./node_modules/neo.mjs/src/list/Base.mjs");
/* harmony import */ var _collection_Base_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../collection/Base.mjs */ "./node_modules/neo.mjs/src/collection/Base.mjs");
/* harmony import */ var _util_Array_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/Array.mjs */ "./node_modules/neo.mjs/src/util/Array.mjs");




/**
 * @class Neo.tree.List
 * @extends Neo.list.Base
 */
class Tree extends _list_Base_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
    static getConfig() {return {
        /**
         * @member {String} className='Neo.tree.List'
         * @protected
         */
        className: 'Neo.tree.List',
        /**
         * @member {String} ntype='treelist'
         * @protected
         */
        ntype: 'treelist',
        /**
         * @member {String[]} cls=['neo-tree-list']
         */
        cls: ['neo-tree-list'],
        /**
         * todo: change the default to false once selection.TreeList is in place
         * @member {Boolean} disableSelection=true
         */
        disableSelection: true,
        /**
         * @member {Neo.draggable.tree.DragZone|null} dragZone=null
         */
        dragZone: null,
        /**
         * @member {Boolean} showCollapseExpandAllIcons=true
         */
        showCollapseExpandAllIcons: true,
        /**
         * @member {Boolean} sortable_=false
         */
        sortable_: false,
        /**
         * @member {Neo.draggable.tree.SortZone|null} sortZone=null
         */
        sortZone: null,
        /**
         * @member {Object} dragZoneConfig=null
         */
        sortZoneConfig: null,
        /**
         * @member {Object} _vdom
         */
        _vdom: {
            cn: [{
                tag: 'ul',
                cls: ['neo-list-container', 'neo-list'],
                cn : []
            }]
        }
    }}

    /**
     *
     */
    onConstructed() {
        super.onConstructed();

        let me   = this,
            vdom = me.vdom;

        if (me.showCollapseExpandAllIcons) {
            vdom.cn.unshift({
                cls: ['neo-treelist-menu-item', 'neo-treelist-collapse-all-icon'],
                cn : [{
                    tag: 'span',
                    cls: ['neo-treelist-menu-item-content']
                }]
            }, {
                cls: ['neo-treelist-menu-item', 'neo-treelist-expand-all-icon'],
                cn : [{
                    tag: 'span',
                    cls: ['neo-treelist-menu-item-content']
                }]
            });

            me.vdom = vdom;
        }
    }

    /**
     * Triggered after the draggable config got changed
     * @param {Boolean} value
     * @param {Boolean} oldValue
     * @protected
     */
    afterSetDraggable(value, oldValue) {
        let me = this;

        if (value) {
            if (me.sortable) {
                console.error('tree.List can be either draggable or sortable, not both.', me.id);
            } else if (!me.dragZone) {
                Promise.all(/*! import() | src/draggable/tree/DragZone-mjs.js */[__webpack_require__.e("vendors~src/draggable/list/DragZone-mjs.js~src/draggable/tab/header/toolbar/SortZone-mjs.js~src/drag~e3af9737"), __webpack_require__.e("src/draggable/tree/DragZone-mjs.js")]).then(__webpack_require__.bind(null, /*! ../draggable/tree/DragZone.mjs */ "./node_modules/neo.mjs/src/draggable/tree/DragZone.mjs")).then(module => {
                    me.dragZone = Neo.create({
                        module : module.default,
                        appName: me.appName,
                        owner  : me,
                        ...me.dragZoneConfig || {}
                    });
                });
            }
        }
    }

    /**
     * Triggered after the sortable config got changed
     * @param {Boolean} value
     * @param {Boolean} oldValue
     * @protected
     */
    afterSetSortable(value, oldValue) {
        let me = this;

        if (value) {
            if (me.draggable) {
                console.error('tree.List can be either draggable or sortable, not both.', me.id);
            } else if (!me.sortZone) {
                Promise.all(/*! import() | src/draggable/tree/SortZone-mjs.js */[__webpack_require__.e("vendors~src/draggable/list/DragZone-mjs.js~src/draggable/tab/header/toolbar/SortZone-mjs.js~src/drag~e3af9737"), __webpack_require__.e("src/draggable/tree/SortZone-mjs.js")]).then(__webpack_require__.bind(null, /*! ../draggable/tree/SortZone.mjs */ "./node_modules/neo.mjs/src/draggable/tree/SortZone.mjs")).then(module => {
                    me.sortZone = Neo.create({
                        module             : module.default,
                        appName            : me.appName,
                        boundaryContainerId: me.id,
                        owner              : me,
                        ...me.sortZoneConfig || {}
                    });
                });
            }
        }
    }

    /**
     * Triggered before the store config gets changed.
     * @param {Object|Neo.data.Store} value
     * @param {Object|Neo.data.Store} oldValue
     * @returns {Neo.data.Store}
     * @protected
     */
    beforeSetStore(value, oldValue) {
        if (!value) {
            value = Neo.create(_collection_Base_mjs__WEBPACK_IMPORTED_MODULE_1__["default"], {
                keyProperty: 'id'
            });
        }

        return super.beforeSetStore(value, oldValue);
    }


    /**
     * Collapses all folders
     * @param {Boolean} [silent]=false Set silent to true to prevent a vnode update
     */
    collapseAll(silent=false) {
        let me       = this,
            vdom     = me.vdom,
            hasMatch = false,
            node;

        me.store.items.forEach(item => {
            if (!item.isLeaf) {
                node = me.getVdomChild(me.getItemId(item.id), vdom);

                if (node.cls.includes('neo-folder-open')) {
                    _util_Array_mjs__WEBPACK_IMPORTED_MODULE_2__["default"].remove(node.cls, 'neo-folder-open');
                    hasMatch = true;
                }
            }
        });

        if (hasMatch) {
            me[silent ? '_vdom' : 'vdom'] = vdom;
        }
    }

    /**
     *
     * @param {String} [parentId] The parent node
     * @param {Object} [vdomRoot] The vdom template root for the current sub tree
     * @param {Number} level The hierarchy level of the tree
     * @returns {Object} vdomRoot
     * @protected
     */
    createItems(parentId, vdomRoot, level) {
        let me    = this,
            items = me.store.find('parentId', parentId),
            cls, tmpRoot;

        if (items.length > 0) {
            if (!vdomRoot.cn) {
                vdomRoot.cn = [];
            }

            if (parentId !== null) {
                vdomRoot.cn.push({
                    tag: 'ul',
                    cls: ['neo-list'],
                    cn : [],
                    style: {
                        paddingLeft: '15px'
                    }
                });

                tmpRoot = vdomRoot.cn[vdomRoot.cn.length - 1];
            } else {
                tmpRoot = vdomRoot;
            }

            items.forEach(item => {
                cls = ['neo-list-item'];

                if (item.isLeaf) {
                    cls.push(item.singleton ? 'neo-list-item-leaf-singleton' : 'neo-list-item-leaf');
                } else {
                    cls.push('neo-list-folder');

                    if (!item.collapsed) {
                        cls.push('neo-folder-open');
                    }
                }

                tmpRoot.cn.push({
                    tag: 'li',
                    cls: cls,
                    id : me.getItemId(item.id),
                    cn : [{
                        tag      : 'span',
                        cls      : ['neo-list-item-content'],
                        innerHTML: item.name,
                        style: {
                            pointerEvents: 'none'
                        }
                    }],
                    style: {
                        padding : '10px',
                        position: item.isLeaf ? null : 'sticky',
                        top     : item.isLeaf ? null : (level * 38) + 'px',
                        zIndex  : item.isLeaf ? null : (20 / (level + 1)),
                    }
                });

                tmpRoot = me.createItems(item.id, tmpRoot, level + 1);
            });
        }

        return vdomRoot;
    }

    /**
     * Expands all folders
     * @param {Boolean} silent=false Set silent to true to prevent a vnode update
     */
    expandAll(silent=false) {
        let me       = this,
            vdom     = me.vdom,
            hasMatch = false,
            node;

        me.store.items.forEach(item => {
            if (!item.isLeaf) {
                node = me.getVdomChild(me.getItemId(item.id), vdom);

                if (!node.cls.includes('neo-folder-open')) {
                    _util_Array_mjs__WEBPACK_IMPORTED_MODULE_2__["default"].add(node.cls, 'neo-folder-open');
                    hasMatch = true;
                }
            }
        });

        if (hasMatch) {
            me[silent ? '_vdom' : 'vdom'] = vdom;
        }
    }

    /**
     * Hides Tree nodes which do not match the filter
     * @param {String} property The store field to filter by
     * @param {String} value The filter value
     * @param {Number|null} parentId The root id for the current filter call
     * @param {Boolean} [parentMatch]=false In case a parent folder matches the filter, show its child items
     * @returns {Boolean} false if at least one child item is filtered
     */
    filter(property, value, parentId, parentMatch=false) {
        let me         = this,
            isFiltered = true,
            valueRegEx = new RegExp(value, 'gi'),
            vdom       = me.vdom,
            childReturnValue, directMatch, node;

        if (!value) {
            value = '';
        }

        me.store.items.forEach(item => {
            if (item.parentId === parentId) {
                directMatch = false;
                node        = me.getVdomChild(me.getItemId(item.id), vdom);

                node.cn[0].innerHTML = item[property].replace(valueRegEx, match => {
                    directMatch = true;
                    return `<span class="neo-highlight-search">${match}</span>`;
                });

                if (item.isLeaf) {
                    childReturnValue = true;
                } else {
                    childReturnValue = me.filter(property, value, item.id, directMatch || parentMatch);
                }

                if (directMatch || parentMatch || childReturnValue === false || value === '') {
                    isFiltered = false;
                }

                node.style.display = isFiltered ? 'none' : 'list-item';
            }
        });

        if (parentId === null) {
            me.expandAll(true);
            me.vdom = vdom;
        }

        return isFiltered;
    }

    /**
     *
     * @returns {Object}
     */
    getListItemsRoot() {
        return this.vdom.cn[this.showCollapseExpandAllIcons ? 2 : 0];
    }

    /**
     *
     * @param {Object} data
     */
    onClick(data) {
        if (data.target.cls.includes('neo-treelist-menu-item')) {
            this.onMenuItemClick(data.target.cls);
        } else {
            super.onClick(data);
        }
    }

    /**
     *
     * @param {Object} data
     */
    onItemClick(data) {
        let me    = this,
            vdom  = me.vdom,
            items = me.store.items,
            i     = 0,
            len   = items.length,
            path  = data.path.map(e => e.id),
            item, record, tmpItem, vnodeId;

        for (; i < len; i++) {
            tmpItem = items[i];
            vnodeId = me.getItemId(tmpItem.id);

            if (path.includes(vnodeId)) {
                record = tmpItem;
                item   = me.getVdomChild(vnodeId);
                break;
            }
        }

        if (item) {
            if (item.cls && item.cls.includes('neo-list-folder')) {
                _util_Array_mjs__WEBPACK_IMPORTED_MODULE_2__["default"].toggle(item.cls, 'neo-folder-open');
                me.vdom = vdom;
            } else {
                me.onLeafItemClick(record);

                /**
                 * The leafItemClick event fires when a click occurs on a list item which does not have child items.
                 * Passes the item record to the event handler.
                 * @event leafItemClick
                 * @returns {Object} record
                 */
                me.fire('leafItemClick', record);
            }

            super.onItemClick(data);
        }
    }

    /**
     * Placeholder method
     * @param {Object} record
     */
    onLeafItemClick(record) {

    }

    /**
     * Gets triggered by clicks on the collapse or expand all icons
     * @param {Array} cls
     * @protected
     */
    onMenuItemClick(cls) {
        if (cls.includes('neo-treelist-collapse-all-icon')) {
            this.collapseAll();
        } else {
            this.expandAll();
        }
    }
}

Neo.applyClassConfig(Tree);



/***/ }),

/***/ "./node_modules/neo.mjs/src/util/Function.mjs":
/*!****************************************************!*\
  !*** ./node_modules/neo.mjs/src/util/Function.mjs ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Base.mjs */ "./node_modules/neo.mjs/src/core/Base.mjs");


/**
 * @class Neo.util.Function
 * @extends Neo.core.Base
 */
class NeoFunction extends _core_Base_mjs__WEBPACK_IMPORTED_MODULE_0__["default"] {
    static getConfig() {return {
        /**
         * @member {String} className='Neo.util.Function'
         * @protected
         */
        className: 'Neo.util.Function'
    }}

    /**
     * Append args instead of prepending them
     * @param {Object} scope
     * @returns {Function}
     */
    static bindAppend(scope) {
        const fn   = this,
              args = [].slice.call(arguments).slice(1);

        return function() {
            return fn.apply(scope, [].slice.call(arguments).concat(args));
        }
    }

    /**
     *
     * @param {Neo.core.Base} target
     * @param {String} methodName
     * @param {Function} fn
     * @param {Object} scope
     * @returns {Function}
     */
    static createSequence(target, methodName, fn, scope) {
        let method = target[methodName] || Neo.emptyFn;

        return (target[methodName] = function() {
            method.apply(this, arguments);
            return fn.apply(scope || this, arguments);
        });
    }

    /**
     *
     * @param {Neo.core.Base} target
     * @param {String} methodName
     * @param {Function} fn
     * @param {Object} scope
     * @returns {Function}
     */
    static intercept(target, methodName, fn, scope) {
        let method = target[methodName] || Neo.emptyFn;

        return (target[methodName] = function() {
            let returnValue = fn.apply(scope || this, arguments);
            method.apply(this, arguments);

            return returnValue;
        });
    }
}

Neo.applyClassConfig(NeoFunction);

/* harmony default export */ __webpack_exports__["default"] = (NeoFunction);

/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvY29udGFpbmVyL1BhbmVsLm1qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvY29udHJvbGxlci9Db21wb25lbnQubWpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9uZW8ubWpzL3NyYy9kYXRhL01vZGVsLm1qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvZGF0YS9SZWNvcmRGYWN0b3J5Lm1qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvZGF0YS9TdG9yZS5tanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL25lby5tanMvc3JjL2Zvcm0vZmllbGQvQmFzZS5tanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL25lby5tanMvc3JjL2Zvcm0vZmllbGQvU2VhcmNoLm1qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvZm9ybS9maWVsZC9UZXh0Lm1qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvZm9ybS9maWVsZC90cmlnZ2VyL0Jhc2UubWpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9uZW8ubWpzL3NyYy9mb3JtL2ZpZWxkL3RyaWdnZXIvQ2xlYXIubWpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9uZW8ubWpzL3NyYy9saXN0L0Jhc2UubWpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9uZW8ubWpzL3NyYy9zZWxlY3Rpb24vTGlzdE1vZGVsLm1qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvc2VsZWN0aW9uL01vZGVsLm1qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbmVvLm1qcy9zcmMvdHJlZS9MaXN0Lm1qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMv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LCJmaWxlIjoidmVuZG9yc35jaHVua3MvZG9jcy1hcHAtbWpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbnRhaW5lciBmcm9tICcuL0Jhc2UubWpzJztcbmltcG9ydCBUb29sYmFyICAgZnJvbSAnLi9Ub29sYmFyLm1qcyc7XG5cbi8qKlxuICogQW4gZXh0ZW5kZWQgQ29udGFpbmVyIHN1cHBvcnRpbmcgbXVsdGlwbGUgZG9ja2VkIGhlYWRlciB0b29sYmFyc1xuICogQGNsYXNzIE5lby5jb250YWluZXIuUGFuZWxcbiAqIEBleHRlbmRzIE5lby5jb250YWluZXIuQmFzZVxuICovXG5jbGFzcyBQYW5lbCBleHRlbmRzIENvbnRhaW5lciB7XG4gICAgc3RhdGljIGdldENvbmZpZygpIHtyZXR1cm4ge1xuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBjbGFzc05hbWU9J05lby5jb250YWluZXIuUGFuZWwnXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIGNsYXNzTmFtZTogJ05lby5jb250YWluZXIuUGFuZWwnLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBudHlwZT0ncGFuZWwnXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIG50eXBlOiAncGFuZWwnLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nW119IGNscz1bJ25lby1wYW5lbCcsJ25lby1jb250YWluZXInXVxuICAgICAgICAgKi9cbiAgICAgICAgY2xzOiBbJ25lby1wYW5lbCcsICduZW8tY29udGFpbmVyJ10sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtPYmplY3R9IGNvbnRhaW5lckNvbmZpZz1udWxsXG4gICAgICAgICAqL1xuICAgICAgICBjb250YWluZXJDb25maWc6IG51bGwsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtPYmplY3R9IGhlYWRlckRlZmF1bHRzPW51bGxcbiAgICAgICAgICovXG4gICAgICAgIGhlYWRlckRlZmF1bHRzOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7QXJyYXl9IGhlYWRlcnM9bnVsbFxuICAgICAgICAgKi9cbiAgICAgICAgaGVhZGVyczogbnVsbCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge09iamVjdH0gaXRlbXM9e250eXBlOiAndmJveCcsIGFsaWduOiAnc3RyZXRjaCd9XG4gICAgICAgICAqL1xuICAgICAgICBfbGF5b3V0OiB7XG4gICAgICAgICAgICBudHlwZTogJ3Zib3gnLFxuICAgICAgICAgICAgYWxpZ246ICdzdHJldGNoJ1xuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7Qm9vbGVhbn0gdmVydGljYWxIZWFkZXJzRmlyc3Q9ZmFsc2VcbiAgICAgICAgICovXG4gICAgICAgIHZlcnRpY2FsSGVhZGVyc0ZpcnN0OiBmYWxzZVxuICAgIH19XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWdcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICAgICAgc3VwZXIoY29uZmlnKTtcblxuICAgICAgICBsZXQgbWUgPSB0aGlzLFxuICAgICAgICAgICAgaGYgPSBjb25maWcgJiYgY29uZmlnLnZlcnRpY2FsSGVhZGVyc0ZpcnN0ID09PSB0cnVlIHx8IG1lLnZlcnRpY2FsSGVhZGVyc0ZpcnN0ID09PSB0cnVlO1xuXG4gICAgICAgIGlmIChoZikge1xuICAgICAgICAgICAgbWUubGF5b3V0ID0ge1xuICAgICAgICAgICAgICAgIG50eXBlOiAnaGJveCcsXG4gICAgICAgICAgICAgICAgYWxpZ246ICdzdHJldGNoJ1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICovXG4gICAgY3JlYXRlSXRlbXMoKSB7XG4gICAgICAgIGxldCBtZSAgICAgICAgICAgICAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICBoZiAgICAgICAgICAgICAgICAgICA9IG1lLnZlcnRpY2FsSGVhZGVyc0ZpcnN0ID09PSBmYWxzZSxcbiAgICAgICAgICAgIGhlYWRlcnMgICAgICAgICAgICAgID0gbWUuaGVhZGVycyB8fCBbXSxcbiAgICAgICAgICAgIGJvdHRvbUhlYWRlcnMgICAgICAgID0gaGVhZGVycy5maWx0ZXIoaGVhZGVyID0+IHtyZXR1cm4gaGVhZGVyLmRvY2sgPT09IChoZiA/J2JvdHRvbSc6ICdyaWdodCcpfSksXG4gICAgICAgICAgICBsZWZ0SGVhZGVycyAgICAgICAgICA9IGhlYWRlcnMuZmlsdGVyKGhlYWRlciA9PiB7cmV0dXJuIGhlYWRlci5kb2NrID09PSAoaGYgPydsZWZ0JyAgOiAndG9wJyl9KSxcbiAgICAgICAgICAgIHJpZ2h0SGVhZGVycyAgICAgICAgID0gaGVhZGVycy5maWx0ZXIoaGVhZGVyID0+IHtyZXR1cm4gaGVhZGVyLmRvY2sgPT09IChoZiA/J3JpZ2h0JyA6ICdib3R0b20nKX0pLFxuICAgICAgICAgICAgdG9wSGVhZGVycyAgICAgICAgICAgPSBoZWFkZXJzLmZpbHRlcihoZWFkZXIgPT4ge3JldHVybiBoZWFkZXIuZG9jayA9PT0gKGhmID8ndG9wJyAgIDogJ2xlZnQnKX0pLFxuICAgICAgICAgICAgaGFzSG9yaXpvbnRhbEhlYWRlcnMgPSBib3R0b21IZWFkZXJzLmxlbmd0aCA+IDAgfHwgdG9wSGVhZGVycyAgLmxlbmd0aCA+IDAsXG4gICAgICAgICAgICBoYXNWZXJ0aWNhbEhlYWRlcnMgICA9IGxlZnRIZWFkZXJzICAubGVuZ3RoID4gMCB8fCByaWdodEhlYWRlcnMubGVuZ3RoID4gMCxcbiAgICAgICAgICAgIGl0ZW1zICAgICAgICAgICAgICAgID0gbWUuaXRlbXMsXG4gICAgICAgICAgICBob3Jpem9udGFsSXRlbXMgICAgICA9IFtdLFxuICAgICAgICAgICAgdmVydGljYWxJdGVtcyAgICAgICAgPSBbXSxcbiAgICAgICAgICAgIGNvbmZpZztcblxuICAgICAgICBpZiAoaGVhZGVycy5sZW5ndGggPCAxKSB7XG4gICAgICAgICAgICBOZW8uZXJyb3IoJ1BhbmVsIHdpdGhvdXQgaGVhZGVycywgcGxlYXNlIHVzZSBhIENvbnRhaW5lciBpbnN0ZWFkJywgbWUuaWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdG9wSGVhZGVycy5mb3JFYWNoKGhlYWRlciA9PiB7XG4gICAgICAgICAgICB2ZXJ0aWNhbEl0ZW1zLnB1c2goUGFuZWwuY3JlYXRlSGVhZGVyQ29uZmlnKGhlYWRlcikpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoaGFzVmVydGljYWxIZWFkZXJzICYmIChoZiAmJiBoYXNIb3Jpem9udGFsSGVhZGVycyB8fCAhaGYgJiYgaGFzSG9yaXpvbnRhbEhlYWRlcnMpKSB7XG4gICAgICAgICAgICBsZWZ0SGVhZGVycy5mb3JFYWNoKGhlYWRlciA9PiB7XG4gICAgICAgICAgICAgICAgaG9yaXpvbnRhbEl0ZW1zLnB1c2goUGFuZWwuY3JlYXRlSGVhZGVyQ29uZmlnKGhlYWRlcikpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGNvbmZpZyA9IHtcbiAgICAgICAgICAgICAgICBudHlwZSAgICAgICA6ICdjb250YWluZXInLFxuICAgICAgICAgICAgICAgIGZsZXggICAgICAgIDogMSxcbiAgICAgICAgICAgICAgICBpdGVtcyAgICAgICA6IGl0ZW1zLFxuICAgICAgICAgICAgICAgIGl0ZW1EZWZhdWx0czogbWUuaXRlbURlZmF1bHRzLFxuICAgICAgICAgICAgICAgIC4uLm1lLmNvbnRhaW5lckNvbmZpZyB8fCB7fVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaG9yaXpvbnRhbEl0ZW1zLnB1c2goey4uLm1lLmhlYWRlckRlZmF1bHRzLCAuLi5jb25maWd9KTtcblxuICAgICAgICAgICAgcmlnaHRIZWFkZXJzLmZvckVhY2goaGVhZGVyID0+IHtcbiAgICAgICAgICAgICAgICBob3Jpem9udGFsSXRlbXMucHVzaChQYW5lbC5jcmVhdGVIZWFkZXJDb25maWcoaGVhZGVyKSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdmVydGljYWxJdGVtcy5wdXNoKHtcbiAgICAgICAgICAgICAgICBudHlwZSA6ICdjb250YWluZXInLFxuICAgICAgICAgICAgICAgIGl0ZW1zIDogaG9yaXpvbnRhbEl0ZW1zLFxuICAgICAgICAgICAgICAgIGxheW91dDoge1xuICAgICAgICAgICAgICAgICAgICBudHlwZTogKGhmID8gJ2hib3gnIDogJ3Zib3gnKSxcbiAgICAgICAgICAgICAgICAgICAgYWxpZ246ICdzdHJldGNoJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uZmlnID0ge1xuICAgICAgICAgICAgICAgIG50eXBlICAgICAgIDogJ2NvbnRhaW5lcicsXG4gICAgICAgICAgICAgICAgZmxleCAgICAgICAgOiAxLFxuICAgICAgICAgICAgICAgIGl0ZW1zICAgICAgIDogaXRlbXMsXG4gICAgICAgICAgICAgICAgaXRlbURlZmF1bHRzOiBtZS5pdGVtRGVmYXVsdHMsXG4gICAgICAgICAgICAgICAgLi4ubWUuY29udGFpbmVyQ29uZmlnIHx8IHt9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB2ZXJ0aWNhbEl0ZW1zLnB1c2goey4uLm1lLmhlYWRlckRlZmF1bHRzLCAuLi5jb25maWd9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGJvdHRvbUhlYWRlcnMuZm9yRWFjaChoZWFkZXIgPT4ge1xuICAgICAgICAgICAgdmVydGljYWxJdGVtcy5wdXNoKFBhbmVsLmNyZWF0ZUhlYWRlckNvbmZpZyhoZWFkZXIpKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbWUuaXRlbXMgPSB2ZXJ0aWNhbEl0ZW1zO1xuXG4gICAgICAgIG1lLml0ZW1EZWZhdWx0cyA9IG51bGw7XG5cbiAgICAgICAgc3VwZXIuY3JlYXRlSXRlbXMoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBoZWFkZXIgdGhlIGhlYWRlciBjb25maWdcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgICAqL1xuICAgIHN0YXRpYyBjcmVhdGVIZWFkZXJDb25maWcoaGVhZGVyKSB7XG4gICAgICAgIGxldCBjb25maWcgPSB7XG4gICAgICAgICAgICBudHlwZTogJ3Rvb2xiYXInLFxuICAgICAgICAgICAgZmxleCA6ICcwIDEgYXV0bydcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoaGVhZGVyLnRleHQpIHtcbiAgICAgICAgICAgIGNvbmZpZy5pdGVtcyA9IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIG50eXBlOiAnbGFiZWwnLFxuICAgICAgICAgICAgICAgICAgICBjbHMgIDogWyduZW8tcGFuZWwtaGVhZGVyLXRleHQnLCAnbmVvLWxhYmVsJ10sXG4gICAgICAgICAgICAgICAgICAgIHRleHQgOiBoZWFkZXIudGV4dFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF07XG5cbiAgICAgICAgICAgIGRlbGV0ZSBoZWFkZXIudGV4dDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGFzc3VtaW5nIGFsbCBsYWJlbHMgaW5zaWRlIGEgUGFuZWwgSGVhZGVyIGFyZSBtZWFudCB0byBiZSB0aXRsZXMgLT4gbG9vayB0aGUgc2FtZSB3YXlcbiAgICAgICAgaWYgKE5lby5pc0FycmF5KGhlYWRlci5pdGVtcykpIHtcbiAgICAgICAgICAgIGhlYWRlci5pdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgIGlmIChpdGVtLm50eXBlID09PSAnbGFiZWwnKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uY2xzID0gWyduZW8tcGFuZWwtaGVhZGVyLXRleHQnLCAnbmVvLWxhYmVsJ107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gey4uLmNvbmZpZywgLi4uaGVhZGVyfTtcbiAgICB9XG59XG5cbk5lby5hcHBseUNsYXNzQ29uZmlnKFBhbmVsKTtcblxuZXhwb3J0IHtQYW5lbCBhcyBkZWZhdWx0fTsiLCJpbXBvcnQgQmFzZSAgICAgICAgICAgICBmcm9tICcuL0Jhc2UubWpzJztcbmltcG9ydCBDb21wb25lbnRNYW5hZ2VyIGZyb20gJy4uL21hbmFnZXIvQ29tcG9uZW50Lm1qcyc7XG5pbXBvcnQgRG9tRXZlbnRNYW5hZ2VyICBmcm9tICcuLi9tYW5hZ2VyL0RvbUV2ZW50Lm1qcyc7XG5pbXBvcnQgTG9nZ2VyICAgICAgICAgICBmcm9tICcuLi9jb3JlL0xvZ2dlci5tanMnO1xuaW1wb3J0IE5lb0Z1bmN0aW9uICAgICAgZnJvbSAnLi4vdXRpbC9GdW5jdGlvbi5tanMnO1xuXG4vKipcbiAqIEBjbGFzcyBOZW8uY29udHJvbGxlci5Db21wb25lbnRcbiAqIEBleHRlbmRzIE5lby5jb250cm9sbGVyLkJhc2VcbiAqL1xuY2xhc3MgQ29tcG9uZW50IGV4dGVuZHMgQmFzZSB7XG4gICAgc3RhdGljIGdldENvbmZpZygpIHtyZXR1cm4ge1xuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBjbGFzc05hbWU9J05lby5jb250cm9sbGVyLkNvbXBvbmVudCdcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgY2xhc3NOYW1lOiAnTmVvLmNvbnRyb2xsZXIuQ29tcG9uZW50JyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gbnR5cGU9J3ZpZXctY29udHJvbGxlcidcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgbnR5cGU6ICdjb21wb25lbnQtY29udHJvbGxlcicsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtPYmplY3R9IHJlZmVyZW5jZXM9bnVsbFxuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICByZWZlcmVuY2VzOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7T2JqZWN0fSB2aWV3Xz1udWxsXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIHZpZXdfOiBudWxsXG4gICAgfX1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZ1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgICAgICBzdXBlcihjb25maWcpO1xuXG4gICAgICAgIGxldCBtZSA9IHRoaXM7XG5cbiAgICAgICAgbWUucmVmZXJlbmNlcyA9IHt9O1xuXG4gICAgICAgIE5lb0Z1bmN0aW9uLmNyZWF0ZVNlcXVlbmNlKG1lLnZpZXcsICdvbkNvbnN0cnVjdGVkJywgbWUub25WaWV3Q29uc3RydWN0ZWQsIG1lKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgd2hlbiBhY2Nlc3NpbmcgdGhlIHZpZXcgY29uZmlnXG4gICAgICogQHBhcmFtIHtCb29sZWFufSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYmVmb3JlR2V0Vmlldyh2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIE5lby5nZXQodmFsdWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCBiZWZvcmUgdGhlIHZpZXcgY29uZmlnIGdldHMgY2hhbmdlZFxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gdmFsdWVcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGJlZm9yZVNldFZpZXcodmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZS5pZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBbbnR5cGVdXG4gICAgICogQHJldHVybnMge05lby5jb250cm9sbGVyLkNvbXBvbmVudHxudWxsfVxuICAgICAqL1xuICAgIGdldFBhcmVudChudHlwZSkge1xuICAgICAgICBsZXQgbWUgICAgICA9IHRoaXMsXG4gICAgICAgICAgICB2aWV3ICAgID0gbWUudmlldyxcbiAgICAgICAgICAgIHBhcmVudHMgPSBDb21wb25lbnRNYW5hZ2VyLmdldFBhcmVudHModmlldyksXG4gICAgICAgICAgICBpICAgICAgID0gMCxcbiAgICAgICAgICAgIGxlbiAgICAgPSBwYXJlbnRzLmxlbmd0aCxcbiAgICAgICAgICAgIGNvbnRyb2xsZXI7XG5cbiAgICAgICAgZm9yICg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgY29udHJvbGxlciA9IHBhcmVudHNbaV0uY29udHJvbGxlcjtcblxuICAgICAgICAgICAgaWYgKGNvbnRyb2xsZXIpIHtcbiAgICAgICAgICAgICAgICBpZiAobnR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG50eXBlID09PSBjb250cm9sbGVyLm50eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29udHJvbGxlcjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjb250cm9sbGVyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGhhbmRsZXJOYW1lXG4gICAgICogQHJldHVybnMge05lby5jb250cm9sbGVyLkNvbXBvbmVudHxudWxsfVxuICAgICAqL1xuICAgIGdldFBhcmVudEhhbmRsZXJTY29wZShoYW5kbGVyTmFtZSkge1xuICAgICAgICBsZXQgbWUgICAgICA9IHRoaXMsXG4gICAgICAgICAgICB2aWV3ICAgID0gbWUudmlldyxcbiAgICAgICAgICAgIHBhcmVudHMgPSBDb21wb25lbnRNYW5hZ2VyLmdldFBhcmVudHModmlldyksXG4gICAgICAgICAgICBpICAgICAgID0gMCxcbiAgICAgICAgICAgIGxlbiAgICAgPSBwYXJlbnRzLmxlbmd0aCxcbiAgICAgICAgICAgIGNvbnRyb2xsZXI7XG5cbiAgICAgICAgZm9yICg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgY29udHJvbGxlciA9IHBhcmVudHNbaV0uY29udHJvbGxlcjtcblxuICAgICAgICAgICAgaWYgKGNvbnRyb2xsZXIgJiYgY29udHJvbGxlcltoYW5kbGVyTmFtZV0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29udHJvbGxlcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHRvZG86IGNsZWFudXAgbm8gbG9uZ2VyIGV4aXN0aW5nIHJlZmVyZW5jZXNcbiAgICAgKiB0b2RvOiB1cGRhdGUgY2hhbmdlZCByZWZlcmVuY2VzIChlLmcuIGNvbnRhaW5lci5yZW1vdmUoKSB0aGVuIGNvbnRhaW5lci5hZGQoKSB1c2luZyB0aGUgc2FtZSBrZXkpXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcbiAgICAgKiBAcmV0dXJucyB7Kn1cbiAgICAgKi9cbiAgICBnZXRSZWZlcmVuY2UobmFtZSkge1xuICAgICAgICBsZXQgbWUgICAgICAgICAgPSB0aGlzLFxuICAgICAgICAgICAgY29tcG9uZW50SWQgPSBtZS5yZWZlcmVuY2VzW25hbWVdLFxuICAgICAgICAgICAgY29tcG9uZW50O1xuXG4gICAgICAgIGlmIChjb21wb25lbnRJZCkge1xuICAgICAgICAgICAgY29tcG9uZW50ID0gTmVvLmdldENvbXBvbmVudChjb21wb25lbnRJZCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWNvbXBvbmVudCkge1xuICAgICAgICAgICAgY29tcG9uZW50ID0gbWUudmlldy5kb3duKHtyZWZlcmVuY2U6IG5hbWV9KTtcblxuICAgICAgICAgICAgaWYgKGNvbXBvbmVudCkge1xuICAgICAgICAgICAgICAgIG1lLnJlZmVyZW5jZXNbbmFtZV0gPSBjb21wb25lbnQuaWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY29tcG9uZW50IHx8IG51bGw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge05lby5jb21wb25lbnQuQmFzZX0gdmlld1xuICAgICAqL1xuICAgIG9uVmlld0NvbnN0cnVjdGVkKHZpZXcpIHtcbiAgICAgICAgbGV0IG1lICAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICBjaGlsZENhbGwgPSAhIXZpZXcsXG4gICAgICAgICAgICBkb21MaXN0ZW5lcnMsIGV2ZW50SGFuZGxlciwgZm4sIHBhcmVudENvbnRyb2xsZXI7XG5cbiAgICAgICAgdmlldyA9IHZpZXcgfHwgbWUudmlldztcblxuICAgICAgICB2aWV3LmRvbUxpc3RlbmVycyA9IE5lby5jbG9uZSh2aWV3LmRvbUxpc3RlbmVycywgdHJ1ZSwgdHJ1ZSk7IC8vIGVuc3VyZSB0aGVyZSBpcyBubyBpbnRlcmZlcmVuY2Ugb24gcHJvdG90eXBlIGxldmVsXG4gICAgICAgIGRvbUxpc3RlbmVycyA9IHZpZXcuZG9tTGlzdGVuZXJzO1xuXG4gICAgICAgIGlmIChkb21MaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShkb21MaXN0ZW5lcnMpKSB7XG4gICAgICAgICAgICAgICAgZG9tTGlzdGVuZXJzID0gW2RvbUxpc3RlbmVyc107XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRvbUxpc3RlbmVycy5mb3JFYWNoKGRvbUxpc3RlbmVyID0+IHtcbiAgICAgICAgICAgICAgICBPYmplY3QuZW50cmllcyhkb21MaXN0ZW5lcikuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50SGFuZGxlciA9IG51bGw7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGtleSAhPT0gJ3Njb3BlJyAmJiBrZXkgIT09ICdkZWxlZ2F0ZScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChOZW8uaXNTdHJpbmcodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRIYW5kbGVyID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKE5lby5pc09iamVjdCh2YWx1ZSkgJiYgdmFsdWUuaGFzT3duUHJvcGVydHkoJ2ZuJykgJiYgTmVvLmlzU3RyaW5nKHZhbHVlLmZuKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50SGFuZGxlciA9IHZhbHVlLmZuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnRIYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFtZVtldmVudEhhbmRsZXJdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudENvbnRyb2xsZXIgPSBtZS5nZXRQYXJlbnRIYW5kbGVyU2NvcGUoZXZlbnRIYW5kbGVyKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXBhcmVudENvbnRyb2xsZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIExvZ2dlci5sb2dFcnJvcignVW5rbm93biBkb21FdmVudCBoYW5kbGVyIGZvcicsIHZpZXcsIGV2ZW50SGFuZGxlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbiAgICAgICAgICAgICAgID0gcGFyZW50Q29udHJvbGxlcltldmVudEhhbmRsZXJdLmJpbmQocGFyZW50Q29udHJvbGxlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb21MaXN0ZW5lcltrZXldID0gZm47XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIERvbUV2ZW50TWFuYWdlci51cGRhdGVMaXN0ZW5lclBsYWNlaG9sZGVyKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wb25lbnRJZCAgICAgICA6IHZpZXcuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRIYW5kbGVyTWV0aG9kOiBmbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudEhhbmRsZXJOYW1lICA6IGV2ZW50SGFuZGxlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudE5hbWUgICAgICAgICA6IGtleSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY29wZSAgICAgICAgICAgICA6IHBhcmVudENvbnRyb2xsZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm4gICAgICAgICAgICAgICA9IG1lW2V2ZW50SGFuZGxlcl0uYmluZChtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvbUxpc3RlbmVyW2tleV0gPSBmbjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBEb21FdmVudE1hbmFnZXIudXBkYXRlTGlzdGVuZXJQbGFjZWhvbGRlcih7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wb25lbnRJZCAgICAgICA6IHZpZXcuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudEhhbmRsZXJNZXRob2Q6IGZuLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRIYW5kbGVyTmFtZSAgOiBldmVudEhhbmRsZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudE5hbWUgICAgICAgICA6IGtleSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlICAgICAgICAgICAgIDogbWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2aWV3Lmxpc3RlbmVycykge1xuICAgICAgICAgICAgT2JqZWN0LmVudHJpZXModmlldy5saXN0ZW5lcnMpLmZvckVhY2goKFtuYW1lLCBsaXN0ZW5lcl0pID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShsaXN0ZW5lcikpIHtcbiAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXIuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRIYW5kbGVyID0gbnVsbDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKE5lby5pc09iamVjdChrZXkpICYmIGtleS5oYXNPd25Qcm9wZXJ0eSgnZm4nKSAmJiBOZW8uaXNTdHJpbmcoa2V5LmZuKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50SGFuZGxlciA9IGtleS5mbjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbWVbZXZlbnRIYW5kbGVyXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBMb2dnZXIubG9nRXJyb3IoJ1Vua25vd24gZXZlbnQgaGFuZGxlciBmb3InLCB2aWV3LCBldmVudEhhbmRsZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleS5mbiA9IG1lW2V2ZW50SGFuZGxlcl0uYmluZChtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2aWV3Lml0ZW1zKSB7XG4gICAgICAgICAgICB2aWV3Lml0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFpdGVtLmNvbnRyb2xsZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgbWUub25WaWV3Q29uc3RydWN0ZWQoaXRlbSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWNoaWxkQ2FsbCkge1xuICAgICAgICAgICAgbWUub25WaWV3UGFyc2VkKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBPdmVycmlkZSB0aGlzIG1ldGhvZCBpbnNpZGUgeW91ciB2aWV3IGNvbnRyb2xsZXJzIGFzIGEgc3RhcnRpbmcgcG9pbnQgaW4gY2FzZSB5b3UgbmVlZCByZWZlcmVuY2VzXG4gICAgICogKGluc3RlYWQgb2YgdXNpbmcgb25Db25zdHJ1Y3RlZCgpIGluc2lkZSB5b3VyIGNvbnRyb2xsZXIpXG4gICAgICovXG4gICAgb25WaWV3UGFyc2VkKCkge1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gY29uZmlnXG4gICAgICovXG4gICAgcGFyc2VDb25maWcoY29uZmlnKSB7XG4gICAgICAgIGxldCBtZSAgICAgICAgICAgPSB0aGlzLFxuICAgICAgICAgICAgdmlldyAgICAgICAgID0gY29uZmlnIHx8IG1lLnZpZXcsXG4gICAgICAgICAgICBkb21MaXN0ZW5lcnMgPSB2aWV3LmRvbUxpc3RlbmVycyxcbiAgICAgICAgICAgIGV2ZW50SGFuZGxlcjtcblxuICAgICAgICBpZiAoZG9tTGlzdGVuZXJzKSB7XG4gICAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoZG9tTGlzdGVuZXJzKSkge1xuICAgICAgICAgICAgICAgIGRvbUxpc3RlbmVycyA9IFtkb21MaXN0ZW5lcnNdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkb21MaXN0ZW5lcnMuZm9yRWFjaChkb21MaXN0ZW5lciA9PiB7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmVudHJpZXMoZG9tTGlzdGVuZXIpLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBldmVudEhhbmRsZXIgPSBudWxsO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChrZXkgIT09ICdzY29wZScgJiYga2V5ICE9PSAnZGVsZWdhdGUnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoTmVvLmlzU3RyaW5nKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50SGFuZGxlciA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChOZW8uaXNPYmplY3QodmFsdWUpICYmIHZhbHVlLmhhc093blByb3BlcnR5KCdmbicpICYmIE5lby5pc1N0cmluZyh2YWx1ZS5mbikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudEhhbmRsZXIgPSB2YWx1ZS5mbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGV2ZW50SGFuZGxlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbWVbZXZlbnRIYW5kbGVyXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBMb2dnZXIubG9nRXJyb3IoJ1Vua25vd24gZG9tRXZlbnQgaGFuZGxlciBmb3InLCB2aWV3LCBldmVudEhhbmRsZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7Y29uc29sZS5sb2coJyMnLCBrZXksIG1lLmlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3BhcnNlQ29uZmlnJywgZXZlbnRIYW5kbGVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9tTGlzdGVuZXJba2V5XSA9IG1lW2V2ZW50SGFuZGxlcl0uYmluZChtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2aWV3Lmxpc3RlbmVycykge1xuICAgICAgICAgICAgT2JqZWN0LmVudHJpZXModmlldy5saXN0ZW5lcnMpLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xuICAgICAgICAgICAgICAgIGV2ZW50SGFuZGxlciA9IG51bGw7XG5cbiAgICAgICAgICAgICAgICBpZiAoa2V5ICE9PSAnc2NvcGUnICYmIGtleSAhPT0gJ2RlbGVnYXRlJykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoTmVvLmlzU3RyaW5nKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRIYW5kbGVyID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoTmVvLmlzT2JqZWN0KHZhbHVlKSAmJiB2YWx1ZS5oYXNPd25Qcm9wZXJ0eSgnZm4nKSAmJiBOZW8uaXNTdHJpbmcodmFsdWUuZm4pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudEhhbmRsZXIgPSB2YWx1ZS5mbjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChldmVudEhhbmRsZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbWVbZXZlbnRIYW5kbGVyXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIExvZ2dlci5sb2dFcnJvcignVW5rbm93biBldmVudCBoYW5kbGVyIGZvcicsIHZpZXcsIGV2ZW50SGFuZGxlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpZXcubGlzdGVuZXJzW2tleV0gPSBtZVtldmVudEhhbmRsZXJdLmJpbmQobWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodmlldy5oZWFkZXJzKSB7XG4gICAgICAgICAgICB2aWV3LmhlYWRlcnMuZm9yRWFjaChoZWFkZXIgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghaGVhZGVyLmNvbnRyb2xsZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgbWUucGFyc2VDb25maWcoaGVhZGVyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2aWV3Lml0ZW1zKSB7XG4gICAgICAgICAgICB2aWV3Lml0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFpdGVtLmNvbnRyb2xsZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgbWUucGFyc2VDb25maWcoaXRlbSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbk5lby5hcHBseUNsYXNzQ29uZmlnKENvbXBvbmVudCk7XG5cbmV4cG9ydCB7Q29tcG9uZW50IGFzIGRlZmF1bHR9OyIsImltcG9ydCBCYXNlIGZyb20gJy4uL2NvcmUvQmFzZS5tanMnO1xuXG4vKipcbiAqIEBjbGFzcyBOZW8uZGF0YS5Nb2RlbFxuICogQGV4dGVuZHMgTmVvLmNvcmUuQmFzZVxuICovXG5jbGFzcyBNb2RlbCBleHRlbmRzIEJhc2Uge1xuICAgIHN0YXRpYyBnZXRDb25maWcoKSB7cmV0dXJuIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gY2xhc3NOYW1lPSdOZW8uZGF0YS5Nb2RlbCdcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgY2xhc3NOYW1lOiAnTmVvLmRhdGEuTW9kZWwnLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBudHlwZT0nbW9kZWwnXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIG50eXBlOiAnbW9kZWwnLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7QXJyYXl9IGZpZWxkc189W11cbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgZmllbGRzXzogW10sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IGtleVByb3BlcnR5Xz0naWQnXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIGtleVByb3BlcnR5XzogJ2lkJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ3xudWxsfSBzdG9yZUlkPW51bGxcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgc3RvcmVJZDogbnVsbCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNldCB0aGlzIGNvbmZpZyB0byB0cnVlIGluIGNhc2UgeW91IHdhbnQgdG8gdHJhY2sgbW9kaWZpZWQgZmllbGRzLlxuICAgICAgICAgKiBCZSBhd2FyZSB0aGF0IHRoaXMgd2lsbCBkb3VibGUgdGhlIGFtb3VudCBvZiBkYXRhIGluc2lkZSBlYWNoIHJlY29yZCxcbiAgICAgICAgICogc2luY2UgZWFjaCBmaWVsZCB3aWxsIGdldCBhbiBvcmlnaW5hbCB2YWx1ZSBmbGFnLlxuICAgICAgICAgKiBAbWVtYmVyIHtCb29sZWFufSB0cmFja01vZGlmaWVkRmllbGRzPWZhbHNlXG4gICAgICAgICAqL1xuICAgICAgICB0cmFja01vZGlmaWVkRmllbGRzOiBmYWxzZVxuICAgIH19XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7QXJyYXl9IHZhbHVlXG4gICAgICogQHBhcmFtIHtBcnJheX0gb2xkVmFsdWVcbiAgICAgKi9cbiAgICBhZnRlclNldEZpZWxkcyh2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgLy8gdG9kb1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnYWZ0ZXJTZXRGaWVsZHMnLCB2YWx1ZSwgb2xkVmFsdWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZpbmRzIGEgZmllbGQgY29uZmlnIGJ5IGEgZ2l2ZW4gZmllbGQgbmFtZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBrZXlcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0fG51bGx9IFRoZSBmaWVsZCBjb25maWcgb2JqZWN0IG9yIG51bGwgaWYgbm8gbWF0Y2ggd2FzIGZvdW5kXG4gICAgICovXG4gICAgZ2V0RmllbGQoa2V5KSB7XG4gICAgICAgIGxldCBtZSAgPSB0aGlzLFxuICAgICAgICAgICAgaSAgID0gMCxcbiAgICAgICAgICAgIGxlbiA9IG1lLmZpZWxkcy5sZW5ndGg7XG5cbiAgICAgICAgZm9yICg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgaWYgKG1lLmZpZWxkc1tpXS5uYW1lID09PSBrZXkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbWUuZmllbGRzW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxufVxuXG5OZW8uYXBwbHlDbGFzc0NvbmZpZyhNb2RlbCk7XG5cbmV4cG9ydCB7TW9kZWwgYXMgZGVmYXVsdH07IiwiaW1wb3J0IEJhc2UgICBmcm9tICcuLi9jb3JlL0Jhc2UubWpzJztcbmltcG9ydCBMb2dnZXIgZnJvbSAnLi4vY29yZS9Mb2dnZXIubWpzJztcbmltcG9ydCBNb2RlbCAgZnJvbSAnLi9Nb2RlbC5tanMnO1xuXG5sZXQgaW5zdGFuY2U7XG5cbi8qKlxuICogQGNsYXNzIE5lby5kYXRhLlJlY29yZEZhY3RvcnlcbiAqIEBleHRlbmRzIE5lby5jb3JlLkJhc2VcbiAqIEBzaW5nbGV0b25cbiAqL1xuY2xhc3MgUmVjb3JkRmFjdG9yeSBleHRlbmRzIEJhc2Uge1xuICAgIHN0YXRpYyBnZXRDb25maWcoKSB7cmV0dXJuIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gY2xhc3NOYW1lPSdOZW8uZGF0YS5SZWNvcmRGYWN0b3J5J1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBjbGFzc05hbWU6ICdOZW8uZGF0YS5SZWNvcmRGYWN0b3J5JyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge0Jvb2xlYW59IHNpbmdsZXRvbj10cnVlXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIHNpbmdsZXRvbjogdHJ1ZSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBpbnRlcm5hbCByZWNvcmQgcHJlZml4IGZvciBvcmlnaW5hbCBmaWVsZCB2YWx1ZXMuXG4gICAgICAgICAqIE9ubHkgdXNlZCBpbiBjYXNlIHRoZSBtb2RlbCBoYXMgdHJhY2tNb2RpZmllZEZpZWxkcyBzZXQgdG8gdHJ1ZS5cbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBvdlByZWZpeD0nb3ZfJ1xuICAgICAgICAgKi9cbiAgICAgICAgb3ZQcmVmaXg6ICdvdl8nLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSByZWNvcmROYW1lc3BhY2U9J05lby5kYXRhLnJlY29yZC4nXG4gICAgICAgICAqL1xuICAgICAgICByZWNvcmROYW1lc3BhY2U6ICdOZW8uZGF0YS5yZWNvcmQuJ1xuICAgIH19XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7TmVvLmRhdGEuTW9kZWx9IG1vZGVsXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZ1xuICAgICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAgICovXG4gICAgY3JlYXRlUmVjb3JkKG1vZGVsLCBjb25maWcpIHtcbiAgICAgICAgbGV0IHJlY29yZENsYXNzID0gTmVvLm5zKHRoaXMucmVjb3JkTmFtZXNwYWNlICsgbW9kZWwuY2xhc3NOYW1lKTtcblxuICAgICAgICBpZiAoIXJlY29yZENsYXNzKSB7XG4gICAgICAgICAgICByZWNvcmRDbGFzcyA9IHRoaXMuY3JlYXRlUmVjb3JkQ2xhc3MobW9kZWwpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5ldyByZWNvcmRDbGFzcyhjb25maWcpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtOZW8uZGF0YS5Nb2RlbH0gbW9kZWxcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgICAqL1xuICAgIGNyZWF0ZVJlY29yZENsYXNzKG1vZGVsKSB7XG4gICAgICAgIGlmIChtb2RlbCBpbnN0YW5jZW9mIE1vZGVsKSB7XG4gICAgICAgICAgICBsZXQgY2xhc3NOYW1lID0gdGhpcy5yZWNvcmROYW1lc3BhY2UgKyBtb2RlbC5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgbnMgICAgICAgID0gTmVvLm5zKGNsYXNzTmFtZSksXG4gICAgICAgICAgICAgICAga2V5LCBuc0FycmF5O1xuXG4gICAgICAgICAgICBtb2RlbC50cmFja01vZGlmaWVkRmllbGRzID0gdHJ1ZTsgLy8gdG9kbzogcmVtb3ZlLCBqdXN0IGZvciB0ZXN0aW5nXG5cbiAgICAgICAgICAgIGlmICghbnMpIHtcbiAgICAgICAgICAgICAgICBuc0FycmF5ID0gY2xhc3NOYW1lLnNwbGl0KCcuJyk7XG4gICAgICAgICAgICAgICAga2V5ICAgICA9IG5zQXJyYXkucG9wKCk7XG4gICAgICAgICAgICAgICAgbnMgICAgICA9IE5lby5ucyhuc0FycmF5LCB0cnVlKTtcbiAgICAgICAgICAgICAgICBuc1trZXldID0gY2xhc3MgUmVjb3JkIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbWUgPSB0aGlzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BlcnRpZXM7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKG1lLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2lzTW9kaWZpZWQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgICA6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3cml0YWJsZTogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShtb2RlbC5maWVsZHMpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWwuZmllbGRzLmZvckVhY2goZmllbGQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcGFyc2VkVmFsdWUgPSBpbnN0YW5jZS5wYXJzZVJlY29yZFZhbHVlKGZpZWxkLCBjb25maWdbZmllbGQubmFtZV0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ltYm9sICAgICAgPSBTeW1ib2woZmllbGQubmFtZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcGVydGllcyA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtzeW1ib2xdOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgICA6IHBhcnNlZFZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2ZpZWxkLm5hbWVdOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVudW1lcmFibGUgIDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZXQoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzW3N5bWJvbF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXQodmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1lICAgICAgID0gdGhpcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9sZFZhbHVlID0gbWVbc3ltYm9sXTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5zdGFuY2UuaGFzQ2hhbmdlZCh2YWx1ZSwgb2xkVmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IGluc3RhbmNlLnBhcnNlUmVjb3JkVmFsdWUoZmllbGQsIHZhbHVlKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVbc3ltYm9sXSA9IHZhbHVlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZS5faXNNb2RpZmllZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZS5faXNNb2RpZmllZCA9IGluc3RhbmNlLmlzTW9kaWZpZWQobWUsIG1vZGVsLnRyYWNrTW9kaWZpZWRGaWVsZHMpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZS5vblJlY29yZENoYW5nZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmllbGQgICA6IGZpZWxkLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWwgICA6IG1vZGVsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9sZFZhbHVlOiBvbGRWYWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWNvcmQgIDogbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgICA6IHZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBhZGRpbmcgdGhlIG9yaWdpbmFsIHZhbHVlIG9mIGVhY2ggZmllbGRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1vZGVsLnRyYWNrTW9kaWZpZWRGaWVsZHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BlcnRpZXNbaW5zdGFuY2Uub3ZQcmVmaXggKyBmaWVsZC5uYW1lXSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcGFyc2VkVmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKG1lLCBwcm9wZXJ0aWVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG5cblxuICAgICAgICAgICAgICAgIHJldHVybiBuc1trZXldO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gbnM7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgdGhlIHZhbHVlIG9mIGEgY29uZmlnIGhhcyBjaGFuZ2VkXG4gICAgICogdG9kbzogd2UgY291bGQgY29tcGFyZSBvYmplY3RzICYgYXJyYXlzIGZvciBlcXVhbGl0eVxuICAgICAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAgICAgKiBAcGFyYW0geyp9IG9sZFZhbHVlXG4gICAgICogQHJldHVybnMge0Jvb2xlYW59XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBoYXNDaGFuZ2VkKHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKE5lby5pc09iamVjdCh2YWx1ZSkpIHtcbiAgICAgICAgICAgIGlmIChvbGRWYWx1ZSBpbnN0YW5jZW9mIERhdGUgJiYgdmFsdWUgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9sZFZhbHVlLnZhbHVlT2YoKSAhPT0gdmFsdWUudmFsdWVPZigpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBvbGRWYWx1ZSAhPT0gdmFsdWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gcmVjb3JkXG4gICAgICogQHBhcmFtIHtCb29sZWFufSB0cmFja01vZGlmaWVkRmllbGRzXG4gICAgICogQHJldHVybnMge0Jvb2xlYW59IHRydWUgaW4gY2FzZSBhIGNoYW5nZSB3YXMgZm91bmRcbiAgICAgKi9cbiAgICBpc01vZGlmaWVkKHJlY29yZCwgdHJhY2tNb2RpZmllZEZpZWxkcykge1xuICAgICAgICBpZiAodHJhY2tNb2RpZmllZEZpZWxkcykge1xuICAgICAgICAgICAgbGV0IGZpZWxkcyA9IE9iamVjdC5rZXlzKHJlY29yZCksXG4gICAgICAgICAgICAgICAgaSAgICAgID0gMCxcbiAgICAgICAgICAgICAgICBsZW4gICAgPSBmaWVsZHMubGVuZ3RoLFxuICAgICAgICAgICAgICAgIGZpZWxkO1xuXG4gICAgICAgICAgICBmb3IgKDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgZmllbGQgPSBmaWVsZHNbaV07XG5cbiAgICAgICAgICAgICAgICBpZiAocmVjb3JkW2ZpZWxkXSAhPT0gcmVjb3JkW3RoaXMub3ZQcmVmaXggKyBmaWVsZF0pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVjb3JkLl9pc01vZGlmaWVkO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHJlY29yZFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBmaWVsZE5hbWVcbiAgICAgKiBAcmV0dXJucyB7Qm9vbGVhbnxudWxsfSBudWxsIGluIGNhc2UgdGhlIG1vZGVsIGRvZXMgbm90IHVzZSB0cmFja01vZGlmaWVkRmllbGRzLCB0cnVlIGluIGNhc2UgYSBjaGFuZ2Ugd2FzIGZvdW5kXG4gICAgICovXG4gICAgaXNNb2RpZmllZEZpZWxkKHJlY29yZCwgZmllbGROYW1lKSB7XG4gICAgICAgIGlmICghcmVjb3JkLmhhc093blByb3BlcnR5KGZpZWxkTmFtZSkpIHtcbiAgICAgICAgICAgIExvZ2dlci5sb2dFcnJvcignVGhlIHJlY29yZCBkb2VzIG5vdCBjb250YWluIHRoZSBmaWVsZCcsIGZpZWxkTmFtZSwgcmVjb3JkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChyZWNvcmQuaGFzT3duUHJvcGVydHkodGhpcy5vdlByZWZpeCArIGZpZWxkTmFtZSkpIHtcbiAgICAgICAgICAgIHJldHVybiByZWNvcmRbZmllbGROYW1lXSAhPT0gcmVjb3JkW3RoaXMub3ZQcmVmaXggKyBmaWVsZE5hbWVdO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGVzdHMgaWYgYSBnaXZlbiBvYmplY3QgaXMgYW4gaW5zdGFuY2Ugb2YgYSBjbGFzcyBjcmVhdGVkIGJ5IHRoaXMgZmFjdG9yeVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAgICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBpc1JlY29yZChvYmopIHtcbiAgICAgICAgcmV0dXJuIG9iaiAmJiBvYmouY29uc3RydWN0b3IgJiYgb2JqLmNvbnN0cnVjdG9yLm5hbWUgJiYgb2JqLmNvbnN0cnVjdG9yLm5hbWUgPT09ICdSZWNvcmQnO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdHJpZ2dlcmVkIGFmdGVyIGNoYW5naW5nIHRoZSB2YWx1ZSBvZiBhIHJlY29yZCBmaWVsZC5cbiAgICAgKiBFLmcuIG15UmVjb3JkLmZvbyA9ICdiYXInO1xuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG9wdHMuZmllbGQgVGhlIG5hbWUgb2YgdGhlIGZpZWxkIHdoaWNoIGdvdCBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtOZW8uZGF0YS5Nb2RlbH0gb3B0cy5tb2RlbCBUaGUgbW9kZWwgaW5zdGFuY2Ugb2YgdGhlIGNoYW5nZWQgcmVjb3JkXG4gICAgICogQHBhcmFtIHsqfSBvcHRzLm9sZFZhbHVlXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdHMucmVjb3JkXG4gICAgICogQHBhcmFtIHsqfSBvcHRzLnZhbHVlXG4gICAgICovXG4gICAgb25SZWNvcmRDaGFuZ2Uob3B0cykge1xuICAgICAgICBsZXQgc3RvcmUgPSBOZW8uZ2V0KG9wdHMubW9kZWwuc3RvcmVJZCk7XG5cbiAgICAgICAgaWYgKHN0b3JlKSB7XG4gICAgICAgICAgICBzdG9yZS5vblJlY29yZENoYW5nZShvcHRzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHRvZG86IHBhcnNlIHZhbHVlIGZvciBtb3JlIGZpZWxkIHR5cGVzXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGZpZWxkXG4gICAgICogQHBhcmFtIHsqfSB2YWx1ZVxuICAgICAqIEByZXR1cm5zIHsqfVxuICAgICAqL1xuICAgIHBhcnNlUmVjb3JkVmFsdWUoZmllbGQsIHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IHR5cGUgPSBmaWVsZC50eXBlICYmIGZpZWxkLnR5cGUudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICBpZiAodHlwZSA9PT0gJ2RhdGUnKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IERhdGUodmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbn1cblxuTmVvLmFwcGx5Q2xhc3NDb25maWcoUmVjb3JkRmFjdG9yeSk7XG5cbmluc3RhbmNlID0gTmVvLmNyZWF0ZShSZWNvcmRGYWN0b3J5KTtcblxuTmVvLmFwcGx5VG9HbG9iYWxOcyhpbnN0YW5jZSk7XG5cbmV4cG9ydCBkZWZhdWx0IGluc3RhbmNlOyIsImltcG9ydCBCYXNlICAgICAgICAgICAgZnJvbSAnLi4vY29sbGVjdGlvbi9CYXNlLm1qcyc7XG5pbXBvcnQgQ2xhc3NTeXN0ZW1VdGlsIGZyb20gJy4uL3V0aWwvQ2xhc3NTeXN0ZW0ubWpzJztcbmltcG9ydCBNb2RlbCAgICAgICAgICAgZnJvbSAnLi9Nb2RlbC5tanMnO1xuaW1wb3J0IE9ic2VydmFibGUgICAgICBmcm9tICcuLi9jb3JlL09ic2VydmFibGUubWpzJztcbmltcG9ydCBSZWNvcmRGYWN0b3J5ICAgZnJvbSAnLi9SZWNvcmRGYWN0b3J5Lm1qcyc7XG5cbi8qKlxuICogQGNsYXNzIE5lby5kYXRhLlN0b3JlXG4gKiBAZXh0ZW5kcyBOZW8uY29sbGVjdGlvbi5CYXNlXG4gKi9cbmNsYXNzIFN0b3JlIGV4dGVuZHMgQmFzZSB7XG4gICAgc3RhdGljIGdldFN0YXRpY0NvbmZpZygpIHtyZXR1cm4ge1xuICAgICAgICAvKipcbiAgICAgICAgICogVHJ1ZSBhdXRvbWF0aWNhbGx5IGFwcGxpZXMgdGhlIGNvcmUvT2JzZXJ2YWJsZS5tanMgbWl4aW5cbiAgICAgICAgICogQG1lbWJlciB7Qm9vbGVhbn0gb2JzZXJ2YWJsZT10cnVlXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICovXG4gICAgICAgIG9ic2VydmFibGU6IHRydWVcbiAgICB9fVxuXG4gICAgc3RhdGljIGdldENvbmZpZygpIHtyZXR1cm4ge1xuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBjbGFzc05hbWU9J05lby5kYXRhLlN0b3JlJ1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBjbGFzc05hbWU6ICdOZW8uZGF0YS5TdG9yZScsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IG50eXBlPSdzdG9yZSdcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgbnR5cGU6ICdzdG9yZScsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtCb29sZWFufSBhdXRvTG9hZD1mYWxzZVxuICAgICAgICAgKi9cbiAgICAgICAgYXV0b0xvYWQ6IGZhbHNlLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7QXJyYXl8bnVsbH0gZGF0YV89bnVsbFxuICAgICAgICAgKi9cbiAgICAgICAgZGF0YV86IG51bGwsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtBcnJheXxudWxsfSBpbml0aWFsRGF0YV89bnVsbFxuICAgICAgICAgKi9cbiAgICAgICAgaW5pdGlhbERhdGFfOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7Qm9vbGVhbn0gaXNHcm91cGVkPWZhbHNlXG4gICAgICAgICAqL1xuICAgICAgICBpc0dyb3VwZWQ6IGZhbHNlLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7Qm9vbGVhbn0gaXNMb2FkZWQ9ZmFsc2VcbiAgICAgICAgICovXG4gICAgICAgIGlzTG9hZGVkOiBmYWxzZSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge0Jvb2xlYW59IGlzTG9hZGluZz1mYWxzZVxuICAgICAgICAgKi9cbiAgICAgICAgaXNMb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge05lby5kYXRhLk1vZGVsfSBtb2RlbF89bnVsbFxuICAgICAgICAgKi9cbiAgICAgICAgbW9kZWxfOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogVHJ1ZSB0byBsZXQgdGhlIGJhY2tlbmQgaGFuZGxlIHRoZSBmaWx0ZXJpbmcuXG4gICAgICAgICAqIFVzZWZ1bCBmb3IgYnVmZmVyZWQgc3RvcmVzXG4gICAgICAgICAqIEBtZW1iZXIge0Jvb2xlYW59IHJlbW90ZUZpbHRlcj1mYWxzZVxuICAgICAgICAgKi9cbiAgICAgICAgcmVtb3RlRmlsdGVyOiBmYWxzZSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRydWUgdG8gbGV0IHRoZSBiYWNrZW5kIGhhbmRsZSB0aGUgc29ydGluZy5cbiAgICAgICAgICogVXNlZnVsIGZvciBidWZmZXJlZCBzdG9yZXNcbiAgICAgICAgICogQG1lbWJlciB7Qm9vbGVhbn0gcmVtb3RlU29ydD1mYWxzZVxuICAgICAgICAgKi9cbiAgICAgICAgcmVtb3RlU29ydDogZmFsc2UsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBVcmwgZm9yIEFqYXggcmVxdWVzdHNcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfG51bGx9IHVybD1udWxsXG4gICAgICAgICAqL1xuICAgICAgICB1cmw6IG51bGxcbiAgICB9fVxuXG4gICAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgICAgIHN1cGVyKGNvbmZpZyk7XG5cbiAgICAgICAgbGV0IG1lID0gdGhpcztcblxuICAgICAgICAvLyB0b2RvXG4gICAgICAgIG1lLm9uKHtcbiAgICAgICAgICAgIG11dGF0ZTogbWUub25Db2xsZWN0aW9uTXV0YXRlLFxuICAgICAgICAgICAgc29ydCAgOiBtZS5vbkNvbGxlY3Rpb25Tb3J0LFxuICAgICAgICAgICAgc2NvcGUgOiBtZVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIG9uQ29uc3RydWN0ZWQoKSB7XG4gICAgICAgIHN1cGVyLm9uQ29uc3RydWN0ZWQoKTtcblxuICAgICAgICBsZXQgbWUgPSB0aGlzO1xuXG4gICAgICAgIGlmIChtZS5kYXRhKSB7XG4gICAgICAgICAgICBtZS5hZnRlclNldERhdGEobWUuZGF0YSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobWUuYXV0b0xvYWQpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4geyAvLyB0b2RvXG4gICAgICAgICAgICAgICAgbWUubG9hZCgpO1xuICAgICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHZhbHVlXG4gICAgICogQHBhcmFtIG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGFmdGVyU2V0RGF0YSh2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgbGV0IG1lID0gdGhpcztcblxuICAgICAgICBpZiAobWUuY29uZmlnc0FwcGxpZWQpIHtcbiAgICAgICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmIChvbGRWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBtZS5jbGVhcigpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG1lLmluaXRpYWxEYXRhID0gWy4uLnZhbHVlXTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBtZS5hZGQodmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdmFsdWVcbiAgICAgKiBAcGFyYW0gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYWZ0ZXJTZXRJbml0aWFsRGF0YSh2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ2FmdGVyU2V0SW5pdGlhbERhdGEnLCB2YWx1ZSwgb2xkVmFsdWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHZhbHVlXG4gICAgICogQHBhcmFtIG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGFmdGVyU2V0TW9kZWwodmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgdmFsdWUuc3RvcmVJZCA9IHRoaXMuaWQ7XG4gICAgICAgICAgICBSZWNvcmRGYWN0b3J5LmNyZWF0ZVJlY29yZENsYXNzKHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHZhbHVlXG4gICAgICogQHBhcmFtIG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqIEByZXR1cm5zIHsqfVxuICAgICAqL1xuICAgIGJlZm9yZVNldERhdGEodmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGxldCBtZSA9IHRoaXM7XG5cbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBbdmFsdWVdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyB0b2RvOiBhZGQgYSBjb25maWcgdG8gbWFrZSB0aGUgY2xvbmluZyBvcHRpb25hbFxuICAgICAgICAgICAgdmFsdWUgPSBOZW8uY2xvbmUodmFsdWUsIHRydWUpO1xuXG4gICAgICAgICAgICB2YWx1ZS5mb3JFYWNoKChrZXksIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFSZWNvcmRGYWN0b3J5LmlzUmVjb3JkKGtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVbaW5kZXhdID0gUmVjb3JkRmFjdG9yeS5jcmVhdGVSZWNvcmQobWUubW9kZWwsIGtleSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdiZWZvcmVTZXREYXRhJywgdmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHZhbHVlXG4gICAgICogQHBhcmFtIG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqIEByZXR1cm5zIHsqfVxuICAgICAqL1xuICAgIGJlZm9yZVNldEluaXRpYWxEYXRhKHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICBpZiAoIXZhbHVlICYmIG9sZFZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gb2xkVmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge05lby5kYXRhLk1vZGVsfSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7TmVvLmRhdGEuTW9kZWx9IG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqIEByZXR1cm5zIHtOZW8uZGF0YS5Nb2RlbH1cbiAgICAgKi9cbiAgICBiZWZvcmVTZXRNb2RlbCh2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgaWYgKG9sZFZhbHVlKSB7XG4gICAgICAgICAgICBvbGRWYWx1ZS5kZXN0cm95KCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gQ2xhc3NTeXN0ZW1VdGlsLmJlZm9yZVNldEluc3RhbmNlKHZhbHVlLCBNb2RlbCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gY29uZmlnXG4gICAgICovXG4gICAgY3JlYXRlUmVjb3JkKGNvbmZpZykge1xuICAgICAgICBSZWNvcmRGYWN0b3J5LmNyZWF0ZVJlY29yZChjb25maWcpO1xuICAgIH1cblxuICAgIGxvYWQoKSB7XG4gICAgICAgIGxldCBtZSA9IHRoaXM7XG5cbiAgICAgICAgTmVvLlhoci5wcm9taXNlSnNvbih7XG4gICAgICAgICAgICB1cmw6IG1lLnVybFxuICAgICAgICB9KS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgbWUuZGF0YSA9IEFycmF5LmlzQXJyYXkoZGF0YS5qc29uKSA/IGRhdGEuanNvbiA6IGRhdGEuanNvbi5kYXRhO1xuICAgICAgICAgICAgLy8gd2UgZG8gbm90IG5lZWQgdG8gZmlyZSBhIGxvYWQgZXZlbnQgPT4gb25Db2xsZWN0aW9uTXV0YXRlKClcbiAgICAgICAgfSkuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdFcnJvciBmb3IgTmVvLlhoci5yZXF1ZXN0JywgZXJyLCBtZS5pZCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdHNcbiAgICAgKi9cbiAgICBvbkNvbGxlY3Rpb25NdXRhdGUob3B0cykge1xuICAgICAgICBsZXQgbWUgPSB0aGlzO1xuXG4gICAgICAgIGlmIChtZS5jb25maWdzQXBwbGllZCkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ29uQ29sbGVjdGlvbk11dGF0ZScsIG9wdHMpO1xuICAgICAgICAgICAgbWUuZmlyZSgnbG9hZCcsIG1lLml0ZW1zKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHRvZG86IGFkZCB3aWxsIGZpcmUgbXV0YXRlIGFuZCBzb3J0IHJpZ2h0IGFmdGVyIGFub3RoZXJcbiAgICAgKi9cbiAgICBvbkNvbGxlY3Rpb25Tb3J0KCkge1xuICAgICAgICBsZXQgbWUgPSB0aGlzO1xuXG4gICAgICAgIGlmIChtZS5jb25maWdzQXBwbGllZCkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ29uQ29sbGVjdGlvblNvcnQnLCBtZS5jb2xsZWN0aW9uLml0ZW1zKTtcbiAgICAgICAgICAgIC8vIG1lLmZpcmUoJ2xvYWQnLCBtZS5pdGVtcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRyaWdnZXJlZCBhZnRlciBjaGFuZ2luZyB0aGUgdmFsdWUgb2YgYSByZWNvcmQgZmllbGQuXG4gICAgICogRS5nLiBteVJlY29yZC5mb28gPSAnYmFyJztcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0c1xuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBvcHRzLmZpZWxkIFRoZSBuYW1lIG9mIHRoZSBmaWVsZCB3aGljaCBnb3QgY2hhbmdlZFxuICAgICAqIEBwYXJhbSB7TmVvLmRhdGEuTW9kZWx9IG9wdHMubW9kZWwgVGhlIG1vZGVsIGluc3RhbmNlIG9mIHRoZSBjaGFuZ2VkIHJlY29yZFxuICAgICAqIEBwYXJhbSB7Kn0gb3B0cy5vbGRWYWx1ZVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzLnJlY29yZFxuICAgICAqIEBwYXJhbSB7Kn0gb3B0cy52YWx1ZVxuICAgICAqL1xuICAgIG9uUmVjb3JkQ2hhbmdlKG9wdHMpIHtcbiAgICAgICAgdGhpcy5maXJlKCdyZWNvcmRDaGFuZ2UnLCBvcHRzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG9wdHMuZGlyZWN0aW9uXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG9wdHMucHJvcGVydHlcbiAgICAgKi9cbiAgICBzb3J0KG9wdHM9e30pIHtcbiAgICAgICAgbGV0IG1lID0gdGhpcztcblxuICAgICAgICBpZiAobWUucmVtb3RlU29ydCkge1xuICAgICAgICAgICAgLy8gdG9kb1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3NvcnQnLCBvcHRzLnByb3BlcnR5LCBvcHRzLmRpcmVjdGlvbiwgbWUuY29uZmlnc0FwcGxpZWQpO1xuXG4gICAgICAgICAgICBpZiAobWUuY29uZmlnc0FwcGxpZWQpIHtcbiAgICAgICAgICAgICAgICBpZiAob3B0cy5kaXJlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgbWUuc29ydGVycyA9IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXJlY3Rpb246IG9wdHMuZGlyZWN0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvcGVydHkgOiBvcHRzLnByb3BlcnR5XG4gICAgICAgICAgICAgICAgICAgIH1dO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG1lLnN0YXJ0VXBkYXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIG1lLmNsZWFyKCk7XG4gICAgICAgICAgICAgICAgICAgIG1lLnNvcnRlcnMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgbWUuYWRkKFsuLi5tZS5pbml0aWFsRGF0YV0pO1xuICAgICAgICAgICAgICAgICAgICBtZS5lbmRVcGRhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgbWUuZmlyZSgnc29ydCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuTmVvLmFwcGx5Q2xhc3NDb25maWcoU3RvcmUpO1xuXG5leHBvcnQge1N0b3JlIGFzIGRlZmF1bHR9OyIsImltcG9ydCBDb21wb25lbnQgZnJvbSAnLi4vLi4vY29tcG9uZW50L0Jhc2UubWpzJztcblxuLyoqXG4gKiBBYnN0cmFjdCBiYXNlIGNsYXNzIGZvciBmb3JtIGZpZWxkc1xuICogQGNsYXNzIE5lby5mb3JtLmZpZWxkLkJhc2VcbiAqIEBleHRlbmRzIE5lby5jb21wb25lbnQuQmFzZVxuICovXG5jbGFzcyBCYXNlIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0Q29uZmlnKCkge3JldHVybiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IGNsYXNzTmFtZT0nTmVvLmZvcm0uZmllbGQuQmFzZSdcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgY2xhc3NOYW1lOiAnTmVvLmZvcm0uZmllbGQuQmFzZScsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IG50eXBlPSdiYXNlZmllbGQnXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIG50eXBlOiAnYmFzZWZpZWxkJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIgeyp9IHZhbHVlXz1udWxsXG4gICAgICAgICAqL1xuICAgICAgICB2YWx1ZV86IG51bGxcbiAgICB9fVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkIGFmdGVyIHRoZSB2YWx1ZSBjb25maWcgZ290IGNoYW5nZWRcbiAgICAgKiBAcGFyYW0geyp9IHZhbHVlXG4gICAgICogQHBhcmFtIHsqfSBvbGRWYWx1ZVxuICAgICAqL1xuICAgIGFmdGVyU2V0VmFsdWUodmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGlmIChvbGRWYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmZpcmUoJ2NoYW5nZScsIHtcbiAgICAgICAgICAgICAgICBjb21wb25lbnQ6IHRoaXMsXG4gICAgICAgICAgICAgICAgb2xkVmFsdWUgOiBvbGRWYWx1ZSxcbiAgICAgICAgICAgICAgICB2YWx1ZSAgICA6IHZhbHVlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHJldHVybnMgeyp9IHRoaXMudmFsdWVcbiAgICAgKi9cbiAgICBnZXRTdWJtaXRWYWx1ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBpc1ZhbGlkKCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG59XG5cbi8qKlxuICogVGhlIGNoYW5nZSBldmVudCBmaXJlcyBhZnRlciB0aGUgdmFsdWUgY29uZmlnIGdldHMgY2hhbmdlZFxuICogQGV2ZW50IGNoYW5nZVxuICogQHBhcmFtIHsqfSB2YWx1ZVxuICogQHBhcmFtIHsqfSBvbGRWYWx1ZVxuICogQHJldHVybnMge09iamVjdH1cbiAqL1xuXG5OZW8uYXBwbHlDbGFzc0NvbmZpZyhCYXNlKTtcblxuZXhwb3J0IHtCYXNlIGFzIGRlZmF1bHR9OyIsImltcG9ydCBUZXh0IGZyb20gJy4vVGV4dC5tanMnO1xuXG4vKipcbiAqIEBjbGFzcyBOZW8uZm9ybS5maWVsZC5TZWFyY2hcbiAqIEBleHRlbmRzIE5lby5mb3JtLmZpZWxkLlRleHRcbiAqL1xuY2xhc3MgU2VhcmNoIGV4dGVuZHMgVGV4dCB7XG4gICAgc3RhdGljIGdldENvbmZpZygpIHtyZXR1cm4ge1xuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBjbGFzc05hbWU9J05lby5mb3JtLmZpZWxkLlNlYXJjaCdcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgY2xhc3NOYW1lOiAnTmVvLmZvcm0uZmllbGQuU2VhcmNoJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gbnR5cGU9J3NlYXJjaGZpZWxkJ1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBudHlwZTogJ3NlYXJjaGZpZWxkJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge0FycmF5fSBjbHM9WyduZW8tc2VhcmNoZmllbGQnLCAnbmVvLXRleHRmaWVsZCddXG4gICAgICAgICAqL1xuICAgICAgICBjbHM6IFsnbmVvLXNlYXJjaGZpZWxkJywgJ25lby10ZXh0ZmllbGQnXSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFZhbHVlIGZvciB0aGUgaGlkZUxhYmVsXyB0ZXh0ZmllbGQgY29uZmlnXG4gICAgICAgICAqIEBtZW1iZXIge0Jvb2xlYW59IGhpZGVMYWJlbD10cnVlXG4gICAgICAgICAqL1xuICAgICAgICBoaWRlTGFiZWw6IHRydWUsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBWYWx1ZSBmb3IgdGhlIHBsYWNlaG9sZGVyVGV4dF8gdGV4dGZpZWxkIGNvbmZpZ1xuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IHBsYWNlaG9sZGVyVGV4dD0nU2VhcmNoJ1xuICAgICAgICAgKi9cbiAgICAgICAgcGxhY2Vob2xkZXJUZXh0OiAnU2VhcmNoJyxcbiAgICB9fVxufVxuXG5OZW8uYXBwbHlDbGFzc0NvbmZpZyhTZWFyY2gpO1xuXG5leHBvcnQge1NlYXJjaCBhcyBkZWZhdWx0fTsiLCJpbXBvcnQgQmFzZSAgICAgICAgIGZyb20gJy4vQmFzZS5tanMnO1xuaW1wb3J0IEJhc2VUcmlnZ2VyICBmcm9tICcuL3RyaWdnZXIvQmFzZS5tanMnO1xuaW1wb3J0IENsZWFyVHJpZ2dlciBmcm9tICcuL3RyaWdnZXIvQ2xlYXIubWpzJztcbmltcG9ydCBOZW9BcnJheSAgICAgZnJvbSAnLi4vLi4vdXRpbC9BcnJheS5tanMnO1xuaW1wb3J0IFZEb21VdGlsICAgICBmcm9tICcuLi8uLi91dGlsL1ZEb20ubWpzJztcbmltcG9ydCBWTm9kZVV0aWwgICAgZnJvbSAnLi4vLi4vdXRpbC9WTm9kZS5tanMnO1xuXG4vKipcbiAqIEBjbGFzcyBOZW8uZm9ybS5maWVsZC5UZXh0XG4gKiBAZXh0ZW5kcyBOZW8uZm9ybS5maWVsZC5CYXNlXG4gKi9cbmNsYXNzIFRleHQgZXh0ZW5kcyBCYXNlIHtcbiAgICBzdGF0aWMgZ2V0U3RhdGljQ29uZmlnKCkge3JldHVybiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBWYWxpZCB2YWx1ZXMgZm9yIGxhYmVsUG9zaXRpb25cbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nW119IGxhYmVsUG9zaXRpb25zPVsnYm90dG9tJywgJ2lubGluZScsICdsZWZ0JywgJ3JpZ2h0JywgJ3RvcCddXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKi9cbiAgICAgICAgbGFiZWxQb3NpdGlvbnM6IFsnYm90dG9tJywgJ2lubGluZScsICdsZWZ0JywgJ3JpZ2h0JywgJ3RvcCddXG4gICAgfX1cblxuICAgIHN0YXRpYyBnZXRDb25maWcoKSB7cmV0dXJuIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gY2xhc3NOYW1lPSdOZW8uZm9ybS5maWVsZC5UZXh0J1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBjbGFzc05hbWU6ICdOZW8uZm9ybS5maWVsZC5UZXh0JyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gbnR5cGU9J3RleHRmaWVsZCdcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgbnR5cGU6ICd0ZXh0ZmllbGQnLFxuICAgICAgICAvKipcbiAgICAgICAgICogSW50ZXJuYWwgdmFyaWFibGUgdG8gc3RvcmUgdGhlIGFjdHVhbCB3aWR0aCBmb3IgdGhlIGxhYmVsIGNlbnRlckJvcmRlckVsXG4gICAgICAgICAqIChvbmx5IG5lZWRlZCBmb3IgbGFiZWxQb3NpdGlvbjogJ2lubGluZScpXG4gICAgICAgICAqIEBtZW1iZXIge051bWJlcnxudWxsfSBjZW50ZXJCb3JkZXJFbFdpZHRoPW51bGxcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgY2VudGVyQm9yZGVyRWxXaWR0aDogbnVsbCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRydWUgc2hvd3MgYSBjbGVhciB0cmlnZ2VyIGluIGNhc2UgdGhlIGZpZWxkIGhhcyBhIG5vbiBlbXB0eSB2YWx1ZS5cbiAgICAgICAgICogQG1lbWJlciB7Qm9vbGVhbn0gY2xlYXJhYmxlXz10cnVlXG4gICAgICAgICAqL1xuICAgICAgICBjbGVhcmFibGVfOiB0cnVlLFxuICAgICAgICAvKipcbiAgICAgICAgICogVHJ1ZSB3aWxsIHJlc2V0IHRoZSBmaWVsZCB0byBpdHMgaW5pdGlhbCB2YWx1ZSBjb25maWcuXG4gICAgICAgICAqIFJlY29tbWVuZGVkIGZvciBmaWVsZHMgd2l0aCByZXF1aXJlZDogdHJ1ZVxuICAgICAgICAgKiBAbWVtYmVyIHtCb29sZWFufSBjbGVhclRvT3JpZ2luYWxWYWx1ZT1mYWxzZVxuICAgICAgICAgKi9cbiAgICAgICAgY2xlYXJUb09yaWdpbmFsVmFsdWVfOiBmYWxzZSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ1tdfSBjbHM9WyduZW8tdGV4dGZpZWxkJ11cbiAgICAgICAgICovXG4gICAgICAgIGNsczogWyduZW8tdGV4dGZpZWxkJ10sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtCb29sZWFufSBoaWRlTGFiZWxfPWZhbHNlXG4gICAgICAgICAqL1xuICAgICAgICBoaWRlTGFiZWxfOiBmYWxzZSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gaW5wdXRUeXBlXz0ndGV4dCdcbiAgICAgICAgICovXG4gICAgICAgIGlucHV0VHlwZV86ICd0ZXh0JyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gbGFiZWxQb3NpdGlvbl89J2xlZnQnXG4gICAgICAgICAqL1xuICAgICAgICBsYWJlbFBvc2l0aW9uXzogJ2xlZnQnLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBsYWJlbFRleHRfPSdMYWJlbFRleHQnXG4gICAgICAgICAqL1xuICAgICAgICBsYWJlbFRleHRfOiAnTGFiZWxUZXh0JyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIGRlZmF1bHRzIHRvIHB4XG4gICAgICAgICAqIEBtZW1iZXIge051bWJlcnxTdHJpbmd9IGxhYmVsV2lkdGhfPTE1MFxuICAgICAgICAgKi9cbiAgICAgICAgbGFiZWxXaWR0aF86IDE1MCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ3xudWxsfSBwbGFjZWhvbGRlclRleHRfPW51bGxcbiAgICAgICAgICovXG4gICAgICAgIHBsYWNlaG9sZGVyVGV4dF86IG51bGwsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtCb29sZWFufSByZXF1aXJlZF89ZmFsc2VcbiAgICAgICAgICovXG4gICAgICAgIHJlcXVpcmVkXzogZmFsc2UsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtPYmplY3R8T2JqZWN0W118bnVsbH0gdHJpZ2dlcnNfPW51bGxcbiAgICAgICAgICovXG4gICAgICAgIHRyaWdnZXJzXzogbnVsbCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge09iamVjdH0gX3Zkb21cbiAgICAgICAgICovXG4gICAgICAgIF92ZG9tOiB7XG4gICAgICAgICAgICBjbjogW3tcbiAgICAgICAgICAgICAgICB0YWcgIDogJ2xhYmVsJyxcbiAgICAgICAgICAgICAgICBjbHMgIDogWyduZW8tdGV4dGZpZWxkLWxhYmVsJ10sXG4gICAgICAgICAgICAgICAgc3R5bGU6IHt9XG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdGFnICAgICAgICAgOiAnaW5wdXQnLFxuICAgICAgICAgICAgICAgIGF1dG9jb21wbGV0ZTogJ29mZicsXG4gICAgICAgICAgICAgICAgYXV0b2NvcnJlY3QgOiAnb2ZmJyxcbiAgICAgICAgICAgICAgICBjbHMgICAgICAgICA6IFsnbmVvLXRleHRmaWVsZC1pbnB1dCddLFxuICAgICAgICAgICAgICAgIGZsYWcgICAgICAgIDogJ25lby1yZWFsLWlucHV0JyxcbiAgICAgICAgICAgICAgICBzcGVsbGNoZWNrICA6ICdmYWxzZScsXG4gICAgICAgICAgICAgICAgc3R5bGUgICAgICAgOiB7fVxuICAgICAgICAgICAgfV1cbiAgICAgICAgfVxuICAgIH19XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWdcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICAgICAgc3VwZXIoY29uZmlnKTtcblxuICAgICAgICBsZXQgbWUgICAgICAgICAgID0gdGhpcyxcbiAgICAgICAgICAgIGRvbUxpc3RlbmVycyA9IE5lby5jbG9uZShtZS5kb21MaXN0ZW5lcnMsIHRydWUsIHRydWUpLFxuICAgICAgICAgICAgdmRvbSAgICAgICAgID0gbWUudmRvbSxcbiAgICAgICAgICAgIGlucHV0RWwgICAgICA9IG1lLmdldElucHV0RWwoKSxcbiAgICAgICAgICAgIGxhYmVsRWwgICAgICA9IG1lLmdldExhYmVsRWwoKTtcblxuICAgICAgICBpbnB1dEVsLmlkID0gbGFiZWxFbC5mb3IgPSBtZS5pZCArICctaW5wdXQnO1xuXG4gICAgICAgIG1lLnZkb20gPSB2ZG9tO1xuXG4gICAgICAgIGRvbUxpc3RlbmVycy5wdXNoKHtcbiAgICAgICAgICAgIGlucHV0OiB7XG4gICAgICAgICAgICAgICAgZm4gICA6IG1lLm9uSW5wdXRWYWx1ZUNoYW5nZSxcbiAgICAgICAgICAgICAgICBzY29wZTogbWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgbWUuZG9tTGlzdGVuZXJzID0gZG9tTGlzdGVuZXJzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZ1xuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gW3ByZXZlbnRPcmlnaW5hbENvbmZpZ10gVHJ1ZSBwcmV2ZW50cyB0aGUgaW5zdGFuY2UgZnJvbSBnZXR0aW5nIGFuIG9yaWdpbmFsQ29uZmlnIHByb3BlcnR5XG4gICAgICogQHJldHVybnMge09iamVjdH0gY29uZmlnXG4gICAgICovXG4gICAgbWVyZ2VDb25maWcoLi4uYXJncykge1xuICAgICAgICBsZXQgbWUgICAgICAgPSB0aGlzLFxuICAgICAgICAgICAgY29uZmlnICAgPSBzdXBlci5tZXJnZUNvbmZpZyguLi5hcmdzKSxcbiAgICAgICAgICAgIHRyaWdnZXJzID0gY29uZmlnLnRyaWdnZXJzIHx8IG1lLnRyaWdnZXJzO1xuXG4gICAgICAgIG1lW3RyaWdnZXJzID8gJ3RyaWdnZXJzJyA6ICdfdHJpZ2dlcnMnXSA9IHRyaWdnZXJzO1xuXG4gICAgICAgIGRlbGV0ZSBjb25maWcudHJpZ2dlcnM7XG4gICAgICAgIHJldHVybiBjb25maWc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkIGFmdGVyIHRoZSBjbGVhcmFibGUgY29uZmlnIGdvdCBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtCb29sZWFufSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYWZ0ZXJTZXRDbGVhcmFibGUodmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGxldCBtZSA9IHRoaXMsXG4gICAgICAgICAgICB0cmlnZ2VycztcblxuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRyaWdnZXJzID0gbWUudHJpZ2dlcnMgfHwgW107XG4gICAgICAgICAgICB0cmlnZ2Vycy51bnNoaWZ0KENsZWFyVHJpZ2dlcik7XG4gICAgICAgICAgICBtZS50cmlnZ2VycyA9IHRyaWdnZXJzO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbWUucmVtb3ZlVHJpZ2dlcignY2xlYXInKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCBhZnRlciB0aGUgY2xlYXJUb09yaWdpbmFsVmFsdWUgY29uZmlnIGdvdCBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtCb29sZWFufSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYWZ0ZXJTZXRDbGVhclRvT3JpZ2luYWxWYWx1ZSh2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgdGhpcy5maXJlKCdjaGFuZ2VDbGVhclRvT3JpZ2luYWxWYWx1ZScsIHtcbiAgICAgICAgICAgIG9sZFZhbHVlOiBvbGRWYWx1ZSxcbiAgICAgICAgICAgIHZhbHVlICAgOiB2YWx1ZVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgYWZ0ZXIgdGhlIGhpZGVMYWJlbCBjb25maWcgZ290IGNoYW5nZWRcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IHZhbHVlXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBvbGRWYWx1ZVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBhZnRlclNldEhpZGVMYWJlbCh2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgbGV0IG1lICAgPSB0aGlzLFxuICAgICAgICAgICAgdmRvbSA9IG1lLnZkb207XG5cbiAgICAgICAgdmRvbS5jblswXS5yZW1vdmVEb20gPSB2YWx1ZTtcbiAgICAgICAgbWUuX3Zkb20gPSB2ZG9tOyAvLyBzaWxlbnQgdXBkYXRlXG5cbiAgICAgICAgbWUudXBkYXRlSW5wdXRXaWR0aCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCBhZnRlciB0aGUgaW5wdXRUeXBlIGNvbmZpZyBnb3QgY2hhbmdlZFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBvbGRWYWx1ZVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBhZnRlclNldElucHV0VHlwZSh2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgdGhpcy5jaGFuZ2VJbnB1dEVsS2V5KCd0eXBlJywgdmFsdWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCBhZnRlciB0aGUgbGFiZWxQb3NpdGlvbiBjb25maWcgZ290IGNoYW5nZWRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdmFsdWVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYWZ0ZXJTZXRMYWJlbFBvc2l0aW9uKHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICBsZXQgbWUgID0gdGhpcyxcbiAgICAgICAgICAgIGNscyA9IG1lLmNscyxcbiAgICAgICAgICAgIGNlbnRlckJvcmRlckVsQ2xzLCBpc0VtcHR5LCB2ZG9tO1xuXG4gICAgICAgIE5lb0FycmF5LnJlbW92ZShjbHMsICdsYWJlbC0nICsgb2xkVmFsdWUpO1xuICAgICAgICBOZW9BcnJheS5hZGQoY2xzLCAnbGFiZWwtJyArIHZhbHVlKTtcbiAgICAgICAgbWVbb2xkVmFsdWUgPT09ICdpbmxpbmUnIHx8IHZhbHVlID09PSAnaW5saW5lJyA/ICdfY2xzJyA6ICdjbHMnXSA9IGNsczsgLy8gc2lsZW50IHVwZGF0ZSBpZiBuZWVkZWRcblxuICAgICAgICBpZiAob2xkVmFsdWUgPT09ICdpbmxpbmUnKSB7XG4gICAgICAgICAgICB2ZG9tID0gbWUudmRvbTtcblxuICAgICAgICAgICAgdmRvbS5jblswXSA9IG1lLmdldExhYmVsRWwoKTsgLy8gcmVtb3ZlIHRoZSB3cmFwcGVyXG5cbiAgICAgICAgICAgIHZkb20uY25bMF0ud2lkdGggPSBtZS5sYWJlbFdpZHRoO1xuXG4gICAgICAgICAgICBtZS5fdmRvbSA9IHZkb207IC8vIHNpbGVudCB1cGRhdGVcbiAgICAgICAgICAgIG1lLnVwZGF0ZUlucHV0V2lkdGgoKTtcbiAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSA9PT0gJ2lubGluZScpIHtcbiAgICAgICAgICAgIGNlbnRlckJvcmRlckVsQ2xzID0gWyduZW8tY2VudGVyLWJvcmRlciddO1xuICAgICAgICAgICAgaXNFbXB0eSAgICAgICAgICAgPSBtZS5pc0VtcHR5KCk7XG4gICAgICAgICAgICB2ZG9tICAgICAgICAgICAgICA9IG1lLnZkb207XG5cbiAgICAgICAgICAgIGlmICghaXNFbXB0eSkge1xuICAgICAgICAgICAgICAgIGNlbnRlckJvcmRlckVsQ2xzLnB1c2goJ25lby1mbG9hdC1hYm92ZScpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkZWxldGUgdmRvbS5jblswXS53aWR0aDtcblxuICAgICAgICAgICAgdmRvbS5jblswXSA9IHtcbiAgICAgICAgICAgICAgICBjbHM6IFsnbmVvLWxhYmVsLXdyYXBwZXInXSxcbiAgICAgICAgICAgICAgICBjbiA6IFt7XG4gICAgICAgICAgICAgICAgICAgIGNsczogWyduZW8tbGVmdC1ib3JkZXInXVxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgY2xzOiBjZW50ZXJCb3JkZXJFbENscyxcbiAgICAgICAgICAgICAgICAgICAgY24gOiBbdmRvbS5jblswXV1cbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIGNsczogWyduZW8tcmlnaHQtYm9yZGVyJ11cbiAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgbWUuX3Zkb20gPSB2ZG9tOyAvLyBzaWxlbnQgdXBkYXRlXG4gICAgICAgICAgICBtZS51cGRhdGVJbnB1dFdpZHRoKCk7XG5cbiAgICAgICAgICAgIGlmICghaXNFbXB0eSkge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBtZS51cGRhdGVDZW50ZXJCb3JkZXJFbFdpZHRoKGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9LCAyMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgYWZ0ZXIgdGhlIGxhYmVsVGV4dCBjb25maWcgZ290IGNoYW5nZWRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdmFsdWVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYWZ0ZXJTZXRMYWJlbFRleHQodmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGxldCBtZSAgICAgID0gdGhpcyxcbiAgICAgICAgICAgIGlzRW1wdHkgPSBtZS5pc0VtcHR5KCksXG4gICAgICAgICAgICB2ZG9tICAgID0gbWUudmRvbTtcblxuICAgICAgICBtZS5nZXRMYWJlbEVsKCkuaW5uZXJIVE1MID0gdmFsdWU7XG5cbiAgICAgICAgaWYgKG1lLmhpZGVMYWJlbCkge1xuICAgICAgICAgICAgbWUuX3Zkb20gPSB2ZG9tOyAvLyBzaWxlbnQgdXBkYXRlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAobWUubGFiZWxQb3NpdGlvbiA9PT0gJ2lubGluZScpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWlzRW1wdHkpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIG1lLmdldENlbnRlckJvcmRlckVsKCkud2lkdGg7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbWUucHJvbWlzZVZkb21VcGRhdGUodmRvbSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIG1lLnVwZGF0ZUNlbnRlckJvcmRlckVsV2lkdGgoaXNFbXB0eSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG1lLnZkb20gPSB2ZG9tO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkIGFmdGVyIHRoZSBsYWJlbFdpZHRoIGNvbmZpZyBnb3QgY2hhbmdlZFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfFN0cmluZ30gdmFsdWVcbiAgICAgKiBAcGFyYW0ge051bWJlcnxTdHJpbmd9IG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGFmdGVyU2V0TGFiZWxXaWR0aCh2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgaWYgKHRoaXMubGFiZWxQb3NpdGlvbiAhPT0gJ2lubGluZScpIHtcbiAgICAgICAgICAgIGxldCBtZSAgICA9IHRoaXMsXG4gICAgICAgICAgICAgICAgdmRvbSAgPSBtZS52ZG9tLFxuICAgICAgICAgICAgICAgIGxhYmVsID0gdmRvbS5jblswXTtcblxuICAgICAgICAgICAgbGFiZWwud2lkdGggPSB2YWx1ZTtcblxuICAgICAgICAgICAgbWUuX3Zkb20gPSB2ZG9tOyAvLyBzaWxlbnQgdXBkYXRlXG5cbiAgICAgICAgICAgIGlmICghbWUuaGlkZUxhYmVsKSB7XG4gICAgICAgICAgICAgICAgbWUudXBkYXRlSW5wdXRXaWR0aCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkIGFmdGVyIHRoZSBtb3VudGVkIGNvbmZpZyBnb3QgY2hhbmdlZFxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gdmFsdWVcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGFmdGVyU2V0TW91bnRlZCh2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgc3VwZXIuYWZ0ZXJTZXRNb3VudGVkKHZhbHVlLCBvbGRWYWx1ZSk7XG5cbiAgICAgICAgaWYgKHZhbHVlICYmIHRoaXMubGFiZWxQb3NpdGlvbiA9PT0gJ2lubGluZScpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ2VudGVyQm9yZGVyRWxXaWR0aCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkIGFmdGVyIHRoZSBwbGFjZWhvbGRlclRleHQgY29uZmlnIGdvdCBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtTdHJpbmd8bnVsbH0gdmFsdWVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xudWxsfSBvbGRWYWx1ZVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBhZnRlclNldFBsYWNlaG9sZGVyVGV4dCh2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgdGhpcy5jaGFuZ2VJbnB1dEVsS2V5KCdwbGFjZWhvbGRlcicsIHZhbHVlID09PSAnJyA/IG51bGwgOiB2YWx1ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkIGFmdGVyIHRoZSByZXF1aXJlZCBjb25maWcgZ290IGNoYW5nZWRcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IHZhbHVlXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBvbGRWYWx1ZVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBhZnRlclNldFJlcXVpcmVkKHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICB0aGlzLmNoYW5nZUlucHV0RWxLZXkoJ3JlcXVpcmVkJywgdmFsdWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCBhZnRlciB0aGUgdHJpZ2dlcnMgY29uZmlnIGdvdCBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtPYmplY3RbXX0gdmFsdWVcbiAgICAgKiBAcGFyYW0ge09iamVjdFtdfSBvbGRWYWx1ZVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBhZnRlclNldFRyaWdnZXJzKHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICBsZXQgbWUgICAgICAgICAgID0gdGhpcyxcbiAgICAgICAgICAgIHZkb20gICAgICAgICA9IG1lLnZkb20sXG4gICAgICAgICAgICBpbnB1dEVsICAgICAgPSB2ZG9tLmNuWzFdLCAvLyBpbnB1dEVsIG9yIGlucHV0V3JhcHBlckVsXG4gICAgICAgICAgICBwcmVUcmlnZ2VycyAgPSBbXSxcbiAgICAgICAgICAgIHBvc3RUcmlnZ2VycyA9IFtdLFxuICAgICAgICAgICAgd2lkdGg7XG5cbiAgICAgICAgLy8gY29uc29sZS5sb2codmFsdWUgJiYgWy4uLnZhbHVlXSwgb2xkVmFsdWUgJiYgWy4uLm9sZFZhbHVlXSk7XG5cbiAgICAgICAgaWYgKG9sZFZhbHVlKSB7XG4gICAgICAgICAgICBvbGRWYWx1ZS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgIGlmICghbWUuZ2V0VHJpZ2dlcihpdGVtLnR5cGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uZGVzdHJveSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHZhbHVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHZhbHVlLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uYWxpZ24gPT09ICdzdGFydCcpIHtcbiAgICAgICAgICAgICAgICAgICAgcHJlVHJpZ2dlcnMucHVzaChpdGVtKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBwb3N0VHJpZ2dlcnMucHVzaChpdGVtKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcG9zdFRyaWdnZXJzLnNvcnQoKGEsIGIpID0+IGIud2VpZ2h0IC0gYS53ZWlnaHQpOyAvLyBERVNDXG4gICAgICAgICAgICBwcmVUcmlnZ2VycyAuc29ydCgoYSwgYikgPT4gYS53ZWlnaHQgLSBiLndlaWdodCk7IC8vIEFTQ1xuXG4gICAgICAgICAgICBwb3N0VHJpZ2dlcnMgPSBwb3N0VHJpZ2dlcnMubWFwKGEgPT4gYS52ZG9tKTtcbiAgICAgICAgICAgIHByZVRyaWdnZXJzICA9IHByZVRyaWdnZXJzIC5tYXAoYSA9PiBhLnZkb20pO1xuXG4gICAgICAgICAgICBpZiAoaW5wdXRFbC50YWcgPT09ICdpbnB1dCcpIHtcbiAgICAgICAgICAgICAgICAvLyB3cmFwIHRoZSBpbnB1dCB0YWdcbiAgICAgICAgICAgICAgICB2ZG9tLmNuWzFdID0ge1xuICAgICAgICAgICAgICAgICAgICBjbHMgIDogWyduZW8taW5wdXQtd3JhcHBlciddLFxuICAgICAgICAgICAgICAgICAgICBjbiAgIDogWy4uLnByZVRyaWdnZXJzLCBpbnB1dEVsLCAuLi5wb3N0VHJpZ2dlcnNdLFxuICAgICAgICAgICAgICAgICAgICBpZCAgIDogbWUuaWQgKyAnLWlucHV0LXdyYXBwZXInLFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogaW5wdXRFbC53aWR0aFxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBkZWxldGUgaW5wdXRFbC53aWR0aDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaW5wdXRFbC5jbiA9IFsuLi5wcmVUcmlnZ2VycywgbWUuZ2V0SW5wdXRFbCgpLCAuLi5wb3N0VHJpZ2dlcnNdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGlucHV0RWwudGFnICE9PSAnaW5wdXQnKSB7XG4gICAgICAgICAgICAgICAgLy8gcmVwbGFjaW5nIHRoZSBpbnB1dCB3cmFwcGVyIGRpdiB3aXRoIHRoZSBpbnB1dCB0YWdcbiAgICAgICAgICAgICAgICB3aWR0aCA9IGlucHV0RWwud2lkdGg7XG4gICAgICAgICAgICAgICAgdmRvbS5jblsxXSA9IG1lLmdldElucHV0RWwoKTtcbiAgICAgICAgICAgICAgICB2ZG9tLmNuWzFdLndpZHRoID0gd2lkdGg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBtZS5wcm9taXNlVmRvbVVwZGF0ZSgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgbWUudXBkYXRlVHJpZ2dlclZub2RlcygpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgYWZ0ZXIgdGhlIHZhbHVlIGNvbmZpZyBnb3QgY2hhbmdlZFxuICAgICAqIHRvZG86IGFkZCB2YWxpZGF0aW9uIGxvZ2ljXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGFmdGVyU2V0VmFsdWUodmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGxldCBtZSAgID0gdGhpcyxcbiAgICAgICAgICAgIHZkb20gPSBtZS52ZG9tO1xuXG4gICAgICAgIHN1cGVyLmFmdGVyU2V0VmFsdWUodmFsdWUsIG9sZFZhbHVlKTtcblxuICAgICAgICBtZS5nZXRJbnB1dEVsKCkudmFsdWUgPSB2YWx1ZTtcblxuICAgICAgICBpZiAoISF2YWx1ZSAhPT0gISFvbGRWYWx1ZSkgeyAvLyBjaGFuZ2UgZnJvbSBlbXB0eSB0byBub24gZW1wdHlcbiAgICAgICAgICAgIE5lb0FycmF5W3ZhbHVlICYmIHZhbHVlLnRvU3RyaW5nKCkubGVuZ3RoID4gMCA/ICdhZGQnIDogJ3JlbW92ZSddKG1lLl9jbHMsICduZW8taGFzLWNvbnRlbnQnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIE5lb0FycmF5W21lLm9yaWdpbmFsQ29uZmlnLnZhbHVlICE9PSB2YWx1ZSA/ICdhZGQnIDogJ3JlbW92ZSddKG1lLl9jbHMsICduZW8taXMtZGlydHknKTtcblxuICAgICAgICBtZS52ZG9tID0gdmRvbTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgYWZ0ZXIgdGhlIHdpZHRoIGNvbmZpZyBnb3QgY2hhbmdlZFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfFN0cmluZ30gdmFsdWVcbiAgICAgKiBAcGFyYW0ge051bWJlcnxTdHJpbmd9IG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGFmdGVyU2V0V2lkdGgodmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIHN1cGVyLmFmdGVyU2V0V2lkdGgodmFsdWUsIG9sZFZhbHVlKTtcbiAgICAgICAgdGhpcy51cGRhdGVJbnB1dFdpZHRoKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIGEgc2hhbGxvdyBjb3B5IG9mIHRoZSB0cmlnZ2VycyBjb25maWdcbiAgICAgKiBAcGFyYW0ge0FycmF5fG51bGx9IHZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGJlZm9yZUdldFRyaWdnZXJzKHZhbHVlKSB7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIFsuLi52YWx1ZV07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkIGJlZm9yZSB0aGUgbGFiZWxQb3NpdGlvbiBjb25maWcgZ2V0cyBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqIEByZXR1cm5zIHtTdHJpbmd9XG4gICAgICovXG4gICAgYmVmb3JlU2V0TGFiZWxQb3NpdGlvbih2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYmVmb3JlU2V0RW51bVZhbHVlKHZhbHVlLCBvbGRWYWx1ZSwgJ2xhYmVsUG9zaXRpb24nKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgYmVmb3JlIHRoZSB0cmlnZ2VycyBjb25maWcgZ2V0cyBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtPYmplY3R8T2JqZWN0W119IHZhbHVlXG4gICAgICogQHBhcmFtIHtPYmplY3RbXX0gb2xkVmFsdWVcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0W119IHRoZSBwYXJzZWQgdHJpZ2dlcnMgY29uZmlnXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqIEByZXR1cm5zIHtPYmplY3R8T2JqZWN0W119XG4gICAgICovXG4gICAgYmVmb3JlU2V0VHJpZ2dlcnModmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGlmICghdmFsdWUpIHtcbiAgICAgICAgICAgIHZhbHVlID0gW107XG4gICAgICAgIH0gZWxzZSBpZiAoIUFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IFt2YWx1ZV07XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbWUgPSB0aGlzO1xuXG4gICAgICAgIHZhbHVlLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBpZiAoaXRlbS5pc0NsYXNzKSB7XG4gICAgICAgICAgICAgICAgdmFsdWVbaW5kZXhdID0gTmVvLmNyZWF0ZShpdGVtLCB7XG4gICAgICAgICAgICAgICAgICAgIGlkICAgOiBtZS5nZXRUcmlnZ2VySWQoaXRlbS5wcm90b3R5cGUudHlwZSksXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkOiBtZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmICghKGl0ZW0gaW5zdGFuY2VvZiBCYXNlVHJpZ2dlcikpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWl0ZW0ubW9kdWxlICYmICFpdGVtLm50eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0ubnR5cGUgPSAndHJpZ2dlcic7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0ubW9kdWxlKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NOYW1lID0gaXRlbS5tb2R1bGUucHJvdG90eXBlLmNsYXNzTmFtZTtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5pZCAgICAgICAgPSBtZS5nZXRUcmlnZ2VySWQoaXRlbS5tb2R1bGUucHJvdG90eXBlLnR5cGUpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhbHVlW2luZGV4XSA9IE5lb1tpdGVtLmNsYXNzTmFtZSA/ICdjcmVhdGUnIDogJ250eXBlJ10oey4uLml0ZW0sIGZpZWxkOiBtZX0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hhbmdlcyB0aGUgdmFsdWUgb2YgYSBpbnB1dEVsIHZkb20gb2JqZWN0IGF0dHJpYnV0ZSBvciByZW1vdmVzIGl0IGluIGNhc2UgaXQgaGFzIG5vIHZhbHVlXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGtleVxuICAgICAqIEBwYXJhbSB7QXJyYXl8TnVtYmVyfE9iamVjdHxTdHJpbmd8bnVsbH0gdmFsdWVcbiAgICAgKi9cbiAgICBjaGFuZ2VJbnB1dEVsS2V5KGtleSwgdmFsdWUpIHtcbiAgICAgICAgbGV0IG1lICAgPSB0aGlzLFxuICAgICAgICAgICAgdmRvbSA9IG1lLnZkb207XG5cbiAgICAgICAgaWYgKHZhbHVlIHx8IHZhbHVlID09PSAwKSB7XG4gICAgICAgICAgICBtZS5nZXRJbnB1dEVsKClba2V5XSA9IHZhbHVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGVsZXRlIG1lLmdldElucHV0RWwoKVtrZXldO1xuICAgICAgICB9XG5cbiAgICAgICAgbWUudmRvbSA9IHZkb207XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVzZXRzIHRoZSBmaWVsZCB0byBpdHMgb3JpZ2luYWwgdmFsdWUgb3IgbnVsbCBkZXBlbmRpbmcgb24gdGhlIGNsZWFyVG9PcmlnaW5hbFZhbHVlIGNvbmZpZ1xuICAgICAqL1xuICAgIGNsZWFyKCkge1xuICAgICAgICBsZXQgbWUgPSB0aGlzO1xuXG4gICAgICAgIG1lLnZhbHVlID0gbWUuY2xlYXJUb09yaWdpbmFsVmFsdWUgPyBtZS5vcmlnaW5hbENvbmZpZy52YWx1ZSA6IG51bGw7XG4gICAgICAgIG1lLmZpcmUoJ2NsZWFyJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0fG51bGx9XG4gICAgICovXG4gICAgZ2V0Q2VudGVyQm9yZGVyRWwoKSB7XG4gICAgICAgIGxldCBlbCA9IFZEb21VdGlsLmZpbmRWZG9tQ2hpbGQodGhpcy52ZG9tLCB7Y2xzOiAnbmVvLWNlbnRlci1ib3JkZXInfSk7XG4gICAgICAgIHJldHVybiBlbCAmJiBlbC52ZG9tO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHJldHVybnMge09iamVjdHxudWxsfVxuICAgICAqL1xuICAgIGdldElucHV0RWwoKSB7XG4gICAgICAgIGxldCBlbCA9IFZEb21VdGlsLmZpbmRWZG9tQ2hpbGQodGhpcy52ZG9tLCB7ZmxhZzogJ25lby1yZWFsLWlucHV0J30pO1xuICAgICAgICByZXR1cm4gZWwgJiYgZWwudmRvbTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtTdHJpbmd9XG4gICAgICovXG4gICAgZ2V0SW5wdXRFbElkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pZCArICctaW5wdXQnO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbGN1bGF0ZXMgdGhlIG5ldyBpbnB1dFdpZHRoIGJhc2VkIG9uIHRoZSBsYWJlbFdpZHRoICYgdG90YWwgd2lkdGhcbiAgICAgKiBAcmV0dXJucyB7TnVtYmVyfG51bGx9IG51bGwgaW4gY2FzZSB0aGlzLndpZHRoIGlzIHVua25vd25cbiAgICAgKi9cbiAgICBnZXRJbnB1dFdpZHRoKCkge1xuICAgICAgICBsZXQgbWUgICAgICAgICAgPSB0aGlzLFxuICAgICAgICAgICAgaWdub3JlTGFiZWwgPSBtZS5oaWRlTGFiZWwgfHwgbWUubGFiZWxQb3NpdGlvbiA9PT0gJ2JvdHRvbScgfHwgbWUubGFiZWxQb3NpdGlvbiA9PT0gJ2lubGluZScgfHwgbWUubGFiZWxQb3NpdGlvbiA9PT0gJ3RvcCcsXG4gICAgICAgICAgICBsYWJlbFdpZHRoICA9IGlnbm9yZUxhYmVsID8gMCA6IG1lLmxhYmVsV2lkdGgsXG4gICAgICAgICAgICB3aWR0aCAgICAgICA9IG1lLndpZHRoO1xuXG4gICAgICAgIGlmIChsYWJlbFdpZHRoICYmIHdpZHRoKSB7XG4gICAgICAgICAgICByZXR1cm4gcGFyc2VJbnQod2lkdGgpIC0gcGFyc2VJbnQobGFiZWxXaWR0aCk7XG4gICAgICAgIH0gZWxzZSBpZiAod2lkdGgpIHtcbiAgICAgICAgICAgIHJldHVybiB3aWR0aDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHJldHVybnMge09iamVjdHxudWxsfVxuICAgICAqL1xuICAgIGdldExhYmVsRWwoKSB7XG4gICAgICAgIGxldCBlbCA9IFZEb21VdGlsLmZpbmRWZG9tQ2hpbGQodGhpcy52ZG9tLCB7dGFnOiAnbGFiZWwnfSk7XG4gICAgICAgIHJldHVybiBlbCAmJiBlbC52ZG9tO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHR5cGVcbiAgICAgKiBAcmV0dXJucyB7TmVvLmZvcm0uZmllbGQudHJpZ2dlci5CYXNlfG51bGx9XG4gICAgICovXG4gICAgZ2V0VHJpZ2dlcih0eXBlKSB7XG4gICAgICAgIGxldCBtZSAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICB0cmlnZ2VycyA9IG1lLnRyaWdnZXJzIHx8IFtdLFxuICAgICAgICAgICAgaSAgICAgICAgPSAwLFxuICAgICAgICAgICAgbGVuICAgICAgPSB0cmlnZ2Vycy5sZW5ndGg7XG5cbiAgICAgICAgZm9yICg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgaWYgKHRyaWdnZXJzW2ldLnR5cGUgPT09IHR5cGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJpZ2dlcnNbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpZFxuICAgICAqIEByZXR1cm5zIHtOZW8uZm9ybS5maWVsZC50cmlnZ2VyLkJhc2V8bnVsbH1cbiAgICAgKi9cbiAgICBnZXRUcmlnZ2VyQnlJZChpZCkge1xuICAgICAgICBsZXQgbWUgICAgICAgPSB0aGlzLFxuICAgICAgICAgICAgdHJpZ2dlcnMgPSBtZS50cmlnZ2VycyB8fCBbXSxcbiAgICAgICAgICAgIGkgICAgICAgID0gMCxcbiAgICAgICAgICAgIGxlbiAgICAgID0gdHJpZ2dlcnMubGVuZ3RoO1xuXG4gICAgICAgIGZvciAoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0cmlnZ2Vyc1tpXS5pZCA9PT0gaWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJpZ2dlcnNbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSB0cmlnZ2VyIG5vZGUgaWRcbiAgICAgKi9cbiAgICBnZXRUcmlnZ2VySWQodHlwZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5pZCArICctdHJpZ2dlci0nICsgdHlwZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGaW5kcyBhIHRyaWdnZXIgYnkgYSBnaXZlbiB0eXBlIGNvbmZpZ1xuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlXG4gICAgICogQHJldHVybnMge0Jvb2xlYW59XG4gICAgICovXG4gICAgaGFzVHJpZ2dlcih0eXBlKSB7XG4gICAgICAgIGxldCB0cmlnZ2VycyA9IHRoaXMudHJpZ2dlcnMgfHwgW10sXG4gICAgICAgICAgICBpICAgICAgICA9IDAsXG4gICAgICAgICAgICBsZW4gICAgICA9IHRyaWdnZXJzLmxlbmd0aDtcblxuICAgICAgICBmb3IgKDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodHJpZ2dlcnNbaV0udHlwZSA9PT0gdHlwZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHJldHVybnMge0Jvb2xlYW59XG4gICAgICovXG4gICAgaXNFbXB0eSgpIHtcbiAgICAgICAgcmV0dXJuICEodGhpcy52YWx1ZSAmJiB0aGlzLnZhbHVlLnRvU3RyaW5nKCkubGVuZ3RoID4gMCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBpc1ZhbGlkKCkge1xuICAgICAgICBsZXQgbWUgPSB0aGlzO1xuXG4gICAgICAgIGlmIChtZS5yZXF1aXJlZCAmJiAoIW1lLnZhbHVlIHx8IG1lLnZhbHVlICYmIG1lLnZhbHVlLmxlbmd0aCA8IDEpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc3VwZXIuaXNWYWxpZCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtBcnJheX0gcGF0aFxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBvbkZvY3VzRW50ZXIocGF0aCkge1xuICAgICAgICBsZXQgbWUgID0gdGhpcyxcbiAgICAgICAgICAgIGNscyA9IG1lLmNscyxcbiAgICAgICAgICAgIHZkb207XG5cbiAgICAgICAgTmVvQXJyYXkuYWRkKGNscywgJ25lby1mb2N1cycpO1xuICAgICAgICBtZS5jbHMgPSBjbHM7XG5cbiAgICAgICAgaWYgKG1lLmxhYmVsUG9zaXRpb24gPT09ICdpbmxpbmUnKSB7XG4gICAgICAgICAgICBpZiAobWUuY2VudGVyQm9yZGVyRWxXaWR0aCkge1xuICAgICAgICAgICAgICAgIHZkb20gPSBtZS52ZG9tO1xuICAgICAgICAgICAgICAgIG1lLmdldENlbnRlckJvcmRlckVsKCkud2lkdGggPSBtZS5jZW50ZXJCb3JkZXJFbFdpZHRoO1xuICAgICAgICAgICAgICAgIG1lLnZkb20gPSB2ZG9tO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBtZS51cGRhdGVDZW50ZXJCb3JkZXJFbFdpZHRoKGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtBcnJheX0gcGF0aFxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBvbkZvY3VzTGVhdmUocGF0aCkge1xuICAgICAgICBsZXQgbWUgICAgICAgICAgICAgPSB0aGlzLFxuICAgICAgICAgICAgY2VudGVyQm9yZGVyRWwgPSBtZS5nZXRDZW50ZXJCb3JkZXJFbCgpLCAvLyBsYWJlbFBvc2l0aW9uOiAnaW5saW5lJ1xuICAgICAgICAgICAgY2xzICAgICAgICAgICAgPSBtZS5jbHMsXG4gICAgICAgICAgICB2ZG9tO1xuXG4gICAgICAgIE5lb0FycmF5LnJlbW92ZShjbHMsICduZW8tZm9jdXMnKTtcblxuICAgICAgICBpZiAoY2VudGVyQm9yZGVyRWwgJiYgbWUuaXNFbXB0eSgpKSB7XG4gICAgICAgICAgICBtZS5fY2xzID0gY2xzOyAvLyBzaWxlbnQgdXBkYXRlXG4gICAgICAgICAgICB2ZG9tID0gbWUudmRvbTtcbiAgICAgICAgICAgIGRlbGV0ZSBjZW50ZXJCb3JkZXJFbC53aWR0aDtcbiAgICAgICAgICAgIG1lLnZkb20gPSB2ZG9tO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbWUuY2xzID0gY2xzO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgb25JbnB1dFZhbHVlQ2hhbmdlKGRhdGEpIHtcbiAgICAgICAgbGV0IG1lICAgICAgID0gdGhpcyxcbiAgICAgICAgICAgIHZhbHVlICAgID0gZGF0YS52YWx1ZSxcbiAgICAgICAgICAgIG9sZFZhbHVlID0gbWUudmFsdWUsXG4gICAgICAgICAgICB2bm9kZSAgICA9IFZOb2RlVXRpbC5maW5kQ2hpbGRWbm9kZShtZS52bm9kZSwge25vZGVOYW1lOiAnaW5wdXQnfSk7XG5cbiAgICAgICAgaWYgKHZub2RlKSB7XG4gICAgICAgICAgICAvLyByZXF1aXJlZCBmb3IgdmFsaWRhdGlvbiAtPiByZXZlcnQgYSB3cm9uZyB1c2VyIGlucHV0XG4gICAgICAgICAgICB2bm9kZS52bm9kZS5hdHRyaWJ1dGVzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodmFsdWUgIT09IG9sZFZhbHVlKSB7XG4gICAgICAgICAgICBtZS52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBhbGwgdHJpZ2dlcnMgb2YgYSBnaXZlbiB0eXBlXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHR5cGVcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtzaWxlbnQ9ZmFsc2VdIHRydWUgcHJldmVudHMgYSB2ZG9tIHVwZGF0ZVxuICAgICAqIEBwYXJhbSB7QXJyYXl9IFt0cmlnZ2VyU291cmNlXSBwYXNzIGEgc2hhbGxvdyBjb3B5IG9mIHRoaXMudHJpZ2dlcnNcbiAgICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gdHJ1ZSBpbiBjYXNlIGEgdHJpZ2dlciB3YXMgZm91bmQgJiByZW1vdmVkXG4gICAgICovXG4gICAgcmVtb3ZlVHJpZ2dlcih0eXBlLCBzaWxlbnQ9ZmFsc2UsIHRyaWdnZXJTb3VyY2UpIHtcbiAgICAgICAgbGV0IG1lICAgICAgID0gdGhpcyxcbiAgICAgICAgICAgIGhhc01hdGNoID0gZmFsc2UsXG4gICAgICAgICAgICB0cmlnZ2VycyA9IHRyaWdnZXJTb3VyY2UgfHwgbWUudHJpZ2dlcnMgfHwgW10sXG4gICAgICAgICAgICBpICAgICAgICA9IDAsXG4gICAgICAgICAgICBsZW4gICAgICA9IHRyaWdnZXJzLmxlbmd0aCxcbiAgICAgICAgICAgIHRyaWdnZXI7XG5cbiAgICAgICAgZm9yICg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgdHJpZ2dlciA9IHRyaWdnZXJzW2ldO1xuXG4gICAgICAgICAgICBpZiAodHJpZ2dlci50eXBlID09PSB0eXBlKSB7XG4gICAgICAgICAgICAgICAgTmVvQXJyYXkucmVtb3ZlKHRyaWdnZXJzLCB0cmlnZ2VyKTtcbiAgICAgICAgICAgICAgICBsZW4tLTtcbiAgICAgICAgICAgICAgICBoYXNNYXRjaCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaGFzTWF0Y2ggJiYgIXNpbGVudCkge1xuICAgICAgICAgICAgbWUudHJpZ2dlcnMgPSB0cmlnZ2VycztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBoYXNNYXRjaDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVc2VkIGZvciBsYWJlbFBvc2l0aW9uOiAnaW5saW5lJyB0byBhZGp1c3QgdGhlIHRvcCBib3JkZXIgbWF0Y2hpbmcgdG8gdGhlIGxlbmd0aCBvZiB0aGUgbGFiZWxcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtzaWxlbnQ9ZmFsc2VdIHRydWUgdG8gZ2V0IHRoZSB2YWx1ZSwgYnV0IG5vdCBhcHBseSBpdCB0byB0aGUgRE9NXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIHVwZGF0ZUNlbnRlckJvcmRlckVsV2lkdGgoc2lsZW50PWZhbHNlKSB7XG4gICAgICAgIGxldCBtZSA9IHRoaXM7XG5cbiAgICAgICAgaWYgKG1lLm1vdW50ZWQpIHtcbiAgICAgICAgICAgIE5lby5tYWluLkRvbUFjY2Vzcy5nZXRCb3VuZGluZ0NsaWVudFJlY3Qoe1xuICAgICAgICAgICAgICAgIGlkOiBtZS5nZXRDZW50ZXJCb3JkZXJFbCgpLmlkXG4gICAgICAgICAgICB9KS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgIG1lLmNlbnRlckJvcmRlckVsV2lkdGggPSBNYXRoLnJvdW5kKGRhdGEud2lkdGggKiAuNykgKyA4O1xuXG4gICAgICAgICAgICAgICAgaWYgKCFzaWxlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHZkb20gPSBtZS52ZG9tO1xuXG4gICAgICAgICAgICAgICAgICAgIG1lLmdldENlbnRlckJvcmRlckVsKCkud2lkdGggPSBtZS5jZW50ZXJCb3JkZXJFbFdpZHRoO1xuICAgICAgICAgICAgICAgICAgICBtZS52ZG9tID0gdmRvbTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbGN1bGF0ZXMgdGhlIG5ldyBpbnB1dFdpZHRoIGJhc2VkIG9uIHRoZSBsYWJlbFdpZHRoICYgdG90YWwgd2lkdGhcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgdXBkYXRlSW5wdXRXaWR0aCgpIHtcbiAgICAgICAgbGV0IG1lICAgICAgICAgPSB0aGlzLFxuICAgICAgICAgICAgaW5wdXRXaWR0aCA9IG1lLmdldElucHV0V2lkdGgoKSxcbiAgICAgICAgICAgIHZkb20gICAgICAgPSBtZS52ZG9tO1xuXG4gICAgICAgIGlmIChpbnB1dFdpZHRoICE9PSBudWxsICYmIGlucHV0V2lkdGggIT09IG1lLndpZHRoKSB7XG4gICAgICAgICAgICB2ZG9tLmNuWzFdLndpZHRoID0gaW5wdXRXaWR0aDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRlbGV0ZSB2ZG9tLmNuWzFdLndpZHRoO1xuICAgICAgICB9XG5cbiAgICAgICAgbWUudmRvbSA9IHZkb207XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2luY2UgdHJpZ2dlcnMgZG8gbm90IGdldCByZW5kZXJlZCwgYXNzaWduIHRoZSByZWxldmFudCBwcm9wc1xuICAgICAqIHRvZG86IHRoaXMgY291bGQgYmUgaGFuZGxlZCBieSBjb21wb25lbnQuQmFzZVxuICAgICAqL1xuICAgIHVwZGF0ZVRyaWdnZXJWbm9kZXMoKSB7XG4gICAgICAgIGxldCBtZSAgICAgICAgICAgPSB0aGlzLFxuICAgICAgICAgICAgdHJpZ2dlclJvb3QgID0gbWUudm5vZGUgJiYgbWUudm5vZGUuY2hpbGROb2Rlc1sxXSxcbiAgICAgICAgICAgIGNoaWxkTm9kZXMgICA9IHRyaWdnZXJSb290ICYmIHRyaWdnZXJSb290LmNoaWxkTm9kZXMgfHwgW10sXG4gICAgICAgICAgICB0cmlnZ2VyO1xuXG4gICAgICAgIGNoaWxkTm9kZXMuZm9yRWFjaCh2bm9kZSA9PiB7XG4gICAgICAgICAgICB0cmlnZ2VyID0gbWUuZ2V0VHJpZ2dlckJ5SWQodm5vZGUuaWQpO1xuXG4gICAgICAgICAgICBpZiAodHJpZ2dlcikge1xuICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24odHJpZ2dlciwge1xuICAgICAgICAgICAgICAgICAgICB2bm9kZSAgICA6IHZub2RlLFxuICAgICAgICAgICAgICAgICAgICBfcmVuZGVyZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIF9tb3VudGVkIDogdHJ1ZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG5cbk5lby5hcHBseUNsYXNzQ29uZmlnKFRleHQpO1xuXG5leHBvcnQge1RleHQgYXMgZGVmYXVsdH07IiwiaW1wb3J0IENvbXBvbmVudCBmcm9tICcuLi8uLi8uLi9jb21wb25lbnQvQmFzZS5tanMnO1xuaW1wb3J0IE5lb0FycmF5ICBmcm9tICcuLi8uLi8uLi91dGlsL0FycmF5Lm1qcyc7XG5cbi8qKlxuICogQmFzZSBjbGFzcyBmb3IgZm9ybSBmaWVsZCBUcmlnZ2Vyc1xuICogQGNsYXNzIE5lby5mb3JtLmZpZWxkLnRyaWdnZXIuQmFzZVxuICogQGV4dGVuZHMgTmVvLmNvbXBvbmVudC5CYXNlXG4gKi9cbmNsYXNzIEJhc2UgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIHN0YXRpYyBnZXRTdGF0aWNDb25maWcoKSB7cmV0dXJuIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFZhbGlkIHZhbHVlcyBmb3IgYWxpZ25cbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nW119IGFsaWduVmFsdWVzPVsnZW5kJywgJ3N0YXJ0J11cbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqL1xuICAgICAgICBhbGlnblZhbHVlczogWydlbmQnLCAnc3RhcnQnXVxuICAgIH19XG5cbiAgICBzdGF0aWMgZ2V0Q29uZmlnKCkge3JldHVybiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IGNsYXNzTmFtZT0nTmVvLmZvcm0uZmllbGQudHJpZ2dlci5CYXNlJ1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBjbGFzc05hbWU6ICdOZW8uZm9ybS5maWVsZC50cmlnZ2VyLkJhc2UnLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBudHlwZT0ndHJpZ2dlcidcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgbnR5cGU6ICd0cmlnZ2VyJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gYWxpZ25fPSdlbmQnXG4gICAgICAgICAqL1xuICAgICAgICBhbGlnbl86ICdlbmQnLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nW119IGNscz1bJ25lby1maWVsZC10cmlnZ2VyJ11cbiAgICAgICAgICovXG4gICAgICAgIGNsczogWyduZW8tZmllbGQtdHJpZ2dlciddLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7TmVvLmZvcm0uZmllbGQuQmFzZXxudWxsfSBmaWVsZD1udWxsXG4gICAgICAgICAqL1xuICAgICAgICBmaWVsZDogbnVsbCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge0Jvb2xlYW59IGhpZGRlbl89ZmFsc2VcbiAgICAgICAgICovXG4gICAgICAgIGhpZGRlbl86IGZhbHNlLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfG51bGx9IGljb25DbHNfPW51bGxcbiAgICAgICAgICovXG4gICAgICAgIGljb25DbHNfOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIHNjb3BlIG9mIHRoZSB0cmlnZ2VyIGhhbmRsZXJcbiAgICAgICAgICogQG1lbWJlciB7TmVvLmNvcmUuQmFzZXxudWxsfSBzY29wZT1udWxsXG4gICAgICAgICAqL1xuICAgICAgICBzY29wZTogbnVsbCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge0Jvb2xlYW59IHNob3dPbkhvdmVyPWZhbHNlXG4gICAgICAgICAqL1xuICAgICAgICBzaG93T25Ib3ZlcjogZmFsc2UsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJbnRlcm5hbCBmbGFnIHVzZWQgYnkgZmllbGQuZ2V0VHJpZ2dlcigpXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gdHlwZT0nYmFzZSdcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgdHlwZTogJ2Jhc2UnLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7T2JqZWN0fSBfdmRvbT17dGFiSW5kZXg6IC0xfVxuICAgICAgICAgKi9cbiAgICAgICAgX3Zkb206IHtcbiAgICAgICAgICAgIHRhYkluZGV4OiAtMVxuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7TnVtYmVyfSB3ZWlnaHRfPTEwXG4gICAgICAgICAqL1xuICAgICAgICB3ZWlnaHRfOiAxMFxuICAgIH19XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWdcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICAgICAgc3VwZXIoY29uZmlnKTtcblxuICAgICAgICBsZXQgbWUgICAgICAgICAgICAgPSB0aGlzLFxuICAgICAgICAgICAgZG9tTGlzdGVuZXJzICAgPSBOZW8uY2xvbmUobWUuZG9tTGlzdGVuZXJzLCB0cnVlLCB0cnVlKSxcbiAgICAgICAgICAgIGZpZWxkTGlzdGVuZXJzO1xuXG4gICAgICAgIGRvbUxpc3RlbmVycy5wdXNoKHtcbiAgICAgICAgICAgIGNsaWNrOiB7XG4gICAgICAgICAgICAgICAgZm4gICA6IG1lLm9uVHJpZ2dlckNsaWNrLFxuICAgICAgICAgICAgICAgIHNjb3BlOiBtZVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAobWUuc2hvd09uSG92ZXIpIHtcbiAgICAgICAgICAgIG1lLmhpZGVuID0gdHJ1ZTtcblxuICAgICAgICAgICAgbWUuZmllbGQub24oJ2NvbnN0cnVjdGVkJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGZpZWxkTGlzdGVuZXJzID0gIW1lLmZpZWxkLmRvbUxpc3RlbmVycyA/IFtdIDogTmVvLmNsb25lKG1lLmZpZWxkLmRvbUxpc3RlbmVycywgdHJ1ZSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgZmllbGRMaXN0ZW5lcnMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIG1vdXNlZW50ZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZuICAgIDogbWUub25Nb3VzZUVudGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUgOiBtZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICBtb3VzZWxlYXZlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmbiAgICA6IG1lLm9uTW91c2VMZWF2ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlIDogbWVcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIG1lLmZpZWxkLmRvbUxpc3RlbmVycyA9IGZpZWxkTGlzdGVuZXJzO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSwgbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgbWUuZG9tTGlzdGVuZXJzID0gZG9tTGlzdGVuZXJzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCBhZnRlciB0aGUgYWxpZ24gY29uZmlnIGdvdCBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGFmdGVyU2V0QWxpZ24odmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGxldCBjbHMgPSB0aGlzLmNscztcblxuICAgICAgICBOZW9BcnJheVt2YWx1ZSA9PT0gJ3N0YXJ0JyA/ICdhZGQnIDogJ3JlbW92ZSddKGNscywgJ25lby1hbGlnbi1zdGFydCcpO1xuICAgICAgICB0aGlzLmNscyA9IGNscztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgYWZ0ZXIgdGhlIGhpZGRlbiBjb25maWcgZ290IGNoYW5nZWRcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IHZhbHVlXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBvbGRWYWx1ZVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBhZnRlclNldEhpZGRlbih2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgbGV0IHZkb20gID0gdGhpcy52ZG9tLFxuICAgICAgICAgICAgc3R5bGUgPSB2ZG9tLnN0eWxlIHx8IHt9O1xuXG4gICAgICAgIHN0eWxlLmRpc3BsYXkgPSB2YWx1ZSA/ICdub25lJyA6ICdpbmxpbmUtYmxvY2snO1xuICAgICAgICB0aGlzLnZkb20gID0gdmRvbTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgYWZ0ZXIgdGhlIGljb25DbHMgY29uZmlnIGdvdCBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGFmdGVyU2V0SWNvbkNscyh2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgbGV0IGNscyA9IHRoaXMuY2xzO1xuXG4gICAgICAgIE5lb0FycmF5LnJlbW92ZShjbHMsIG9sZFZhbHVlKTtcblxuICAgICAgICBpZiAodmFsdWUgJiYgdmFsdWUgIT09ICcnKSB7XG4gICAgICAgICAgICBOZW9BcnJheS5hZGQoY2xzLCB2YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNscyA9IGNscztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgYmVmb3JlIHRoZSBhbGlnbiBjb25maWcgZ2V0cyBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGJlZm9yZVNldEFsaWduKHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5iZWZvcmVTZXRFbnVtVmFsdWUodmFsdWUsIG9sZFZhbHVlLCAnYWxpZ24nLCAnYWxpZ25WYWx1ZXMnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIGRlc3Ryb3koKSB7XG4gICAgICAgIGRlbGV0ZSB0aGlzLmZpZWxkO1xuICAgICAgICBzdXBlci5kZXN0cm95KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBvbk1vdXNlRW50ZXIoKSB7XG4gICAgICAgIHRoaXMuaGlkZGVuID0gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBvbk1vdXNlTGVhdmUoKSB7XG4gICAgICAgIHRoaXMuaGlkZGVuID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBjbGljayBkb21FdmVudCBsaXN0ZW5lclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIG9uVHJpZ2dlckNsaWNrKGRhdGEpIHtcbiAgICAgICAgbGV0IG1lICAgID0gdGhpcyxcbiAgICAgICAgICAgIHNjb3BlID0gbWUuc2NvcGUgfHwgbWU7XG5cbiAgICAgICAgaWYgKG1lLmhhbmRsZXIpIHtcbiAgICAgICAgICAgIHNjb3BlW21lLmhhbmRsZXJdLmNhbGwoc2NvcGUpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5OZW8uYXBwbHlDbGFzc0NvbmZpZyhCYXNlKTtcblxuZXhwb3J0IHtCYXNlIGFzIGRlZmF1bHR9OyIsImltcG9ydCBCYXNlICAgICBmcm9tICcuL0Jhc2UubWpzJztcbmltcG9ydCBOZW9BcnJheSBmcm9tICcuLi8uLi8uLi91dGlsL0FycmF5Lm1qcyc7XG5cbi8qKlxuICogQ2xlYXIgVHJpZ2dlciB0byByZW1vdmUgdGhlIGlucHV0IHZhbHVlIG9mIFRleHRGaWVsZHMgb3Igc3ViY2xhc3Nlc1xuICogQGNsYXNzIE5lby5mb3JtLmZpZWxkLnRyaWdnZXIuQ2xlYXJcbiAqIEBleHRlbmRzIE5lby5mb3JtLmZpZWxkLnRyaWdnZXIuQmFzZVxuICovXG5jbGFzcyBDbGVhciBleHRlbmRzIEJhc2Uge1xuICAgIHN0YXRpYyBnZXRDb25maWcoKSB7cmV0dXJuIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gY2xhc3NOYW1lPSdOZW8uZm9ybS5maWVsZC50cmlnZ2VyLkNsZWFyJ1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBjbGFzc05hbWU6ICdOZW8uZm9ybS5maWVsZC50cmlnZ2VyLkNsZWFyJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gbnR5cGU9J3RyaWdnZXItY2xlYXInXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIG50eXBlOiAndHJpZ2dlci1jbGVhcicsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmdbXX0gY2xzPVsnbmVvLWZpZWxkLXRyaWdnZXInLCAnbmVvLXRyaWdnZXItY2xlYXInXVxuICAgICAgICAgKi9cbiAgICAgICAgY2xzOiBbJ25lby1maWVsZC10cmlnZ2VyJywgJ25lby10cmlnZ2VyLWNsZWFyJ10sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd8bnVsbH0gaWNvbkNscz0nZmEgZmEtdGltZXMnXG4gICAgICAgICAqL1xuICAgICAgICBpY29uQ2xzOiAnZmEgZmEtdGltZXMnLFxuICAgICAgICAvKipcbiAgICAgICAgICogSW50ZXJuYWwgZmxhZyB1c2VkIGJ5IGZpZWxkLmdldFRyaWdnZXIoKVxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IHR5cGU9J2NsZWFyJ1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICB0eXBlOiAnY2xlYXInLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7TnVtYmVyfSB3ZWlnaHRfPTIwXG4gICAgICAgICAqL1xuICAgICAgICB3ZWlnaHQ6IDIwXG4gICAgfX1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICovXG4gICAgb25Db25zdHJ1Y3RlZCgpIHtcbiAgICAgICAgc3VwZXIub25Db25zdHJ1Y3RlZCgpO1xuXG4gICAgICAgIGxldCBtZSA9IHRoaXM7XG5cbiAgICAgICAgbWUuZmllbGQub24oe1xuICAgICAgICAgICAgY2hhbmdlICAgICAgICAgICAgICAgICAgICA6IG1lLm9uRmllbGRDaGFuZ2UsXG4gICAgICAgICAgICBjaGFuZ2VDbGVhclRvT3JpZ2luYWxWYWx1ZTogbWUub25GaWVsZENoYW5nZSxcbiAgICAgICAgICAgIHNjb3BlICAgICAgICAgICAgICAgICAgICAgOiBtZVxuICAgICAgICB9KTtcblxuICAgICAgICBtZS5oaWRkZW4gPSBtZS5nZXRIaWRkZW5TdGF0ZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCBhZnRlciB0aGUgaGlkZGVuIGNvbmZpZyBnb3QgY2hhbmdlZFxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gdmFsdWVcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGFmdGVyU2V0SGlkZGVuKHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICBsZXQgY2xzID0gdGhpcy5jbHM7XG5cbiAgICAgICAgTmVvQXJyYXlbdmFsdWUgPyAnYWRkJyA6ICdyZW1vdmUnXShjbHMsICduZW8taXMtaGlkZGVuJyk7XG4gICAgICAgIHRoaXMuY2xzID0gY2xzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHJldHVybnMge0Jvb2xlYW59IHRydWUgaW4gY2FzZSB0aGUgdHJpZ2dlciBzaG91bGQgYmUgaGlkZGVuXG4gICAgICovXG4gICAgZ2V0SGlkZGVuU3RhdGUoKSB7XG4gICAgICAgIGxldCBtZSAgICA9IHRoaXMsXG4gICAgICAgICAgICBmaWVsZCA9IG1lLmZpZWxkLFxuICAgICAgICAgICAgdmFsdWUgPSBmaWVsZC52YWx1ZTtcblxuICAgICAgICBpZiAoZmllbGQuY2xlYXJUb09yaWdpbmFsVmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZSA9PT0gZmllbGQub3JpZ2luYWxDb25maWcudmFsdWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAodmFsdWUgPT09IDApIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9ICcwJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuICFmaWVsZC52YWx1ZSB8fCB2YWx1ZS50b1N0cmluZygpLmxlbmd0aCA8IDE7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzXG4gICAgICovXG4gICAgb25GaWVsZENoYW5nZShvcHRzKSB7XG4gICAgICAgIHRoaXMuaGlkZGVuID0gdGhpcy5nZXRIaWRkZW5TdGF0ZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKi9cbiAgICBvblRyaWdnZXJDbGljayhkYXRhKSB7XG4gICAgICAgIHRoaXMuZmllbGQuY2xlYXIoKTtcbiAgICB9XG59XG5cbk5lby5hcHBseUNsYXNzQ29uZmlnKENsZWFyKTtcblxuZXhwb3J0IHtDbGVhciBhcyBkZWZhdWx0fTsiLCJpbXBvcnQgQ2xhc3NTeXN0ZW1VdGlsIGZyb20gJy4uL3V0aWwvQ2xhc3NTeXN0ZW0ubWpzJztcbmltcG9ydCBDb21wb25lbnQgICAgICAgZnJvbSAnLi4vY29tcG9uZW50L0Jhc2UubWpzJztcbmltcG9ydCBMaXN0TW9kZWwgICAgICAgZnJvbSAnLi4vc2VsZWN0aW9uL0xpc3RNb2RlbC5tanMnO1xuaW1wb3J0IE5lb0FycmF5ICAgICAgICBmcm9tICcuLi91dGlsL0FycmF5Lm1qcyc7XG5pbXBvcnQgU3RvcmUgICAgICAgICAgIGZyb20gJy4uL2RhdGEvU3RvcmUubWpzJztcblxuLyoqXG4gKiBAY2xhc3MgTmVvLmxpc3QuQmFzZVxuICogQGV4dGVuZHMgTmVvLmNvbXBvbmVudC5CYXNlXG4gKi9cbmNsYXNzIEJhc2UgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIHN0YXRpYyBnZXRDb25maWcoKSB7cmV0dXJuIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gY2xhc3NOYW1lPSdOZW8ubGlzdC5CYXNlJ1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBjbGFzc05hbWU6ICdOZW8ubGlzdC5CYXNlJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gbnR5cGU9J2xpc3QnXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIG50eXBlOiAnbGlzdCcsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUcnVlIHdpbGwgZGVzdHJveSB0aGUgdXNlZCBjb2xsZWN0aW9uIC8gc3RvcmUgd2hlbiB0aGUgY29tcG9uZW50IGdldHMgZGVzdHJveWVkXG4gICAgICAgICAqIEBtZW1iZXIge0Jvb2xlYW59IGF1dG9EZXN0cm95U3RvcmU9dHJ1ZVxuICAgICAgICAgKi9cbiAgICAgICAgYXV0b0Rlc3Ryb3lTdG9yZTogdHJ1ZSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ1tdfSBjbHM9WyduZW8tbGlzdC1jb250YWluZXInLCduZW8tbGlzdCddXG4gICAgICAgICAqL1xuICAgICAgICBjbHM6IFsnbmVvLWxpc3QtY29udGFpbmVyJywgJ25lby1saXN0J10sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtCb29sZWFufSBkaXNhYmxlU2VsZWN0aW9uXz1mYWxzZVxuICAgICAgICAgKi9cbiAgICAgICAgZGlzYWJsZVNlbGVjdGlvbl86IGZhbHNlLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBkaXNwbGF5RmllbGQ9J25hbWUnXG4gICAgICAgICAqL1xuICAgICAgICBkaXNwbGF5RmllbGQ6ICduYW1lJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge0Jvb2xlYW59IGRyYWdnYWJsZV89ZmFsc2VcbiAgICAgICAgICovXG4gICAgICAgIGRyYWdnYWJsZV86IGZhbHNlLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7TmVvLmRyYWdnYWJsZS5saXN0LkRyYWdab25lfG51bGx9IGRyYWdab25lPW51bGxcbiAgICAgICAgICovXG4gICAgICAgIGRyYWdab25lOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7T2JqZWN0fSBkcmFnWm9uZUNvbmZpZz1udWxsXG4gICAgICAgICAqL1xuICAgICAgICBkcmFnWm9uZUNvbmZpZzogbnVsbCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge0Jvb2xlYW59IGhpZ2hsaWdodEZpbHRlclZhbHVlPXRydWVcbiAgICAgICAgICovXG4gICAgICAgIGhpZ2hsaWdodEZpbHRlclZhbHVlOiB0cnVlLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBpdGVtQ2xzPSduZW8tbGlzdC1pdGVtJ1xuICAgICAgICAgKi9cbiAgICAgICAgaXRlbUNsczogJ25lby1saXN0LWl0ZW0nLFxuICAgICAgICAvKipcbiAgICAgICAgICogQWRkaXRpb25hbCB1c2VkIGtleXMgZm9yIHRoZSBzZWxlY3Rpb24gbW9kZWxcbiAgICAgICAgICogQG1lbWJlciB7T2JqZWN0fSBrZXlzXG4gICAgICAgICAqL1xuICAgICAgICBrZXlzOiB7fSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEVpdGhlciBwYXNzIGEgc2VsZWN0aW9uLk1vZGVsIG1vZHVsZSwgYW4gaW5zdGFuY2Ugb3IgYSBjb25maWcgb2JqZWN0XG4gICAgICAgICAqIEBtZW1iZXIge09iamVjdHxOZW8uc2VsZWN0aW9uLk1vZGVsfSBzZWxlY3Rpb25Nb2RlbF89bnVsbFxuICAgICAgICAgKi9cbiAgICAgICAgc2VsZWN0aW9uTW9kZWxfOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogU2V0IHRoaXMgdG8gdHJ1ZSBpbiBjYXNlIGEgc2VsZWN0IGV2ZW50IHNob3VsZCBvbmx5IHVwZGF0ZSBfdmRvbSAoZS5nLiB3aGVuIHVzZWQgaW5zaWRlIGEgZm9ybS5maWVsZC5TZWxlY3RcbiAgICAgICAgICogQG1lbWJlciB7Qm9vbGVhbn0gc2lsZW50U2VsZWN0PWZhbHNlXG4gICAgICAgICAqL1xuICAgICAgICBzaWxlbnRTZWxlY3Q6IGZhbHNlLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7TmVvLmRhdGEuU3RvcmV8bnVsbH0gc3RvcmVfPW51bGxcbiAgICAgICAgICovXG4gICAgICAgIHN0b3JlXzogbnVsbCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRydWUgd2lsbCBhZGQgYSBjaGVja2JveCBpbiBmcm9udCBvZiBlYWNoIGxpc3QgaXRlbVxuICAgICAgICAgKiBAbWVtYmVyIHtCb29sZWFufSBzdGFja2VkXz10cnVlXG4gICAgICAgICAqL1xuICAgICAgICB1c2VDaGVja0JveGVzXzogZmFsc2UsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtPYmplY3R9IF92ZG9tPXt0YWc6J3VsJyxjbjpbXX1cbiAgICAgICAgICovXG4gICAgICAgIF92ZG9tOiB7XG4gICAgICAgICAgICB0YWc6ICd1bCcsXG4gICAgICAgICAgICBjbiA6IFtdXG4gICAgICAgIH1cbiAgICB9fVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gY29uZmlnXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgICAgIHN1cGVyKGNvbmZpZyk7XG5cbiAgICAgICAgbGV0IG1lICAgICAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICBkb21MaXN0ZW5lcnMgPSBtZS5kb21MaXN0ZW5lcnM7XG5cbiAgICAgICAgZG9tTGlzdGVuZXJzLnB1c2goe1xuICAgICAgICAgICAgY2xpY2s6IHtmbjogbWUub25DbGljaywgc2NvcGU6IG1lfVxuICAgICAgICB9KTtcblxuICAgICAgICBtZS5kb21MaXN0ZW5lcnMgPSBkb21MaXN0ZW5lcnM7XG4gICAgfVxuXG4gICAgb25Db25zdHJ1Y3RlZCgpIHtcbiAgICAgICAgc3VwZXIub25Db25zdHJ1Y3RlZCgpO1xuXG4gICAgICAgIGxldCBtZSA9IHRoaXM7XG5cbiAgICAgICAgaWYgKG1lLnNlbGVjdGlvbk1vZGVsKSB7XG4gICAgICAgICAgICBtZS5zZWxlY3Rpb25Nb2RlbC5yZWdpc3RlcihtZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgYWZ0ZXIgdGhlIGRpc2FibGVTZWxlY3Rpb24gY29uZmlnIGdvdCBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtCb29sZWFufSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYWZ0ZXJTZXREaXNhYmxlU2VsZWN0aW9uKHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICBsZXQgbWUgPSB0aGlzO1xuXG4gICAgICAgIGlmICh2YWx1ZSAmJiBtZS5yZW5kZXJlZCAmJiBtZS5zZWxlY3Rpb25Nb2RlbCkge1xuICAgICAgICAgICAgbWUuc2VsZWN0aW9uTW9kZWwuZGVzZWxlY3RBbGwoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCBhZnRlciB0aGUgZHJhZ2dhYmxlIGNvbmZpZyBnb3QgY2hhbmdlZFxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gdmFsdWVcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGFmdGVyU2V0RHJhZ2dhYmxlKHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICBsZXQgbWUgPSB0aGlzO1xuXG4gICAgICAgIGlmICh2YWx1ZSAmJiAhbWUuZHJhZ1pvbmUpIHtcbiAgICAgICAgICAgIGltcG9ydChcbiAgICAgICAgICAgICAgICAvKiB3ZWJwYWNrQ2h1bmtOYW1lOiAnc3JjL2RyYWdnYWJsZS9saXN0L0RyYWdab25lLW1qcy5qcycgKi9cbiAgICAgICAgICAgICAgICAnLi4vZHJhZ2dhYmxlL2xpc3QvRHJhZ1pvbmUubWpzJ1xuICAgICAgICAgICAgKS50aGVuKG1vZHVsZSA9PiB7XG4gICAgICAgICAgICAgICAgbWUuZHJhZ1pvbmUgPSBOZW8uY3JlYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgbW9kdWxlIDogbW9kdWxlLmRlZmF1bHQsXG4gICAgICAgICAgICAgICAgICAgIGFwcE5hbWU6IG1lLmFwcE5hbWUsXG4gICAgICAgICAgICAgICAgICAgIG93bmVyICA6IG1lLFxuICAgICAgICAgICAgICAgICAgICAuLi5tZS5kcmFnWm9uZUNvbmZpZyB8fCB7fVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgYWZ0ZXIgdGhlIHNlbGVjdGlvbk1vZGVsIGNvbmZpZyBnb3QgY2hhbmdlZFxuICAgICAqIEBwYXJhbSB7TmVvLnNlbGVjdGlvbi5Nb2RlbH0gdmFsdWVcbiAgICAgKiBAcGFyYW0ge05lby5zZWxlY3Rpb24uTW9kZWx9IG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGFmdGVyU2V0U2VsZWN0aW9uTW9kZWwodmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGlmICh0aGlzLnJlbmRlcmVkKSB7XG4gICAgICAgICAgICB2YWx1ZS5yZWdpc3Rlcih0aGlzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCBhZnRlciB0aGUgc3RvcmUgY29uZmlnIGdvdCBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtOZW8uZGF0YS5TdG9yZX0gdmFsdWVcbiAgICAgKiBAcGFyYW0ge05lby5kYXRhLlN0b3JlfSBvbGRWYWx1ZVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBhZnRlclNldFN0b3JlKHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICBsZXQgbWUgPSB0aGlzO1xuXG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgdmFsdWUub24oe1xuICAgICAgICAgICAgICAgIGZpbHRlcjogbWUub25TdG9yZUZpbHRlcixcbiAgICAgICAgICAgICAgICBsb2FkICA6IG1lLm9uU3RvcmVMb2FkLFxuICAgICAgICAgICAgICAgIHNjb3BlIDogbWVcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAodmFsdWUuZ2V0Q291bnQoKSA+IDApIHtcbiAgICAgICAgICAgICAgICBtZS5vblN0b3JlTG9hZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkIGFmdGVyIHRoZSB1c2VDaGVja0JveGVzIGNvbmZpZyBnb3QgY2hhbmdlZFxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gdmFsdWVcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGFmdGVyU2V0VXNlQ2hlY2tCb3hlcyh2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgbGV0IG1lICA9IHRoaXMsXG4gICAgICAgICAgICBjbHMgPSBtZS5jbHM7XG5cbiAgICAgICAgTmVvQXJyYXlbdmFsdWUgPyAnYWRkJyA6ICdyZW1vdmUnXShjbHMsICduZW8tdXNlLWNoZWNraWNvbnMnKTtcbiAgICAgICAgbWUuY2xzID0gY2xzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCBiZWZvcmUgdGhlIHNlbGVjdGlvbk1vZGVsIGNvbmZpZyBnZXRzIGNoYW5nZWQuXG4gICAgICogQHBhcmFtIHtOZW8uc2VsZWN0aW9uLk1vZGVsfSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7TmVvLnNlbGVjdGlvbi5Nb2RlbH0gb2xkVmFsdWVcbiAgICAgKiBAcmV0dXJucyB7TmVvLnNlbGVjdGlvbi5Nb2RlbH1cbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYmVmb3JlU2V0U2VsZWN0aW9uTW9kZWwodmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGlmIChvbGRWYWx1ZSkge1xuICAgICAgICAgICAgb2xkVmFsdWUuZGVzdHJveSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIENsYXNzU3lzdGVtVXRpbC5iZWZvcmVTZXRJbnN0YW5jZSh2YWx1ZSwgTGlzdE1vZGVsKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgYmVmb3JlIHRoZSBzdG9yZSBjb25maWcgZ2V0cyBjaGFuZ2VkLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fE5lby5kYXRhLlN0b3JlfSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fE5lby5kYXRhLlN0b3JlfSBvbGRWYWx1ZVxuICAgICAqIEByZXR1cm5zIHtOZW8uZGF0YS5TdG9yZX1cbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYmVmb3JlU2V0U3RvcmUodmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGlmIChvbGRWYWx1ZSkge1xuICAgICAgICAgICAgb2xkVmFsdWUuZGVzdHJveSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIENsYXNzU3lzdGVtVXRpbC5iZWZvcmVTZXRJbnN0YW5jZSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogT3ZlcnJpZGUgdGhpcyBtZXRob2QgZm9yIGN1c3RvbSBsaXN0IGl0ZW1zXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHJlY29yZFxuICAgICAqIEByZXR1cm5zIHtPYmplY3R9IFRoZSBsaXN0IGl0ZW0gb2JqZWN0XG4gICAgICovXG4gICAgY3JlYXRlSXRlbShyZWNvcmQpIHtcbiAgICAgICAgbGV0IG1lICAgICAgICAgID0gdGhpcyxcbiAgICAgICAgICAgIGl0ZW1Db250ZW50ID0gbWUuY3JlYXRlSXRlbUNvbnRlbnQocmVjb3JkKTtcblxuICAgICAgICBjb25zdCBpdGVtID0ge1xuICAgICAgICAgICAgdGFnICAgICA6ICdsaScsXG4gICAgICAgICAgICBjbHMgICAgIDogW21lLml0ZW1DbHNdLFxuICAgICAgICAgICAgaWQgICAgICA6IG1lLmdldEl0ZW1JZChyZWNvcmRbbWUuZ2V0S2V5UHJvcGVydHkoKV0pLFxuICAgICAgICAgICAgdGFiSW5kZXg6IC0xXG4gICAgICAgIH07XG5cbiAgICAgICAgaXRlbVt0eXBlb2YgaXRlbUNvbnRlbnQgPT09ICdzdHJpbmcnID8gJ2h0bWwnIDogJ2NuJ10gPSBpdGVtQ29udGVudDtcblxuICAgICAgICByZXR1cm4gaXRlbTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBPdmVycmlkZSB0aGlzIG1ldGhvZCBmb3IgY3VzdG9tIHJlbmRlcmVyc1xuICAgICAqIEBwYXJhbSB7T2JqZWN0fSByZWNvcmRcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0W118U3RyaW5nfSBFaXRoZXIgYW4gdmRvbSBjbiBhcnJheSBvciBhIGh0bWwgc3RyaW5nXG4gICAgICovXG4gICAgY3JlYXRlSXRlbUNvbnRlbnQocmVjb3JkKSB7XG4gICAgICAgIGxldCBtZSAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICBpdGVtVGV4dCA9IHJlY29yZFt0aGlzLmRpc3BsYXlGaWVsZF0sXG4gICAgICAgICAgICBmaWx0ZXI7XG5cbiAgICAgICAgaWYgKG1lLmhpZ2hsaWdodEZpbHRlclZhbHVlKSB7XG4gICAgICAgICAgICBmaWx0ZXIgPSBtZS5zdG9yZS5nZXRGaWx0ZXIobWUuZGlzcGxheUZpZWxkKTtcblxuICAgICAgICAgICAgaWYgKGZpbHRlciAmJiBmaWx0ZXIudmFsdWUgIT09IG51bGwgJiYgZmlsdGVyLnZhbHVlICE9PSAnJykge1xuICAgICAgICAgICAgICAgIGl0ZW1UZXh0ID0gaXRlbVRleHQucmVwbGFjZShuZXcgUmVnRXhwKGZpbHRlci52YWx1ZSwgJ2dpJyksIGZ1bmN0aW9uKG1hdGNoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnPHNwYW4gY2xhc3M9XCJuZW8taGlnaGxpZ2h0LXNlYXJjaFwiPicgKyBtYXRjaCArICc8L3NwYW4+JztcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBpdGVtVGV4dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtzaWxlbnQ9ZmFsc2VdXG4gICAgICovXG4gICAgY3JlYXRlSXRlbXMoc2lsZW50PWZhbHNlKSB7XG4gICAgICAgIGxldCBtZSAgID0gdGhpcyxcbiAgICAgICAgICAgIHZkb20gPSBtZS52ZG9tO1xuXG4gICAgICAgIHZkb20uY24gPSBbXTtcblxuICAgICAgICBtZS5zdG9yZS5pdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgdmRvbS5jbi5wdXNoKG1lLmNyZWF0ZUl0ZW0oaXRlbSkpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoc2lsZW50KSB7XG4gICAgICAgICAgICBtZS5fdmRvbSA9IHZkb207XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtZS5wcm9taXNlVmRvbVVwZGF0ZSgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIG1lLmZpcmUoJ2NyZWF0ZUl0ZW1zJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICovXG4gICAgZGVzdHJveSgpIHtcbiAgICAgICAgbGV0IG1lID0gdGhpcztcblxuICAgICAgICBpZiAobWUuc2VsZWN0aW9uTW9kZWwpIHtcbiAgICAgICAgICAgIG1lLnNlbGVjdGlvbk1vZGVsLmRlc3Ryb3koKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChtZS5zdG9yZSAmJiBtZS5hdXRvRGVzdHJveVN0b3JlKSB7XG4gICAgICAgICAgICBtZS5zdG9yZS5kZXN0cm95KCk7XG4gICAgICAgIH1cblxuICAgICAgICBzdXBlci5kZXN0cm95KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsbHMgZm9jdXMoKSBvbiB0aGUgdG9wIGxldmVsIERPTSBub2RlIG9mIHRoaXMgY29tcG9uZW50IG9yIG9uIGEgZ2l2ZW4gbm9kZSB2aWEgaWRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gW2lkXVxuICAgICAqL1xuICAgIGZvY3VzKGlkKSB7XG4gICAgICAgIHN1cGVyLmZvY3VzKGlkKTtcblxuICAgICAgICBpZiAoaWQpIHtcbiAgICAgICAgICAgIC8vIHJlbW90ZSBtZXRob2QgYWNjZXNzXG4gICAgICAgICAgICBOZW8ubWFpbi5Eb21BY2Nlc3Muc2Nyb2xsSW50b1ZpZXcoe1xuICAgICAgICAgICAgICAgIGJlaGF2aW9yOiAnYXV0bycsXG4gICAgICAgICAgICAgICAgaWQgICAgICA6IGlkIHx8IHRoaXMuaWRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge051bWJlcnxTdHJpbmd9IGlkXG4gICAgICogQHJldHVybnMge1N0cmluZ31cbiAgICAgKi9cbiAgICBnZXRJdGVtSWQoaWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaWQgKyAnX18nICsgaWQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdm5vZGVJZFxuICAgICAqIEByZXR1cm5zIHtTdHJpbmd8TnVtYmVyfSBpdGVtSWRcbiAgICAgKi9cbiAgICBnZXRJdGVtUmVjb3JkSWQodm5vZGVJZCkge1xuICAgICAgICBsZXQgaXRlbUlkICAgPSB2bm9kZUlkLnNwbGl0KCdfXycpWzFdLFxuICAgICAgICAgICAgbW9kZWwgICAgPSB0aGlzLnN0b3JlLm1vZGVsLFxuICAgICAgICAgICAga2V5RmllbGQgPSBtb2RlbCAmJiBtb2RlbC5nZXRGaWVsZChtb2RlbC5rZXlQcm9wZXJ0eSk7XG5cbiAgICAgICAgaWYgKGtleUZpZWxkICYmIChrZXlGaWVsZC50eXBlLnRvTG93ZXJDYXNlKCkgPT09ICdpbnRlZ2VyJyB8fCBrZXlGaWVsZC50eXBlLnRvTG93ZXJDYXNlKCkgPT09ICdudW1iZXInKSkge1xuICAgICAgICAgICAgaXRlbUlkID0gcGFyc2VJbnQoaXRlbUlkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBpdGVtSWQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU3VwcG9ydCBjb2xsZWN0aW9ucyAmIHN0b3Jlc1xuICAgICAqIEByZXR1cm5zIHtTdHJpbmd9XG4gICAgICovXG4gICAgZ2V0S2V5UHJvcGVydHkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0b3JlLmtleVByb3BlcnR5IHx8IHRoaXMuc3RvcmUubW9kZWwua2V5UHJvcGVydHk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqL1xuICAgIG9uQ2xpY2soZGF0YSkge1xuICAgICAgICBsZXQgbWUgPSB0aGlzO1xuXG4gICAgICAgIGlmIChkYXRhLnBhdGhbMF0uaWQgPT09IG1lLmlkKSB7XG4gICAgICAgICAgICBtZS5vbkNvbnRhaW5lckNsaWNrKGRhdGEpO1xuICAgICAgICB9ICBlbHNlIGlmIChkYXRhLnBhdGhbMF0uY2xzLmluY2x1ZGVzKG1lLml0ZW1DbHMpKSB7XG4gICAgICAgICAgICBtZS5vbkl0ZW1DbGljayhkYXRhKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKi9cbiAgICBvbkNvbnRhaW5lckNsaWNrKGRhdGEpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBjb250YWluZXJDbGljayBldmVudCBmaXJlcyB3aGVuIGEgY2xpY2sgb2NjdXJzIG9uIHRoZSBjb21wb25lbnQsIGJ1dCBub3Qgb24gYSBsaXN0IGl0ZW1cbiAgICAgICAgICogQGV2ZW50IGNvbnRhaW5lckNsaWNrXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nW119IGNscyB0aGUgY2xhc3NMaXN0IG9mIHRoZSB0YXJnZXQgbm9kZSAoY29udmVydGVkIHRvIGFuIGFycmF5KVxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWQgdGhlIHRhcmdldCBkb20gaWRcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmdbXX0gcGF0aCB0aGUgZXZlbnQgcGF0aFxuICAgICAgICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5maXJlKCdjb250YWluZXJDbGljaycsIGRhdGEpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKi9cbiAgICBvbkl0ZW1DbGljayhkYXRhKSB7XG4gICAgICAgIGxldCBtZSAgICAgPSB0aGlzLFxuICAgICAgICAgICAgbm9kZUlkID0gZGF0YS5wYXRoWzBdLmlkO1xuXG4gICAgICAgIGlmICghbWUuZGlzYWJsZVNlbGVjdGlvbiAmJiBtZS5zZWxlY3Rpb25Nb2RlbCkge1xuICAgICAgICAgICAgbWUuc2VsZWN0aW9uTW9kZWwuc2VsZWN0KG5vZGVJZCk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGl0ZW1DbGljayBldmVudCBmaXJlcyB3aGVuIGEgY2xpY2sgb2NjdXJzIG9uIGEgbGlzdCBpdGVtXG4gICAgICAgICAqIEBldmVudCBpdGVtQ2xpY2tcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGlkIHRoZSByZWNvcmQgbWF0Y2hpbmcgdGhlIGxpc3QgaXRlbVxuICAgICAgICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgICAgICAgKi9cbiAgICAgICAgbWUuZmlyZSgnaXRlbUNsaWNrJywgbWUuc3RvcmUuZ2V0KG1lLmdldEl0ZW1SZWNvcmRJZChub2RlSWQpKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBvblN0b3JlRmlsdGVyKCkge1xuICAgICAgICB0aGlzLmNyZWF0ZUl0ZW1zKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBvblN0b3JlTG9hZCgpIHtcbiAgICAgICAgbGV0IG1lID0gdGhpcztcblxuICAgICAgICBpZiAoIW1lLm1vdW50ZWQgJiYgbWUucmVuZGVyaW5nKSB7XG4gICAgICAgICAgICBjb25zdCBsaXN0ZW5lcklkID0gbWUub24oJ3JlbmRlcmVkJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIG1lLnVuKCdyZW5kZXJlZCcsIGxpc3RlbmVySWQpO1xuICAgICAgICAgICAgICAgIG1lLmNyZWF0ZUl0ZW1zKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1lLmNyZWF0ZUl0ZW1zKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZW5pZW5jZSBzaG9ydGN1dFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBpbmRleFxuICAgICAqL1xuICAgIHNlbGVjdEl0ZW0oaW5kZXgpIHtcbiAgICAgICAgbGV0IG1lID0gdGhpcztcblxuICAgICAgICBpZiAoIW1lLmRpc2FibGVTZWxlY3Rpb24gJiYgbWUuc2VsZWN0aW9uTW9kZWwpIHtcbiAgICAgICAgICAgIG1lLnNlbGVjdGlvbk1vZGVsLnNlbGVjdEF0KGluZGV4KTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuTmVvLmFwcGx5Q2xhc3NDb25maWcoQmFzZSk7XG5cbmV4cG9ydCB7QmFzZSBhcyBkZWZhdWx0fTsiLCJpbXBvcnQgTW9kZWwgZnJvbSAnLi9Nb2RlbC5tanMnO1xuXG4vKipcbiAqIEBjbGFzcyBOZW8uc2VsZWN0aW9uLkxpc3RNb2RlbFxuICogQGV4dGVuZHMgTmVvLnNlbGVjdGlvbi5Nb2RlbFxuICovXG5jbGFzcyBMaXN0TW9kZWwgZXh0ZW5kcyBNb2RlbCB7XG4gICAgc3RhdGljIGdldENvbmZpZygpIHtyZXR1cm4ge1xuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBjbGFzc05hbWU9J05lby5zZWxlY3Rpb24uTGlzdE1vZGVsJ1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBjbGFzc05hbWU6ICdOZW8uc2VsZWN0aW9uLkxpc3RNb2RlbCcsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IG50eXBlPSdzZWxlY3Rpb24tbGlzdG1vZGVsJ1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBudHlwZTogJ3NlbGVjdGlvbi1saXN0bW9kZWwnLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7Qm9vbGVhbn0gc3RheUluTGlzdD10cnVlXG4gICAgICAgICAqL1xuICAgICAgICBzdGF5SW5MaXN0OiB0cnVlXG4gICAgfX1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKi9cbiAgICBvbktleURvd25Eb3duKGRhdGEpIHtcbiAgICAgICAgaWYgKCF0aGlzLnZpZXcuZGlzYWJsZVNlbGVjdGlvbikge1xuICAgICAgICAgICAgdGhpcy5vbk5hdktleShkYXRhLCAxKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKi9cbiAgICBvbktleURvd25MZWZ0KGRhdGEpIHtcbiAgICAgICAgdGhpcy5vbktleURvd25VcChkYXRhKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICovXG4gICAgb25LZXlEb3duUmlnaHQoZGF0YSkge1xuICAgICAgICB0aGlzLm9uS2V5RG93bkRvd24oZGF0YSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqL1xuICAgIG9uS2V5RG93blVwKGRhdGEpIHtcbiAgICAgICAgaWYgKCF0aGlzLnZpZXcuZGlzYWJsZVNlbGVjdGlvbikge1xuICAgICAgICAgICAgdGhpcy5vbk5hdktleShkYXRhLCAtMSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHN0ZXBcbiAgICAgKi9cbiAgICBvbk5hdktleShkYXRhLCBzdGVwKSB7XG4gICAgICAgIGxldCBtZSAgICAgICAgICAgICAgID0gdGhpcyxcbiAgICAgICAgICAgIGl0ZW0gICAgICAgICAgICAgPSBkYXRhLnBhdGhbMF0sXG4gICAgICAgICAgICB2aWV3ICAgICAgICAgICAgID0gbWUudmlldyxcbiAgICAgICAgICAgIHN0b3JlICAgICAgICAgICAgPSB2aWV3LnN0b3JlLFxuICAgICAgICAgICAgbWF4SXRlbXMgICAgICAgICA9IHN0b3JlLmdldENvdW50KCksXG4gICAgICAgICAgICBwcmV2ZW50U2VsZWN0aW9uID0gZmFsc2UsXG4gICAgICAgICAgICBpbmRleCwgaXRlbUlkLCByZWNvcmQsIHJlY29yZElkO1xuXG4gICAgICAgIGlmIChpdGVtLmNscy5pbmNsdWRlcyh2aWV3Lml0ZW1DbHMpKSB7XG4gICAgICAgICAgICByZWNvcmRJZCA9IHZpZXcuZ2V0SXRlbVJlY29yZElkKGl0ZW0uaWQpO1xuICAgICAgICAgICAgaW5kZXggICAgPSBzdG9yZS5pbmRleE9mKHJlY29yZElkKSArIHN0ZXA7XG5cbiAgICAgICAgICAgIGlmIChpbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICBpZiAobWUuc3RheUluTGlzdCkge1xuICAgICAgICAgICAgICAgICAgICBpbmRleCA9IG1heEl0ZW1zIC0gMTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBwcmV2ZW50U2VsZWN0aW9uID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdmlldy5maXJlKCdzZWxlY3RQcmVGaXJzdEl0ZW0nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGluZGV4ID49IG1heEl0ZW1zKSB7XG4gICAgICAgICAgICAgICAgaWYgKG1lLnN0YXlJbkxpc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgaW5kZXggPSAwO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHByZXZlbnRTZWxlY3Rpb24gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB2aWV3LmZpcmUoJ3NlbGVjdFBvc3RMYXN0SXRlbScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGluZGV4ID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghcHJldmVudFNlbGVjdGlvbikge1xuICAgICAgICAgICAgcmVjb3JkID0gc3RvcmUuZ2V0QXQoaW5kZXgpO1xuICAgICAgICAgICAgaXRlbUlkID0gdmlldy5nZXRJdGVtSWQocmVjb3JkW21lLnZpZXcuZ2V0S2V5UHJvcGVydHkoKV0pO1xuXG4gICAgICAgICAgICBtZS5zZWxlY3QoaXRlbUlkKTtcbiAgICAgICAgICAgIHZpZXcuZm9jdXMoaXRlbUlkKTtcbiAgICAgICAgICAgIHZpZXcuZmlyZSgnaXRlbU5hdmlnYXRlJywgcmVjb3JkKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1lLmRlc2VsZWN0QWxsKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7TmVvLmNvbXBvbmVudC5CYXNlfSBjb21wb25lbnRcbiAgICAgKi9cbiAgICByZWdpc3Rlcihjb21wb25lbnQpIHtcbiAgICAgICAgc3VwZXIucmVnaXN0ZXIoY29tcG9uZW50KTtcblxuICAgICAgICBsZXQgbWUgICA9IHRoaXMsXG4gICAgICAgICAgICBpZCAgID0gbWUuaWQsXG4gICAgICAgICAgICB2aWV3ID0gbWUudmlldztcblxuICAgICAgICBpZiAodmlldy5rZXlzKSB7XG4gICAgICAgICAgICB2aWV3LmtleXMuX2tleXMucHVzaChcbiAgICAgICAgICAgICAgICB7Zm46ICdvbktleURvd25Eb3duJyAgLGtleTogJ0Rvd24nICAsc2NvcGU6IGlkfSxcbiAgICAgICAgICAgICAgICB7Zm46ICdvbktleURvd25MZWZ0JyAgLGtleTogJ0xlZnQnICAsc2NvcGU6IGlkfSxcbiAgICAgICAgICAgICAgICB7Zm46ICdvbktleURvd25SaWdodCcgLGtleTogJ1JpZ2h0JyAsc2NvcGU6IGlkfSxcbiAgICAgICAgICAgICAgICB7Zm46ICdvbktleURvd25VcCcgICAgLGtleTogJ1VwJyAgICAsc2NvcGU6IGlkfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4XG4gICAgICovXG4gICAgc2VsZWN0QXQoaW5kZXgpIHtcbiAgICAgICAgbGV0IHZpZXcgICAgICA9IHRoaXMudmlldyxcbiAgICAgICAgICAgIHJlY29yZEtleSA9IHZpZXcuc3RvcmUuZ2V0S2V5QXQoaW5kZXgpLFxuICAgICAgICAgICAgaXRlbUlkICAgID0gcmVjb3JkS2V5ICYmIHZpZXcuZ2V0SXRlbUlkKHJlY29yZEtleSk7XG5cbiAgICAgICAgaWYgKGl0ZW1JZCkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3QoaXRlbUlkKTtcbiAgICAgICAgICAgIHZpZXcuZm9jdXMoaXRlbUlkKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICovXG4gICAgdW5yZWdpc3RlcigpIHtcbiAgICAgICAgbGV0IG1lICAgPSB0aGlzLFxuICAgICAgICAgICAgaWQgICA9IG1lLmlkLFxuICAgICAgICAgICAgdmlldyA9IG1lLnZpZXc7XG5cbiAgICAgICAgaWYgKHZpZXcua2V5cykge1xuICAgICAgICAgICAgdmlldy5rZXlzLnJlbW92ZUtleXMoW1xuICAgICAgICAgICAgICAgIHtmbjogJ29uS2V5RG93bkRvd24nICAsa2V5OiAnRG93bicgICxzY29wZTogaWR9LFxuICAgICAgICAgICAgICAgIHtmbjogJ29uS2V5RG93bkxlZnQnICAsa2V5OiAnTGVmdCcgICxzY29wZTogaWR9LFxuICAgICAgICAgICAgICAgIHtmbjogJ29uS2V5RG93blJpZ2h0JyAsa2V5OiAnUmlnaHQnICxzY29wZTogaWR9LFxuICAgICAgICAgICAgICAgIHtmbjogJ29uS2V5RG93blVwJyAgICAsa2V5OiAnVXAnICAgICxzY29wZTogaWR9XG4gICAgICAgICAgICBdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN1cGVyLnVucmVnaXN0ZXIoKTtcbiAgICB9XG59XG5cbk5lby5hcHBseUNsYXNzQ29uZmlnKExpc3RNb2RlbCk7XG5cbmV4cG9ydCB7TGlzdE1vZGVsIGFzIGRlZmF1bHR9OyIsImltcG9ydCBCYXNlICAgICAgIGZyb20gJy4uL2NvcmUvQmFzZS5tanMnO1xuaW1wb3J0IE5lb0FycmF5ICAgZnJvbSAnLi4vdXRpbC9BcnJheS5tanMnO1xuaW1wb3J0IE9ic2VydmFibGUgZnJvbSAnLi4vY29yZS9PYnNlcnZhYmxlLm1qcyc7XG5cbi8qKlxuICogQGNsYXNzIE5lby5zZWxlY3Rpb24uTW9kZWxcbiAqIEBleHRlbmRzIE5lby5jb3JlLkJhc2VcbiAqL1xuY2xhc3MgTW9kZWwgZXh0ZW5kcyBCYXNlIHtcbiAgICBzdGF0aWMgZ2V0U3RhdGljQ29uZmlnKCkge3JldHVybiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUcnVlIGF1dG9tYXRpY2FsbHkgYXBwbGllcyB0aGUgY29yZS9PYnNlcnZhYmxlLm1qcyBtaXhpblxuICAgICAgICAgKiBAbWVtYmVyIHtCb29sZWFufSBvYnNlcnZhYmxlPXRydWVcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKi9cbiAgICAgICAgb2JzZXJ2YWJsZTogdHJ1ZVxuICAgIH19XG5cbiAgICBzdGF0aWMgZ2V0Q29uZmlnKCkge3JldHVybiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IGNsYXNzTmFtZT0nTmVvLnNlbGVjdGlvbi5Nb2RlbCdcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgY2xhc3NOYW1lOiAnTmVvLnNlbGVjdGlvbi5Nb2RlbCcsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd9IG50eXBlPSdzZWxlY3Rpb24tbW9kZWwnXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIG50eXBlOiAnc2VsZWN0aW9uLW1vZGVsJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFBsYWNlaG9sZGVyIGZvciBleHRlbmRlZCBjbGFzc2VzIHRvIGFkZCBhIGN1c3RvbSBjc3MgcnVsZSB0byB0aGlzIG93bmVyIGNvbXBvbmVudFxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd8bnVsbH0gY2xzPW51bGxcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgY2xzOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7QXJyYXl9IGl0ZW1zPVtdXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIGl0ZW1zOiBbXSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gc2VsZWN0ZWRDbHM9J3NlbGVjdGVkJ1xuICAgICAgICAgKi9cbiAgICAgICAgc2VsZWN0ZWRDbHM6ICduZW8tc2VsZWN0ZWQnLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7Qm9vbGVhbn0gc2luZ2xlU2VsZWN0PXRydWVcbiAgICAgICAgICovXG4gICAgICAgIHNpbmdsZVNlbGVjdDogdHJ1ZSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEludGVybmFsbHkgc2F2ZXMgdGhlIHZpZXcgaWQsIGJ1dCB0aGUgZ2V0dGVyIHdpbGwgcmV0dXJuIHRoZSBtYXRjaGluZyBpbnN0YW5jZVxuICAgICAgICAgKiBAbWVtYmVyIHtPYmplY3R9IHZpZXdfPW51bGxcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgdmlld186IG51bGxcbiAgICB9fVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0cmlnZ2VyZWQgYmVmb3JlIGdldHRpbmcgdGhlIHZhbHVlIG9mIHRoZSB2aWV3IGNvbmZpZ1xuICAgICAqIEByZXR1cm5zIHtOZW8uY29tcG9uZW50LkJhc2V9XG4gICAgICovXG4gICAgYmVmb3JlR2V0VmlldygpIHtcbiAgICAgICAgcmV0dXJuIE5lby5nZXRDb21wb25lbnQodGhpcy5fdmlldyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0cmlnZ2VyZWQgYmVmb3JlIHNldHRpbmcgdGhlIHZhbHVlIG9mIHRoZSB2aWV3IGNvbmZpZ1xuICAgICAqIEByZXR1cm5zIHtTdHJpbmd9IHRoZSB2aWV3IGlkXG4gICAgICovXG4gICAgYmVmb3JlU2V0Vmlldyh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdmFsdWUgJiYgdmFsdWUuaWQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBhZGREb21MaXN0ZW5lcigpIHt9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpdGVtXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBbc2lsZW50XSB0cnVlIHRvIHByZXZlbnQgYSB2ZG9tIHVwZGF0ZVxuICAgICAqIEBwYXJhbSB7QXJyYXl9IFtpdGVtQ29sbGVjdGlvbl1cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gW3NlbGVjdGVkQ2xzXVxuICAgICAqL1xuICAgIGRlc2VsZWN0KGl0ZW0sIHNpbGVudCwgaXRlbUNvbGxlY3Rpb24sIHNlbGVjdGVkQ2xzKSB7XG4gICAgICAgIGxldCBtZSAgID0gdGhpcyxcbiAgICAgICAgICAgIHZpZXcgPSBtZS52aWV3LFxuICAgICAgICAgICAgdmRvbSA9IHZpZXcudmRvbSxcbiAgICAgICAgICAgIG5vZGUgPSB2aWV3LmdldFZkb21DaGlsZChpdGVtKSwgLy8gdG9kbzogc3VwcG9ydCBmb3Igbm9kZXMgKHJpZ2h0IG5vdyBsaW1pdGVkIHRvIGlkcylcbiAgICAgICAgICAgIGNscztcblxuICAgICAgICBpZiAobm9kZSkge1xuICAgICAgICAgICAgY2xzID0gbm9kZS5jbHMgfHwgW107XG4gICAgICAgICAgICBOZW9BcnJheS5yZW1vdmUoY2xzLCBzZWxlY3RlZENscyB8fCBtZS5zZWxlY3RlZENscyk7XG4gICAgICAgICAgICBub2RlLmNscyA9IGNscztcbiAgICAgICAgfVxuXG4gICAgICAgIE5lb0FycmF5LnJlbW92ZShpdGVtQ29sbGVjdGlvbiB8fCBtZS5pdGVtcywgaXRlbSk7XG5cbiAgICAgICAgaWYgKCFzaWxlbnQpIHtcbiAgICAgICAgICAgIHZpZXcudmRvbSA9IHZkb207XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gW3NpbGVudF0gdHJ1ZSB0byBwcmV2ZW50IGEgdmRvbSB1cGRhdGVcbiAgICAgKi9cbiAgICBkZXNlbGVjdEFsbChzaWxlbnQpIHtcbiAgICAgICAgbGV0IG1lICAgID0gdGhpcyxcbiAgICAgICAgICAgIGl0ZW1zID0gWy4uLm1lLml0ZW1zXSxcbiAgICAgICAgICAgIHZpZXcgID0gbWUudmlldyxcbiAgICAgICAgICAgIHZkb20gID0gdmlldy52ZG9tO1xuXG4gICAgICAgIGl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICBtZS5kZXNlbGVjdChpdGVtLCB0cnVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKCFzaWxlbnQgJiYgaXRlbXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdmlldy52ZG9tID0gdmRvbTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICovXG4gICAgZGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy51bnJlZ2lzdGVyKCk7XG4gICAgICAgIHN1cGVyLmRlc3Ryb3koKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtBcnJheX0gdGhpcy5pdGVtc1xuICAgICAqL1xuICAgIGdldFNlbGVjdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXRlbXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gdHJ1ZSBpbiBjYXNlIHRoZXJlIGlzIGEgc2VsZWN0aW9uXG4gICAgICovXG4gICAgaGFzU2VsZWN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pdGVtcy5sZW5ndGggPiAwO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXG4gICAgICogQHJldHVybnMge0Jvb2xlYW59IHRydWUgaW4gY2FzZSB0aGUgaXRlbSBpcyBzZWxlY3RlZFxuICAgICAqL1xuICAgIGlzU2VsZWN0ZWQoaWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXRlbXMuaW5kZXhPZihpZCkgPiAtMTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7TmVvLmNvbXBvbmVudC5CYXNlfSBjb21wb25lbnRcbiAgICAgKi9cbiAgICByZWdpc3Rlcihjb21wb25lbnQpIHtcbiAgICAgICAgbGV0IG1lICA9IHRoaXMsXG4gICAgICAgICAgICBjbHMgPSBjb21wb25lbnQuY2xzIHx8IFtdO1xuXG4gICAgICAgIGlmIChtZS5jbHMgJiYgIWNscy5pbmNsdWRlcyhtZS5jbHMpKSB7XG4gICAgICAgICAgICBjbHMucHVzaChtZS5jbHMpO1xuICAgICAgICAgICAgY29tcG9uZW50LmNscyA9IGNscztcbiAgICAgICAgfVxuXG4gICAgICAgIG1lLnZpZXcgPSBjb21wb25lbnQ7XG4gICAgICAgIG1lLmFkZERvbUxpc3RlbmVyKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICByZW1vdmVEb21MaXN0ZW5lcnMoKSB7XG4gICAgICAgIGxldCBtZSAgICAgICAgICAgPSB0aGlzLFxuICAgICAgICAgICAgY29tcG9uZW50ICAgID0gbWUudmlldyxcbiAgICAgICAgICAgIGRvbUxpc3RlbmVycyA9IFsuLi5jb21wb25lbnQuZG9tTGlzdGVuZXJzXTtcblxuICAgICAgICBjb21wb25lbnQuZG9tTGlzdGVuZXJzLmZvckVhY2gobGlzdGVuZXIgPT4ge1xuICAgICAgICAgICAgaWYgKGxpc3RlbmVyLnNjb3BlID09PSBtZSkge1xuICAgICAgICAgICAgICAgIE5lb0FycmF5LnJlbW92ZShkb21MaXN0ZW5lcnMsIGxpc3RlbmVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29tcG9uZW50LmRvbUxpc3RlbmVycyA9IGRvbUxpc3RlbmVycztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fE9iamVjdFtdfFN0cmluZ1tdfSBpdGVtc1xuICAgICAqIEBwYXJhbSB7QXJyYXl9IFtpdGVtQ29sbGVjdGlvbl1cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gW3NlbGVjdGVkQ2xzXVxuICAgICAqL1xuICAgIHNlbGVjdChpdGVtcywgaXRlbUNvbGxlY3Rpb24sIHNlbGVjdGVkQ2xzKSB7XG4gICAgICAgIGl0ZW1zID0gQXJyYXkuaXNBcnJheShpdGVtcykgPyBpdGVtcyA6IFtpdGVtc107XG5cbiAgICAgICAgbGV0IG1lICAgPSB0aGlzLFxuICAgICAgICAgICAgdmlldyA9IG1lLnZpZXcsXG4gICAgICAgICAgICB2ZG9tID0gdmlldy52ZG9tLFxuICAgICAgICAgICAgY2xzO1xuXG4gICAgICAgIGlmIChtZS5zaW5nbGVTZWxlY3QpIHtcbiAgICAgICAgICAgIG1lLmRlc2VsZWN0QWxsKHRydWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaXRlbXMuZm9yRWFjaChub2RlID0+IHtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygbm9kZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICBub2RlID0gdmlldy5nZXRWZG9tQ2hpbGQobm9kZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChub2RlKSB7XG4gICAgICAgICAgICAgICAgY2xzID0gbm9kZS5jbHMgfHwgW107XG4gICAgICAgICAgICAgICAgTmVvQXJyYXkuYWRkKGNscywgc2VsZWN0ZWRDbHMgfHwgbWUuc2VsZWN0ZWRDbHMpO1xuICAgICAgICAgICAgICAgIG5vZGUuY2xzID0gY2xzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBOZW9BcnJheS5hZGQoaXRlbUNvbGxlY3Rpb24gfHwgbWUuaXRlbXMsIGl0ZW1zKTtcblxuICAgICAgICB2aWV3W3ZpZXcuaGFzT3duUHJvcGVydHkoJ3NpbGVudFNlbGVjdCcpICYmIHZpZXcuc2lsZW50U2VsZWN0ID09PSB0cnVlID8gJ192ZG9tJyA6ICd2ZG9tJ10gPSB2ZG9tO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGl0ZW1cbiAgICAgKi9cbiAgICB0b2dnbGVTZWxlY3Rpb24oaXRlbSkge1xuICAgICAgICBsZXQgbWUgPSB0aGlzO1xuXG4gICAgICAgIGlmIChtZS5pc1NlbGVjdGVkKGl0ZW0pKSB7XG4gICAgICAgICAgICBtZS5kZXNlbGVjdChpdGVtKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1lLnNlbGVjdChpdGVtKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICovXG4gICAgdW5yZWdpc3RlcigpIHtcbiAgICAgICAgbGV0IG1lICA9IHRoaXMsXG4gICAgICAgICAgICBjbHMgPSBtZS52aWV3LmNscyB8fCBbXTtcblxuICAgICAgICBpZiAobWUuY2xzICYmIGNscy5pbmNsdWRlcyhtZS5jbHMpKSB7XG4gICAgICAgICAgICBOZW9BcnJheS5yZW1vdmUoY2xzLCBtZS5jbHMpO1xuICAgICAgICAgICAgbWUudmlldy5jbHMgPSBjbHM7XG4gICAgICAgIH1cblxuICAgICAgICBtZS5kZXNlbGVjdEFsbCgpO1xuXG4gICAgICAgIG1lLnJlbW92ZURvbUxpc3RlbmVycygpO1xuICAgIH1cbn1cblxuTmVvLmFwcGx5Q2xhc3NDb25maWcoTW9kZWwpO1xuXG5leHBvcnQge01vZGVsIGFzIGRlZmF1bHR9OyIsImltcG9ydCBCYXNlICAgICAgIGZyb20gJy4uL2xpc3QvQmFzZS5tanMnO1xuaW1wb3J0IENvbGxlY3Rpb24gZnJvbSAnLi4vY29sbGVjdGlvbi9CYXNlLm1qcyc7XG5pbXBvcnQgTmVvQXJyYXkgICBmcm9tICcuLi91dGlsL0FycmF5Lm1qcyc7XG5cbi8qKlxuICogQGNsYXNzIE5lby50cmVlLkxpc3RcbiAqIEBleHRlbmRzIE5lby5saXN0LkJhc2VcbiAqL1xuY2xhc3MgVHJlZSBleHRlbmRzIEJhc2Uge1xuICAgIHN0YXRpYyBnZXRDb25maWcoKSB7cmV0dXJuIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gY2xhc3NOYW1lPSdOZW8udHJlZS5MaXN0J1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBjbGFzc05hbWU6ICdOZW8udHJlZS5MaXN0JyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gbnR5cGU9J3RyZWVsaXN0J1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBudHlwZTogJ3RyZWVsaXN0JyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ1tdfSBjbHM9WyduZW8tdHJlZS1saXN0J11cbiAgICAgICAgICovXG4gICAgICAgIGNsczogWyduZW8tdHJlZS1saXN0J10sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiB0b2RvOiBjaGFuZ2UgdGhlIGRlZmF1bHQgdG8gZmFsc2Ugb25jZSBzZWxlY3Rpb24uVHJlZUxpc3QgaXMgaW4gcGxhY2VcbiAgICAgICAgICogQG1lbWJlciB7Qm9vbGVhbn0gZGlzYWJsZVNlbGVjdGlvbj10cnVlXG4gICAgICAgICAqL1xuICAgICAgICBkaXNhYmxlU2VsZWN0aW9uOiB0cnVlLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7TmVvLmRyYWdnYWJsZS50cmVlLkRyYWdab25lfG51bGx9IGRyYWdab25lPW51bGxcbiAgICAgICAgICovXG4gICAgICAgIGRyYWdab25lOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7Qm9vbGVhbn0gc2hvd0NvbGxhcHNlRXhwYW5kQWxsSWNvbnM9dHJ1ZVxuICAgICAgICAgKi9cbiAgICAgICAgc2hvd0NvbGxhcHNlRXhwYW5kQWxsSWNvbnM6IHRydWUsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtCb29sZWFufSBzb3J0YWJsZV89ZmFsc2VcbiAgICAgICAgICovXG4gICAgICAgIHNvcnRhYmxlXzogZmFsc2UsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtOZW8uZHJhZ2dhYmxlLnRyZWUuU29ydFpvbmV8bnVsbH0gc29ydFpvbmU9bnVsbFxuICAgICAgICAgKi9cbiAgICAgICAgc29ydFpvbmU6IG51bGwsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtPYmplY3R9IGRyYWdab25lQ29uZmlnPW51bGxcbiAgICAgICAgICovXG4gICAgICAgIHNvcnRab25lQ29uZmlnOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7T2JqZWN0fSBfdmRvbVxuICAgICAgICAgKi9cbiAgICAgICAgX3Zkb206IHtcbiAgICAgICAgICAgIGNuOiBbe1xuICAgICAgICAgICAgICAgIHRhZzogJ3VsJyxcbiAgICAgICAgICAgICAgICBjbHM6IFsnbmVvLWxpc3QtY29udGFpbmVyJywgJ25lby1saXN0J10sXG4gICAgICAgICAgICAgICAgY24gOiBbXVxuICAgICAgICAgICAgfV1cbiAgICAgICAgfVxuICAgIH19XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIG9uQ29uc3RydWN0ZWQoKSB7XG4gICAgICAgIHN1cGVyLm9uQ29uc3RydWN0ZWQoKTtcblxuICAgICAgICBsZXQgbWUgICA9IHRoaXMsXG4gICAgICAgICAgICB2ZG9tID0gbWUudmRvbTtcblxuICAgICAgICBpZiAobWUuc2hvd0NvbGxhcHNlRXhwYW5kQWxsSWNvbnMpIHtcbiAgICAgICAgICAgIHZkb20uY24udW5zaGlmdCh7XG4gICAgICAgICAgICAgICAgY2xzOiBbJ25lby10cmVlbGlzdC1tZW51LWl0ZW0nLCAnbmVvLXRyZWVsaXN0LWNvbGxhcHNlLWFsbC1pY29uJ10sXG4gICAgICAgICAgICAgICAgY24gOiBbe1xuICAgICAgICAgICAgICAgICAgICB0YWc6ICdzcGFuJyxcbiAgICAgICAgICAgICAgICAgICAgY2xzOiBbJ25lby10cmVlbGlzdC1tZW51LWl0ZW0tY29udGVudCddXG4gICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBjbHM6IFsnbmVvLXRyZWVsaXN0LW1lbnUtaXRlbScsICduZW8tdHJlZWxpc3QtZXhwYW5kLWFsbC1pY29uJ10sXG4gICAgICAgICAgICAgICAgY24gOiBbe1xuICAgICAgICAgICAgICAgICAgICB0YWc6ICdzcGFuJyxcbiAgICAgICAgICAgICAgICAgICAgY2xzOiBbJ25lby10cmVlbGlzdC1tZW51LWl0ZW0tY29udGVudCddXG4gICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBtZS52ZG9tID0gdmRvbTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCBhZnRlciB0aGUgZHJhZ2dhYmxlIGNvbmZpZyBnb3QgY2hhbmdlZFxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gdmFsdWVcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGFmdGVyU2V0RHJhZ2dhYmxlKHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICBsZXQgbWUgPSB0aGlzO1xuXG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgaWYgKG1lLnNvcnRhYmxlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcigndHJlZS5MaXN0IGNhbiBiZSBlaXRoZXIgZHJhZ2dhYmxlIG9yIHNvcnRhYmxlLCBub3QgYm90aC4nLCBtZS5pZCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCFtZS5kcmFnWm9uZSkge1xuICAgICAgICAgICAgICAgIGltcG9ydChcbiAgICAgICAgICAgICAgICAgICAgLyogd2VicGFja0NodW5rTmFtZTogJ3NyYy9kcmFnZ2FibGUvdHJlZS9EcmFnWm9uZS1tanMuanMnICovXG4gICAgICAgICAgICAgICAgICAgICcuLi9kcmFnZ2FibGUvdHJlZS9EcmFnWm9uZS5tanMnXG4gICAgICAgICAgICAgICAgICAgICkudGhlbihtb2R1bGUgPT4ge1xuICAgICAgICAgICAgICAgICAgICBtZS5kcmFnWm9uZSA9IE5lby5jcmVhdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgbW9kdWxlIDogbW9kdWxlLmRlZmF1bHQsXG4gICAgICAgICAgICAgICAgICAgICAgICBhcHBOYW1lOiBtZS5hcHBOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgb3duZXIgIDogbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5tZS5kcmFnWm9uZUNvbmZpZyB8fCB7fVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCBhZnRlciB0aGUgc29ydGFibGUgY29uZmlnIGdvdCBjaGFuZ2VkXG4gICAgICogQHBhcmFtIHtCb29sZWFufSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYWZ0ZXJTZXRTb3J0YWJsZSh2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgbGV0IG1lID0gdGhpcztcblxuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIGlmIChtZS5kcmFnZ2FibGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCd0cmVlLkxpc3QgY2FuIGJlIGVpdGhlciBkcmFnZ2FibGUgb3Igc29ydGFibGUsIG5vdCBib3RoLicsIG1lLmlkKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIW1lLnNvcnRab25lKSB7XG4gICAgICAgICAgICAgICAgaW1wb3J0KFxuICAgICAgICAgICAgICAgICAgICAvKiB3ZWJwYWNrQ2h1bmtOYW1lOiAnc3JjL2RyYWdnYWJsZS90cmVlL1NvcnRab25lLW1qcy5qcycgKi9cbiAgICAgICAgICAgICAgICAgICAgJy4uL2RyYWdnYWJsZS90cmVlL1NvcnRab25lLm1qcydcbiAgICAgICAgICAgICAgICAgICAgKS50aGVuKG1vZHVsZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIG1lLnNvcnRab25lID0gTmVvLmNyZWF0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBtb2R1bGUgICAgICAgICAgICAgOiBtb2R1bGUuZGVmYXVsdCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFwcE5hbWUgICAgICAgICAgICA6IG1lLmFwcE5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBib3VuZGFyeUNvbnRhaW5lcklkOiBtZS5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG93bmVyICAgICAgICAgICAgICA6IG1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgLi4ubWUuc29ydFpvbmVDb25maWcgfHwge31cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgYmVmb3JlIHRoZSBzdG9yZSBjb25maWcgZ2V0cyBjaGFuZ2VkLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fE5lby5kYXRhLlN0b3JlfSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fE5lby5kYXRhLlN0b3JlfSBvbGRWYWx1ZVxuICAgICAqIEByZXR1cm5zIHtOZW8uZGF0YS5TdG9yZX1cbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYmVmb3JlU2V0U3RvcmUodmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGlmICghdmFsdWUpIHtcbiAgICAgICAgICAgIHZhbHVlID0gTmVvLmNyZWF0ZShDb2xsZWN0aW9uLCB7XG4gICAgICAgICAgICAgICAga2V5UHJvcGVydHk6ICdpZCdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHN1cGVyLmJlZm9yZVNldFN0b3JlKHZhbHVlLCBvbGRWYWx1ZSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBDb2xsYXBzZXMgYWxsIGZvbGRlcnNcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtzaWxlbnRdPWZhbHNlIFNldCBzaWxlbnQgdG8gdHJ1ZSB0byBwcmV2ZW50IGEgdm5vZGUgdXBkYXRlXG4gICAgICovXG4gICAgY29sbGFwc2VBbGwoc2lsZW50PWZhbHNlKSB7XG4gICAgICAgIGxldCBtZSAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICB2ZG9tICAgICA9IG1lLnZkb20sXG4gICAgICAgICAgICBoYXNNYXRjaCA9IGZhbHNlLFxuICAgICAgICAgICAgbm9kZTtcblxuICAgICAgICBtZS5zdG9yZS5pdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgaWYgKCFpdGVtLmlzTGVhZikge1xuICAgICAgICAgICAgICAgIG5vZGUgPSBtZS5nZXRWZG9tQ2hpbGQobWUuZ2V0SXRlbUlkKGl0ZW0uaWQpLCB2ZG9tKTtcblxuICAgICAgICAgICAgICAgIGlmIChub2RlLmNscy5pbmNsdWRlcygnbmVvLWZvbGRlci1vcGVuJykpIHtcbiAgICAgICAgICAgICAgICAgICAgTmVvQXJyYXkucmVtb3ZlKG5vZGUuY2xzLCAnbmVvLWZvbGRlci1vcGVuJyk7XG4gICAgICAgICAgICAgICAgICAgIGhhc01hdGNoID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChoYXNNYXRjaCkge1xuICAgICAgICAgICAgbWVbc2lsZW50ID8gJ192ZG9tJyA6ICd2ZG9tJ10gPSB2ZG9tO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gW3BhcmVudElkXSBUaGUgcGFyZW50IG5vZGVcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW3Zkb21Sb290XSBUaGUgdmRvbSB0ZW1wbGF0ZSByb290IGZvciB0aGUgY3VycmVudCBzdWIgdHJlZVxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBsZXZlbCBUaGUgaGllcmFyY2h5IGxldmVsIG9mIHRoZSB0cmVlXG4gICAgICogQHJldHVybnMge09iamVjdH0gdmRvbVJvb3RcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgY3JlYXRlSXRlbXMocGFyZW50SWQsIHZkb21Sb290LCBsZXZlbCkge1xuICAgICAgICBsZXQgbWUgICAgPSB0aGlzLFxuICAgICAgICAgICAgaXRlbXMgPSBtZS5zdG9yZS5maW5kKCdwYXJlbnRJZCcsIHBhcmVudElkKSxcbiAgICAgICAgICAgIGNscywgdG1wUm9vdDtcblxuICAgICAgICBpZiAoaXRlbXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgaWYgKCF2ZG9tUm9vdC5jbikge1xuICAgICAgICAgICAgICAgIHZkb21Sb290LmNuID0gW107XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChwYXJlbnRJZCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHZkb21Sb290LmNuLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICB0YWc6ICd1bCcsXG4gICAgICAgICAgICAgICAgICAgIGNsczogWyduZW8tbGlzdCddLFxuICAgICAgICAgICAgICAgICAgICBjbiA6IFtdLFxuICAgICAgICAgICAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFkZGluZ0xlZnQ6ICcxNXB4J1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB0bXBSb290ID0gdmRvbVJvb3QuY25bdmRvbVJvb3QuY24ubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRtcFJvb3QgPSB2ZG9tUm9vdDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICBjbHMgPSBbJ25lby1saXN0LWl0ZW0nXTtcblxuICAgICAgICAgICAgICAgIGlmIChpdGVtLmlzTGVhZikge1xuICAgICAgICAgICAgICAgICAgICBjbHMucHVzaChpdGVtLnNpbmdsZXRvbiA/ICduZW8tbGlzdC1pdGVtLWxlYWYtc2luZ2xldG9uJyA6ICduZW8tbGlzdC1pdGVtLWxlYWYnKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjbHMucHVzaCgnbmVvLWxpc3QtZm9sZGVyJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpdGVtLmNvbGxhcHNlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xzLnB1c2goJ25lby1mb2xkZXItb3BlbicpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdG1wUm9vdC5jbi5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgdGFnOiAnbGknLFxuICAgICAgICAgICAgICAgICAgICBjbHM6IGNscyxcbiAgICAgICAgICAgICAgICAgICAgaWQgOiBtZS5nZXRJdGVtSWQoaXRlbS5pZCksXG4gICAgICAgICAgICAgICAgICAgIGNuIDogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhZyAgICAgIDogJ3NwYW4nLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xzICAgICAgOiBbJ25lby1saXN0LWl0ZW0tY29udGVudCddLFxuICAgICAgICAgICAgICAgICAgICAgICAgaW5uZXJIVE1MOiBpdGVtLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50ZXJFdmVudHM6ICdub25lJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhZGRpbmcgOiAnMTBweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogaXRlbS5pc0xlYWYgPyBudWxsIDogJ3N0aWNreScsXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3AgICAgIDogaXRlbS5pc0xlYWYgPyBudWxsIDogKGxldmVsICogMzgpICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHpJbmRleCAgOiBpdGVtLmlzTGVhZiA/IG51bGwgOiAoMjAgLyAobGV2ZWwgKyAxKSksXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHRtcFJvb3QgPSBtZS5jcmVhdGVJdGVtcyhpdGVtLmlkLCB0bXBSb290LCBsZXZlbCArIDEpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdmRvbVJvb3Q7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRXhwYW5kcyBhbGwgZm9sZGVyc1xuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gc2lsZW50PWZhbHNlIFNldCBzaWxlbnQgdG8gdHJ1ZSB0byBwcmV2ZW50IGEgdm5vZGUgdXBkYXRlXG4gICAgICovXG4gICAgZXhwYW5kQWxsKHNpbGVudD1mYWxzZSkge1xuICAgICAgICBsZXQgbWUgICAgICAgPSB0aGlzLFxuICAgICAgICAgICAgdmRvbSAgICAgPSBtZS52ZG9tLFxuICAgICAgICAgICAgaGFzTWF0Y2ggPSBmYWxzZSxcbiAgICAgICAgICAgIG5vZGU7XG5cbiAgICAgICAgbWUuc3RvcmUuaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgIGlmICghaXRlbS5pc0xlYWYpIHtcbiAgICAgICAgICAgICAgICBub2RlID0gbWUuZ2V0VmRvbUNoaWxkKG1lLmdldEl0ZW1JZChpdGVtLmlkKSwgdmRvbSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIW5vZGUuY2xzLmluY2x1ZGVzKCduZW8tZm9sZGVyLW9wZW4nKSkge1xuICAgICAgICAgICAgICAgICAgICBOZW9BcnJheS5hZGQobm9kZS5jbHMsICduZW8tZm9sZGVyLW9wZW4nKTtcbiAgICAgICAgICAgICAgICAgICAgaGFzTWF0Y2ggPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGhhc01hdGNoKSB7XG4gICAgICAgICAgICBtZVtzaWxlbnQgPyAnX3Zkb20nIDogJ3Zkb20nXSA9IHZkb207XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIaWRlcyBUcmVlIG5vZGVzIHdoaWNoIGRvIG5vdCBtYXRjaCB0aGUgZmlsdGVyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHByb3BlcnR5IFRoZSBzdG9yZSBmaWVsZCB0byBmaWx0ZXIgYnlcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdmFsdWUgVGhlIGZpbHRlciB2YWx1ZVxuICAgICAqIEBwYXJhbSB7TnVtYmVyfG51bGx9IHBhcmVudElkIFRoZSByb290IGlkIGZvciB0aGUgY3VycmVudCBmaWx0ZXIgY2FsbFxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gW3BhcmVudE1hdGNoXT1mYWxzZSBJbiBjYXNlIGEgcGFyZW50IGZvbGRlciBtYXRjaGVzIHRoZSBmaWx0ZXIsIHNob3cgaXRzIGNoaWxkIGl0ZW1zXG4gICAgICogQHJldHVybnMge0Jvb2xlYW59IGZhbHNlIGlmIGF0IGxlYXN0IG9uZSBjaGlsZCBpdGVtIGlzIGZpbHRlcmVkXG4gICAgICovXG4gICAgZmlsdGVyKHByb3BlcnR5LCB2YWx1ZSwgcGFyZW50SWQsIHBhcmVudE1hdGNoPWZhbHNlKSB7XG4gICAgICAgIGxldCBtZSAgICAgICAgID0gdGhpcyxcbiAgICAgICAgICAgIGlzRmlsdGVyZWQgPSB0cnVlLFxuICAgICAgICAgICAgdmFsdWVSZWdFeCA9IG5ldyBSZWdFeHAodmFsdWUsICdnaScpLFxuICAgICAgICAgICAgdmRvbSAgICAgICA9IG1lLnZkb20sXG4gICAgICAgICAgICBjaGlsZFJldHVyblZhbHVlLCBkaXJlY3RNYXRjaCwgbm9kZTtcblxuICAgICAgICBpZiAoIXZhbHVlKSB7XG4gICAgICAgICAgICB2YWx1ZSA9ICcnO1xuICAgICAgICB9XG5cbiAgICAgICAgbWUuc3RvcmUuaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgIGlmIChpdGVtLnBhcmVudElkID09PSBwYXJlbnRJZCkge1xuICAgICAgICAgICAgICAgIGRpcmVjdE1hdGNoID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgbm9kZSAgICAgICAgPSBtZS5nZXRWZG9tQ2hpbGQobWUuZ2V0SXRlbUlkKGl0ZW0uaWQpLCB2ZG9tKTtcblxuICAgICAgICAgICAgICAgIG5vZGUuY25bMF0uaW5uZXJIVE1MID0gaXRlbVtwcm9wZXJ0eV0ucmVwbGFjZSh2YWx1ZVJlZ0V4LCBtYXRjaCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGRpcmVjdE1hdGNoID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGA8c3BhbiBjbGFzcz1cIm5lby1oaWdobGlnaHQtc2VhcmNoXCI+JHttYXRjaH08L3NwYW4+YDtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGlmIChpdGVtLmlzTGVhZikge1xuICAgICAgICAgICAgICAgICAgICBjaGlsZFJldHVyblZhbHVlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjaGlsZFJldHVyblZhbHVlID0gbWUuZmlsdGVyKHByb3BlcnR5LCB2YWx1ZSwgaXRlbS5pZCwgZGlyZWN0TWF0Y2ggfHwgcGFyZW50TWF0Y2gpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChkaXJlY3RNYXRjaCB8fCBwYXJlbnRNYXRjaCB8fCBjaGlsZFJldHVyblZhbHVlID09PSBmYWxzZSB8fCB2YWx1ZSA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgaXNGaWx0ZXJlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIG5vZGUuc3R5bGUuZGlzcGxheSA9IGlzRmlsdGVyZWQgPyAnbm9uZScgOiAnbGlzdC1pdGVtJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHBhcmVudElkID09PSBudWxsKSB7XG4gICAgICAgICAgICBtZS5leHBhbmRBbGwodHJ1ZSk7XG4gICAgICAgICAgICBtZS52ZG9tID0gdmRvbTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBpc0ZpbHRlcmVkO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHJldHVybnMge09iamVjdH1cbiAgICAgKi9cbiAgICBnZXRMaXN0SXRlbXNSb290KCkge1xuICAgICAgICByZXR1cm4gdGhpcy52ZG9tLmNuW3RoaXMuc2hvd0NvbGxhcHNlRXhwYW5kQWxsSWNvbnMgPyAyIDogMF07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqL1xuICAgIG9uQ2xpY2soZGF0YSkge1xuICAgICAgICBpZiAoZGF0YS50YXJnZXQuY2xzLmluY2x1ZGVzKCduZW8tdHJlZWxpc3QtbWVudS1pdGVtJykpIHtcbiAgICAgICAgICAgIHRoaXMub25NZW51SXRlbUNsaWNrKGRhdGEudGFyZ2V0LmNscyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdXBlci5vbkNsaWNrKGRhdGEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqL1xuICAgIG9uSXRlbUNsaWNrKGRhdGEpIHtcbiAgICAgICAgbGV0IG1lICAgID0gdGhpcyxcbiAgICAgICAgICAgIHZkb20gID0gbWUudmRvbSxcbiAgICAgICAgICAgIGl0ZW1zID0gbWUuc3RvcmUuaXRlbXMsXG4gICAgICAgICAgICBpICAgICA9IDAsXG4gICAgICAgICAgICBsZW4gICA9IGl0ZW1zLmxlbmd0aCxcbiAgICAgICAgICAgIHBhdGggID0gZGF0YS5wYXRoLm1hcChlID0+IGUuaWQpLFxuICAgICAgICAgICAgaXRlbSwgcmVjb3JkLCB0bXBJdGVtLCB2bm9kZUlkO1xuXG4gICAgICAgIGZvciAoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIHRtcEl0ZW0gPSBpdGVtc1tpXTtcbiAgICAgICAgICAgIHZub2RlSWQgPSBtZS5nZXRJdGVtSWQodG1wSXRlbS5pZCk7XG5cbiAgICAgICAgICAgIGlmIChwYXRoLmluY2x1ZGVzKHZub2RlSWQpKSB7XG4gICAgICAgICAgICAgICAgcmVjb3JkID0gdG1wSXRlbTtcbiAgICAgICAgICAgICAgICBpdGVtICAgPSBtZS5nZXRWZG9tQ2hpbGQodm5vZGVJZCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXRlbSkge1xuICAgICAgICAgICAgaWYgKGl0ZW0uY2xzICYmIGl0ZW0uY2xzLmluY2x1ZGVzKCduZW8tbGlzdC1mb2xkZXInKSkge1xuICAgICAgICAgICAgICAgIE5lb0FycmF5LnRvZ2dsZShpdGVtLmNscywgJ25lby1mb2xkZXItb3BlbicpO1xuICAgICAgICAgICAgICAgIG1lLnZkb20gPSB2ZG9tO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBtZS5vbkxlYWZJdGVtQ2xpY2socmVjb3JkKTtcblxuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIFRoZSBsZWFmSXRlbUNsaWNrIGV2ZW50IGZpcmVzIHdoZW4gYSBjbGljayBvY2N1cnMgb24gYSBsaXN0IGl0ZW0gd2hpY2ggZG9lcyBub3QgaGF2ZSBjaGlsZCBpdGVtcy5cbiAgICAgICAgICAgICAgICAgKiBQYXNzZXMgdGhlIGl0ZW0gcmVjb3JkIHRvIHRoZSBldmVudCBoYW5kbGVyLlxuICAgICAgICAgICAgICAgICAqIEBldmVudCBsZWFmSXRlbUNsaWNrXG4gICAgICAgICAgICAgICAgICogQHJldHVybnMge09iamVjdH0gcmVjb3JkXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgbWUuZmlyZSgnbGVhZkl0ZW1DbGljaycsIHJlY29yZCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHN1cGVyLm9uSXRlbUNsaWNrKGRhdGEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGxhY2Vob2xkZXIgbWV0aG9kXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHJlY29yZFxuICAgICAqL1xuICAgIG9uTGVhZkl0ZW1DbGljayhyZWNvcmQpIHtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdHJpZ2dlcmVkIGJ5IGNsaWNrcyBvbiB0aGUgY29sbGFwc2Ugb3IgZXhwYW5kIGFsbCBpY29uc1xuICAgICAqIEBwYXJhbSB7QXJyYXl9IGNsc1xuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBvbk1lbnVJdGVtQ2xpY2soY2xzKSB7XG4gICAgICAgIGlmIChjbHMuaW5jbHVkZXMoJ25lby10cmVlbGlzdC1jb2xsYXBzZS1hbGwtaWNvbicpKSB7XG4gICAgICAgICAgICB0aGlzLmNvbGxhcHNlQWxsKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmV4cGFuZEFsbCgpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5OZW8uYXBwbHlDbGFzc0NvbmZpZyhUcmVlKTtcblxuZXhwb3J0IHtUcmVlIGFzIGRlZmF1bHR9OyIsImltcG9ydCBCYXNlIGZyb20gJy4uL2NvcmUvQmFzZS5tanMnO1xuXG4vKipcbiAqIEBjbGFzcyBOZW8udXRpbC5GdW5jdGlvblxuICogQGV4dGVuZHMgTmVvLmNvcmUuQmFzZVxuICovXG5jbGFzcyBOZW9GdW5jdGlvbiBleHRlbmRzIEJhc2Uge1xuICAgIHN0YXRpYyBnZXRDb25maWcoKSB7cmV0dXJuIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gY2xhc3NOYW1lPSdOZW8udXRpbC5GdW5jdGlvbidcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgY2xhc3NOYW1lOiAnTmVvLnV0aWwuRnVuY3Rpb24nXG4gICAgfX1cblxuICAgIC8qKlxuICAgICAqIEFwcGVuZCBhcmdzIGluc3RlYWQgb2YgcHJlcGVuZGluZyB0aGVtXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHNjb3BlXG4gICAgICogQHJldHVybnMge0Z1bmN0aW9ufVxuICAgICAqL1xuICAgIHN0YXRpYyBiaW5kQXBwZW5kKHNjb3BlKSB7XG4gICAgICAgIGNvbnN0IGZuICAgPSB0aGlzLFxuICAgICAgICAgICAgICBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMpLnNsaWNlKDEpO1xuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBmbi5hcHBseShzY29wZSwgW10uc2xpY2UuY2FsbChhcmd1bWVudHMpLmNvbmNhdChhcmdzKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7TmVvLmNvcmUuQmFzZX0gdGFyZ2V0XG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG1ldGhvZE5hbWVcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBzY29wZVxuICAgICAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAgICAgKi9cbiAgICBzdGF0aWMgY3JlYXRlU2VxdWVuY2UodGFyZ2V0LCBtZXRob2ROYW1lLCBmbiwgc2NvcGUpIHtcbiAgICAgICAgbGV0IG1ldGhvZCA9IHRhcmdldFttZXRob2ROYW1lXSB8fCBOZW8uZW1wdHlGbjtcblxuICAgICAgICByZXR1cm4gKHRhcmdldFttZXRob2ROYW1lXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbWV0aG9kLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICByZXR1cm4gZm4uYXBwbHkoc2NvcGUgfHwgdGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge05lby5jb3JlLkJhc2V9IHRhcmdldFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBtZXRob2ROYW1lXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gc2NvcGVcbiAgICAgKiBAcmV0dXJucyB7RnVuY3Rpb259XG4gICAgICovXG4gICAgc3RhdGljIGludGVyY2VwdCh0YXJnZXQsIG1ldGhvZE5hbWUsIGZuLCBzY29wZSkge1xuICAgICAgICBsZXQgbWV0aG9kID0gdGFyZ2V0W21ldGhvZE5hbWVdIHx8IE5lby5lbXB0eUZuO1xuXG4gICAgICAgIHJldHVybiAodGFyZ2V0W21ldGhvZE5hbWVdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgcmV0dXJuVmFsdWUgPSBmbi5hcHBseShzY29wZSB8fCB0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgbWV0aG9kLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICAgICAgICAgIHJldHVybiByZXR1cm5WYWx1ZTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5OZW8uYXBwbHlDbGFzc0NvbmZpZyhOZW9GdW5jdGlvbik7XG5cbmV4cG9ydCBkZWZhdWx0IE5lb0Z1bmN0aW9uOyJdLCJzb3VyY2VSb290IjoiIn0=