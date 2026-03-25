import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

import authRoutes from './routes/auth.js';
import caseRoutes from './routes/cases.js';
import evidenceRoutes from './routes/evidence.js';

// Serve uploaded files statically if needed for testing (not recommended for production)
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/cases', caseRoutes);
app.use('/api/evidence', evidenceRoutes);

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Digital Forensics API is running' });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
