class Comment {

}

class Comments {

    constructor({id}) {
        this.movieId = id;
        this.ref = document.getElementsByClassName('comments')[0];
        this.addMovieButton = document.getElementsByClassName('add_comment__button')[0];
        this.addMovieTitle = document.getElementsByClassName('add_comment__text')[0];
        this.init();
    }

    async init() {
        const response = await fetch(`/api/comments?movieId${this.movieId}`);
        const comments = await response.json();
        comments.forEach(comment => {
            new Comment(comment);
        })

    }

    async addComment(title) {
        try {
            const response = await fetch('/api/comments', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({text})
            });
            this.init();
        } catch (e) {
            console.log(e);
        }
    }
}




window.onload = () => {
    new Comments();
};
