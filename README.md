# Node.js Backend Boilerplate (Class-based)

A simple, class-based Node.js API boilerplate for rapid backend development.

## Features

- Class-based controller and service structure
- MongoDB integration
- JWT authentication (generic, not Telegram-specific)
- Environment-based configuration
- Ready for Docker and deployment
- Easily extendable for new features

## Requirements

- Node.js **18+**
- MongoDB instance (local or remote)
- (Optional) Redis for caching

## Getting Started

### 1. Clone the repository

```bash
git clone <Git URL> ./myproject
cd myproject
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

1. Copy `.env.example` to `.env`:
    ```bash
    cp .env.example .env
    ```
2. Edit `.env` and set your configuration (MongoDB URI, JWT secret, etc).

### 4. Run the server

#### Development mode

```bash
npm run dev
```

#### Production mode

```bash
npm start
```

### 5. API Usage

- The API runs by default on `http://localhost:8000`
- Use tools like Postman to test endpoints.
- Update the `server` variable in your Postman environment to match your API URL.

## Project Structure

```
src/
  controllers/
  models/
  services/
  lib/
.env.example
README.md
```

## Example Output

```bash
2025-06-15T11:47:27.648Z info: Starting Server.
2025-06-15T11:47:27.650Z info: Port: 8000
2025-06-15T11:47:27.651Z info: NODE_ENV: development
2025-06-15T11:47:27.651Z info: Database Status: Connected!
```

## License

