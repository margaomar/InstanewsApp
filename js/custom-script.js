var url = 'https://developer.nytimes.com/top_stories_v2.json#/Console/GET/%7Bsection%7D.%7Bformat%7D'
$.ajax({
  url,
  method: 'GET',
}).done(function(data) {
    let abstract = data.results[0].abstract;
    let articleUrl = data.results[0].url;
    let imageUrl= data.results[0].multimedia[1].url;

    $('.new-link').attr('href', articleUrl);
    $('img').attr('src', imageUrl);
    $('.abstract').text(imageUrl);
  
  console.log(abstract);
  console.log(imageUrl);
})
//