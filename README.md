# 🎬 CineLog - Movie Tracking Application

A full-stack movie tracking application built with React, Express, MongoDB, and Docker. Track your favorite movies, create watchlists, rate films, and manage your viewing history.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)

---

## 📋 Features

- **User Authentication** - Secure registration and login with JWT
- **Browse Movies** - Explore a curated collection of movies
- **Search** - Find movies by title, director, or genre
- **Filter & Sort** - Filter by genre and year, sort by rating, title or release year
- **Pagination** - Browse movies page by page
- **Rate Movies** - Give movies a 1-10 star rating
- **Watchlist** - Save movies to watch later
- **Watched List** - Track movies you've already seen
- **Admin Panel** - Administrators can add, edit and delete movies
- **Responsive Design** - Beautiful UI that works on all devices

---

## 👥 User Stories

### Authentication
- **As a new user**, I want to register an account so that I can start tracking movies
- **As a registered user**, I want to log in securely so that I can access my personal movie lists
- **As a logged-in user**, I want to log out so that my account stays secure

### Movie Discovery
- **As a movie enthusiast**, I want to browse all available movies so that I can discover new films
- **As a user**, I want to search for movies by title, director, or genre so that I can quickly find specific films
- **As a user**, I want to filter movies by genre and year so that I can narrow down my search
- **As a user**, I want to sort movies by rating, title, or release year so that I can find the best films
- **As a user**, I want to view detailed information about a movie so that I can decide if I want to watch it

### Rating & Reviews
- **As a user**, I want to rate movies on a 1-10 scale so that I can remember how much I enjoyed them
- **As a user**, I want to see my previous ratings so that I can track my preferences over time

### List Management
- **As a user**, I want to add movies to my watchlist so that I can remember films I want to see
- **As a user**, I want to mark movies as watched so that I can track what I've already seen
- **As a user**, I want to remove movies from my lists so that I can keep them organized
- **As a user**, I want to see all my watchlist and watched movies in one place so that I can manage my viewing easily

### Admin
- **As an admin**, I want to add new movies to the catalogue so that users have fresh content to discover
- **As an admin**, I want to edit existing movie information so that the catalogue stays accurate
- **As an admin**, I want to delete movies from the catalogue so that I can remove outdated entries

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
- **bcryptjs** - Password hashing

### Database
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB

### Testing
- **Jest** - Testing framework
- **Supertest** - HTTP integration testing
- **ts-jest** - TypeScript support for Jest
- **mongodb-memory-server** - In-memory MongoDB for tests

### DevOps
- **Docker** - Containerization
- **docker-compose** - Multi-container orchestration

---

## 🏗️ Architecture

### System Architecture (C4 - Container Diagram)

```mermaid
graph TB
    subgraph "CineLog System"
        User[User/Browser]
        Admin[Admin/Browser]
        
        subgraph "Frontend Container"
            React[React + ViteTypeScript]
        end
        
        subgraph "Backend Container"
            API[Express APITypeScriptJWT Auth]
        end
        
        subgraph "Database Container"
            MongoDB[(MongoDBMongoose)]
        end
    end
    
    User -->|HTTP/HTTPS| React
    Admin -->|HTTP/HTTPS| React
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
        boolean isAdmin
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

Make sure you have the following installed on your system:
- [Docker Desktop](https://www.docker.com/products/docker-desktop) - **Required**
- [Git](https://git-scm.com/) - **Required**

**Note:** You do NOT need to install Node.js or MongoDB separately. Docker will handle everything.

### Step-by-Step Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/caglar422/cinelog.git
cd cinelog
```

#### 2. Start Docker Desktop
Make sure Docker Desktop is running on your computer before proceeding.

#### 3. Build and Start All Services
```bash
docker-compose up --build
```

**Wait for all services to start.** You should see:
- ✅ `cinelog-mongo` - MongoDB database
- ✅ `cinelog-backend` - Express API server
- ✅ `cinelog-frontend` - React frontend

This may take 2-5 minutes on the first run.

#### 4. Seed the Database (Required)

**Open a NEW terminal window** (keep the first one running) and execute:

```bash
docker exec -it cinelog-backend npm run seed
```

#### 5. Access the Application

Open your browser and navigate to:
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000/api/health

#### 6. Create an Account and Start Using

1. Click **Register** on the login page
2. Create a new account
3. Start browsing and rating movies!

---

### Admin Access

To access the Admin Panel:
1. Register a new account or log in
2. In MongoDB Atlas (or your database), set `isAdmin: true` on the desired user
3. Log out and log back in
4. The **Admin Panel** link will appear in the navbar

---

### Stopping the Application

Press `Ctrl + C` in the terminal where `docker-compose` is running, or run:

```bash
docker-compose down
```

### Restarting the Application

```bash
docker-compose up
```

**Note:** You only need to run `--build` and seed the database on the first run.

---

### Troubleshooting

**Problem:** "Port 5173 is already in use"
```bash
docker-compose down
docker-compose up
```

**Problem:** "Cannot connect to MongoDB"
- Make sure Docker Desktop is running
- Try restarting Docker Desktop

**Problem:** "No movies showing"
- You forgot to seed the database! Run step 4 again.

**Problem:** Fresh start (delete everything)
```bash
docker-compose down -v
docker-compose up --build
docker exec -it cinelog-backend npm run seed
```

---

## 📂 Project Structure
cinelog/
├── backend/                # Backend API
│   ├── src/
│   │   ├── tests/      # Jest unit & integration tests
│   │   ├── controllers/    # Request handlers
│   │   ├── middleware/     # Auth & admin middleware
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
- `GET /api/movies` - Get all movies (with pagination, filtering & sorting)
- `GET /api/movies/:id` - Get movie details
- `POST /api/movies` - Add new movie *(Admin only)*
- `PUT /api/movies/:id` - Update movie *(Admin only)*
- `DELETE /api/movies/:id` - Delete movie *(Admin only)*

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

## 🧪 Testing

The project includes unit and integration tests for the backend using Jest and Supertest.

### Run Tests
```bash
cd backend
npm test
```

### Test Coverage
```bash
cd backend
npm run test:coverage
```

### What's Tested
- **Movie endpoints** - GET, POST, PUT, DELETE operations
- **Auth endpoints** - Register and login flows
- **Admin middleware** - Access control for admin-only routes
- **Error handling** - 401, 403, 404 responses

---

## 🎯 Usage

1. **Register** - Create a new account
2. **Login** - Sign in with your credentials
3. **Browse Movies** - Explore the movie collection
4. **Filter & Sort** - Filter by genre/year, sort by rating/title/year
5. **Rate Movies** - Click stars to rate 1-10
6. **Add to Watchlist** - Save movies to watch later
7. **Mark as Watched** - Track movies you've seen
8. **Search** - Find specific movies
9. **Admin Panel** - Add, edit or delete movies *(Admin only)*

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

## 📝 Environment Variables

### Backend (.env)
PORT=5000
MONGO_URI=mongodb://mongo:27017/cinelog
JWT_SECRET=your_super_secret_key_change_this_in_production

---

## 🌟 Future Enhancements

- [ ] Movie recommendations based on ratings
- [ ] Social features (share lists with friends)
- [ ] Integration with external movie APIs (TMDB)
- [ ] Password reset functionality
- [ ] User profile page
- [ ] Dark/Light theme toggle
- [ ] Mobile app

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Author

**Caglar**
- GitHub: [@caglar422](https://github.com/caglar422)

---

**Made with ❤️ and TypeScript**