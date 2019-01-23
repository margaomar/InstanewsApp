$( document ).ready(function(){

  var news = '', $articles = $('#articles-wrapper');
  var selected = $("#select option:checked").val();

  $( "#select" ).on('change', function() {
    //change the nav position adding a class in css
    $("nav").addClass("open", 10000);

    // $("picture").animate({width: "18vw" margin-left: "26vw"},1000,function() {alert ('Efecto terminado!');});
    //spining loader
    $articles.append('<img id="loader-img" alt="Images on load" src="images/ajax-loader.gif" class="loader" />');

    var selected = $(this).val(); //define your choise on select
    var url = "https://api.nytimes.com/svc/topstories/v2/" + selected + ".json?" +$.param({
    'api-key': "82f12f3e4189492f86578cb2d4e6add0"
  }); //define url for the json api

    $.ajax({
      url: url,
      method: 'GET',
    }).done(function(data) { 
      var news = '';
      var i = 0;
      var articleAdded = 0; //define each single article
      $articles.empty();
      for(i = 0; i < data.results.length && articleAdded < 12; i++){ //in case there's not image in one of the results => be sure to show 12 articles in total
        var currentResult = data.results[i]; //my results into a vble
        if (currentResult.multimedia.length !== 0){ 
          news = '';
          articleAdded++; 
          var $articleSection = data.results[i].section;
          var $articleUrl = data.results[i].url;
          var $imageUrl = data.results[i].multimedia[4].url;
          var $articleAbstract = data.results[i].abstract;

           news += '<section> <a class="new-link" href="' + $articleUrl + '" target="_blank">'; 
           news += '<div class="section-img" style="background-image:url('+ $imageUrl +')"> '
           news += '<h3>' + $articleAbstract + '</h3></div></a></section>'; 

          $articles.append(news);
        } 
      } 
    });
  });
});