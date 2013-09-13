/*! phonemat - v0.1.0 - 2013-09-12
* https://github.com/brycehill/phonemat
* Copyright (c) 2013 Bryce Hill; Licensed MIT */
;(function($) {

  'use strict';

  var defaults = {

    /* Configuring locale may be a bit too ambitious considering different
     * parts of the same country format their phone numbers differently. 
     * 'locale': 'USA', 
     */
    
    /*
     * Length of the area code
     */
    'areaCodeLength': 3,
    
    /*
     * Length of the rest of the phone number
     */
    'numberLength': 7,
    
    /*
     *  Wrap the area code with parens?
     */
    'wrapAreaCode': true,
    
    /*
     * '-' 
     * '.' 
     * ' ' 
     * ''
     */ 
    'delimiter': '-',

    /*
     * 8:  Backspace
     * 46: Delete 
     */
    'deleteKeys': [ 8, 46 ]

  };


  function Phonemat(element, options) {
    this.settings = $.extend({}, defaults, options),
    this.firstPos = this.firstDelimiterPosition(this.settings);
    
    this.element = $(element);
    this.init();
  }


  Phonemat.prototype.init = function() {
    this.element.on("keyup", this.format.bind(this));
  };


  // Figure out where to put our first delimiter. 
  Phonemat.prototype.firstDelimiterPosition = function(settings) {
    var len  = settings.numberLength,
        half = (len % 2 === 1) ? Math.floor(len / 2) : len / 2,
        // Add 1 for a space between the area code and number
        firstPos = half + settings.areaCodeLength + 1;
   
    return settings.wrapAreaCode ? firstPos + 2 : firstPos;      
  };
  

  Phonemat.prototype.format = function(e) {
    var input    = this.element, 
        value    = input.val(),
        deleting = ($.inArray(e.keyCode, this.settings.deleteKeys) !== -1) ? true : false;

    if (!deleting) {
      if (value.length === this.settings.areaCodeLength) {
        if (this.settings.wrapAreaCode) {
          input.val("(" + value + ") ");
        } else {
          input.val(value + this.settings.delimiter);
        }
      } else if (value.length === this.firstPos) {
        input.val(value + this.settings.delimiter);
      }
    }
  };


  $.fn.phonemat = function(options) {
    return this.each(function() {
      // Is this an input element?
      if (!$(this).is('input')) return;      

      new Phonemat(this, options);
    });
  };


}(jQuery));
