const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 8080;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

// Database Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Mkbharvad@8080',
  database: 'myapp'
});

db.connect(err => {
  if (err) throw err;
  console.log('Database connected!');
});

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/home.html'));
});

app.get('/login.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/login.html'));
});

app.get('/register.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/register.html'));
});

app.get('/update-profile.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/update-profile.html'));
});

app.get('/booking', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/booking.html'));
});
app.get('/contact.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/contact.html'));
});

// Handle file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Handle registration
app.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).send('All fields are required.');
  }
  const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
  db.query(sql, [username, email, password], (err, result) => {
    if (err) {
      console.error('Error during registration:', err);
      return res.status(500).send('An error occurred during registration.');
    }
    res.json({ success: true, message: 'Registration successful!' });
  });
});

// Handle login
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(sql, [email, password], (err, results) => {
    if (err) {
      console.error('Error during login:', err);
      return res.status(500).send('An error occurred during login.');
    }
    if (results.length > 0) {
      res.json({ success: true, message: 'Login successful!' });
    } else {
      res.json({ success: false, message: 'Invalid credentials' });
    }
  });
});

// Handle profile update
app.post('/update-profile', (req, res) => {
  const { name, user_id } = req.body;
  if (!name || !user_id) {
    return res.status(400).send('Name and User ID are required.');
  }
  const sql = 'UPDATE profiles SET name = ? WHERE user_id = ?';
  db.query(sql, [name, user_id], (err, result) => {
    if (err) {
      console.error('Error updating profile:', err);
      return res.status(500).send('An error occurred during profile update.');
    }
    res.redirect('/home');
  });
});

// Handle fetching profile information
app.get('/get-profile', (req, res) => {
  const userId = 'USER_ID_HERE'; // Replace with actual user identification logic
  const sql = 'SELECT name, email FROM profiles WHERE user_id = ?';
  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching profile:', err);
      return res.status(500).send('An error occurred while fetching the profile.');
    }
    if (results.length > 0) {
      res.json({ success: true, ...results[0] });
    } else {
      res.json({ success: false, message: 'Profile not found.' });
    }
  });
});

// Handle booking
app.post('/booking', (req, res) => {
  const { user_id, check_in, check_out, room_type } = req.body;

  if (!user_id || !check_in || !check_out || !room_type) {
    return res.status(400).send('All fields are required.');
  }

  // Check if user exists
  const checkUserSql = 'SELECT id FROM users WHERE id = ?';
  db.query(checkUserSql, [user_id], (err, results) => {
    if (err) {
      console.error('Error checking user:', err);
      return res.status(500).send('An error occurred while checking user.');
    }

    if (results.length === 0) {
      return res.status(400).send('User ID does not exist.');
    }

    // Proceed with booking if user exists
    const sql = 'INSERT INTO bookings (user_id, check_in, check_out, room_type) VALUES (?, ?, ?, ?)';
    db.query(sql, [user_id, check_in, check_out, room_type], (err, result) => {
      if (err) {
        console.error('Error during booking:', err);
        return res.status(500).send('An error occurred during booking.');
      }
      res.send('Booking successful!');
    });
  });
});

// Handle contact form submission
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).send('All fields are required.');
  }

  const sql = 'INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)';
  db.query(sql, [name, email, message], (err, result) => {
    if (err) {
      console.error('Error during contact form submission:', err);
      return res.status(500).send('An error occurred during contact form submission.');
    }
    res.send('Contact form submission successful!');
  });
});

// Handle logout
app.get('/logout', (req, res) => {
  // Logic to clear session or authentication data if using sessions
  res.redirect('/login.html');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
