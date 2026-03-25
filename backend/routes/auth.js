import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Officer from '../models/Officer.js';

const router = express.Router();

// Mock initial admin creation for testing purposes
router.post('/seed', async (req, res) => {
  try {
    const existing = await Officer.findOne({ badgeNumber: 'ADMIN-001' });
    if (existing) return res.json({ message: 'Admin already exists' });

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash('password123', salt);

    const newOfficer = new Officer({
      badgeNumber: 'ADMIN-001',
      name: 'System Admin',
      role: 'admin',
      department: 'Headquarters',
      passwordHash
    });

    await newOfficer.save();
    res.json({ message: 'Admin seeded successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { badgeNumber, password } = req.body;
    
    const officer = await Officer.findOne({ badgeNumber });
    if (!officer) return res.status(404).json({ error: 'Officer not found' });

    const isMatch = await bcrypt.compare(password, officer.passwordHash);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    // Generate JWT
    const token = jwt.sign(
      { id: officer._id, role: officer.role, badgeNumber: officer.badgeNumber },
      process.env.JWT_SECRET,
      { expiresIn: '12h' }
    );

    res.json({
      token,
      officer: {
        id: officer._id,
        name: officer.name,
        badgeNumber: officer.badgeNumber,
        department: officer.department,
        role: officer.role
      }
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Middleware to protect routes
export const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ error: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token is not valid' });
  }
};

export default router;
