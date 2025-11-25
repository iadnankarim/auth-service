# Docker Setup for Auth Service

## PostgreSQL Container Setup

### Step 1: Pull PostgreSQL Image
```bash
docker pull postgres
```

### Step 2: Create and Run PostgreSQL Container
```bash
docker run -d \
  --name postgres_container \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=121547 \
  -e POSTGRES_DB=postgres \
  -p 5432:5432 \
  postgres
```

### Step 3: Verify Container is Running
```bash
docker ps
```

### Step 4: Connect to PostgreSQL (Optional)
```bash
docker exec -it postgres_container psql -U postgres
```

## TypeORM Setup

### Step 1: Install TypeORM and PostgreSQL Driver
```bash
npm install typeorm reflect-metadata pg
```

### Step 2: Configure tsconfig.json
`tsconfig.json` mai ye options enable karo:
```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

### Step 3: Create Data Source Configuration
`src/config/data-source.ts` file create karo:
```typescript
import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "../entity/User.js"
import { Config } from "./index.js"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: Config.DB_HOST,
    port: Number(Config.DB_PORT),
    username: Config.DB_USERNAME,
    password: Config.DB_PASSWORD,
    database: Config.DB_NAME,
    synchronize: Config.NODE_ENV === 'test' || Config.NODE_ENV === 'dev',
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
})
```

> **Note:** `synchronize: true` sirf development/test mai use karo, production mai migrations use karo.

### Step 4: Create Entity
`src/entity/User.ts` file create karo:
```typescript
import { Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
}
```

### Step 5: Initialize DataSource in App
```typescript
import { AppDataSource } from "./config/data-source.js"

AppDataSource.initialize()
    .then(() => {
        console.log("Database connected successfully")
    })
    .catch((error) => console.log(error))
```

## Application Container Setup

### Build the Application Image
```bash
docker build -t auth-service -f docker/dev/Dockerfile .
```

### Run the Application Container
```bash
docker run -d \
  --name auth-service \
  -p 5501:5501 \
  -e NODE_ENV=dev \
  -e DB_HOST=host.docker.internal \
  -e DB_PORT=5432 \
  -e DB_USERNAME=postgres \
  -e DB_PASSWORD=121547 \
  -e DB_NAME=postgres \
  auth-service
```

> **Note:** `host.docker.internal` is used to connect to PostgreSQL running on the host machine from inside the Docker container.

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| DB_HOST | PostgreSQL host | localhost |
| DB_PORT | PostgreSQL port | 5432 |
| DB_USERNAME | Database username | postgres |
| DB_PASSWORD | Database password | 121547 |
| DB_NAME | Database name | postgres |
| NODE_ENV | Environment (dev/test/production) | - |
| PORT | Application port | 5501 |

## Useful Docker Commands

```bash
# Stop container
docker stop postgres_container

# Start container
docker start postgres_container

# Remove container
docker rm postgres_container

# View logs
docker logs postgres_container

# List all containers
docker ps -a
```


## Summary - Steps Completed

### PostgreSQL Container Setup
1. Image pull karna
2. Container run karna
3. Verify karna

### TypeORM Setup
1. Install packages - typeorm, reflect-metadata, pg
2. tsconfig.json configuration - decorators enable karna
3. Data Source configuration - PostgreSQL connection setup
4. Entity creation - User entity with decorators
5. DataSource initialization - App mai database connect karna

### Application Container Setup
1. Build the application image
2. Run the application container

### Environment Variables
- Table format mai saare variables documented

### Useful Docker Commands
- Stop, start, remove, logs commands



<!-- Done! Ab end mai ek Summary - Steps Completed section add kar diya hai jisme saare steps properly arrange hain:
PostgreSQL Container Setup (3 steps)
TypeORM Setup (5 steps)
Application Container Setup (2 steps)
Environment Variables
Useful Docker Commands -->