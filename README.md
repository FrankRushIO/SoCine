# SoCine

My final project for the Decode/Concordia boootcamp

My name is Francis Ruscio and this is my final project for my bootcamp.

This app uses user login identfication (auth), external API (The Movie Database) and an external server (MongoDB) .

Basic functions:

- User authentification with Auth0

- Registration to the app with data sent to MongoDB

- Movies querries made with TMDB API

  - User can search any movie from the API, search will return a list of movies that are matches the querry.
  - The user can click any movies and it will direct them to a page with loads of details about it (Release date, genres, synopsis and more).

- Movie recommendation based on 3 different algorithms.

  - The first based on movies that are liked by the user
  - The second one based on the favorite genre of the user
  - The third based on popular movies at the moment
    The algorithm chooses 3 for each recommendation categories at random every time so the user can have unlimited recommendations

- User interaction
  - A user can search for other user and follow them
  - Every profile has a wall which users can leave comments on
