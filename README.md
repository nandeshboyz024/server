# Server

This server is built using Node.js and Express.js as part of the MERN (MongoDB, Express.js, React.js, Node.js) stack. The database is managed using MongoDB hosted on MongoDB Atlas, and the APIs are created and hosted on Render.

## Technologies Used

- Node.js for server-side JavaScript runtime.
- Express.js for building the server and handling HTTP requests.
- MongoDB for the database, managed using MongoDB Atlas.
- Render for hosting the server and APIs.

## Getting Started

To run this server locally or deploy it:

1. Clone the repository:

```bash
git clone https://github.com/nandeshboyz024/server.git
```

2. Install dependencies:
```bash
cd server
npm install
```
3. Set up environment variables:
create a '.env' file int the root directory and add the following variables:

```bash
PORT = 3000
MONGO_URI = your-mongodb-uri
```

Replace 'your-mongodb-uri' with your MongoDB atlas connection string.

5. Start the server:

```bash
npm start
```

your server should now be running on 'http://localhost:3000'.

6. you can show frontend connected to this backend server [here](https://nandeshboyz-dashboard.netlify.app/).
