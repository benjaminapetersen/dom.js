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

      // simple internal iterator
      _each = function(arr, fn) {
        for(var i= 0; i< arr.length; i++) {
          fn(arr[i], i, arr);
        }
      },

      find = function(selector) {
        return doc.querySelectorAll(selector);
      },

      // class manipulation
      _getClasses = function(elem) {
        if(!elem) {
          return;
        }
        if(elem.classList) {
          return elem.classList;
        }
        return elem.className.split(' ');
      },


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

      // events
      on = function(elem, type, fn, capture) {
        if(!elem && !type && !fn) {
          return;
        }
        elem.addEventListener(type, fn, capture ? true : false);
      },

      off = function(elem, type, fn, capture) {
        if(!elem && !type && !fn) {
          return;
        }
        elem.removeEventListener(type, fn, capture ? true : false);
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

      _setStyle = function(elem, prop, val) {
        elem.style[prop] = val;
      },

      // css
      css = function(elem, prop, val) {
        if(!prop) {
          return getComputedStyle(elem);
        }

      },

      // document ready handlers
      _docIsReady = function() {
        return document.readyState === 'complete';
      },

      _docReady = function() {
        if(!readyFired) {
          readyFired = true;
          _each(docReadyQueue, function(item, i) {
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
        };
      },

      docReady = function(fn) {
        // deal with adding functions to queue, else
        // firing them immediately.
        if(readyFired) {
          setTimeout(fn, 1);
          return;
        } else {
          docReadyQueue.push(fn);
        };
        // then deal with initial event listener setup
        if(_docIsReady()) {
          setTimeout(_docReady, 1);
        } else if(!readyListenerRegistered) {
          readyListenerRegistered = true;
          _docRegister();
        };
      };


  this.el = {
    find: find,
    addClass: addClass,
    removeClass: removeClass,
    hasClass: hasClass,
    offset: '',           // or position?
    css: '',
    on: on,
    off: off,
    once: once,
    ready: docReady
  }

}).call(this);
