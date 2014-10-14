var each = require('../utils').each;

/*

|slice(offset, limit)

Slices the array passed, retunring only those items between the offset and the limit.

{# Output only 10 articles, starting with the 5th one. #}

  {% for article in articles|slice(5,15) %}
    {{ article.name }}
  {% endfor %}

source: https://github.com/webhook/webhook-generate & http://webhook.com
*/

module.exports = function(input, offset, limit) {
    if(typeof input === 'string') {
      return input.slice(offset, offset + limit);
    }
    if(Array.isArray(input))
    {
      return input.slice(offset || 0, offset + limit)
    }

    return utils.sliceDictionary(input, limit, offset);
  };
