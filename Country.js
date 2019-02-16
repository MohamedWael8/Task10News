
var country = (function IIFE() 
{
    var model = 
    {
        data:{},
        urlBase:"https://restcountries.eu/rest/v2",
        urlExtra:"/alpha/",
        urlCountry:"",
        urlIP:"https://jsonip.com?callback=?",
        ip:"",
        urlCurrentCountry:"http://ip-api.com/json/"
    }

    _cacheDom();
    _eventListeners();
    _render();
    _search();

    function _cacheDom()
    {
        
    }

    function _eventListeners()
    {
        
    }

    function _render()
    {
        
    }
    
    function _search()
    {
        $.ajax({
            method: "GET",
            url: model.urlBase + urlExtra + urlCountry
          }).done(function(data) 
          {
            model.data = data;
            console.log(model.data)
          });
        model.urlCountry = getISO3Country();
        PublisherSubscriber.emit(_search,model.data);
        _render();
    }

    return
    {
        

    }

}
)();

country;