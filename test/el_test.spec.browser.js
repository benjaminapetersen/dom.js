var expect = chai.expect;

describe("el.js", function() {

  describe('find', function() {
    it('should find a DOM node by given string selector', function() {
      //expect(slice([1,2,3,4,5], 2, 5)).to.eql([3, 4, 5]);
      var h3 = el.find('h3')[0],
          p = el.find('p.target')[0],
          li = el.find('li.first')[0];
      expect(isElement(h3)).to.eql(true);
      expect(isElement(p)).to.eql(true);
      expect(isElement(li)).to.eql(true);
    });
  });

  describe('addClass', function() {
    it('should add a class to a DOM node', function() {

      var p1 = el.find('p.p1')[0],
          p2 = el.find('p.p2')[0],
          p3 = el.find('#p3')[0];

      el.addClass(p1, 'shizzles');
      expect(p1.classList.contains('shizzles')).to.eql(true);

      el.addClass(p2, 'stuff things other stuff');
      expect(p2.classList.contains('other')).to.eql(true);

    });
  });

  describe('removeClass', function() {
    it('should remove a class from a DOM node', function() {
      var p = el.find('p.fizzles')[0];
      el.removeClass(p, 'fizzles');
      expect(p.classList.contains('fizzles')).to.eql(false);
    });
  });

  describe('hasClass', function() {
    it('should return true if a DOM node has a class, and false if it does not', function() {
      var p4 = el.find('.p4')[0];
      expect(el.hasClass(p4, 'hobbits')).to.eql(true);
    });
  });

  describe('on', function() {
    it('should add a listener to a DOM node', function() {
      var test = false,
          h3 = el.find('h3')[0];

        el.on(h3, 'click', function() {
          test = true;
        });
        h3.click();
        expect(test).to.eql(true);
    });
  });

  describe('off', function() {
    it('should remove a listener to a DOM node', function() {
      var test = false,
          h3 = el.find('h3')[0],
          callback = function() {
            test = true;
          };

        el.on(h3, 'click', callback);
        el.off(h3, 'click', callback);

        h3.click();
        expect(test).to.eql(false);
    });
  });

  describe('once', function() {
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

          expect(test).to.eql(1);
      });
    });
});
