import express from 'express';
import Case from '../models/Case.js';
import AuditLog from '../models/AuditLog.js';
import { authMiddleware } from './auth.js';

const router = express.Router();

// Helper to log audit events
export const logAudit = async (officerId, action, targetId, targetType, details) => {
  await AuditLog.create({ officerId, action, targetId, targetType, details });
};

// Create a new case
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { caseNumber, title, description } = req.body;
    
    const newCase = new Case({
      caseNumber,
      title,
      description,
      assignedOfficers: [req.user.id] // Auto-assign the creator
    });

    const savedCase = await newCase.save();
    
    await logAudit(req.user.id, 'CREATE_CASE', savedCase._id, 'Case', { caseNumber });
    
    res.status(201).json(savedCase);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all cases accessible to the officer
router.get('/', authMiddleware, async (req, res) => {
  try {
    // For MVP, admins see all, investigators see assigned. 
    // Let's just return all for the hackathon MVP to make testing easier
    const cases = await Case.find().populate('assignedOfficers', 'name badgeNumber department').sort({ createdAt: -1 });
    res.json(cases);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
