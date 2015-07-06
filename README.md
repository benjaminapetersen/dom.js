# el.js

An extremely light weight DOM manipulation utility library.

## Usage

This little library is nothing compared to [jQuery](https://jquery.com/)
or [Zepto](http://zeptojs.com/), it is useful for a super, super small library
of simple DOM manipulation functions.

Note: the API is intentionally different than that of jQuery.

## Examples

### el.ready

Use el.ready as a simple registry for document.ready:

```javascript
el.ready(function() {
  // do your stuff here...
});
```

### el.find

Use el.find to query the DOM for nodes.  Returns an array:

```javascript
el.find('.class');

var firstElem = el.find('.class')[0];
```

### el.addClass

```javascript
var elem = el.find('.foo')[0];
el.addClass(elem, 'bar');
```

### el.removeClass

```javascript
var elem = el.find('.foo')[0];
el.removeClass(elem, 'foo');
```

### el.hasClass


```javascript
var elem = el.find('.foo')[0];
if(el.hasClass(elem, 'bar')) {
  el.removeClass(elem, 'bar');
} else {
  el.addClass('baz');
}
```

### el.on

```javascript
var h3 = el.find('h3')[0];

el.on(h3, 'click', function() {
  // do stuff
});

h3.click();
```


### el.off

```javascript
var h3 =  el.find('h3')[0],
          callback = function() {
            // do stuff
          };

el.on(h3, 'click', callback);
el.off(h3, 'click', callback);

h3.click();
```
### el.once

```javascript
var test = 0,
    h3 = el.find('h3')[0],
    callback = function() {
      test += 1;
    };

el.once(h3, 'click', callback);

// callback will only be called once,
// test will = 1
h3.click();
h3.click();
h3.click();
```


