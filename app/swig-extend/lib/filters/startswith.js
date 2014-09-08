var each = require('../utils').each;

/*
* |startsWith(string)
*
*  Returns true if the string passed in starts with the given string, false otherwise
*
* {% set curUrl = getCurrentUrl() %}
* {% if curUrl|startsWith('/some/prefix/') %}
*   This is a sub page of /some/prefix/!
* {% endif %}
*
* source: https://github.com/webhook/webhook-generate & http://webhook.com
*/

if (typeof String.prototype.startsWith != 'function') {
  String.prototype.startsWith = function (str){
    return this.indexOf(str) == 0;
  };
}

module.exports = function(input, string) {
    if(typeof(input) !== "string") {
      return false;
    }
    return input.startsWith(string);
  };
