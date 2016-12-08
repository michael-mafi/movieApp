var favorites =[];
function initFavorites() {
  getFavorites();
}

function getFavorites() {
  var url ="/favorites";
  ajax(url, "GET", null, function(response) {
    displayMovies(response, false, false, 'favoritesResults');
  });
}