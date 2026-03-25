import mongoose from 'mongoose';

const officerSchema = new mongoose.Schema({
  badgeNumber: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  role: { type: String, enum: ['investigator', 'admin', 'supervisor'], default: 'investigator' },
  passwordHash: { type: String, required: true },
  department: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('Officer', officerSchema);
