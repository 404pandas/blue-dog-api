# Blue Dog API

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Contributors](https://img.shields.io/github/contributors/404pandas/blue-dog-api.svg?style=plastic&logo=appveyor)](https://github.com/404pandas/blue-dog-api/graphs/contributors)
[![Forks](https://img.shields.io/github/forks/404pandas/blue-dog-api.svg?style=plastic&logo=appveyor)](https://github.com/404pandas/blue-dog-api/network/members)
[![Stargazers](https://img.shields.io/github/stars/404pandas/blue-dog-api.svg?style=plastic&logo=appveyor)](https://github.com/404pandas/blue-dog-api/stargazers)
[![Issues](https://img.shields.io/github/issues/404pandas/blue-dog-api.svg?style=plastic&logo=appveyor)](https://github.com/404pandas/blue-dog-api/issues)
[![LinkedIn](https://img.shields.io/badge/-LinkedIn-black.svg?style=plastic&logo=appveyor&logo=linkedin&colorB=555)](https://linkedin.com/in/404pandas)

</div>

<div align="center">
  <a href="https://github.com/404pandas/blue-dog-api">
    <img src="./client/src/assets/Bluey_Wave.webp" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Blue Dog API</h3>

  <p align="center">
Bluey API with a styled front end and games for my daughter to play    <br />
    <a href="https://github.com/404pandas/blue-dog-api"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/404pandas/blue-dog-api">View Demo(Under development)</a>
    ·
    <a href="https://github.com/404pandas/blue-dog-api/issues">Report Bug</a>
    ·
    <a href="https://github.com/404pandas/blue-dog-api/issues">Request Feature</a>
  </p>
</div>

## Table of Contents

- [About The Project](#about-the-project)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Installation](#installation)
- [Usage](#usage)
- [Routes](#routes)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Acknowledgments](#acknowledgments)
- [Resources Used](#resources-used)
- [Time Bluey Watched](#time-bluey-watched)

## About The Project

This project was built using the MERN stack and Apollo/GraphQL. It contains mutable data for a user integration, styled front end, and games.
It uses Materialize for a CSS framework.
It uses Mongoose as an ORM.
It will use Netlify for deployment.
It also makes use of packages JWT and Bcrypt.

### Built With

Technologies used:

- HTML
- CSS
- JavaScript
- Materialize
- MongoDB
- Express
- React
- Node.js
- npm
- VS Code
- Mongoose
- Concurrently
- JWT
- Bcrypt
- Dotenv
- Nodemon

## Getting Started

### Installation

1. Clone the repo  
   `git clone https://github.com/404pandas/blue-dog-api.git`

2. Install dependencies  
   `npm install`

3. Run the development server  
   `npm run develop`

## Usage

Once the app is running, you can navigate to the front end and interact with the Bluey API or play the built-in games.

## Routes

### Character Routes

- `GET /api/characters` - Get all characters
- `GET /api/characters/:id` - Get a character by ID
- `POST /api/characters` - Create a new character (protected)
- `PUT /api/characters/:id` - Update a character (protected)
- `DELETE /api/characters/:id` - Delete a character (protected)

### Episode Routes

- `GET /api/episodes` - Get all episodes
- `GET /api/episodes/:id` - Get an episode by ID
- `POST /api/episodes` - Create an episode (protected)
- `PUT /api/episodes/:id` - Update an episode (protected)
- `DELETE /api/episodes/:id` - Delete an episode (protected)

### Location Routes

- `GET /api/locations` - Get all locations
- `GET /api/locations/:id` - Get a location by ID

### Book Routes

- `GET /api/books` - Get all books

### User/Auth Routes

- `POST /api/users/signup` - Sign up
- `POST /api/users/login` - Log in
- `GET /api/users/me` - Get current user info (JWT required)

## Roadmap

- [x] Episode Names
- [x] Episode Descriptions
- [ ] Episode Lengths
- [x] Episode Characters
- [ ] Quotes
- [x] Character Names
- [x] Character Descriptions
- [ ] Character Images
- [x] Locations
- [ ] Location Images
- [ ] Episode Images
- [ ] Filter by Australian Content
- [x] Books
- [ ] Toys
- [ ] Garden gnomes
- [ ] Long Dog
- [ ] Songs
- [ ] Trivia- ask Trivia Bros for collab

See the [open issues](https://github.com/404pandas/blue-dog-api/issues) for a full list of proposed features (and known issues).

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Don't forget to give the project a star! Thanks again!

## License

This project is licensed under the MIT license.
See `LICENSE.txt` for more information.

## Contact

Mary Elenius - mary.panda.jackson@gmail.com  
Project Link: [https://github.com/404pandas/blue-dog-api](https://github.com/404pandas/blue-dog-api)  
Portfolios: [Javascript](https://404pandas.github.io) | [React](https://404pandas.github.io)

## Acknowledgments

- Yennefer — the mighty inspiration
- Friends and family for support
- [RapidAPI Guide](https://rapidapi.com/guides/build-api-publish-on-rapidapi)
- [RapidAPI Listing](https://rapidapi.com/)
- [GitHub](https://github.com/)
- [Netlify](https://www.netlify.com/)

## Resources Used

- https://www.bluey.tv/watch/
- https://blueypedia.fandom.com/wiki/Bluey_(TV_series)

## Time Bluey Watched

Current count: 167 full rewatch sessions
