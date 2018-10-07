class Comment {

    constructor({author, text}) {
        this.author = author;
        this.text = text;
        this.ref = document.createElement('div');
        this.ref.innerHTML = this.html().trim();
    }

    html() {
        return `<div class="comments__comment">
                    <div class="comments__comment__content">
                        <div class="comments__comment__content__text">${this.text}</div>
                        <div class="comments__comment__content__author">Author: <b>${this.author}</b></div>
                    </div>
                </div>`;
    }

    getRef() {
        return this.ref.firstChild;
    }
}

class Comments {

    constructor(movieId) {
        this.movieId = movieId;
        this.ref = document.getElementsByClassName('comments')[0];
        this.addCommentButton = document.getElementsByClassName('add_comment__button')[0];
        this.addCommentText = document.getElementsByClassName('add_comment__text')[0];
        this.addCommentAuthor = document.getElementsByClassName('add_comment__author')[0];
        this.listener = () => {
            const author = this.addCommentAuthor.value;
            const text = this.addCommentText.value;
            const comment = {
                movieId: this.movieId,
                author,
                text
            };
            this.addComment(comment);
        };

        this.init();
    }

    async init() {

        this.addCommentButton.removeEventListener('click', this.listener);
        this.addCommentAuthor.value = '';
        this.addCommentText.value = '';


        await this.loadMovieInfo();
        await this.loadComments();

        this.addCommentButton.addEventListener('click',);
    }

    async loadMovieInfo() {
        const response = await fetch(`/api/movie/${this.movieId}`);
        const { title }  = await response.json();
        console.log(title);
        document.getElementsByTagName('header')[0].innerHTML = `Comments for "${title}"`;
    }

    async loadComments() {
        this.ref.innerHTML = '';

        const response = await fetch(`/api/comments?movieId=${this.movieId}`);
        const comments = await response.json();
        comments.reverse().forEach(comment => this.ref.appendChild(new Comment(comment).getRef()));
    }

    async addComment(comment) {
        try {
            await fetch('/api/comments', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({comment})
            });
            this.loadComments();
        } catch (e) {
            console.log(e);
        }
    }
}




window.onload = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('movieId');
    console.log(movieId);
    new Comments(movieId);
};
