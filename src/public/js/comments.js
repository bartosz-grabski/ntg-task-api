class Comments {
    constructor() {
        this.ref = document.getElementsByClassName('movies')[0];
        this.addMovieButton = document.getElementsByClassName('add_movie__button')[0];
        this.addMovieTitle = document.getElementsByClassName('add_movie__title')[0];
        this.init();
    }

    init() {
        this.ref.innerHTML = '';
        fetch('/api/comments')
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

    addComment(title) {
        fetch('/api/comments', {
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
