var Stats = (function IIFE()
{
    var state =
    {
        data : {}
    }

    PublisherSubscriber.on('_searchSingleCountryAlphaCode',function(data){_setCountry(data)});
    
    //cache dom
    var template = $('#newsTemplate').html();
    var $target = $('#news-list');

    function _render()
    {
        Mustache.parse(template);  
        var rendered = Mustache.render(template, state);
        $target.html(rendered);
    }

    function _setCountry(country)
    {
        state.data = country;
        _render()
    }


    return{}


})();
