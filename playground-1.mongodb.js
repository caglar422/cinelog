use('cinelog');

db.getCollection('movies').insertMany([
  {
    "title": "Inception",
    "year": 2010,
    "genre": "Sci-Fi",
    "director": "Christopher Nolan",
    "rating": 8.8
  },
  {
    "title": "Interstellar",
    "year": 2014,
    "genre": "Sci-Fi",
    "director": "Christopher Nolan",
    "rating": 8.7
  },
  {
    "title": "The Dark Knight",
    "year": 2008,
    "genre": "Action",
    "director": "Christopher Nolan",
    "rating": 9.0
  },
  {
    "title": "Fight Club",
    "year": 1999,
    "genre": "Drama",
    "director": "David Fincher",
    "rating": 8.8
  },
  {
    "title": "The Matrix",
    "year": 1999,
    "genre": "Sci-Fi",
    "director": "Wachowski Sisters",
    "rating": 8.7
  },
  {
    "title": "Parasite",
    "year": 2019,
    "genre": "Thriller",
    "director": "Bong Joon-ho",
    "rating": 8.5
  },
  {
    "title": "Gladiator",
    "year": 2000,
    "genre": "Historical",
    "director": "Ridley Scott",
    "rating": 8.5
  },
  {
    "title": "Whiplash",
    "year": 2014,
    "genre": "Drama",
    "director": "Damien Chazelle",
    "rating": 8.5
  },
  {
    "title": "Joker",
    "year": 2019,
    "genre": "Crime",
    "director": "Todd Phillips",
    "rating": 8.4
  },
  {
    "title": "Dune",
    "year": 2021,
    "genre": "Sci-Fi",
    "director": "Denis Villeneuve",
    "rating": 8.0
  }
]);