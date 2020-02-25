(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  global.accordion = factory();
}(typeof self !== 'undefined' ? self : this, function () { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  /**
   * Private Variables
   */
  var className = "js-".concat(vl.ns, "accordion"),
      acOpenClassName = "".concat(className, "--open"),
      acToggleClassName = "".concat(className, "__toggle"),
      acToggleTextClassName = ".".concat(acToggleClassName, "__text"),
      acDisabledClassName = "".concat(vl.ns, "step--disabled"),
      acIconPlus = "".concat(vl.ns, "vi-plus"),
      acIconMin = "".concat(vl.ns, "vi-minus"),
      acContentClassName = "".concat(vl.ns, "accordion__content"),
      dataPrefix = "data-".concat(vl.ns),
      acAtt = "".concat(dataPrefix, "accordion"),
      acDressedAtt = "".concat(acAtt, "-dressed"),
      acToggleAtt = "".concat(acAtt, "-toggle");

  var Accordion =
  /*#__PURE__*/
  function () {
    function Accordion() {
      _classCallCheck(this, Accordion);
    }

    _createClass(Accordion, [{
      key: "_listenToHash",

      /**
       * listener for hash in url
       * @param  {DOM element} Accordion element
       * @return {false}
       */
      value: function _listenToHash(element) {
        if (window.location.hash && element.hasAttribute('id')) {
          if ("#".concat(element.getAttribute('id')) === window.location.hash) {
            this.open(element);
          }
        }
      }
      /**
       * open the accordion
       * @param  {DOM element} Accordion element
       * @return {false}
       */

    }, {
      key: "open",
      value: function open(element) {
        const toggle = element.querySelector(`[${acToggleAtt}]`);
        if (toggle && !vl.util.hasClass(element, acOpenClassName)) {
          toggle.click();
        }
      }
      /**
       * close the accordion
       * @param  {DOM element} Accordion element
       * @return {false}
       */

    }, {
      key: "close",
      value: function close(element) {
        const toggle = element.querySelector(`[${acToggleAtt}]`);
        if (toggle && vl.util.hasClass(element, acOpenClassName)) {
          toggle.click();
        }
      }
      /**
       * toggle the accordion
       * @param  {DOM element} Accordion element
       * @return {false}
       */

    }, {
      key: "toggle",
      value: function toggle(element) {
        const toggle = element.querySelector(`[${acToggleAtt}]`);
        if (toggle) toggle.click();
      }
      /**
       * dress function for the accordion functionality
       * @param  {DOM element} element
       * @return {false}
       */

    }, {
      key: "dress",
      value: function dress(element) {
        var _this = this;

        var toggle,
            accordion,
            accordionContent,
            closedText,
            openText,
            accordionId = element.getAttribute('id') || vl.util.uniqueId(),
            hiddenState = true;
        element.setAttribute(acDressedAtt, true);
        toggle = element.querySelector(acToggleTextClassName);
        accordion = element.closest(".".concat(className, ", [").concat(acAtt, "]"));
        accordionContent = accordion.querySelector(".".concat(acContentClassName));

        if (vl.util.exists(accordionContent)) {
          accordionContent.setAttribute('aria-hidden', hiddenState);
          element.setAttribute('aria-expanded', false);
        }

        if (toggle) {
          closedText = toggle.dataset.vlAccordionCloseText;
          openText = toggle.dataset.vlAccordionOpenText;

          if (vl.util.hasClass(element, acOpenClassName)) {
            toggle.innerHTML = closedText;
          } else {
            toggle.innerHTML = openText;
          }

          toggle.setAttribute('id', accordionId);
        }

        element.addEventListener('click', function (event) {
          var accordion;
          event.preventDefault();
          accordion = event.target.closest(".".concat(className, ", [").concat(acAtt, "]"));

          if (!vl.util.hasClass(element, acDisabledClassName)) {
            hiddenState = !hiddenState;
            vl.util.toggleClass(accordion, acOpenClassName);
            element.setAttribute('aria-expanded', !hiddenState);
            var openEvent = new CustomEvent('vl.accordion.hook.onChange', {
              detail: !hiddenState,
              target: accordion
            }),
                icon = element.querySelector('.vl-vi');
            accordion.dispatchEvent(openEvent);

            if (icon && vl.util.hasClass(icon, acIconPlus)) {
              vl.util.removeClass(icon, acIconPlus);
              vl.util.addClass(icon, acIconMin);
            } else if (icon && vl.util.hasClass(icon, acIconMin)) {
              vl.util.removeClass(icon, acIconMin);
              vl.util.addClass(icon, acIconPlus);
            }

            if (vl.util.exists(accordionContent)) {
              accordionContent.setAttribute('aria-hidden', hiddenState);
            }

            if (toggle) {
              if (vl.util.hasClass(accordion, acOpenClassName)) {
                toggle.innerHTML = toggle.dataset.vlAccordionCloseText;
              } else {
                toggle.innerHTML = toggle.dataset.vlAccordionOpenText;
              }
            }
          }
        }, false);

        this._listenToHash(element);

        window.addEventListener('hashchange', function () {
          _this._listenToHash(element);
        });
      }
      /**
       * dressAll function for the accordion functionality
       * @return {false}
       */

    }, {
      key: "dressAll",
      value: function dressAll() {
        var _this2 = this;

        // get all accordion toggle elements
        var elements = document.querySelectorAll("\n      .".concat(className, ":not([data-vl-js-dress=\"false\"]) .").concat(acToggleClassName, ":not([").concat(acDressedAtt, "]),\n      [").concat(acAtt, "]:not([data-").concat(vl.ns, "js-dress=\"false\"]) [").concat(acToggleAtt, "]:not([").concat(acDressedAtt, "])\n    ")); // add functionality to the accordions

        vl.util.each(elements, function (element) {
          _this2.dress(element);
        });
      }
    }]);

    return Accordion;
  }();

  if (!('accordion' in vl)) {
    vl.accordion = new Accordion();
    document.addEventListener('DOMContentLoaded', function () {
      vl.accordion.dressAll();
    });
  }

  return Accordion;

}));
