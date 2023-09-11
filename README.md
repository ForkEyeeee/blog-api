---

# Blog API

A blog created with MongoDB, a Node.js (Express.js) back-end, and a React.js front-end leveraging Chakra UI.

## Setup and Installation

Run this blog API on your local setup by following the outlined steps.

### Prerequisites

Ensure [Node.js](https://nodejs.org/en/download/) and [npm](http://npmjs.com) are installed on your machine.

### Steps

1. Clone the project repository:

   ```bash
   git clone https://github.com/ForkEyeee/blog-api
   ```

2. Install dependencies for the client:

   ```bash
   cd blog-api/client
   npm install
   ```

3. Install dependencies for the server:

   ```bash
   cd ../server
   npm install
   ```

4. Set up your environment variables by creating a `.env` file in the `server` directory. Ensure it contains your MongoDB connection URI in the format `dev_db_url="your_connection_string"`

5. Navigate to the `server` directory and launch the server:

   ```bash
   npm run serverstart
   ```

6. In a separate terminal, navigate to the `client` directory and launch the client development server:

   ```bash
   cd path/to/blog-api/client
   npm run dev
   ```

Visit the application in your browser at `http://localhost:5173`.

## Building for Production

To prepare the client for deployment in a production environment:

1. Navigate to the `client` directory:

   ```bash
   cd path/to/blog-api/client
   ```

2. Build the application:

   ```bash
   npm run build
   ```

## Technology Stack

- [Node.js](https://nodejs.org/en/) for a stable runtime environment.
- [Express](https://expressjs.com/) for efficient server utilities.
- [React](https://reactjs.org/) for building the user interface.
- [Chakra UI](https://chakra-ui.com/) for a modular, accessible component library.
- [MongoDB](https://www.mongodb.com/) as the chosen NoSQL database.
- [Mongoose](https://mongoosejs.com/) for object data modeling and DB actions.
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) for generating and verifying JSON web tokens.
- [bcrypt](https://www.npmjs.com/package/bcrypt) for secure password hashing.
- [dotenv](https://www.npmjs.com/package/dotenv) to handle environment variables.

---
