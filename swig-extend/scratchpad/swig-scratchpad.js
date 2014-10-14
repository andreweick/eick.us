

////////////////////////////////////////////////////////////////////////////////////////

{%  for i in reviews %}

{{ i.related_author | author_real_name }}

{% endfor %}


author_real_name = metalsmith.data.reviews where related_author == author.slug

////////////////////////////////////////////////////////////////////////////////////////


swig.setFilter('author_real_name', function (related_author, author.slug, author.title) {
  if (related_author === author.slug){
    return author.title.fn(this);
  }

});


function (value, test, options) {
    if (value === test) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  },




// This filter will return 'bazbop' if the idx on the input is not 'foobar'
swig.setFilter('foobar', function (input, idx) {

  return input[idx] === 'foobar' ? input[idx] : 'bazbop';


});
// myvar = ['foo', 'bar', 'baz', 'bop'];
// => {{ myvar|foobar(3) }}
// Since myvar[3] !== 'foobar', we render:
// => bazbop



swig.setFilter('isObject', function(element) {
  return typeof element == "object";
});
Then:

{% set elementIsObject = myvar|isObject %}
{% if elementIsObject %} ... {% endif %}












