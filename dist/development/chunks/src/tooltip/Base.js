(self["webpackChunkmyapp"] = self["webpackChunkmyapp"] || []).push([["src/tooltip/Base"],{

/***/ "./node_modules/neo.mjs/src/tooltip/Base.mjs":
/*!***************************************************!*\
  !*** ./node_modules/neo.mjs/src/tooltip/Base.mjs ***!
  \***************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ Base
/* harmony export */ });
/* harmony import */ var _container_Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../container/Base.mjs */ "./node_modules/neo.mjs/src/container/Base.mjs");
/* harmony import */ var _util_Floating_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/Floating.mjs */ "./node_modules/neo.mjs/src/util/Floating.mjs");
/* harmony import */ var _component_Label_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../component/Label.mjs */ "./node_modules/neo.mjs/src/component/Label.mjs");




/**
 * Base class for component tooltips
 * @class Neo.tooltip.Base
 * @extends Neo.container.Base
 */
class Base extends _container_Base_mjs__WEBPACK_IMPORTED_MODULE_0__.default {
    static getConfig() {return {
        /**
         * @member {String} className='Neo.tooltip.Base'
         * @protected
         */
        className: 'Neo.tooltip.Base',
        /**
         * @member {String} ntype='tooltip'
         * @protected
         */
        ntype: 'tooltip',
        /**
         * @member {String[]} cls=['neo-tooltip']
         */
        cls: ['neo-tooltip'],
        /**
         * A reference to the target component which is supposed to show this tooltip on mouseenter
         * @member {String|null} componentId_=null
         */
        componentId_: null,
        /**
         * Delegates down to a CSS selector inside the target component
         * @member {String|null} delegate=null
         */
        delegate: null,
        /**
         * The delay in ms before the tooltip gets hidden while hovering the target element.
         * Use null to disable the dismiss logic.
         * @member {Number|null} dismissDelay=10000
         */
        dismissDelay: 10000,
        /**
         * The dismissDelay task id generated by setTimeout()
         * @member {Number|null} dismissDelayTaskId=null
         * @protected
         */
        dismissDelayTaskId: null,
        /**
         * The delay in ms before the tooltip gets shown
         * @member {Number|null} hideDelay=400
         */
        hideDelay: 400,
        /**
         * The showDelay task id generated by setTimeout()
         * @member {Number|null} hideDelayTaskId=null
         * @protected
         */
        hideDelayTaskId: null,
        /**
         * @member {Array} mixins
         * @protected
         */
        mixins: [_util_Floating_mjs__WEBPACK_IMPORTED_MODULE_1__.default],
        /**
         * The delay in ms before the tooltip gets shown
         * @member {Number|null} showDelay=200
         */
        showDelay: 200,
        /**
         * The showDelay task id generated by setTimeout()
         * @member {Number|null} showDelayTaskId=null
         * @protected
         */
        showDelayTaskId: null,
        /**
         * True prevents the tooltip from hiding while the mouse cursor is above it
         * @member {Boolean|null} stayOnHover_=true
         */
        stayOnHover_: true,
        /**
         * Shortcut to add a label item
         * @member {String} text_=null
         */
        text_: null
    }}

    /**
     * Triggered after the componentId config got changed
     * @param {String} value
     * @param {String} oldValue
     * @protected
     */
    afterSetComponentId(value, oldValue) {
        if (oldValue) {
            // todo: remove the component domListeners
        }

        if (value) {
            let me           = this,
                component    = Neo.getComponent(value),
                domListeners = component.domListeners || [];

            domListeners.push({
                mouseenter: me.showDelayed,
                delegate  : me.delegate,
                scope     : me
            }, {
                mouseleave: me.hideDelayed,
                delegate  : me.delegate,
                scope     : me
            });

            component.domListeners = domListeners;
        }
    }

    /**
     * Triggered after the stayOnHover config got changed
     * @param {Boolean} value
     * @param {Boolean} oldValue
     * @protected
     */
    afterSetStayOnHover(value, oldValue) {
        if (oldValue) {
            // todo: remove the component domListeners
        }

        if (value) {
            let me           = this,
                domListeners = me.domListeners || [];

            domListeners.push(
                {mouseenter: me.onMouseEnter, scope: me},
                {mouseleave: me.onMouseLeave, scope: me}
            );

            me.domListeners = domListeners;
        }
    }

    /**
     * Triggered after the text config got changed
     * @param {Boolean} value
     * @param {Boolean} oldValue
     * @protected
     */
    afterSetText(value) {
        if (value) {
            let me    = this,
                items = me.items || [],
                item  = items[0];

            if (item && item.ntype === 'label') {
                item.text = value;
            } else {
                items.push({
                    module: _component_Label_mjs__WEBPACK_IMPORTED_MODULE_2__.default,
                    text  : value
                });

                me.items = items;
            }
        }
    }

    /**
     * Clears one or multiple setTimeout call(s)
     * @param {String[]|String} timers valid values: dismiss, hide, show
     */
    clearTimeout(timers) {
        if (!Array.isArray(timers)) {
            timers = [timers];
        }

        let me = this,
            id;

        timers.forEach(timer => {
            id = timer + 'DelayTaskId';

            if (me[id]) {
                clearTimeout(me[id]);
                me[id] = null;
            }
        });
    }

    /**
     * Instantly hides the tooltip
     * @param {Object|null} data
     */
    hide(data) {
        let me = this;

        me.clearTimeout(['dismiss', 'hide', 'show']);

        if (me.mounted) {
            me.unmount();
        }
    }

    /**
     * Hides the tooltip using the given hideDelay
     * @param {Object|null} data
     */
    hideDelayed(data) {
        let me = this;

        if (me.hideDelay) {
            me.hideDelayTaskId = setTimeout(me.hide.bind(me), me.hideDelay, data);
        } else {
            me.hide(data);
        }
    }

    /**
     * mouseenter event listener for the tooltip element
     * @param {Object} data
     */
    onMouseEnter(data) {
        let me       = this,
            targetId = data.path[0].id;

        // only use path[0] based events to ignore mouseenter & leave for child nodes
        if (me.id === targetId) {
            me.clearTimeout(['dismiss', 'hide']);
        }
    }

    /**
     * mouseleave event listener for the tooltip element
     * @param {Object} data
     */
    onMouseLeave(data) {
        let me       = this,
            targetId = data.path[0].id;

        // only use path[0] based events to ignore mouseenter & leave for child nodes
        if (me.id === targetId) {
            me.hideDelayed(null);
        }
    }

    /**
     * Instantly shows the tooltip
     * @param {Object} data
     */
    show(data) {
        let me = this;

        me.showDelayTaskId = null;

        me.clearTimeout('hide');

        if (me.dismissDelay) {
            me.dismissDelayTaskId = setTimeout(me.hide.bind(me), me.dismissDelay, data);
        }

        if (!me.mounted) {
            me.mount();
        }
    }

    /**
     * Shows the tooltip using the given showDelay
     * @param {Object} data
     */
    showDelayed(data) {
        let me = this;

        if (me.showDelay) {
            me.showDelayTaskId = setTimeout(me.show.bind(me), me.showDelay, data);
        } else {
            me.show(data);
        }
    }
}

Neo.applyClassConfig(Base);



/***/ }),

/***/ "./node_modules/neo.mjs/src/util/Floating.mjs":
/*!****************************************************!*\
  !*** ./node_modules/neo.mjs/src/util/Floating.mjs ***!
  \****************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _core_Base_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Base.mjs */ "./node_modules/neo.mjs/src/core/Base.mjs");


/**
 * Mixin to make Components floating (e.g. Windows)
 * @class Neo.util.Floating
 * @extends Neo.core.Base
 */
class Floating extends _core_Base_mjs__WEBPACK_IMPORTED_MODULE_0__.default {
    static getConfig() {return {
        /**
         * @member {String} className='Neo.util.Floating'
         * @protected
         */
        className: 'Neo.util.Floating',
        /**
         * @member {String} ntype='mixin-floating'
         * @protected
         */
        ntype: 'mixin-floating',
        /**
         * @member {Boolean} mixin=true
         */
        mixin: true,
        /**
         * @member {String|null} animateTargetId=null
         */
        animateTargetId: null,
        /**
         * @member {Boolean} modal=false
         */
        modal: false
    }}
}

Neo.applyClassConfig(Floating);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Floating);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9teWFwcC8uL25vZGVfbW9kdWxlcy9uZW8ubWpzL3NyYy90b29sdGlwL0Jhc2UubWpzIiwid2VicGFjazovL215YXBwLy4vbm9kZV9tb2R1bGVzL25lby5tanMvc3JjL3V0aWwvRmxvYXRpbmcubWpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQThDO0FBQ0Q7QUFDRTs7QUFFL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix3REFBUztBQUM1Qix3QkFBd0I7QUFDeEI7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFNBQVM7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsWUFBWTtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixZQUFZO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsWUFBWTtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixZQUFZO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsWUFBWTtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixZQUFZO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLE1BQU07QUFDMUI7QUFDQTtBQUNBLGlCQUFpQix1REFBUTtBQUN6QjtBQUNBO0FBQ0Esb0JBQW9CLFlBQVk7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsWUFBWTtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGFBQWE7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLFFBQVE7QUFDdkIsZUFBZSxRQUFRO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpQkFBaUIsdUNBQXVDO0FBQ3hELGlCQUFpQjtBQUNqQjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsUUFBUTtBQUN2QixlQUFlLFFBQVE7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLDRCQUE0Qix5REFBSztBQUNqQztBQUNBLGlCQUFpQjs7QUFFakI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsZ0JBQWdCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQSxlQUFlLFlBQVk7QUFDM0I7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLFlBQVk7QUFDM0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0Um9DOztBQUVwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLG1EQUFJO0FBQzNCLHdCQUF3QjtBQUN4QjtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsUUFBUTtBQUM1QjtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsWUFBWTtBQUNoQztBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsUUFBUTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxpRUFBZSxRQUFRLEUiLCJmaWxlIjoiY2h1bmtzL3NyYy90b29sdGlwL0Jhc2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29udGFpbmVyIGZyb20gJy4uL2NvbnRhaW5lci9CYXNlLm1qcyc7XG5pbXBvcnQgRmxvYXRpbmcgIGZyb20gJy4uL3V0aWwvRmxvYXRpbmcubWpzJztcbmltcG9ydCBMYWJlbCAgICAgZnJvbSAnLi4vY29tcG9uZW50L0xhYmVsLm1qcyc7XG5cbi8qKlxuICogQmFzZSBjbGFzcyBmb3IgY29tcG9uZW50IHRvb2x0aXBzXG4gKiBAY2xhc3MgTmVvLnRvb2x0aXAuQmFzZVxuICogQGV4dGVuZHMgTmVvLmNvbnRhaW5lci5CYXNlXG4gKi9cbmNsYXNzIEJhc2UgZXh0ZW5kcyBDb250YWluZXIge1xuICAgIHN0YXRpYyBnZXRDb25maWcoKSB7cmV0dXJuIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gY2xhc3NOYW1lPSdOZW8udG9vbHRpcC5CYXNlJ1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBjbGFzc05hbWU6ICdOZW8udG9vbHRpcC5CYXNlJyxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gbnR5cGU9J3Rvb2x0aXAnXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIG50eXBlOiAndG9vbHRpcCcsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmdbXX0gY2xzPVsnbmVvLXRvb2x0aXAnXVxuICAgICAgICAgKi9cbiAgICAgICAgY2xzOiBbJ25lby10b29sdGlwJ10sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBIHJlZmVyZW5jZSB0byB0aGUgdGFyZ2V0IGNvbXBvbmVudCB3aGljaCBpcyBzdXBwb3NlZCB0byBzaG93IHRoaXMgdG9vbHRpcCBvbiBtb3VzZWVudGVyXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ3xudWxsfSBjb21wb25lbnRJZF89bnVsbFxuICAgICAgICAgKi9cbiAgICAgICAgY29tcG9uZW50SWRfOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogRGVsZWdhdGVzIGRvd24gdG8gYSBDU1Mgc2VsZWN0b3IgaW5zaWRlIHRoZSB0YXJnZXQgY29tcG9uZW50XG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ3xudWxsfSBkZWxlZ2F0ZT1udWxsXG4gICAgICAgICAqL1xuICAgICAgICBkZWxlZ2F0ZTogbnVsbCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBkZWxheSBpbiBtcyBiZWZvcmUgdGhlIHRvb2x0aXAgZ2V0cyBoaWRkZW4gd2hpbGUgaG92ZXJpbmcgdGhlIHRhcmdldCBlbGVtZW50LlxuICAgICAgICAgKiBVc2UgbnVsbCB0byBkaXNhYmxlIHRoZSBkaXNtaXNzIGxvZ2ljLlxuICAgICAgICAgKiBAbWVtYmVyIHtOdW1iZXJ8bnVsbH0gZGlzbWlzc0RlbGF5PTEwMDAwXG4gICAgICAgICAqL1xuICAgICAgICBkaXNtaXNzRGVsYXk6IDEwMDAwLFxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGRpc21pc3NEZWxheSB0YXNrIGlkIGdlbmVyYXRlZCBieSBzZXRUaW1lb3V0KClcbiAgICAgICAgICogQG1lbWJlciB7TnVtYmVyfG51bGx9IGRpc21pc3NEZWxheVRhc2tJZD1udWxsXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIGRpc21pc3NEZWxheVRhc2tJZDogbnVsbCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBkZWxheSBpbiBtcyBiZWZvcmUgdGhlIHRvb2x0aXAgZ2V0cyBzaG93blxuICAgICAgICAgKiBAbWVtYmVyIHtOdW1iZXJ8bnVsbH0gaGlkZURlbGF5PTQwMFxuICAgICAgICAgKi9cbiAgICAgICAgaGlkZURlbGF5OiA0MDAsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgc2hvd0RlbGF5IHRhc2sgaWQgZ2VuZXJhdGVkIGJ5IHNldFRpbWVvdXQoKVxuICAgICAgICAgKiBAbWVtYmVyIHtOdW1iZXJ8bnVsbH0gaGlkZURlbGF5VGFza0lkPW51bGxcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgaGlkZURlbGF5VGFza0lkOiBudWxsLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7QXJyYXl9IG1peGluc1xuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBtaXhpbnM6IFtGbG9hdGluZ10sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgZGVsYXkgaW4gbXMgYmVmb3JlIHRoZSB0b29sdGlwIGdldHMgc2hvd25cbiAgICAgICAgICogQG1lbWJlciB7TnVtYmVyfG51bGx9IHNob3dEZWxheT0yMDBcbiAgICAgICAgICovXG4gICAgICAgIHNob3dEZWxheTogMjAwLFxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIHNob3dEZWxheSB0YXNrIGlkIGdlbmVyYXRlZCBieSBzZXRUaW1lb3V0KClcbiAgICAgICAgICogQG1lbWJlciB7TnVtYmVyfG51bGx9IHNob3dEZWxheVRhc2tJZD1udWxsXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIHNob3dEZWxheVRhc2tJZDogbnVsbCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRydWUgcHJldmVudHMgdGhlIHRvb2x0aXAgZnJvbSBoaWRpbmcgd2hpbGUgdGhlIG1vdXNlIGN1cnNvciBpcyBhYm92ZSBpdFxuICAgICAgICAgKiBAbWVtYmVyIHtCb29sZWFufG51bGx9IHN0YXlPbkhvdmVyXz10cnVlXG4gICAgICAgICAqL1xuICAgICAgICBzdGF5T25Ib3Zlcl86IHRydWUsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTaG9ydGN1dCB0byBhZGQgYSBsYWJlbCBpdGVtXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gdGV4dF89bnVsbFxuICAgICAgICAgKi9cbiAgICAgICAgdGV4dF86IG51bGxcbiAgICB9fVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkIGFmdGVyIHRoZSBjb21wb25lbnRJZCBjb25maWcgZ290IGNoYW5nZWRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdmFsdWVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gb2xkVmFsdWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgYWZ0ZXJTZXRDb21wb25lbnRJZCh2YWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgaWYgKG9sZFZhbHVlKSB7XG4gICAgICAgICAgICAvLyB0b2RvOiByZW1vdmUgdGhlIGNvbXBvbmVudCBkb21MaXN0ZW5lcnNcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgbGV0IG1lICAgICAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICAgICAgY29tcG9uZW50ICAgID0gTmVvLmdldENvbXBvbmVudCh2YWx1ZSksXG4gICAgICAgICAgICAgICAgZG9tTGlzdGVuZXJzID0gY29tcG9uZW50LmRvbUxpc3RlbmVycyB8fCBbXTtcblxuICAgICAgICAgICAgZG9tTGlzdGVuZXJzLnB1c2goe1xuICAgICAgICAgICAgICAgIG1vdXNlZW50ZXI6IG1lLnNob3dEZWxheWVkLFxuICAgICAgICAgICAgICAgIGRlbGVnYXRlICA6IG1lLmRlbGVnYXRlLFxuICAgICAgICAgICAgICAgIHNjb3BlICAgICA6IG1lXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgbW91c2VsZWF2ZTogbWUuaGlkZURlbGF5ZWQsXG4gICAgICAgICAgICAgICAgZGVsZWdhdGUgIDogbWUuZGVsZWdhdGUsXG4gICAgICAgICAgICAgICAgc2NvcGUgICAgIDogbWVcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBjb21wb25lbnQuZG9tTGlzdGVuZXJzID0gZG9tTGlzdGVuZXJzO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkIGFmdGVyIHRoZSBzdGF5T25Ib3ZlciBjb25maWcgZ290IGNoYW5nZWRcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IHZhbHVlXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBvbGRWYWx1ZVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBhZnRlclNldFN0YXlPbkhvdmVyKHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICBpZiAob2xkVmFsdWUpIHtcbiAgICAgICAgICAgIC8vIHRvZG86IHJlbW92ZSB0aGUgY29tcG9uZW50IGRvbUxpc3RlbmVyc1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICBsZXQgbWUgICAgICAgICAgID0gdGhpcyxcbiAgICAgICAgICAgICAgICBkb21MaXN0ZW5lcnMgPSBtZS5kb21MaXN0ZW5lcnMgfHwgW107XG5cbiAgICAgICAgICAgIGRvbUxpc3RlbmVycy5wdXNoKFxuICAgICAgICAgICAgICAgIHttb3VzZWVudGVyOiBtZS5vbk1vdXNlRW50ZXIsIHNjb3BlOiBtZX0sXG4gICAgICAgICAgICAgICAge21vdXNlbGVhdmU6IG1lLm9uTW91c2VMZWF2ZSwgc2NvcGU6IG1lfVxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgbWUuZG9tTGlzdGVuZXJzID0gZG9tTGlzdGVuZXJzO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkIGFmdGVyIHRoZSB0ZXh0IGNvbmZpZyBnb3QgY2hhbmdlZFxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gdmFsdWVcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IG9sZFZhbHVlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGFmdGVyU2V0VGV4dCh2YWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIGxldCBtZSAgICA9IHRoaXMsXG4gICAgICAgICAgICAgICAgaXRlbXMgPSBtZS5pdGVtcyB8fCBbXSxcbiAgICAgICAgICAgICAgICBpdGVtICA9IGl0ZW1zWzBdO1xuXG4gICAgICAgICAgICBpZiAoaXRlbSAmJiBpdGVtLm50eXBlID09PSAnbGFiZWwnKSB7XG4gICAgICAgICAgICAgICAgaXRlbS50ZXh0ID0gdmFsdWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGl0ZW1zLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBtb2R1bGU6IExhYmVsLFxuICAgICAgICAgICAgICAgICAgICB0ZXh0ICA6IHZhbHVlXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBtZS5pdGVtcyA9IGl0ZW1zO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2xlYXJzIG9uZSBvciBtdWx0aXBsZSBzZXRUaW1lb3V0IGNhbGwocylcbiAgICAgKiBAcGFyYW0ge1N0cmluZ1tdfFN0cmluZ30gdGltZXJzIHZhbGlkIHZhbHVlczogZGlzbWlzcywgaGlkZSwgc2hvd1xuICAgICAqL1xuICAgIGNsZWFyVGltZW91dCh0aW1lcnMpIHtcbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHRpbWVycykpIHtcbiAgICAgICAgICAgIHRpbWVycyA9IFt0aW1lcnNdO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG1lID0gdGhpcyxcbiAgICAgICAgICAgIGlkO1xuXG4gICAgICAgIHRpbWVycy5mb3JFYWNoKHRpbWVyID0+IHtcbiAgICAgICAgICAgIGlkID0gdGltZXIgKyAnRGVsYXlUYXNrSWQnO1xuXG4gICAgICAgICAgICBpZiAobWVbaWRdKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KG1lW2lkXSk7XG4gICAgICAgICAgICAgICAgbWVbaWRdID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW5zdGFudGx5IGhpZGVzIHRoZSB0b29sdGlwXG4gICAgICogQHBhcmFtIHtPYmplY3R8bnVsbH0gZGF0YVxuICAgICAqL1xuICAgIGhpZGUoZGF0YSkge1xuICAgICAgICBsZXQgbWUgPSB0aGlzO1xuXG4gICAgICAgIG1lLmNsZWFyVGltZW91dChbJ2Rpc21pc3MnLCAnaGlkZScsICdzaG93J10pO1xuXG4gICAgICAgIGlmIChtZS5tb3VudGVkKSB7XG4gICAgICAgICAgICBtZS51bm1vdW50KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIaWRlcyB0aGUgdG9vbHRpcCB1c2luZyB0aGUgZ2l2ZW4gaGlkZURlbGF5XG4gICAgICogQHBhcmFtIHtPYmplY3R8bnVsbH0gZGF0YVxuICAgICAqL1xuICAgIGhpZGVEZWxheWVkKGRhdGEpIHtcbiAgICAgICAgbGV0IG1lID0gdGhpcztcblxuICAgICAgICBpZiAobWUuaGlkZURlbGF5KSB7XG4gICAgICAgICAgICBtZS5oaWRlRGVsYXlUYXNrSWQgPSBzZXRUaW1lb3V0KG1lLmhpZGUuYmluZChtZSksIG1lLmhpZGVEZWxheSwgZGF0YSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtZS5oaWRlKGRhdGEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogbW91c2VlbnRlciBldmVudCBsaXN0ZW5lciBmb3IgdGhlIHRvb2x0aXAgZWxlbWVudFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICovXG4gICAgb25Nb3VzZUVudGVyKGRhdGEpIHtcbiAgICAgICAgbGV0IG1lICAgICAgID0gdGhpcyxcbiAgICAgICAgICAgIHRhcmdldElkID0gZGF0YS5wYXRoWzBdLmlkO1xuXG4gICAgICAgIC8vIG9ubHkgdXNlIHBhdGhbMF0gYmFzZWQgZXZlbnRzIHRvIGlnbm9yZSBtb3VzZWVudGVyICYgbGVhdmUgZm9yIGNoaWxkIG5vZGVzXG4gICAgICAgIGlmIChtZS5pZCA9PT0gdGFyZ2V0SWQpIHtcbiAgICAgICAgICAgIG1lLmNsZWFyVGltZW91dChbJ2Rpc21pc3MnLCAnaGlkZSddKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIG1vdXNlbGVhdmUgZXZlbnQgbGlzdGVuZXIgZm9yIHRoZSB0b29sdGlwIGVsZW1lbnRcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgICAqL1xuICAgIG9uTW91c2VMZWF2ZShkYXRhKSB7XG4gICAgICAgIGxldCBtZSAgICAgICA9IHRoaXMsXG4gICAgICAgICAgICB0YXJnZXRJZCA9IGRhdGEucGF0aFswXS5pZDtcblxuICAgICAgICAvLyBvbmx5IHVzZSBwYXRoWzBdIGJhc2VkIGV2ZW50cyB0byBpZ25vcmUgbW91c2VlbnRlciAmIGxlYXZlIGZvciBjaGlsZCBub2Rlc1xuICAgICAgICBpZiAobWUuaWQgPT09IHRhcmdldElkKSB7XG4gICAgICAgICAgICBtZS5oaWRlRGVsYXllZChudWxsKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEluc3RhbnRseSBzaG93cyB0aGUgdG9vbHRpcFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAgICovXG4gICAgc2hvdyhkYXRhKSB7XG4gICAgICAgIGxldCBtZSA9IHRoaXM7XG5cbiAgICAgICAgbWUuc2hvd0RlbGF5VGFza0lkID0gbnVsbDtcblxuICAgICAgICBtZS5jbGVhclRpbWVvdXQoJ2hpZGUnKTtcblxuICAgICAgICBpZiAobWUuZGlzbWlzc0RlbGF5KSB7XG4gICAgICAgICAgICBtZS5kaXNtaXNzRGVsYXlUYXNrSWQgPSBzZXRUaW1lb3V0KG1lLmhpZGUuYmluZChtZSksIG1lLmRpc21pc3NEZWxheSwgZGF0YSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIW1lLm1vdW50ZWQpIHtcbiAgICAgICAgICAgIG1lLm1vdW50KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTaG93cyB0aGUgdG9vbHRpcCB1c2luZyB0aGUgZ2l2ZW4gc2hvd0RlbGF5XG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICAgKi9cbiAgICBzaG93RGVsYXllZChkYXRhKSB7XG4gICAgICAgIGxldCBtZSA9IHRoaXM7XG5cbiAgICAgICAgaWYgKG1lLnNob3dEZWxheSkge1xuICAgICAgICAgICAgbWUuc2hvd0RlbGF5VGFza0lkID0gc2V0VGltZW91dChtZS5zaG93LmJpbmQobWUpLCBtZS5zaG93RGVsYXksIGRhdGEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbWUuc2hvdyhkYXRhKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuTmVvLmFwcGx5Q2xhc3NDb25maWcoQmFzZSk7XG5cbmV4cG9ydCB7QmFzZSBhcyBkZWZhdWx0fTsiLCJpbXBvcnQgQmFzZSBmcm9tICcuLi9jb3JlL0Jhc2UubWpzJztcblxuLyoqXG4gKiBNaXhpbiB0byBtYWtlIENvbXBvbmVudHMgZmxvYXRpbmcgKGUuZy4gV2luZG93cylcbiAqIEBjbGFzcyBOZW8udXRpbC5GbG9hdGluZ1xuICogQGV4dGVuZHMgTmVvLmNvcmUuQmFzZVxuICovXG5jbGFzcyBGbG9hdGluZyBleHRlbmRzIEJhc2Uge1xuICAgIHN0YXRpYyBnZXRDb25maWcoKSB7cmV0dXJuIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge1N0cmluZ30gY2xhc3NOYW1lPSdOZW8udXRpbC5GbG9hdGluZydcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgY2xhc3NOYW1lOiAnTmVvLnV0aWwuRmxvYXRpbmcnLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U3RyaW5nfSBudHlwZT0nbWl4aW4tZmxvYXRpbmcnXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIG50eXBlOiAnbWl4aW4tZmxvYXRpbmcnLFxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7Qm9vbGVhbn0gbWl4aW49dHJ1ZVxuICAgICAgICAgKi9cbiAgICAgICAgbWl4aW46IHRydWUsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtTdHJpbmd8bnVsbH0gYW5pbWF0ZVRhcmdldElkPW51bGxcbiAgICAgICAgICovXG4gICAgICAgIGFuaW1hdGVUYXJnZXRJZDogbnVsbCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge0Jvb2xlYW59IG1vZGFsPWZhbHNlXG4gICAgICAgICAqL1xuICAgICAgICBtb2RhbDogZmFsc2VcbiAgICB9fVxufVxuXG5OZW8uYXBwbHlDbGFzc0NvbmZpZyhGbG9hdGluZyk7XG5cbmV4cG9ydCBkZWZhdWx0IEZsb2F0aW5nOyJdLCJzb3VyY2VSb290IjoiIn0=