# 🎬 CineLog - Movie Tracking Application

A full-stack movie tracking application built with React, Express, MongoDB, and Docker. Track your favorite movies, create watchlists, rate films, and manage your viewing history.

![CineLog](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)

---

## 📋 Features

- **User Authentication** - Secure registration and login with JWT
- **Browse Movies** - Explore a curated collection of movies
- **Search** - Find movies by title, director, or genre
- **Rate Movies** - Give movies a 1-10 star rating
- **Watchlist** - Save movies to watch later
- **Watched List** - Track movies you've already seen
- **Responsive Design** - Beautiful UI that works on all devices

---

## 🛠️ Tech Stack

### Frontend
- **React** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **TypeScript** - Type-safe JavaScript
- **JWT** - Authentication
- **bcrypt** - Password hashing

### Database
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB

### DevOps
- **Docker** - Containerization
- **docker-compose** - Multi-container orchestration

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v20+)
- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- [Git](https://git-scm.com/)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/caglar422/cinelog.git
cd cinelog
```

2. **Start the application with Docker**
```bash
docker-compose up --build
```

3. **Seed the database with sample movies**

Open a new terminal and run:
```bash
docker exec -it cinelog-backend npm run seed
```

4. **Access the application**
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000
- MongoDB: localhost:27017

---

## 📂 Project Structure
cinelog/
├── backend/                # Backend API
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── middleware/     # Auth middleware
│   │   ├── models/         # MongoDB schemas
│   │   ├── routes/         # API routes
│   │   ├── seed/           # Sample movie data
│   │   ├── db.ts           # Database connection
│   │   └── index.ts        # App entry point
│   ├── Dockerfile
│   └── package.json
│
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── types/          # TypeScript types
│   │   └── App.tsx         # Main app component
│   ├── Dockerfile
│   └── package.json
│
├── docker-compose.yml      # Docker orchestration
└── README.md

---

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Movies
- `GET /api/movies` - Get all movies (with pagination)
- `GET /api/movies/search?q=query` - Search movies
- `GET /api/movies/:id` - Get movie details

### Ratings
- `POST /api/ratings` - Rate a movie
- `GET /api/ratings` - Get user's ratings
- `DELETE /api/ratings/:id` - Delete rating

### Watchlist
- `POST /api/watchlist` - Add to watchlist
- `GET /api/watchlist` - Get user's watchlist
- `DELETE /api/watchlist/:id` - Remove from watchlist

### Watched
- `POST /api/watched` - Mark as watched
- `GET /api/watched` - Get watched movies
- `DELETE /api/watched/:id` - Remove from watched

---

## 🎯 Usage

1. **Register** - Create a new account
2. **Login** - Sign in with your credentials
3. **Browse Movies** - Explore the movie collection
4. **Rate Movies** - Click stars to rate 1-10
5. **Add to Watchlist** - Save movies to watch later
6. **Mark as Watched** - Track movies you've seen
7. **Search** - Find specific movies

---

## 🐳 Docker Commands

```bash
# Start all services
docker-compose up

# Start in detached mode (background)
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs -f

# Rebuild containers
docker-compose up --build

# Remove all containers and volumes
docker-compose down -v
```

---

## 🧪 Development

### Run Backend Locally (without Docker)
```bash
cd backend
npm install
npm run dev
```

### Run Frontend Locally (without Docker)
```bash
cd frontend
npm install
npm run dev
```

---

## 🌟 Future Enhancements

- [ ] Movie recommendations based on ratings
- [ ] Social features (share lists with friends)
- [ ] Advanced search filters
- [ ] Movie reviews and comments
- [ ] Integration with external movie APIs (TMDB)
- [ ] Dark/Light theme toggle
- [ ] Email notifications
- [ ] Mobile app

---

## 📝 Environment Variables

### Backend (.env)
PORT=5000
MONGODB_URI=mongodb://mongo:27017/cinelog
JWT_SECRET=your_super_secret_key_change_this_in_production

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Author

**Your Name**
- GitHub: [@caglar422](https://github.com/caglar422)

---

## 🙏 Acknowledgments

- Movie posters from [OMDB API](http://www.omdbapi.com/)
- Icons from [Lucide Icons](https://lucide.dev/)
- Inspiration from IMDb and Letterboxd

---

**Made with ❤️ and TypeScript**