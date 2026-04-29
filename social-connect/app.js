const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = 'data.json';

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Session config
app.use(session({
  secret: 'social-connect-secret-key-2026',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));

// Data management
function loadData() {
  if (!fs.existsSync(DATA_FILE)) {
    const initialData = { users: [], posts: [], profiles: {} };
    fs.writeFileSync(DATA_FILE, JSON.stringify(initialData, null, 2));
    return initialData;
  }
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
}

function saveData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

function getCurrentUser(req) {
  if (!req.session.userId) return null;
  const data = loadData();
  return data.users.find(u => u.id === req.session.userId);
}

function requireLogin(req, res, next) {
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  next();
}

// Routes
app.get('/', (req, res) => {
  if (req.session.userId) {
    return res.redirect('/feed');
  }
  res.redirect('/login');
});

// Auth Routes
app.get('/register', (req, res) => {
  res.render('register', { user: null });
});

app.post('/register', async (req, res) => {
  const { username, email, password, fullname, bio, location, birthday, school, workplace } = req.body;
  const data = loadData();
  
  if (data.users.find(u => u.email === email || u.username === username)) {
    return res.render('register', { user: null, error: 'Username or email already exists' });
  }
  
  const hashedPassword = await bcrypt.hash(password, 10);
  const userId = uuidv4();
  
  const newUser = {
    id: userId,
    username,
    email,
    password: hashedPassword,
    fullname: fullname || username,
    createdAt: new Date().toISOString()
  };
  
  data.users.push(newUser);
  data.profiles[userId] = {
    bio: bio || '',
    location: location || '',
    birthday: birthday || '',
    school: school || '',
    workplace: workplace || '',
    website: '',
    relationship: ''
  };
  
  saveData(data);
  
  req.session.userId = userId;
  res.redirect('/profile');
});

app.get('/login', (req, res) => {
  res.render('login', { user: null, error: null });
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const data = loadData();
  
  const user = data.users.find(u => u.email === email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.render('login', { user: null, error: 'Invalid email or password' });
  }
  
  req.session.userId = user.id;
  res.redirect('/feed');
});

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

// Profile Routes
app.get('/profile', requireLogin, (req, res) => {
  const user = getCurrentUser(req);
  const data = loadData();
  const profile = data.profiles[user.id] || {};
  const userPosts = data.posts.filter(p => p.authorId === user.id).reverse();
  
  res.render('profile', { user, profile, posts: userPosts });
});

app.get('/profile/:id', requireLogin, (req, res) => {
  const data = loadData();
  const targetUser = data.users.find(u => u.id === req.params.id);
  
  if (!targetUser) {
    return res.redirect('/feed');
  }
  
  const profile = data.profiles[targetUser.id] || {};
  const userPosts = data.posts.filter(p => p.authorId === targetUser.id).reverse();
  const currentUser = getCurrentUser(req);
  
  res.render('profile-view', { 
    viewer: currentUser, 
    profileUser: targetUser, 
    profile, 
    posts: userPosts 
  });
});

app.post('/profile/update', requireLogin, (req, res) => {
  const user = getCurrentUser(req);
  const { fullname, bio, location, birthday, school, workplace, website, relationship } = req.body;
  const data = loadData();
  
  const userIndex = data.users.findIndex(u => u.id === user.id);
  if (userIndex !== -1) {
    data.users[userIndex].fullname = fullname || user.fullname;
  }
  
  if (!data.profiles[user.id]) {
    data.profiles[user.id] = {};
  }
  
  data.profiles[user.id] = {
    ...data.profiles[user.id],
    bio: bio || '',
    location: location || '',
    birthday: birthday || '',
    school: school || '',
    workplace: workplace || '',
    website: website || '',
    relationship: relationship || ''
  };
  
  saveData(data);
  res.redirect('/profile');
});

// Feed Routes
app.get('/feed', requireLogin, (req, res) => {
  const user = getCurrentUser(req);
  const data = loadData();
  
  const posts = data.posts
    .filter(p => p.authorId === user.id || !p.isPrivate)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .map(post => {
      const author = data.users.find(u => u.id === post.authorId);
      return { ...post, author };
    });
  
  res.render('feed', { user, posts });
});

app.post('/post', requireLogin, (req, res) => {
  const user = getCurrentUser(req);
  const { content, isPrivate } = req.body;
  
  if (!content || content.trim() === '') {
    return res.redirect('/feed');
  }
  
  const data = loadData();
  
  const newPost = {
    id: uuidv4(),
    content: content.trim(),
    authorId: user.id,
    authorName: user.fullname || user.username,
    createdAt: new Date().toISOString(),
    isPrivate: isPrivate === 'on',
    likes: [],
    comments: []
  };
  
  data.posts.push(newPost);
  saveData(data);
  
  res.redirect('/feed');
});

app.post('/post/:id/like', requireLogin, (req, res) => {
  const user = getCurrentUser(req);
  const data = loadData();
  
  const post = data.posts.find(p => p.id === req.params.id);
  if (post && !post.likes.includes(user.id)) {
    post.likes.push(user.id);
    saveData(data);
  }
  
  res.redirect('back');
});

app.post('/post/:id/comment', requireLogin, (req, res) => {
  const user = getCurrentUser(req);
  const { comment } = req.body;
  
  if (!comment || comment.trim() === '') {
    return res.redirect('back');
  }
  
  const data = loadData();
  const post = data.posts.find(p => p.id === req.params.id);
  
  if (post) {
    post.comments.push({
      id: uuidv4(),
      authorId: user.id,
      authorName: user.fullname || user.username,
      content: comment.trim(),
      createdAt: new Date().toISOString()
    });
    saveData(data);
  }
  
  res.redirect('back');
});

app.post('/post/:id/delete', requireLogin, (req, res) => {
  const user = getCurrentUser(req);
  const data = loadData();
  
  const postIndex = data.posts.findIndex(p => p.id === req.params.id && p.authorId === user.id);
  if (postIndex !== -1) {
    data.posts.splice(postIndex, 1);
    saveData(data);
  }
  
  res.redirect('/feed');
});

// Friends/Users List
app.get('/users', requireLogin, (req, res) => {
  const user = getCurrentUser(req);
  const data = loadData();
  
  const users = data.users.filter(u => u.id !== user.id).map(u => ({
    ...u,
    profile: data.profiles[u.id] || {}
  }));
  
  res.render('users', { user, users });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Social Connect running on http://localhost:${PORT}`);
});

module.exports = app;