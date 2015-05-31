$(function () {
  $(".navbar-brand").text("Javascript Expert Project"); 

  if (typeof PUBNUB !== 'undefined')
  {
    window.gamesub = PUBNUB.init({
        publish_key: 'pub-c-f8615354-2b9b-468c-b724-9f682fb8fd9d',
        subscribe_key: 'sub-c-2cbc1b2a-016c-11e5-a8ef-0619f8945a4f'
    });
    
  }
})

if (!window.location.getParameter) {
  window.location.getParameter = function(key) {
    function parseParams() {
        var params = {},
            e,
            a = /\+/g,  // Regex for replacing addition symbol with a space
            r = /([^&=]+)=?([^&]*)/g,
            d = function (s) { return decodeURIComponent(s.replace(a, " ")); },
            q = window.location.search.substring(1);

        while (e = r.exec(q))
            params[d(e[1])] = d(e[2]);

        return params;
    }

    if (!this.queryStringParams)
        this.queryStringParams = parseParams(); 

    return this.queryStringParams[key];
  };
}

