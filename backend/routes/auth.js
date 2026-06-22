const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../db');

// =====================
// REGISTER ROUTE
// =====================
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    // Validation - The Gatekeeper Rule
    if (!name || !email || !password) {
        return res.status(400).json({ 
            message: 'All fields are required' 
        });
    }

    // Check if email already exists
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) {
            return res.status(500).json({ 
                message: 'Server error' 
            });
        }

        if (results.length > 0) {
            return res.status(400).json({ 
                message: 'Email already exists' 
            });
        }

        // Encrypt password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save user to database
        db.query(
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
            [name, email, hashedPassword],
            (err, result) => {
                if (err) {
                    return res.status(500).json({ 
                        message: 'Server error' 
                    });
                }
                res.status(201).json({ 
                    message: 'User registered successfully!' 
                });
            }
        );
    });
});

// =====================
// LOGIN ROUTE
// =====================
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
        return res.status(400).json({ 
            message: 'All fields are required' 
        });
    }

    // Check if user exists
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) {
            return res.status(500).json({ 
                message: 'Server error' 
            });
        }

        if (results.length === 0) {
            return res.status(404).json({ 
                message: 'User not found' 
            });
        }

        // Check password
        const user = results[0];
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ 
                message: 'Invalid credentials' 
            });
        }

        res.status(200).json({ 
            message: 'Login successful!',
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });
    });
});

// =====================
// GET ALL USERS ROUTE
// =====================
router.get('/users', (req, res) => {
    db.query('SELECT id, name, email, created_at FROM users', (err, results) => {
        if (err) {
            return res.status(500).json({ 
                message: 'Server error' 
            });
        }
        res.status(200).json(results);
    });
});

module.exports = router;