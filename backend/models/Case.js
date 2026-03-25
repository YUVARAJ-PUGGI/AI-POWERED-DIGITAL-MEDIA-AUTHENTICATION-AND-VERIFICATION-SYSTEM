import mongoose from 'mongoose';

const caseSchema = new mongoose.Schema({
  caseNumber: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ['open', 'closed', 'under_review'], default: 'open' },
  assignedOfficers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Officer' }]
}, { timestamps: true });

export default mongoose.model('Case', caseSchema);
