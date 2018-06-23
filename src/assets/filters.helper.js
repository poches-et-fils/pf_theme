if(typeof window.poches === "undefined") window['poches'] = {};
if(typeof window.poches.filters === "undefined") window.poches['filters'] = {};
window.poches.filters['helper'] = function () {
  this.gup = function (name, url) {
    if (!url) url = location.href;
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( url );
    return results == null ? '' : results[1].replace(/\+/g,' ');
  };

  this._uup = function (key, value) {
    var newSearch = '';
    key = escape(key); value = escape(value);
    var kvp = document.location.search.substr(1).split('&');
    if (kvp == '') {
      newSearch = '?' + key + '=' + value;
    } else {
      var i = kvp.length;
      var x;
      while (i--) {
        x = kvp[i].split('=');
        if (x[0] == key) {
          x[1] = value;
          kvp[i] = x.join('=');
          break;
        }
      }
      if (i < 0) {
        kvp[kvp.length] = [key, value].join('=');
      }
      newSearch = kvp.join('&');
    }
    return newSearch;
  }

  this.uup = function (key, value) {
    document.location.search = window.poches.filters.helper._uup(key, value);
  }
  
  this.uups = function (key, value) {
    var newSearchString = window.poches.filters.helper._uup(key, value);
    var url = [location.protocol, '//', location.host, location.pathname].join('');
    history.pushState(newSearchString, document.title, url + '?' + newSearchString);
  }

  this.shuffle = function (array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }
}