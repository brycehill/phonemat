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

  /**
   * Generate random phone numbers or area codes?
   */

  /*
   * Test that this plugin abides by jQuery plugin best practices.
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
   * Test that the delimiters used are what was specified in the options. 
   */
  module('Delimiters', {
    // This will run before each test in this module.
    setup: function() {
      this.elems = $('#qunit-fixture').children();
    }
  });

  test('correct delimiter (-) is used', function() {
    var input      = this.elems.filter('input'),
        delimiter  = '-';
   
    input.phonemat({ delimiter: delimiter })
         .val('(480) 123')
         .trigger('keyup');
   
    notEqual(input.val().indexOf(delimiter), -1, 'The input should contain a ' + delimiter);
  });

  test('correct delimiter (.) is used', function() {
    var input      = this.elems.filter('input'),
        delimiter  = '.';

    input.phonemat({ delimiter: delimiter })
         .val('(480) 123')
         .trigger('keyup');
    
      notEqual(input.val().indexOf(delimiter), -1, 'The input should contain a ' + delimiter);
  });

  test('correct delimiter (\'\') is used', function() {
    var input      = this.elems.filter('input'),
        delimiter  = '';

    input.phonemat({ delimiter: delimiter })
         .val('(480) 123')
         .trigger('keyup');
    
      notEqual(input.val().indexOf(delimiter), -1, 'The input should contain a ' + delimiter);
  });

  test('correct delimiter (\' \') is used', function() {
    var input      = this.elems.filter('input'),
        delimiter  = ' ';

    input.phonemat({ delimiter: delimiter })
         .val('(480) 123')
         .trigger('keyup');
    
      notEqual(input.val().indexOf(delimiter), -1, 'The input should contain a ' + delimiter);
  });


  /*
   * Test that the area code is or is not wrapped in parens
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
   * Test that the length of the area code and the length of the actual phone number
   * are what was specified by the options. 
   */
  module('Number Lengths', {
    // This will run before each test in this module.
    setup: function() {
      this.input = $('#phone-number');
    }
  });

  test('even number length', function() {
    var len = 8,
        options = { numberLength: len };

    this.input.phonemat(options)
        .val('020 12454562')
        .trigger('keyup');
  });

  test('odd number length', function() {
    var len = 7,
        options = { numberLength: len };

    this.input.phonemat(options)
        .val('020 124')
        .trigger('keyup')
        .val('0230')
        .trigger('keyup')
  });

  test('even area code length', function() {
    var len = 4,
        options = { areaCodeLength: len },
        index, val;

    this.input.phonemat(options)
        .val('0169')
        .trigger('keyup');

    val = this.input.val();

    index = val.indexOf('('); 
    strictEqual(index, 0, 'The opening parentheses is left of the area code'); 

    index = val.indexOf(')'); 
    strictEqual(index, len + 1, 'The closing paren is right of the area code');
  });

  test('odd area code length', function() {
    var len = 3, 
        index, val;

    // The default areaCodeLength is 3, but this is more explicit.     
    this.input.phonemat({ areaCodeLength: len })
        .val('020')
        .trigger('keyup');

    val = this.input.val();

    index = val.indexOf('('); 
    strictEqual(index, 0, 'The opening parentheses is left of the area code'); 

    index = val.indexOf(')'); 
    strictEqual(index, len + 1, 'The closing paren is right of the area code');    
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
