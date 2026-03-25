import express from 'express';
import multer from 'multer';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import Evidence from '../models/Evidence.js';
import { authMiddleware } from './auth.js';
import { logAudit } from './cases.js';

const router = express.Router();

// Ensure uploads directory exists
const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Helper function to calculate SHA-256 hash of a file
const calculateFileHash = (filePath) => {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash('sha256');
    const stream = fs.createReadStream(filePath);
    stream.on('error', err => reject(err));
    stream.on('data', chunk => hash.update(chunk));
    stream.on('end', () => resolve(hash.digest('hex')));
  });
};

// Handle Evidence Upload & Initial AI Simulation
router.post('/upload', authMiddleware, upload.single('evidenceFile'), async (req, res) => {
  try {
    const { caseId, deviceSeized, witnessPresent, photographedInSitu, tamperEvidentBag, notes } = req.body;
    
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    // 1. Generate SHA-256 Hash for Chain of Custody
    const fileHash = await calculateFileHash(req.file.path);

    // 2. Simulate AI Analysis Breakdown
    const simulatedAI = {
      overallConfidence: Math.floor(Math.random() * 40) + 60, // 60-100%
      faceConsistency: Math.floor(Math.random() * 40) + 60,
      audioVideoSync: Math.floor(Math.random() * 40) + 60,
      compressionArtifacts: Math.floor(Math.random() * 40) + 60,
      metadataAnomalies: Math.floor(Math.random() * 40) + 60,
      status: 'completed'
    };

    // 3. Save to Database
    const newEvidence = new Evidence({
      caseId,
      uploadedBy: req.user.id,
      fileName: req.file.filename,
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      size: req.file.size,
      hashSha256: fileHash,
      storagePath: req.file.path,
      sopChecklist: {
        deviceSeized: deviceSeized === 'true',
        witnessPresent: witnessPresent === 'true',
        photographedInSitu: photographedInSitu === 'true',
        tamperEvidentBag: tamperEvidentBag === 'true',
        notes
      },
      aiAnalysis: simulatedAI
    });

    const savedEvidence = await newEvidence.save();

    // 4. Log Audit Event
    await logAudit(req.user.id, 'UPLOAD_EVIDENCE', savedEvidence._id, 'Evidence', { fileHash });

    res.status(201).json(savedEvidence);
  } catch (error) {
    if (req.file) fs.unlinkSync(req.file.path); // Cleanup on fail
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to fetch evidence for a case
router.get('/case/:caseId', authMiddleware, async (req, res) => {
  try {
    const evidenceList = await Evidence.find({ caseId: req.params.caseId })
      .populate('uploadedBy', 'name badgeNumber')
      .sort({ createdAt: -1 });
    
    // Log view event
    await logAudit(req.user.id, 'VIEW_CASE_EVIDENCE', req.params.caseId, 'Case', {});
    res.json(evidenceList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint for Tamper Detection (Re-hash and verify)
router.get('/:id/verify', authMiddleware, async (req, res) => {
  try {
    const evidence = await Evidence.findById(req.params.id);
    if (!evidence) return res.status(404).json({ error: 'Evidence not found' });

    // Re-hash the file currently on disk
    if (!fs.existsSync(evidence.storagePath)) {
      await logAudit(req.user.id, 'TAMPER_CHECK_FAILED', evidence._id, 'Evidence', { reason: 'FILE_MISSING' });
      return res.status(404).json({ error: 'FILE_MISSING', message: 'The physical file is missing from storage.' });
    }

    const currentHash = await calculateFileHash(evidence.storagePath);
    const isIntact = currentHash === evidence.hashSha256;

    // Log the verification attempt
    await logAudit(req.user.id, isIntact ? 'VERIFY_INTEGRITY_SUCCESS' : 'VERIFY_INTEGRITY_FAILED', evidence._id, 'Evidence', { expected: evidence.hashSha256, actual: currentHash });

    res.json({
      evidenceId: evidence._id,
      originalHash: evidence.hashSha256,
      currentHash,
      isIntact,
      message: isIntact ? 'File integrity verified. No tampering detected.' : 'WARNING: File tamper detected! Hashes do not match.'
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
