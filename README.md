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

2. Enter the project directory:

   ```bash
   cd blog-api
   ```

3. Install the required dependencies:

   ```bash
   npm install
   ```

4. Set up your environment variables by creating a `.env` file in the root directory. Ensure it contains your MongoDB connection URI in the format `dev_db_url="your_connection_string"`

5. Launch the development server:

   ```bash
   npm run serverstart
   ```

Visit the application in your browser at `http://localhost:8000`.

## Building for Production

For deployment in a production environment:

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
- [Passport.js](http://www.passportjs.org/) for user authentication procedures.
- [bcrypt](https://www.npmjs.com/package/bcrypt) for secure password hashing.
- [dotenv](https://www.npmjs.com/package/dotenv) to handle environment variables.

---
