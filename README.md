# API 


### GET /api/movie/<movieID>/

Gets movie details for a particular movie saved to the database

### GET /api/movies

Gets all movies

### POST /api/movies

Adds movie with a given title to the database. Movie details of the most probable match to the given title are obtained from `omdbapi.com`

Body:

```json
{
  "title":"<MOVIE_TITLE>"
}
```

### GET /api/comments?movieId=<movieID>

Gets all comments for a given `movieID`

### POST /api/comments

Adds a comment for a given movie from the database.

Body:
```json
{
  "comment":{
		"author":"<AUTHOR>",
		"text":"<TEXT>",
		"movieId":"<MOVIE_ID>"
  }
}
```


# Prerequisites

```text
npm install
npm run build
```

# Dev env

```text
npm run dev
```

# Test

To run the unit tests 
```text
npm run test
```

To run the e2e integration tests, you must provide test db. Host is assumed to be `localhost`
```text
TEST_DB=<db_name>, TEST_DB_PORT=<db_port> npm run e2e-test
```


# Prod 

Remember to run `npm run build` before.

```text
npm start
```
