(function($) {
  /*
    ======== A Handy Little QUnit Reference ========
    http://api.qunitjs.com/

    Test methods:
      module(name, {[setup][ ,teardown]})
      test(name, callback)
      expect(numberOfAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      throws(block, [expected], [message])
  */

  module('jQuery Best Practices', {
    // This will run before each test in this module.
    setup: function() {
      this.elems = $('#qunit-fixture').children();
    }
  });

  test('is chainable', function() {
    expect(1);
    // Not a bad test to run on collection methods.
    strictEqual(this.elems.phonemat(), this.elems, 'should be chainable');
  });


  /*
   *
   */
  module('Delimiters', {
    // This will run before each test in this module.
    setup: function() {
      this.elems = $('#qunit-fixture').children();
    }
  });

  test('correct delimiter is used', function() {
    var delimiters = ['-', '.', ' ', ''],
        input      = this.elems.filter('input'),
        options    = {};

    delimiters.forEach(function(delimiter) {
      options = { delimiter: delimiter };
      input.phonemat(options)
           .val('(480) 123')
           .trigger('keyup');

      // event = $.Event( "keydown" );
      // event.keyCode = 9;
      // $doc.trigger( event );
      notEqual(input.val().indexOf(delimiter), -1, 'The input should contain a ' + delimiter);
    });
  });


  /*
   *
   */
  module('Area Code', {
    // This will run before each test in this module.
    setup: function() {
      this.input = $('#phone-number');
    }
  });

  test('wrap area code', function() {
    var index;

    this.input.phonemat()
        .val('480')
        .trigger('keyup');

    index = this.input.val().indexOf('(');    
    notStrictEqual(index, -1, 'The input should contain a parentheses');

    index = this.input.val().indexOf(')');    
    notStrictEqual(index, -1, 'The input should contain a parentheses');
  });

  test('do not wrap area code', function() {
    var index;

    this.input.phonemat({ wrapAreaCode: false  })
        .val('480')
        .trigger('keyup');

    index = this.input.val().indexOf('(');    
    strictEqual(index, -1, 'The input should contain a parentheses');

    index = this.input.val().indexOf(')');    
    strictEqual(index, -1, 'The input should contain a parentheses');
  });


  /*
   *
   */
  module('Number Lengths', {
    // This will run before each test in this module.
    setup: function() {
      this.elems = $('#qunit-fixture').children();
    }
  });

  test('even number length', function() {

  });

  test('odd number length', function() {
    
  });

  test('even area code length', function() {

  });

  test('odd area code length', function() {
    
  });
  // module(':awesome selector', {
  //   // This will run before each test in this module.
  //   setup: function() {
  //     this.elems = $('#qunit-fixture').children();
  //   }
  // });

  // test('is awesome', function() {
  //   expect(1);
  //   // Use deepEqual & .get() when comparing jQuery objects.
  //   deepEqual(this.elems.filter(':awesome').get(), this.elems.last().get(), 'knows awesome when it sees it');
  // });

}(jQuery));
