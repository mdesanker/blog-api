# Blog API

A RESTful API for a blogging site with basic user authentication with JWT. Passwords are stored as hashes using bcryptjs. Users can create, read, update, and delete posts and comments. Users can leave likes on posts.

This API interfaces with a MongoDB database.

## How to set up

```bash
git clone git@github.com:mdesanker/blog-api.git
cd blog-api
npm install
npm run server start
```

## Built with

- Express/NodeJS
- bcryptjs
- Express-validator
- JSONWebToken
- Mongoose
