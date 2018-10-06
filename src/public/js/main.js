

class Movie {
    constructor({title, cast, director, year, description, id, poster}) {
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
        return `<div class="movies__movie">
                    <div class="movies__movie__poster">
                        <img src="${this.poster}"/>
                    </div>
                    <div class="movies__movie__title">
                        <h1>${this.title}</h1>
                    </div>
                    <div class="movies__movie__year">
                       <h2>${this.year}</h2>
                    </div>
                    <div class="movies__movie__description">
                       <p>${this.description}</p>
                    </div>
                    <div class="movies__movie__cast">
                       <p>${this.cast}</p>
                    </div>
                    <a href="/comment.html?movieId=${this.id}" class="movies__movie__show_comments">Show comments</a>
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
        this.init();
    }

    init() {
        this.ref.innerHTML = '';
        fetch('/api/movies')
            .then((response) => {
                response
                    .json()
                    .then(movies => {
                        movies.map(movie => {
                            this.ref.appendChild(new Movie(movie).getRef())
                        });
                    });
            })
            .catch(() => {

            });

        this.addMovieButton.addEventListener('click', () => {
            this.addMovie(this.addMovieTitle.value);
        });
    }

    addMovie(title) {
        fetch('/api/movies', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title})
        })
            .then((response) => {
                this.init();
            })
            .catch(() => {
                console.log('asd');
            });
    }
}




window.onload = () => {
    new Movies();
};
