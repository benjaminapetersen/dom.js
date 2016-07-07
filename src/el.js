// initial implementation
// inspiration drawn from these two resources:
// - http://youmightnotneedjquery.com/
// - https://www.muicss.com jqLite impl
//
// and of course, jQuery!
//
'use strict';

(function() {
  var root = this,
      doc = window.document,
      docReadyQueue = [],
      readyFired = false,
      readyListenerRegistered = false,


      // collection
      // ---------------------------------------------------------
      _each = function(arr, fn) {
        for(var i= 0; i< arr.length; i++) {
          fn(arr[i], i, arr);
        }
      },

      find = function(selector) {
        return doc.querySelectorAll(selector);
      },

      remove = function(el) {
        return el.parentNode.removeChild(el);
      },


      // class manipulation
      // ---------------------------------------------------------

      // internal function for single class addition.
      // public interface allows for multiple
      _addClass = function(elem, className) {
        if(!elem && !className) {
          return;
        }
        if (elem.classList) {
          elem.classList.add(className);
        } else {
            elem.className ?
              elem.className += (' ' + className) :
              elem.className = className;
        }
      },

      addClass = function(elem, classes) {
        if(!elem && !classes) {
          return;
        }
        _each(classes.split(' '), function(item) {
          _addClass(elem, item);
        });
      },

      _removeClass = function(elem, className) {
        if(elem.classList) {
          elem.classList.remove(className);
        } else {
          elem.className = elem.className.replace(new RegExp(className), '').trim();
        }
      },

      removeClass = function(elem, classes) {
        if(!elem && !classes) {
          return;
        }
         _each(classes.split(' '), function(item) {
          _removeClass(elem, item);
        });
      },

      hasClass = function(elem, className) {
        if(!elem && !className) {
          return;
        }
        if(elem.classList) {
          return elem.classList.contains(className);
        }
        elem.className.search(className);
      },

      css = function(elem, prop, val) {
        if(val) {
          return (elem.style[prop] = val);
        }
        if(prop) {
          return getComputedStyle(elem)[prop];
        }
        return getComputedStyle(elem);
      },

      attr = function(elem, attrib, val) {
        if(!val) {
          return elem.getAttribute(attrib);
        }
        elem.setAttribute(attrib, val);
      },

      // convenience
      // ---------------------------------------------------------
      show = function(elem) {
        elem.style.display = '';
      },

      hide = function(elem) {
        elem.style.display = 'none';
      },

      // content update
      // ---------------------------------------------------------
      text = function(elem) {
        return elem.textContent;
      },

      html = function(elem, str) {
        elem.innerHTML = str;
      },


      // related nodes
      // ---------------------------------------------------------
      append = function(elem, child) {
        elem.appendChild(child);
      },

      prepend = function(elem, child) {
        elem.insertBefore(child, elem.firstChild);
      },

      next = function(elem) {
        return elem.nextElementSibling;
      },

      prev = function(elem) {
        return elem.previousElementSibling;
      },

      parent = function(elem) {
        return elem.parentNode;
      },

      // positioning
      // ---------------------------------------------------------
      offset = function(elem) {
        var rect = elem.getBoundingClientRect();
        return {
          top: rect.top + document.body.scrollTop,
          left: rect.left + document.body.scrollLeft
        };
      },

      position = function(elem) {
        return {
          left: elem.offsetLeft,
          top: elem.offsetTop
        };
      },

      // events
      // ---------------------------------------------------------
      on = function(elem, type, fn, capture) {
        if(!elem && !type && !fn) {
          return;
        }
        elem.addEventListener(type, fn, !!capture);
      },

      off = function(elem, type, fn, capture) {
        if(!elem && !type && !fn) {
          return;
        }
        elem.removeEventListener(type, fn, !!capture);
      },

      once = function(elem, type, fn, capture) {
        if(!elem && !type && !fn) {
          return;
        }
        on(elem, type, function temp() {
          fn.apply(this, arguments);
          off(elem, type, temp, capture);
        }, capture);
      },

      // doc ready
      // ---------------------------------------------------------
      _docIsReady = function() {
        return document.readyState === 'complete';
      },

      _docReady = function() {
        if(!readyFired) {
          readyFired = true;
          _each(docReadyQueue, function(item) {
            item.call(root);
          });
          docReadyQueue = [];
        }
      },

      _docReadyStateChange = function() {
        if(_docIsReady()) {
          _docReady();
        }
      },

      _docRegister = function() {
        if(document.addEventListener) {
          document.addEventListener('DOMContentLoaded', _docReady, false);
          document.addEventListener('load', _docReady, false);
        } else {
          document.attachEvent('onreadystatechange', _docReadyStateChange);
          window.attachEvent('onload', _docReady);
        }
      },

      docReady = function(fn) {
        // deal with adding functions to queue, else
        // firing them immediately.
        if(readyFired) {
          setTimeout(fn, 1);
          return;
        } else {
          docReadyQueue.push(fn);
        }
        // then deal with initial event listener setup
        if(_docIsReady()) {
          setTimeout(_docReady, 1);
        } else if(!readyListenerRegistered) {
          readyListenerRegistered = true;
          _docRegister();
        }
      };

  var el = {
    find: find,
    remove: remove,
    append: append,
    prepend: prepend,
    addClass: addClass,
    removeClass: removeClass,
    hasClass: hasClass,
    attr: attr,
    css: css,
    show: show,
    hide: hide,
    text: text,
    html: html,
    next: next,
    prev: prev,
    parent: parent,
    offset: offset,
    position: position,
    // css: '',
    on: on,
    off: off,
    once: once,
    ready: docReady
  };

  // exports
  this.el = el;
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = el;
  }

}).call(this);
