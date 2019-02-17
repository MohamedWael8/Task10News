
var country = (function IIFE() 
{
    var state = 
    {
        data:[],
        urlCountryBase:"https://restcountries.eu/rest/v2",
        urlAlphaExtra:"/alpha/",
        urlRegionExtra:"/region/",
        countryAlphaCode:"",
        region:"",
        urlIP:"https://jsonip.com?callback=?",
        userIP:"",
        urlCurrentCountry:"http://ip-api.com/json/"
    }

    //cache dom
    var template = $('#countryListTemplate').html();
    var $target = $('#country-list');

    _eventListeners();
    _getIP();

   

    function _eventListeners()
    {
        
    }

    function _render()
    {
        Mustache.parse(template);  
        var rendered = Mustache.render(template, state);
        $target.html(rendered);
    }
    
    function _getIP()
    {
      console.log("started _getIP");
      $.ajax({
        method: "GET",
        url: "https://jsonip.com?callback="
      }).done(function(data) 
      {
        state.userIP = data.ip;
        _getCurrentCountryAlpha();
        console.log("finished _getIP");
      });
    }

    function _getCurrentCountryAlpha()
    {
      $.ajax({
        method: "GET",
        url: "http://ip-api.com/json/"+state.userIP
      }).done(function(data) 
      {
        console.log(state.userIP)
        state.countryAlphaCode = data.countryCode;
        _searchSingleCountryAlphaCode();
        PublisherSubscriber.emit(_getCurrentCountryAlpha,state.countryAlphaCode);
      });
    }

    function _searchSingleCountryAlphaCode()
    {
      console.log("start _searchSingleCountryAlphaCode")
      $.ajax({
        method: "GET",
        url: state.urlCountryBase+state.urlAlphaExtra+state.countryAlphaCode
      }).done(function(data) 
      {
        state.region = data.region;
        PublisherSubscriber.emit(_searchSingleCountryAlphaCode,data.borders);
        _searchRegion();
      });
    }

    function _searchRegion()
    {
      $.ajax({
          method: "GET",
          url: state.urlCountryBase + state.urlRegionExtra + state.region
        }).done(function(data) 
        {
          state.data = data;
          _render();
        });
     
    }

    return
    {
        

    }

}
)();

country;