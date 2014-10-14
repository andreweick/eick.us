//var each = require('../utils').each;

 module.exports = function(input, property, filter) {
    var filtered = [];
//  var forEach = Array.prototype.forEach;




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
//var forEach = function (input, property, filter) {};



// var forEach = function (array, callback, scope) {
//   for (var i = 0; i < array.length; i++) {
//     callback.call(scope, i, array[i]); // passes back stuff we need
//   }
// };




// ///
// module.exports = function (input) {
//   if (typeof input === 'object') {
//     each(input, function (value, key) {
//       input[key] = module.exports(value);
//     });
//     return input;
//   }

//   if (typeof input === 'string') {
//     return input.replace(/\n/g, '<br>');
//   }

//   return input;
// };

// module.exports.safe = true;


//
// var where = function(input, property) {
//     var filtered = [];

//     var args =  [].slice.apply(arguments);
//     var filters = args.slice(2);

//     input.forEach(function(item) {
//       if(filters.length === 0) {
//         if(item[property]) // Exists
//           filtered.push(item);
//       } else {
//         filters.forEach(function(filter) {
//           if(item[property] === filter) {
//             filtered.push(item);
//             return false;
//           }
//         })
//       }
//     });
//     return filtered;
//   }



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












