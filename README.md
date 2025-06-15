# Class Base API Boilerplate

## Requirements

- Node.js **18+**

## How to install

### Using Github

1.  Clone the project from github. Change "myproject" to your project name.

```bash
git clone <Git URL> ./myproject
```

### Install npm dependencies after installing (Git or manual download)

```bash
cd myproject
npm install
```

### Setting up environments (development or production)

1.  In the root this repository you will find a file named `.env.example`
2.  Create a new file by copying and pasting the file and then renaming it to just `.env`
3.  The file `.env` is already ignored, so you never commit your credentials.
4.  Change the values of the file to your environment (development or production)
5.  Upload the `.env` to your environment server(development or production)
6.  If you use the postman collection to try the endpoints, change value of the variable `server` on your environment to the url of your server, for development mode use <http://localhost:3000>

### Running in development mode (lifting API server)

```bash
npm run dev
```

You will know server is running by checking the output of the command `npm run dev`

```bash
2024-10-17T11:47:27.648Z info: Starting Server.
2024-10-17T11:47:27.650Z info: Port: 8000
2024-10-17T11:47:27.651Z info: NODE_ENV: development
2024-10-17T11:47:27.651Z info: Database Status: Connected!
```

### Running in Production mode (lifting API server)

```bash
npm run start
```

You will know server is running by checking the output of the command `npm run start`

```bash
2024-10-17 17:21:20 [info] Starting Server.
2024-10-17 17:21:20 [info] Port: 8000
2024-10-17 17:21:20 [info] NODE_ENV: production
2024-10-17 17:21:20 [info] Database Status: Connected!
```
