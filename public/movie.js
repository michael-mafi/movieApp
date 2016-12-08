var movies =[];

function initMovies() {
  initEvents();
}

function initEvents() {
  var searchMoviesHandler =function() {
    var searchInput =byId('movieSearchInput');
    var searchText =searchInput.value;
    searchMovies(searchText);
  };
  byId('movieSearchButton').onclick =function() {
    searchMoviesHandler();
  };
  byId('movieSearchInput').onkeyup =function(event) {
    if(event.keyCode ===13) {
      searchMoviesHandler();
    }
  };
}

function searchMovies(searchText) {
  if(!searchText || searchText.length < 1) {
    movies =[];
    displayMovies(movies, true, true, 'movieResults');
    return;
  }
  var url ="http://www.omdbapi.com/";
  url +="?s="+searchText;
  url +="&type=movie&r=json";

  ajax(url, "GET", null, function(response) {
    setMovies(response);
    displayMovies(movies, true, true, 'movieResults');
  });
}

function setMovies(movieData) {
  movies =[];
  if(!movieData || !movieData.Response || !movieData.Search || !movieData.Search.length) {
    return;
  }
  movieData.Search.forEach(function(movie) {
    movies.push({
      imdbID: movie.imdbID,
      Title: movie.Title,
      Poster: movie.Poster,
      favorite: false
    });
  });
}

function displayMovies(moviesData, showFavorite, showDetails, elementId) {
  var html ="";
  var ii;
  var idFavorite;
  for(ii =0; ii<moviesData.length; ii++) {
    idFavorite = moviesData[ii].imdbID + 'Favorite';
    html += "<div class='movie'>" +
      "<div id='" + moviesData[ii].imdbID + "' >" +
        "<img src='" + moviesData[ii].Poster + "' class='movie-img'/>" +
        moviesData[ii].Title +
      "</div>" ;
    if(showFavorite && !moviesData[ii].favorite) {
      html += "<button id='" + idFavorite + "' class='movie-favorite'>" +
        "Favorite" +
      "</button>";
    }
    html += "</div>";
  }

  byId(elementId).innerHTML =html;
  for(ii =0; ii<moviesData.length; ii++) {
    (function(ii) {
      if(showDetails) {
        byId(moviesData[ii].imdbID).onclick =function() {
          getMovieDetails(moviesData[ii].imdbID);
        };
      }
      if(showFavorite && !moviesData[ii].favorite) {
        idFavorite = moviesData[ii].imdbID + 'Favorite';
        byId(idFavorite).onclick =function() {
          saveMovieFavorite(moviesData[ii]);
        };
      }
    })(ii);
  }
}

function getMovieDetails(movieId) {
  var url ="http://www.omdbapi.com/?i=" + movieId + "&type=movie&r=json&tomatoes=true&";
  ajax(url, "GET", null, function(response) {
    displayMovieDetails(response);
  });
}

function displayMovieDetails(info) {
  var html ="";
  var key;
  for(key in info) {
    html += "<div>" + key + ": " + info[key] + "</div>";
  }
  byId('movieDetails').innerHTML =html;
}

function saveMovieFavorite(movie) {
  var url ="/favorites";
  var data ="imdbID=" + movie.imdbID + "&Title=" + movie.Title + "&Poster=" + movie.Poster;
  ajax(url, "POST", data, function(response) {
    var index =getMovieIndexById(movie.imdbID);
    if(index > -1) {
      movies[index].favorite =true;
      displayMovies(movies, true, true, 'movieResults');
    }
  });
}

function getMovieIndexById(movieId) {
  var ii;
  for(ii =0; ii<movies.length; ii++) {
    if(movies[ii].imdbID.toString() === movieId.toString()) {
      return ii;
    }
  }
  return -1;
}