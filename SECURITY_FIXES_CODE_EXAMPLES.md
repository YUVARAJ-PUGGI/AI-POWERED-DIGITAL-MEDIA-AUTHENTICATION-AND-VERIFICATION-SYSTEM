# Security Fixes - Code Examples

## 1. Fix Hardcoded Credentials (CRITICAL)

### Before (VULNERABLE)
```javascript
// backend/routes/auth.js
router.post('/seed', async (req, res) => {
  try {
    const existing = await Officer.findOne({ badgeNumber: 'ADMIN-001' });
    if (existing) return res.json({ message: 'Admin already exists' });

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash('password123', salt);  // HARDCODED PASSWORD!
```

### After (SECURE)
```javascript
// backend/routes/auth.js
router.post('/seed', async (req, res) => {
  try {
    // Require authorization header with SEED_KEY from environment
    const seedKey = req.headers['x-seed-key'];
    if (!seedKey || seedKey !== process.env.SEED_KEY) {
      return res.status(403).json({ error: 'Invalid seed key' });
    }

    const existing = await Officer.findOne({ badgeNumber: 'ADMIN-001' });
    if (existing) return res.json({ message: 'Admin already exists' });

    // Use strong password from environment or require it in request
    const defaultPassword = process.env.ADMIN_INITIAL_PASSWORD;
    if (!defaultPassword || defaultPassword.length < 12) {
      return res.status(500).json({ error: 'Admin password not configured securely' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(defaultPassword, salt);
```

---

## 2. Add Authentication to Unprotected Endpoints (CRITICAL)

### Before (VULNERABLE)
```javascript
// backend/routes/evidence.js
router.post('/detect-ai', upload.single('evidenceFile'), async (req, res) => {
  // NO authMiddleware - anyone can upload!
```

### After (SECURE)
```javascript
// backend/routes/evidence.js
router.post('/detect-ai', authMiddleware, upload.single('evidenceFile'), async (req, res) => {
  // Now requires valid JWT token
```

### Before (VULNERABLE)
```javascript
// backend/routes/evidence.js
router.get('/analytics/summary', async (req, res) => {
  // NO authMiddleware - public access to sensitive analytics!
```

### After (SECURE)
```javascript
// backend/routes/evidence.js
router.get('/analytics/summary', authMiddleware, async (req, res) => {
  // Require authentication
  if (req.user.role !== 'admin' && req.user.role !== 'supervisor') {
    return res.status(403).json({ error: 'Access denied' });
  }
  // Now only admin/supervisor can access
```

### FastAPI (CRITICAL)
```python
# forensics_service/app/api/routes.py - BEFORE
@router.post("/analyze")
def analyze_evidence(
    evidence_file: UploadFile = File(...),
    case_id: str | None = Form(default=None),
) -> dict:
    # NO authentication - vulnerable!

# forensics_service/app/api/routes.py - AFTER
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthenticationCredentials

security = HTTPBearer()

@router.post("/analyze")
def analyze_evidence(
    evidence_file: UploadFile = File(...),
    case_id: str | None = Form(default=None),
    credentials: HTTPAuthenticationCredentials = Depends(security),
) -> dict:
    # Verify token (implement token verification)
    if not verify_token(credentials.credentials):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials"
        )
```

---

## 3. Fix Authorization Logic (CRITICAL)

### Before (VULNERABLE)
```javascript
// backend/routes/cases.js
router.get('/', authMiddleware, async (req, res) => {
  try {
    // Comment says different behavior, but returns ALL cases to EVERYONE!
    // "For MVP, admins see all, investigators see assigned."
    const cases = await Case.find().populate(...).sort({ createdAt: -1 });
    res.json(cases);
```

### After (SECURE)
```javascript
// backend/routes/cases.js
router.get('/', authMiddleware, async (req, res) => {
  try {
    let query = {};
    
    // Admins see all cases, investigators see only assigned cases
    if (req.user.role === 'admin') {
      // Admins see everything
      query = {};
    } else if (req.user.role === 'investigator') {
      // Investigators see only cases they're assigned to
      query = { assignedOfficers: req.user.id };
    } else {
      // Default to empty for unknown roles
      query = { assignedOfficers: req.user.id };
    }
    
    const cases = await Case.find(query)
      .populate('assignedOfficers', 'name badgeNumber department')
      .sort({ createdAt: -1 });
    
    res.json(cases);
  } catch (error) {
    // ... error handling
  }
});
```

---

## 4. Fix CORS Configuration (CRITICAL)

### Before (VULNERABLE) - Express
```javascript
// backend/server.js
import cors from 'cors';
const app = express();
app.use(cors());  // Allows ANY origin - CSRF vulnerability!
```

### After (SECURE) - Express
```javascript
// backend/server.js
import cors from 'cors';

const corsOptions = {
  origin: [
    'http://localhost:3000',
    process.env.FRONTEND_URL // e.g., https://yourdomain.com
  ].filter(Boolean),
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

const app = express();
app.use(cors(corsOptions));
```

### Before (VULNERABLE) - Flask
```python
# ml_service/app.py
from flask_cors import CORS
app = Flask(__name__)
CORS(app)  # Allows ANY origin
```

### After (SECURE) - Flask
```python
# ml_service/app.py
from flask_cors import CORS

app = Flask(__name__)
CORS(app, 
     resources={r"/analyze": {"origins": ["http://localhost:5000"]}},
     supports_credentials=True,
     allow_headers=["Content-Type", "Authorization"],
     max_age=3600)
```

---

## 5. Add File Upload Validation (HIGH)

### Before (VULNERABLE)
```javascript
// backend/routes/evidence.js
const upload = multer({ storage });  // No limits!

router.post('/upload', authMiddleware, upload.single('evidenceFile'), async (req, res) => {
  // ...saves whatever file is uploaded
```

### After (SECURE)
```javascript
// backend/routes/evidence.js
// Define allowed file types
const ALLOWED_MIMES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'video/mp4',
  'audio/mpeg'
];

const ALLOWED_EXTENSIONS = [
  '.jpg', '.jpeg', '.png', '.gif',  // Images
  '.mp4', '.avi', '.mov',            // Videos
  '.mp3', '.wav', '.m4a'             // Audio
];

// Configure multer with limits
const upload = multer({
  storage,
  limits: {
    fileSize: 500 * 1024 * 1024  // 500MB max
  },
  fileFilter: (req, file, cb) => {
    // Check MIME type
    if (!ALLOWED_MIMES.includes(file.mimetype)) {
      return cb(new Error(`Invalid file type: ${file.mimetype}`));
    }
    
    // Check file extension
    const ext = path.extname(file.originalname).toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      return cb(new Error(`Invalid file extension: ${ext}`));
    }
    
    cb(null, true);
  }
});

router.post('/upload', authMiddleware, upload.single('evidenceFile'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    
    // Additional MIME type check via magic bytes
    const fileType = await FileType.fromFile(req.file.path);
    if (!ALLOWED_MIMES.includes(fileType.mime)) {
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ error: 'Invalid file content' });
    }
    // ... rest of upload logic
```

---

## 6. Remove Static File Serving or Add Auth (HIGH)

### Before (VULNERABLE)
```javascript
// backend/server.js
// Serves ALL files from uploads directory without authentication!
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
```

### After (SECURE) - Option A: Remove Static Serving
```javascript
// backend/server.js
// Remove the static upload serving line entirely
```

### After (SECURE) - Option B: Add Authentication
```javascript
// backend/routes/evidence.js
router.get('/:id/download', authMiddleware, async (req, res) => {
  try {
    const evidence = await Evidence.findById(req.params.id);
    if (!evidence) return res.status(404).json({ error: 'Not found' });
    
    // Check authorization
    if (req.user.role !== 'admin') {
      const caseData = await Case.findById(evidence.caseId);
      if (!caseData.assignedOfficers.includes(req.user.id)) {
        return res.status(403).json({ error: 'Access denied' });
      }
    }
    
    // Log access
    await logAudit(req.user.id, 'DOWNLOAD_EVIDENCE', evidence._id, 'Evidence', {});
    
    res.download(evidence.storagePath, evidence.originalName);
  } catch (error) {
    res.status(500).json({ error: 'Download failed' });
  }
});
```

---

## 7. Add Input Validation (HIGH)

### Before (VULNERABLE)
```javascript
// backend/routes/cases.js
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { caseNumber, title, description } = req.body;  // No validation!
    const newCase = new Case({ caseNumber, title, description, ... });
```

### After (SECURE)
```javascript
// backend/routes/cases.js
import { body, validationResult } from 'express-validator';

router.post('/',
  authMiddleware,
  // Validate inputs
  body('caseNumber')
    .trim()
    .notEmpty().withMessage('Case number is required')
    .isLength({ min: 1, max: 50 }).withMessage('Case number must be 1-50 characters')
    .matches(/^[A-Z0-9-]+$/).withMessage('Case number contains invalid characters'),
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ min: 1, max: 200 }).withMessage('Title must be 1-200 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 5000 }).withMessage('Description must be <= 5000 characters'),
  async (req, res) => {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { caseNumber, title, description } = req.body;
    const newCase = new Case({ caseNumber, title, description, ... });
```

---

## 8. Add Rate Limiting to Auth Endpoints (HIGH)

### Before (VULNERABLE)
```javascript
// backend/routes/auth.js
router.post('/login', async (req, res) => {
  // No rate limiting - brute force attacks possible!
```

### After (SECURE)
```javascript
// backend/routes/auth.js
import rateLimit from 'express-rate-limit';

// Define rate limiters
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minute window
  max: 5,                     // 5 attempts per window
  message: 'Too many login attempts. Please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

const seedLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,   // 1 hour window
  max: 1,                      // 1 seed attempt per hour
  message: 'Seed endpoint called too many times',
});

router.post('/seed', seedLimiter, async (req, res) => {
  // Protected
});

router.post('/login', loginLimiter, async (req, res) => {
  // Protected
  try {
    const { badgeNumber, password } = req.body;
    const officer = await Officer.findOne({ badgeNumber });
    
    if (!officer) {
      // Don't reveal if officer exists - both return same message
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, officer.passwordHash);
    if (!isMatch) {
      // Log failed attempt
      await logAudit(null, 'LOGIN_FAILED', null, 'System', { badgeNumber });
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    // ... rest of login logic
```

---

## 9. Fix Error Message Handling (HIGH)

### Before (VULNERABLE)
```javascript
} catch (error) {
  res.status(500).json({ error: error.message });  // Exposes internal details!
}
```

### After (SECURE)
```javascript
} catch (error) {
  // Log detailed error internally
  console.error('Case creation error:', error);
  const errorId = crypto.randomBytes(4).toString('hex');
  console.error(`Error ID: ${errorId}`, error);
  
  // Return generic message to user
  res.status(500).json({ 
    error: 'An error occurred. Please contact support.',
    errorId: errorId  // For support reference, doesn't expose details
  });
}
```

---

## 10. Validate JWT Secret Strength (MEDIUM)

### Before (UNVALIDATED)
```javascript
// server.js - no validation of JWT_SECRET
const token = jwt.sign({...}, process.env.JWT_SECRET, {...});
```

### After (VALIDATED)
```javascript
// server.js - at startup
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET || JWT_SECRET.length < 32) {
  console.error('FATAL: JWT_SECRET must be at least 32 characters');
  process.exit(1);
}

// Also validate on use
const token = jwt.sign(
  { id: officer._id, role: officer.role, badgeNumber: officer.badgeNumber },
  JWT_SECRET,
  { 
    expiresIn: '1h',  // Shorter expiration
    algorithm: 'HS256'
  }
);
```

---

## 11. Add Audit Logging for Failed Auth (MEDIUM)

### Before
```javascript
const isMatch = await bcrypt.compare(password, officer.passwordHash);
if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });
```

### After
```javascript
const isMatch = await bcrypt.compare(password, officer.passwordHash);
if (!isMatch) {
  // Log failed attempt
  try {
    await AuditLog.create({
      officerId: officer._id,
      action: 'LOGIN_FAILED',
      targetType: 'System',
      details: {
        badgeNumber: officer.badgeNumber,
        ipAddress: req.ip,
        timestamp: new Date()
      },
      ipAddress: req.ip
    });
  } catch (logError) {
    console.error('Failed to log auth attempt:', logError);
  }
  
  return res.status(401).json({ error: 'Invalid credentials' });
}
```

---

## 12. Environment Variables Template (.env)

```bash
# Authentication
JWT_SECRET=your-very-long-random-secret-minimum-32-characters-here
SEED_KEY=secure-random-key-for-seed-endpoint
ADMIN_INITIAL_PASSWORD=SecureAdmin123!@#

# Database
MONGODB_URI=mongodb://localhost:27017/forensics_db
DATABASE_URL=postgresql://user:password@localhost:5432/forensics

# Services
ML_SERVICE_URL=http://localhost:5001/analyze
FORENSICS_SERVICE_URL=http://localhost:8000/api/forensics

# CORS
FRONTEND_URL=http://localhost:3000

# Security
NODE_ENV=production
LOG_LEVEL=info

# File Upload
MAX_UPLOAD_MB=500
UPLOAD_DIR=./uploads/evidence
TEMP_DIR=./tmp
```

---

## Testing the Fixes

```bash
# Test 1: Verify auth required on /detect-ai
curl -X POST http://localhost:5000/api/evidence/detect-ai \
  -F "evidenceFile=@test.jpg"
# Should return 401 - "No token, authorization denied"

# Test 2: Verify auth required on /analytics/summary  
curl http://localhost:5000/api/evidence/analytics/summary
# Should return 401 - unauthorized

# Test 3: Verify CORS restrictions
curl -H "Origin: http://evil.com" \
  -H "Access-Control-Request-Method: POST" \
  http://localhost:5000/api/auth/login
# Should not have CORS headers for evil.com

# Test 4: Verify file upload validation
curl -H "Authorization: Bearer $TOKEN" \
  -F "evidenceFile=@malicious.exe" \
  http://localhost:5000/api/evidence/upload
# Should return 400 - "Invalid file extension"

# Test 5: Verify rate limiting
for i in {1..10}; do
  curl -X POST http://localhost:5000/api/auth/login \
    -H "Content-Type: application/json" \
    -d '{"badgeNumber":"test","password":"wrong"}'
done
# After 5 attempts, should return 429 - "Too many login attempts"
```
