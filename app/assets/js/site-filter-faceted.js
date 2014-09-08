var booksList  = new List('container-filter-books', options);

var filterBtns = $('input[name="filter"]');

filterBtns.change(function() {
  var validValues = [];

  filterBtns.each(function() {

    if ($(this).is(':checked')) {
      validValues.push($(this).val());
    }

  });



  booksList.filter(function(item) {


     if (

       (     (validValues.indexOf(item.values().date) > -1) && (validValues.indexOf(item.values().category) > -1)) || (validValues.indexOf(item.values().date) > -1) || (validValues.indexOf(item.values().category) > -1)


      )
     {
      return true;

    }





    else {
      return false;
    }



  });
});
