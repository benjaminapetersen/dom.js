# dom.js

An extremely light weight DOM manipulation utility library.

## Usage

This little library is nothing compared to [jQuery](https://jquery.com/)
or [Zepto](http://zeptojs.com/), it is useful for a super, super small library
of simple DOM manipulation functions.

Note: the API is intentionally different than that of jQuery.

## Examples

### dom.ready

Use dom.ready as a simple registry for document.ready:

```javascript
dom.ready(function() {
  // do your stuff here...
});
```

### dom.find

Use dom.find to query the DOM for nodes.  Returns an array:

```javascript
dom.find('.class');

var firstElem = dom.find('.class')[0];
```

### dom.addClass

```javascript
var elem = dom.find('.foo')[0];
dom.addClass(elem, 'bar');
```

### dom.removeClass

```javascript
var elem = dom.find('.foo')[0];
dom.removeClass(elem, 'foo');
```

### dom.hasClass


```javascript
var elem = dom.find('.foo')[0];
if(dom.hasClass(elem, 'bar')) {
  dom.removeClass(elem, 'bar');
} else {
  dom.addClass('baz');
}
```

### dom.on

```javascript
var h3 = dom.find('h3')[0];

dom.on(h3, 'click', function() {
  // do stuff
});

h3.click();
```


### dom.off

```javascript
var h3 =  dom.find('h3')[0],
          callback = function() {
            // do stuff
          };

dom.on(h3, 'click', callback);
dom.off(h3, 'click', callback);

h3.click();
```
### dom.once

```javascript
var test = 0,
    h3 = dom.find('h3')[0],
    callback = function() {
      test += 1;
    };

dom.once(h3, 'click', callback);

// callback will only be called once,
// test will = 1
h3.click();
h3.click();
h3.click();
```

## Tests

To run the tests, `bower install` from the root directory, then load `./tests/test.html`
to see the browser based tests.
