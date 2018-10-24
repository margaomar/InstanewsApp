$( document ).ready(function(){

  var news = '', $articles = $('#articles-wrapper');
  var selected = $("#select option:checked").val();

  $( "#select" ).on('change', function() {
    //change the nav position
    $("nav").addClass("open", 10000);
    //spining loader
    $articles.append('<img id="loader-img" alt="" src="images/ajax-loader.gif" class="loader" />');

    var selected = $(this).val(); //define your choise on select
    var url = "https://api.nytimes.com/svc/topstories/v2/" + selected + ".json?" + $.param({
    'api-key': "82f12f3e4189492f86578cb2d4e6add0"
  }); //define url for the json api

    $.ajax({
      url,
      method: 'GET',
    }).done(function(data) { 
      var news = '';
      let i = 0;
      let articleAdded = 0; //define each single article

      for(i = 0; i < data.results.length && articleAdded < 12; i++){ //in case there's not image in one of the results => be sure to show 12 articles in total
        let currentResult = data.results[i]; //my results into a vble
        if (currentResult.multimedia.length !== 0){ 
          articleAdded++; 
          let $articleSection = data.results[i].section;
          let $articleUrl = data.results[i].url;
          let $imageUrl = data.results[i].multimedia[4].url;
          let $articleAbstract = data.results[i].abstract;

          news += '<section> <a class="new-link" href="' + $articleUrl + '" target="_blank">'; 
          news += '<img src="' + $imageUrl + '" />'
          news += '<h3>' + $articleAbstract + '</h3></a></section>'; 
          
          $articles.empty().append(news);
        } 
      } 
    });
  });
});
