var swig           = require('swig'),
    extras         = require('swig-extras');
    //swig_filters     = require('./swig_filters.js'),
    //swig_tags     = require('./swig_tags.js');


// Sets the context for swig functions
      swigFunctions.setData(data);
      swigFunctions.setTypeInfo(typeInfo);
      swigFunctions.setSettings(settings);

extras.useFilter(swig, 'split');



module.exports.init = function (swig) {

  var slice = function(input, offset, limit) {
    if(typeof input === 'string') {
      return input.slice(offset, offset + limit);
    }
    if(Array.isArray(input))
    {
      return input.slice(offset || 0, offset + limit)
    }

    return utils.sliceDictionary(input, limit, offset);
  };

 var reverse = function(input, reverse) {
    return _(input).reverse();
  };


var where = function(input, property, filter) {
    var filtered = [];

    input.forEach(function(item) {
      if(typeof filter === 'undefined') {
        if(item[property]) // Exists
          filtered.push(item);
      } else {
        if(item[property] === filter)
          filtered.push(item);
      }
    });
    return filtered;
  }




}



