(function() {
  'use strict';

  // TODO: /test/spec is the appropriate location for these tests.
  // consider breaking them up into individual files for each function, or set
  // of functions.  should correspond to /src/
  // /src/find - /test/spec/find
  // /src/remove - /test/spec/remove
  // etc.

  // tests:
  // - chai expect http://chaijs.com/
  // - mocha runner https://mochajs.org/
  // why not Jasmine to get it all in once?  dunno.
  var expect = chai.expect;

  describe("dom.js", function() {

    // TODO: beforeEach
    // TODO: beforeAll
    // - reset the DOM for each test

    describe('collections iteration', function() {
      describe('.each( )', function() {
        it('should iterate a list', function() {
          var count = 0;
          dom.each([1,2,3], function() {
            count++;
          });
          expect(count).to.equal(3);
        });
        it('should call a fn for each item in the list', function() {
          var hasBeenCalled = false;
          var callback = function() {
            hasBeenCalled = true;
          };
          dom.each([1,2,3], callback);
          expect(hasBeenCalled).to.equal(true);
        });
        it('should pass item,i,list to the callback for each invocation', function() {
          var item, iterator, list;
          dom.each([1,2,3], function(num, i, arr) {
            item = num;
            iterator = i;
            list = arr;
          });
          // each of these should get populated if the function is called
          expect(typeof item).to.equal('number');
          expect(typeof iterator).to.equal('number');
          expect(Array.isArray(list)).to.equal(true);
        });
      });

      describe('.head( ) / .first ( )', function() {
        it('should return the first item from a list (array)', function() {
          expect(dom.head([10,11,12])).to.equal(10);
        });

        it('should return undefined if called without a list', function() {
          expect(dom.head()).to.equal(undefined);
        });
      });


      describe('.tail( ) / .last( )', function() {
        it('should return the last item from a list (array)', function() {
          expect(dom.tail([10,11,12])).to.equal(12);
        });

        it('should return undefined if called without a list', function() {
          expect(dom.tail()).to.equal(undefined);
        });
      });



    });

    describe('DOM query', function() {
      describe('.find( )', function() {
        it('should find DOM nodes by given string selector', function() {
          var h3 = dom.first(dom.find('h3')),
              p = dom.first(dom.find('p.target')),
              li = dom.first(dom.find('li.first'));
          expect(isElement(h3)).to.equal(true);
          expect(isElement(p)).to.equal(true);
          expect(isElement(li)).to.equal(true);
        });

        it('should return a NodeList', function() {
          var h3 = dom.find('h3');
          expect(isNodeList(h3)).to.equal(true);
        });
      });

 
      describe('.remove( )', function() {
        it('should remove a DOM node from the tree', function() {
          var toRemove = dom.first(dom.find('.removed'));
          expect( isElement( toRemove )).to.equal(true);
          dom.remove(toRemove);
          // now search for it in DOM again and see if its still there
          expect( isElement( dom.find('.removed')[0] )).to.equal(undefined);
        });
      });
    });

    describe('class and attribute manipulation', function() {
      describe('.addClass( )', function() {
        it('should add a class to a DOM node', function() {

          var p1 = dom.first(dom.find('p.p1')),
              p2 = dom.first(dom.find('p.p2'));

          dom.addClass(p1, 'shizzles');
          expect(p1.classList.contains('shizzles')).to.equal(true);

          dom.addClass(p2, 'stuff things other stuff');
          expect(p2.classList.contains('other')).to.equal(true);

        });

        // it should not alter existing classes

        it('should return the original node', function() {
          // TODO: impl this test!
        });
      });

      describe('.hasClass( )', function() {
        it('should return true if a DOM node has a class, and false if it does not', function() {
          var p4 = dom.first(dom.find('.p4'));
          expect(dom.hasClass(p4, 'hobbits')).to.equal(true);
        });
      });

      describe('.removeClass( )', function() {
        it('should remove a class from a DOM node', function() {
          var p = dom.first(dom.find('p.fizzles'));
          dom.removeClass(p, 'fizzles');
          expect(p.classList.contains('fizzles')).to.equal(false);
        });

        // it should not remove unnamed classes
      });

      describe('.attr( )', function() {
        it('should get an attribute value on a DOM node', function() {
          var attr = dom.first(dom.find('.attr'));
          expect(dom.attr(attr, 'snapple')).to.equal('banana');
        });

        it('should set an attribute value on a DOM node', function() {
          var attr = dom.first(dom.find('.attr'));
          dom.attr(attr, 'shizzle', 'pop');
          expect(dom.attr(attr, 'shizzle')).to.equal('pop');
        });
      });

      // describe('.removeAttr( )', function() {
      //   xit('should be impelemented');
      // });

      describe('.css( )', function() {
        it('should add individual styles to a DOM node', function() {
          var style = dom.first(dom.find('.style'));
          dom.css(style, 'border', '1px dashed #990000');
          dom.css(style, 'font-weight', 'bold');
          dom.css(style, 'color', '#990000');
          expect(dom.css(style, 'border')).to.equal('1px dashed rgb(153, 0, 0)');
          expect(typeof dom.css(style)).to.equal('object');
        });

        // it('should add a hash of styles to a DOM node', function() {
        //   console.warn('.css({hash})', 'not yet implemented');
        // });

        // it should overwrite previous values of set styles

        // it should not destroy existing unrelated styles
      });

      describe('.show( )', function() {
        it('should set the display property of a hidden DOM node to \'block\'', function() {
          var toShow = dom.first(dom.find('.show-me'));
          dom.show(toShow);
          expect(dom.css(toShow, 'display')).to.equal('block');
        });

        // it should restore an element to its initial display value?
        // ie, if .hide() was called and the element was display: inline, flex, etc
        // then this should be returned? rather than impl a cache, it may be better to
        // set a data-el-prev-display: '' property on the element. caching nodes prob a mess.
        // if so: TODO: impl .data() method to make this easier than using .attr('data-el-prev-display')
        // and TODO: impl .elData() to automatically do the 'data-el-' prefix internally
      });

      describe('.hide( )', function() {
        it('should set the display property of a visible DOM node to \'none\'', function() {
          var toHide = dom.first(dom.find('.hide-me'));
          dom.hide(toHide);
          //console.log('.hide()', dom.css(toHide, 'display') === 'none');
          expect(dom.css(toHide, 'display')).to.equal('none');
        });

        // see above .show() for further improvements to this.
      });

    });

    describe('content manipulation', function() {
      describe('.text( )', function() {
        it('should get the text value of a DOM node', function() {
          var hasText = dom.first(dom.find('.has-text'));
          expect(dom.text(hasText)).to.equal('This is a target paragraph.');
        });

        it('should set the text value of a DOM node', function() {
          var setText = dom.first(dom.find('.set-text'));
          expect(dom.text(setText)).to.equal('');
          dom.text(setText, 'Set some text');
          expect(dom.text(setText)).to.equal('Set some text');
        });
      });

      describe('.html( )', function() {
      //   it('should get the HTML content of a DOM node', function() {
      //
      //   });
      //   it('should set the HTML content of a DOM node', function() {
      //
      //   });
      });

      describe('.append( )', function() {
      //   var toAppend = dom.find('.append')[0];
      //   dom.append(toAppend, dom.find('.move-me')[0]);
      //   console.log('.append():', toAppend);
      //   TODO: use dom.html() to detect if the DOM node was added
      });

      describe('.prepend( )', function() {
      //   var toPrepend = dom.find('.prepend')[0];
      //   dom.prepend(toPrepend, dom.find('.move-me-again')[0]);
      //   console.log('.prepend():', toPrepend);
      //   TODO: use dom.html() to detect if the DOM node was added...
      });

    });

    describe('related nodes', function() {

      describe('.next( )', function() {
        // console.log('.next():', dom.next(dom.find('.first')[0]) === dom.find('.second')[0]);
      });

      describe('.prev( )', function() {
        // console.log('.prev():', dom.prev(dom.find('.second')[0]) === dom.find('.first')[0]);
      });

      describe('.parent( )', function() {
        // console.log('.parent():', dom.parent(dom.find('.child')[0]) === dom.find('.parent')[0]);
      });
    });

    describe('positioning', function() {

      describe('.offset( )', function() {
        // console.log('.offset():', dom.offset( dom.find('.offset')[0] ) );
      });
      describe('.position( )', function() {
        // console.log('.position():', dom.position( dom.find('.offset')[0] ) );
      });
    });

    describe('events', function() {
      describe('.on( )', function() {
        it('should add a listener to a DOM node', function() {
          var test = false,
              h3 = dom.first(dom.find('h3'));

            dom.on(h3, 'click', function() {
              test = true;
            });
            h3.click();
            expect(test).to.equal(true);
        });
      });

      describe('.off( )', function() {
        it('should remove a listener to a DOM node', function() {
          var test = false,
              h3 = dom.first(dom.find('h3')),
              callback = function() {
                test = true;
              };

            dom.on(h3, 'click', callback);
            dom.off(h3, 'click', callback);

            h3.click();
            expect(test).to.equal(false);
        });
      });

      describe('.once( )', function() {
        it('should add a one time only click handler to a DOM node', function() {
          var test = 0,
              h3 = dom.first(dom.find('h3')),
              callback = function() {
                test += 1;
              };

            dom.once(h3, 'click', callback);

            h3.click();
            h3.click();
            h3.click();

            expect(test).to.equal(1);
        });
      });
    });

  });

})();
