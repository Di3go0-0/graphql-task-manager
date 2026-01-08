.PHONY: help up down logs build clean test test-watch test-cov lint clean dev db-reset shell db-shell

help:
	@echo "Available commands:"
	@echo "  make up         - Start all services"
	@echo "  make down       - Stop all services"
	@echo "  make logs       - Show logs"
	@echo "  make build      - Build/Rebuild containers"
	@echo "  make rebuild     - Force rebuild without cache"
	@echo "  make test       - Run tests in container"
	@echo "  make test-watch  - Run tests in watch mode"
	@echo "  make test-cov    - Run tests with coverage"
	@echo "  make lint        - Run linting in container"
	@echo "  make clean      - Remove containers, images, and volumes"
	@echo "  make dev        - Start development environment"
	@echo "  make shell      - Access API container shell"
	@echo "  make db-shell   - Access database"

up:
	docker-compose up -d

down:
	docker-compose down

logs:
	docker-compose logs -f

build:
	docker-compose build

rebuild:
	docker-compose build --no-cache

test:
	docker-compose exec api npm test

test-watch:
	docker-compose exec api npm run test:watch

test-cov:
	docker-compose exec api npm run test:cov

lint:
	docker-compose exec api npm run lint

clean:
	docker-compose down -v --rmi all --remove-orphans

dev:
	docker-compose up --build --force-recreate

# Database management
db-reset:
	docker-compose down postgres
	docker-compose up -d postgres
	@echo "Waiting for database to be ready..."
	@sleep 10
	docker-compose exec postgres psql -U $${DB_USER} -d $${DB_NAME} -f /docker-entrypoint-initdb.d/script.sql

# Shell access
shell:
	docker-compose exec api sh

db-shell:
	docker-compose exec postgres psql -U $${DB_USER} -d $${DB_NAME}