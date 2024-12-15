const express = require('express');
const { OAuth2Client } = require('google-auth-library');
const mysql = require('mysql2/promise');
const nodemailer = require('nodemailer');
const session = require('express-session');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const app = express();
const port = 3000;

// Google OAuth configuration
const CLIENT_ID = '567415681815-i6moe0op910cj1a6gkvc04l712esj6t5.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'http://localhost:3000/oauth-callback'; 

// MySQL database connection
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root', // Replace with your MySQL username
    password: '', // Replace with your MySQL password
    database: 'user_db', // Replace with your database name
});

// Nodemailer configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'alcaide.krishamae.bscs2022@gmail.com', // Your Gmail address
        pass: 'itsp iyjw bmmw qguf', // Your app-specific password
    },
});

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
}));

// Initialize Google OAuth client
const client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

// OAuth2 callback route
app.get('/oauth-callback', async (req, res) => {
    const { code } = req.query;
    if (!code) return res.status(400).send('No code parameter found in the URL.');

    try {
        const { tokens } = await client.getToken(code);
        client.setCredentials(tokens);
        
        const ticket = await client.verifyIdToken({
            idToken: tokens.id_token,
            audience: CLIENT_ID,
        });

        const googleUser = ticket.getPayload();
        const email = googleUser.email;
        const name = googleUser.name;

        // Check if user exists in the database
        const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        const user = rows[0];

        if (user) {
            // User exists, log them in
            req.session.user_id = user.id;
            req.session.role = user.role;
            return user.is_verified ? res.redirect('/index') : res.redirect('/unverified');
        } else {
            // User does not exist, create a new user
            const verification_code = crypto.randomBytes(16).toString('hex');
            await pool.query('INSERT INTO users (fullname, email, is_verified, verification_code) VALUES (?, ?, FALSE, ?)', [name, email, verification_code]);

            // Send verification email
            await sendVerificationEmail(email, verification_code);

            req.session.user_id = (await pool.query('SELECT LAST_INSERT_ID()'))[0][0]['LAST_INSERT_ID()'];
            req.session.role = 'client'; // Default role
            return res.redirect('/unverified');
        }
    } catch (error) {
        console.error('Error during OAuth callback:', error);
        return res.status(500).send('Internal Server Error');
    }
});

// Function to send verification email
async function sendVerificationEmail(email, verification_code) {
    const mailOptions = {
        from: 'alcaide.krishamae.bscs2022@gmail.com',
        to: email,
        subject: 'Email Verification',
        html: `Please click the link below to verify your email address: <a href='http://localhost:3000/verify-email?code=${verification_code}'>Verify Email</a>`,
    };

    await transporter.sendMail(mailOptions);
}

// Email verification route
app.get('/verify-email', async (req, res) => {
    const { code } = req.query;

    if (!code) return res.status(400).send('Verification code is missing.');

    try {
        const [rows] = await pool.query('SELECT * FROM users WHERE verification_code = ?', [code]);
        const user = rows[0];

        if (user) {
            await pool.query('UPDATE users SET is_verified = TRUE WHERE id = ?', [user.id]);
            return res.send('Email verified successfully!');
        } else {
            return res.status(400).send('Invalid or expired verification code.');
        }
    } catch (error) {
        console.error('Error verifying email:', error);
        return res.status(500).send('Internal Server Error');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
