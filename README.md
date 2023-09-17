---

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

5. Generate a hashed password using bcrypt.

6. In the `.env` file in the `server` directory, add your hashed password as the signature. The line should look like:

   ```
   signature="your_hashed_password"
   ```

7. Navigate to the `client/src/components` and `client/src/hooks` directories. Update any API call URLs to point to your own local server.

8. Navigate to the `server` directory and launch the server:

   ```bash
   npm run serverstart
   ```

9. In a separate terminal, navigate to the `client` directory and launch the client development server:

   ```bash
   cd path/to/blog-api/client
   npm run dev
   ```

Visit the application in your browser at the assigned localhost.

## Technology Stack

- [Chakra UI](https://chakra-ui.com/) for a modular, accessible component library.
- [MongoDB](https://www.mongodb.com/) as the chosen NoSQL database.
- [Mongoose](https://mongoosejs.com/) for object data modeling and DB actions.
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) for generating and verifying JSON web tokens.
- [bcrypt](https://www.npmjs.com/package/bcrypt) for secure password hashing.
- [dotenv](https://www.npmjs.com/package/dotenv) to handle environment variables.
---
