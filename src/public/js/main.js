

class Movie {
  constructor({
    title, cast, director, year, description, id, poster,
  }) {
    this.title = title;
    this.cast = cast;
    this.director = director;
    this.year = year;
    this.description = description;
    this.id = id;
    this.poster = poster;
    this.ref = document.createElement('div');
    this.ref.innerHTML = this.html().trim();
  }

  html() {
    return`<div class="movies__movie">
        <div class="movies__movie__content">
            <div class="movies__movie__content__poster">
                <img src="${this.poster}"/>
            </div>
            <div class="movies__movie__content__title">
                <h1>${this.title}</h1>
            </div>
            <div class="movies__movie__content__year">
               <h2>${this.year}</h2>
            </div>
            <div class="movies__movie__content__description">
               <p>${this.description}</p>
            </div>
            <div class="movies__movie__content__cast">
               <p>${this.cast}</p>
            </div>
            <a href="/comment.html?movieId=${this.id}" class="movies__movie__content__show_comments">Show comments</a>
        </div>
    </div>`;
  }

  getRef() {
    return this.ref.firstChild;
  }
}

class Movies {
  constructor() {
    this.ref = document.getElementsByClassName('movies')[0];
    this.addMovieButton = document.getElementsByClassName('add_movie__button')[0];
    this.addMovieTitle = document.getElementsByClassName('add_movie__title')[0];
    this.listener = () => {
      this.addMovie(this.addMovieTitle.value);
    };
    this.init();
  }

  async init() {
    this.ref.innerHTML = '';
    this.addMovieButton.removeEventListener('click', this.listener);
    const response = await fetch('/api/movies');
    const movies = await response.json();

    movies.forEach((movie) => {
      this.ref.appendChild(new Movie(movie).getRef());
    });


    this.addMovieButton.addEventListener('click', this.listener);
  }

  async addMovie(title) {
    const response = await fetch('/api/movies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title }),
    });
    const text = await response.text();
    document.getElementsByClassName('messages')[0].innerHTML = text;
    this.init();
  }
}


window.onload = () => {
  new Movies();
};
