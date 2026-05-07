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

---

## 👥 User Stories

### Authentication
- **As a new user**, I want to register an account so that I can start tracking movies
- **As a registered user**, I want to log in securely so that I can access my personal movie lists
- **As a logged-in user**, I want to log out so that my account stays secure

### Movie Discovery
- **As a movie enthusiast**, I want to browse all available movies so that I can discover new films
- **As a user**, I want to search for movies by title, director, or genre so that I can quickly find specific films
- **As a user**, I want to view detailed information about a movie so that I can decide if I want to watch it

### Rating & Reviews
- **As a user**, I want to rate movies on a 1-10 scale so that I can remember how much I enjoyed them
- **As a user**, I want to see my previous ratings so that I can track my preferences over time

### List Management
- **As a user**, I want to add movies to my watchlist so that I can remember films I want to see
- **As a user**, I want to mark movies as watched so that I can track what I've already seen
- **As a user**, I want to remove movies from my lists so that I can keep them organized
- **As a user**, I want to see all my watchlist and watched movies in one place so that I can manage my viewing easily

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

---

## 🏗️ Architecture

### System Architecture (C4 - Container Diagram)

```mermaid
graph TB
    subgraph "CineLog System"
        User[User/Browser]
        
        subgraph "Frontend Container"
            React[React + Vite<br/>TypeScript]
        end
        
        subgraph "Backend Container"
            API[Express API<br/>TypeScript<br/>JWT Auth]
        end
        
        subgraph "Database Container"
            MongoDB[(MongoDB<br/>Mongoose)]
        end
    end
    
    User -->|HTTP/HTTPS| React
    React -->|REST API Calls| API
    API -->|Read/Write| MongoDB
    
    style React fill:#61DAFB,stroke:#333,stroke-width:2px,color:#000
    style API fill:#68A063,stroke:#333,stroke-width:2px,color:#fff
    style MongoDB fill:#4DB33D,stroke:#333,stroke-width:2px,color:#fff
```

### Database Schema (ERD)

```mermaid
erDiagram
    USER ||--o{ RATING : creates
    USER ||--o{ WATCHLIST : maintains
    USER ||--o{ WATCHED : tracks
    MOVIE ||--o{ RATING : receives
    MOVIE ||--o{ WATCHLIST : appears_in
    MOVIE ||--o{ WATCHED : appears_in
    
    USER {
        ObjectId _id PK
        string username
        string email
        string password
        date createdAt
    }
    
    MOVIE {
        ObjectId _id PK
        string title
        string[] genres
        number year
        string director
        string poster
        string plot
        number runtime
        number rating
    }
    
    RATING {
        ObjectId _id PK
        ObjectId userId FK
        ObjectId movieId FK
        number score
        date createdAt
    }
    
    WATCHLIST {
        ObjectId _id PK
        ObjectId userId FK
        ObjectId movieId FK
        date addedAt
    }
    
    WATCHED {
        ObjectId _id PK
        ObjectId userId FK
        ObjectId movieId FK
        date watchedAt
    }
```

### Data Flow Diagram

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant A as API/Backend
    participant D as MongoDB
    
    U->>F: 1. Register/Login
    F->>A: POST /api/auth/login
    A->>D: Verify credentials
    D-->>A: User data
    A-->>F: JWT Token
    F-->>U: Redirect to Movies
    
    U->>F: 2. Browse Movies
    F->>A: GET /api/movies
    A->>D: Fetch movies
    D-->>A: Movie list
    A-->>F: JSON response
    F-->>U: Display movies
    
    U->>F: 3. Rate Movie (★★★★★)
    F->>A: POST /api/ratings (JWT)
    A->>D: Save rating
    D-->>A: Success
    A-->>F: Rating saved
    F-->>U: Update UI
    
    U->>F: 4. Add to Watchlist
    F->>A: POST /api/watchlist (JWT)
    A->>D: Add to watchlist
    D-->>A: Success
    A-->>F: Confirmation
    F-->>U: Added to list
```

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
---

## 📸 Screenshots

### Login Page
![Login](screenshots/login.png)

### Register Page
![Register](screenshots/register.png)

### Movies Page
![Movies](screenshots/movies.png)

### Watchlist
![Watchlist](screenshots/watchlist.png)

### Watched Movies
![Watched](screenshots/watchedmovies.png)

---

## 🙏 Acknowledgments

- Movie posters from [OMDB API](http://www.omdbapi.com/)
- Icons from [Lucide Icons](https://lucide.dev/)
- Inspiration from IMDb and Letterboxd

---

**Made with ❤️ and TypeScript**