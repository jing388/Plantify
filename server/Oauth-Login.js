const express = require('express');
const { google } = require('googleapis');
const cookieSession = require('cookie-session');

const app = express();

// Set up session
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
  keys: ['your_cookie_secret'] // Replace with your own cookie secret
}));

// Google OAuth Configuration
const CLIENT_ID = '567415681815-i6moe0op910cj1a6gkvc04l712esj6t5.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'http://localhost:3000/oauth-callback';

const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

// Add scopes
const scopes = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile'
];

// Route to start OAuth
app.get('/auth/google', (req, res) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
  });
  res.redirect(authUrl);
});

// Callback route
app.get('/oauth-callback', async (req, res) => {
  const { code } = req.query;
  if (!code) {
    return res.status(400).send('No code provided');
  }

  try {
    // Get access token
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    req.session.tokens = tokens; // Save tokens in session

    // Get user information
    const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });
    const userInfo = await oauth2.userinfo.get();
    req.session.user = userInfo.data; // Save user info in session

    res.send(`Welcome, ${userInfo.data.name}! <br><a href="/">Home</a>`);
  } catch (error) {
    console.error('Error retrieving access token', error);
    res.status(500).send('Error retrieving access token');
  }
});

// Home route
app.get('/', (req, res) => {
  const user = req.session.user;
  if (user) {
    res.send(`Hello, ${user.name}! <br><a href="/auth/google">Logout</a>`);
  } else {
    res.send('<a href="/auth/google">Login with Google</a>');
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
 