
  
  $('#select').on('change', function() {
    
    $.ajax({
      method: 'GET',
      url: 'https://developer.nytimes.com/top_stories_v2.json#/Console/GET/%7Bsection%7D.%7Bformat%7D'
   })
    .done(function(data) {
      news += '<section> <a class="new-link" href=""' + results[16].url + '">'; 
      news += '<img src="' + data.results[16].multimedia + '" />'
      news += '<h3>' + data.results[16].abstract + '</h3></a></section>'; 
     
      $results.append(news);
    });
  });
