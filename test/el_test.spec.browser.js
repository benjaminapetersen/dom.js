(function() {
  'use strict';

  // tests:
  // - chai expect http://chaijs.com/
  // - mocha runner https://mochajs.org/
  // why not Jasmine to get it all in once?  dunno.
  var expect = chai.expect;

  describe("el.js", function() {

    describe('collections iteration', function() {

    });

    describe('DOM query', function() {
      describe('.find( )', function() {
        it('should find a DOM node by given string selector', function() {
          var h3 = el.find('h3')[0],
              p = el.find('p.target')[0],
              li = el.find('li.first')[0];
          expect(isElement(h3)).to.equal(true);
          expect(isElement(p)).to.equal(true);
          expect(isElement(li)).to.equal(true);
        });
      });

 
      describe('.remove( )', function() {
        it('should remove a DOM node from the tree', function() {
          var toRemove = el.find('.removed')[0];
          expect( isElement( toRemove )).to.equal(true);
          el.remove(toRemove);
          // now search for it in DOM again and see if its still there
          expect( isElement( el.find('.removed')[0] )).to.equal(undefined);
        });
      });
    });

    describe('class and attribute manipulation', function() {
      describe('.addClass( )', function() {
        it('should add a class to a DOM node', function() {

          var p1 = el.find('p.p1')[0],
              p2 = el.find('p.p2')[0];

          el.addClass(p1, 'shizzles');
          expect(p1.classList.contains('shizzles')).to.equal(true);

          el.addClass(p2, 'stuff things other stuff');
          expect(p2.classList.contains('other')).to.equal(true);

        });
      });

      describe('.hasClass( )', function() {
        it('should return true if a DOM node has a class, and false if it does not', function() {
          var p4 = el.find('.p4')[0];
          expect(el.hasClass(p4, 'hobbits')).to.equal(true);
        });
      });

      describe('.removeClass( )', function() {
        it('should remove a class from a DOM node', function() {
          var p = el.find('p.fizzles')[0];
          el.removeClass(p, 'fizzles');
          expect(p.classList.contains('fizzles')).to.equal(false);
        });
      });

      describe('.attr( )', function() {
        it('should get an attribute value on a DOM node', function() {
          var attr = el.find('.attr')[0];
          expect(el.attr(attr, 'snapple')).to.equal('banana');
        });

        it('should set an attribute value on a DOM node', function() {
          var attr = el.find('.attr')[0];
          el.attr(attr, 'shizzle', 'pop');
          expect(el.attr(attr, 'shizzle')).to.equal('pop');
        });
      });

      describe('.css( )', function() {
        it('should add individual styles to a DOM node', function() {
          var style = el.find('.style')[0];
          el.css(style, 'border', '1px dashed #990000');
          el.css(style, 'font-weight', 'bold');
          el.css(style, 'color', '#990000');
          expect(el.css(style, 'border')).to.equal('1px dashed rgb(153, 0, 0)');
          expect(typeof el.css(style)).to.equal('object');
        });

        // it('should add a hash of styles to a DOM node', function() {
        //   console.warn('.css({hash})', 'not yet implemented');
        // });
      });

      describe('.show( )', function() {
        it('should set the display property of a hidden DOM node to \'block\'', function() {
          var toShow = el.find('.show-me')[0];
          el.show(toShow);
          expect(el.css(toShow, 'display')).to.equal('block');
        });
      });

      describe('.hide( )', function() {
        it('should set the display property of a visible DOM node to \'none\'', function() {
          var toHide = el.find('.hide-me')[0];
          el.hide(toHide);
          console.log('.hide()', el.css(toHide, 'display') === 'none');
          expect(el.css(toHide, 'display')).to.equal('none');
        });
      });

    });

    describe('content manipulation', function() {
      describe('.text( )', function() {
        it('should get the text value of a DOM node', function() {
          var hasText = el.find('.has-text')[0];
          expect(el.text(hasText)).to.equal('This is a target paragraph.');
        });

        it('should set the text value of a DOM node', function() {
          var setText = el.find('.set-text')[0];
          expect(el.text(setText)).to.equal('');
          el.text(setText, 'Set some text');
          expect(el.text(setText)).to.equal('Set some text');
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
      //   var toAppend = el.find('.append')[0];
      //   el.append(toAppend, el.find('.move-me')[0]);
      //   console.log('.append():', toAppend);
      //   TODO: use el.html() to detect if the DOM node was added
      });

      describe('.prepend( )', function() {
      //   var toPrepend = el.find('.prepend')[0];
      //   el.prepend(toPrepend, el.find('.move-me-again')[0]);
      //   console.log('.prepend():', toPrepend);
      //   TODO: use el.html() to detect if the DOM node was added...
      });

    });

    describe('related nodes', function() {

      describe('.next( )', function() {
        // console.log('.next():', el.next(el.find('.first')[0]) === el.find('.second')[0]);
      });

      describe('.prev( )', function() {
        // console.log('.prev():', el.prev(el.find('.second')[0]) === el.find('.first')[0]);
      });

      describe('.parent( )', function() {
        // console.log('.parent():', el.parent(el.find('.child')[0]) === el.find('.parent')[0]);
      });
    });

    describe('positioning', function() {

      describe('.offset( )', function() {
        // console.log('.offset():', el.offset( el.find('.offset')[0] ) );
      });
      describe('.position( )', function() {
        // console.log('.position():', el.position( el.find('.offset')[0] ) );
      });
    });

    describe('events', function() {
      describe('.on( )', function() {
        it('should add a listener to a DOM node', function() {
          var test = false,
              h3 = el.find('h3')[0];

            el.on(h3, 'click', function() {
              test = true;
            });
            h3.click();
            expect(test).to.equal(true);
        });
      });

      describe('.off( )', function() {
        it('should remove a listener to a DOM node', function() {
          var test = false,
              h3 = el.find('h3')[0],
              callback = function() {
                test = true;
              };

            el.on(h3, 'click', callback);
            el.off(h3, 'click', callback);

            h3.click();
            expect(test).to.equal(false);
        });
      });

      describe('.once( )', function() {
        it('should add a one time only click handler to a DOM node', function() {
          var test = 0,
              h3 = el.find('h3')[0],
              callback = function() {
                test += 1;
              };

            el.once(h3, 'click', callback);

            h3.click();
            h3.click();
            h3.click();

            expect(test).to.equal(1);
        });
      });
    });

  });

})();
