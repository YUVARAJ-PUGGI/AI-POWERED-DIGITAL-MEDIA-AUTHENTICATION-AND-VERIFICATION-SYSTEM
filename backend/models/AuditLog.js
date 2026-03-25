import mongoose from 'mongoose';

const auditLogSchema = new mongoose.Schema({
  officerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Officer', required: true },
  action: { type: String, required: true }, // e.g., 'UPLOAD_EVIDENCE', 'VIEW_EVIDENCE', 'VERIFY_HASH'
  targetId: { type: mongoose.Schema.Types.ObjectId }, // ID of case or evidence
  targetType: { type: String, enum: ['Case', 'Evidence', 'System'] },
  details: { type: mongoose.Schema.Types.Mixed },
  ipAddress: { type: String },
}, { timestamps: true });

// Audit logs should be immutable ideally, so we don't build update/delete routes for them.
export default mongoose.model('AuditLog', auditLogSchema);
