# Social Connect

A Facebook-like social media web application built with Node.js and Express.

## Features

- User registration and login
- Profile with bio, location, birthday, school, workplace
- Create posts (public or private)
- Like and comment on posts
- View other users' profiles
- Dark theme UI

## Running Locally

```bash
cd D:\ravi.repo\social-connect
npm install
npm start
```

Then open http://localhost:3000

## Tech Stack

- Node.js
- Express.js
- EJS (templating)
- Express-session (auth)
- bcryptjs (password hashing)
- UUID (unique IDs)

## Data Storage

Users and posts are stored in `data.json` file (JSON-based database)

## Deployment

### Option 1: Render.com (Recommended)

1. Push code to GitHub
2. Go to render.com → New Web Service
3. Connect your GitHub repo
4. Build Command: `npm install`
5. Start Command: `node app.js`
6. Deploy

### Option 2: Railway

1. Push code to GitHub
2. Go to railway.app → New Project
3. Connect GitHub repo
4. Deploy

### Option 3: Fly.io

1. Install Fly CLI
2. `fly launch`
3. `fly deploy`

## License

ISC