// node is the base data type of the DOM
// a node can be an element, attribute, text, etc.
var isNode = function(o){
  return (typeof Node === 'object') ?
          o instanceof Node :
          o && (typeof o === 'object') && (typeof o.nodeType === 'number') && (typeof o.nodeName==='string');
};

// a DOM element
var isElement = function(o){
  return (typeof HTMLElement === 'object') ?
            o instanceof HTMLElement :
            o && (typeof o === 'object') && (o !== null) && (o.nodeType === 1) && (typeof o.nodeName==='string');
};


var isNodeList = function(list) {
  return NodeList.prototype.isPrototypeOf(list);
}
