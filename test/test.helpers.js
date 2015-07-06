// a node can be an element node, an attr node, text node, or all kinds of things.
function isNode(obj){
  if(typeof Node === 'object') {
    return obj instanceof Node;
  } else {
    return obj && (typeof obj ==='object') && (typeof obj.nodeType === 'number') && (typeof obj.nodeName==='string');
  }

}


// an element is everything from start tag to end tag
function isElement(obj){
  if(typeof HTMLElement === 'object') {
    return obj instanceof HTMLElement;
  } else {
    return obj && (typeof obj === 'object') && (obj !== null) && (obj.nodeType === 1) && (typeof obj.nodeName==='string');
  }
}
