/**
 * keyboard format
 *
 * Fix keyboard behavior for editable format.
 *
 * Copyright (c) 2013 - 2014 by Hsiaoming Yang.
 */

var keyboard = require('yields-k');
var format = require('lepture-format');
var Caret = require('lepture-caret');


module.exports = function(editable, options) {
  options = options || {};
  var caret = options.caret || new Caret(editable);
  var k = keyboard(editable);

  var spanformats  = ['bold', 'italic', 'strike', 'underline'];

  k('backspace', function(e) {
    if (isblank(editable)) {
      e.preventDefault();
      if (!format.is.p()) {
        format.p();
      }
    }
  });

  k('enter', function(e) {
    // corret enter behavior
    if (format.is.div()) {
      // div -> p
      format.p();
    }
    for (var i = 0; i < spanformats.length; i++) {
      (function(name) {
        if (format.is(name)) {
          format(name);
        }
      })(spanformats[i]);
    }
    if (!options.blank && isblank(editable)) {
      // don't put too many blank lines
      e.preventDefault();
      return false;
    }

    if (k.shift) {
      // shift + enter is <br>
      return false;
    }

    var curr = caret.blockParent();
    var prev = curr.previousElementSibling;

    if (prev && prev.tagName.toLowerCase() === 'hr' && isblank(curr)) {
      e.preventDefault();
      return false;
    }

    if (format.is.blockquote()) {
      if (!curr.textContent) {
        e.preventDefault();
        return false;
      }
      setTimeout(function() {
        format.blockquote();
        format.p();
      }, 1);
      return true;
    }

    if (format.is.ul() || format.is.ol()) {
      setTimeout(function() {
        if (!format.is.ul() && !format.is.ol()) {
          format.p();
        }
      }, 1);
      return true;
    }

    setTimeout(function() {
      var prev = caret.blockParent().previousElementSibling;
      if (prev && isblank(prev)) {
        prev.parentNode.replaceChild(document.createElement('hr'), prev);
      }
    }, 1);
  });

  // tab only works on list
  k('tab', function(e) {
    e.preventDefault();
    if (format.is.ul() || format.is.ol()) {
      if (k.shift) {
        format.outdent();
      } else {
        format.indent();
      }
    }
    return false;
  });
  return k;
};


function isblank(el) {
  var html = el.innerHTML;
  html = html.replace(/^\s+/, '').replace(/\s+$/, '');
  return (html === '<p><br></p>' || html === '<br>');
}
