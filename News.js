var News = (function IIFE()
{
    var state =
    {
        urlCountryNews : "https://newsapi.org/v2/top-headlines",
        countryAlpha : "",
        newsAPIKey : "48343c6a20234e9c82fdd8d1c139c0d8",
        data : []
    }

    PublisherSubscriber.on('_getCurrentCountryAlpha',function(data){_setCountryName(data)});
    //cache dom
    var template = $('#newsTemplate').html();
    var $target = $('#news-list');

    function _render()
    {
        Mustache.parse(template);  
        var rendered = Mustache.render(template, state);
        $target.html(rendered);
    }

    function _setCountryName(country)
    {
        state.countryAlpha = country;
        _getNewsWithCountryAlphaCode()
    }

    function _getNewsWithCountryAlphaCode()
    {
        $.ajax({
            method: "GET",
            url: state.urlCountryNews,
            data: {country: state.countryAlpha, apiKey: state.newsAPIKey}
          }).done(function(data) 
          {
            console.log(data.articles)
            state.data = data.articles;
            _render()
          });
    }
    
    return{}


})();
