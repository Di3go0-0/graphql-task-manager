# GraphQL Task Manager

A task management application built with NestJS, GraphQL and PostgreSQL.

## 🚀 Quick Start with Docker

### Prerequisites
- Docker
- Docker Compose
- Make (optional)

### 1. Setup environment variables
```bash
cp api/.env.example .env
# Edit .env if needed
```

### 2. Start services
```bash
# Using Make (recommended)
make up

# Or using Docker Compose directly
docker-compose up -d
```

### 3. Access the application
- **GraphQL Playground**: http://localhost:3000/graphql
- **Database**: localhost:5432

## 🛠️ Available Commands

### Make commands
```bash
make help          # Show all available commands
make up            # Start all services
make down          # Stop all services
make logs          # View logs in real time
make dev           # Start in development mode (with rebuild)
make test          # Run tests
make test:cov      # Run tests with coverage
make lint          # Run linting
make clean         # Clean completely (containers, images, volumes)
make shell         # Access API container shell
make db:shell      # Access database
```

### Docker Compose commands
```bash
docker-compose up -d                    # Start services
docker-compose down                     # Stop services
docker-compose logs -f                  # View logs
docker-compose exec api npm test        # Run tests
docker-compose exec api sh              # API shell
docker-compose exec postgres psql ...   # Access DB
```

## 🧪 Running Tests

### Inside Docker container
```bash
make test                # Basic tests
make test:watch          # Tests in watch mode
make test:cov            # Tests with coverage
```

### Local (from api/ directory)
```bash
cd api
npm test
npm run test:watch
npm run test:cov
```

## 📊 Architecture

### Services
- **api**: NestJS application with GraphQL (port 3000)
- **postgres**: PostgreSQL database (port 5432)

### Project structure
```
├── api/                    # NestJS application
│   ├── src/
│   │   └── modules/
│   │       └── task/      # Task module
│   ├── sql/
│   │   └── script.sql     # Initialization script
│   ├── Dockerfile
│   └── package.json
├── compose.yaml           # Docker Compose configuration
├── Makefile              # Useful commands
└── README.md             # This file
```

## 🔧 Environment Variables

### api/.env
- `DB_NAME`: Database name (default: task_manager)
- `DB_USER`: PostgreSQL user (default: postgres)
- `DB_PASSWORD`: Database password (default: password123)
- `DB_PORT`: Database port (default: 5432)
- `API_PORT`: API port (default: 3000)
- `SECRET_KEY`: Secret key for JWT

## 🐛 Troubleshooting

### Common issues
1. **Port already in use**: Change port in .env
2. **Database connection failed**: Make sure postgres is healthy (`make logs`)
3. **Build fails**: Rebuild with `make rebuild`

### Restart everything
```bash
make clean
make up
```

## 📚 GraphQL Queries

### Get all tasks
```graphql
query {
  tasks {
    id
    title
    description
    completed
    created_at
    updated_at
  }
}
```

### Create task
```graphql
mutation {
  createTask(input: { title: "New task", description: "Description" }) {
    id
    title
    completed
  }
}
```

### Mark as completed
```graphql
mutation {
  completeTask(id: "task-id") {
    id
    title
    completed
  }
}
```

### Delete task
```graphql
mutation {
  deleteTask(id: "task-id")
}
```