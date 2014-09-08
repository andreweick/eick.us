//var each = require('../utils').each;

 module.exports = function(input, property, filter) {
    var filtered = [];

    input.forEach(function(item) {
      if(typeof filter === 'undefined') {

        if(item[property]) // Exists
          filtered.push(item);
      }

      else {
        if(item[property] === filter)
          filtered.push(item);
      }
    });
    return filtered;
  }

 /*

 NOTE: I changed '===' to '==' in trying to get this to evaluate an array.
 |where(property, filter)

Filters an array of objects down to objects where the property on the object is equal to filter. If filter is not provided, then it filters the array to objects where property exists.

Note: Does not work with relations

{% set items = get('podcasts') %}

{# Will get all podcasts where the audio_file property is defined %}

{% set uploaded = items|where('audio_file') %}

{# Will get all podcasts where the category is 'funny' #}
{% set funny = items|where('category', 'funny') %}

*/












