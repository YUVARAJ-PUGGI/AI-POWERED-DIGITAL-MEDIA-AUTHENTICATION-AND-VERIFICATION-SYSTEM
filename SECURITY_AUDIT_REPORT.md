# Security Audit Report - Digital Forensics Application

**Date:** March 26, 2026  
**Scope:** Backend Models, Forensics Service Models, ML Service Model  
**Assessment:** Comprehensive security vulnerability scan

---

## Executive Summary

The codebase has **8 CRITICAL**, **6 HIGH**, **5 MEDIUM**, and **3 LOW** severity vulnerabilities. Most critical issues involve missing authentication/authorization on sensitive endpoints, hardcoded credentials, and insecure file upload handling.

---

## CRITICAL Severity Issues

### 1. Hardcoded Default Credentials in `/seed` Endpoint
**File:** [backend/routes/auth.js](backend/routes/auth.js#L7-L26)  
**Severity:** CRITICAL  
**Type:** Insecure Credential Management

```javascript
router.post('/seed', async (req, res) => {
  // Creates admin with hardcoded password 'password123'
  const passwordHash = await bcrypt.hash('password123', salt);
```

**Issue:**
- Default admin password hardcoded as 'password123'
- Seed endpoint is unrestricted - anyone can call it
- If database is cleared/reset, system becomes accessible with known credentials
- No protection against reseeding

**Risk:** Complete system compromise with trivial credentials

**Recommendation:**
- Remove /seed endpoint in production
- Use environment-based initial setup with strong random passwords
- Implement one-time initialization with admin registration form
- Add seed protection (key validation, single execution flag)

---

### 2. Missing Authentication on `/detect-ai` Endpoint
**File:** [backend/routes/evidence.js](backend/routes/evidence.js#L293-L316)  
**Severity:** CRITICAL  
**Type:** Broken Authentication

```javascript
router.post('/detect-ai', upload.single('evidenceFile'), async (req, res) => {
  // NO authMiddleware - anyone can upload
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
```

**Issue:**
- No `authMiddleware` protection on this endpoint
- Any user can upload arbitrary files to detect AI generation
- Files are temporarily created and then deleted, but processing happens without auth
- Could be abused for DOS attacks or to consume server resources

**Risk:** Unauthorized file uploads, resource exhaustion, temporary file exploitation

**Recommendation:**
```javascript
router.post('/detect-ai', authMiddleware, upload.single('evidenceFile'), async (req, res) => {
```

---

### 3. Missing Authentication on `/analytics/summary` Endpoint
**File:** [backend/routes/evidence.js](backend/routes/evidence.js#L351)  
**Severity:** CRITICAL  
**Type:** Broken Authentication & Information Disclosure

```javascript
router.get('/analytics/summary', async (req, res) => {
  try {
    const totalCount = await Evidence.countDocuments();
```

**Issue:**
- This endpoint has NO authentication requirement
- Exposes sensitive analytics data:
  - Total evidence count
  - Verdict distribution (AI_GENERATED, AUTHENTIC, INCONCLUSIVE)
  - Recent evidence file names and confidence scores
  - 7-day statistics
  - Average confidence metrics
- Anyone can enumerate system activity and evidence patterns

**Risk:** Information disclosure, competitive intelligence gathering, audit trail exposure

**Recommendation:**
- Add `authMiddleware` with role-based access (admin/supervisor only)
- Implement audit logging for analytics access
- Filter sensitive data based on user role/assigned cases

---

### 4. Incorrect Authorization Logic in `/api/cases` GET Endpoint
**File:** [backend/routes/cases.js](backend/routes/cases.js#L25-L32)  
**Severity:** CRITICAL  
**Type:** Broken Access Control

```javascript
router.get('/', authMiddleware, async (req, res) => {
  try {
    // Comment says different roles should see different cases
    // "For MVP, admins see all, investigators see assigned."
    // But implementation returns ALL cases to EVERYONE
    const cases = await Case.find().populate('assignedOfficers', 'name badgeNumber department').sort({ createdAt: -1 });
```

**Issue:**
- Comment explicitly states intended authorization: admins see all, investigators see assigned
- Implementation ignores `req.user.role` and returns ALL cases to all officers
- Any investigator can view cases they're not assigned to
- Violates principle of least privilege
- Chain of custody documentation for cases can be accessed by unauthorized personnel

**Risk:** Unauthorized case access, breach of confidentiality, evidence tampering by unauthorized officers

**Recommendation:**
```javascript
router.get('/', authMiddleware, async (req, res) => {
  try {
    let query = {};
    if (req.user.role !== 'admin') {
      query = { assignedOfficers: req.user.id };
    }
    const cases = await Case.find(query)
      .populate('assignedOfficers', 'name badgeNumber department')
      .sort({ createdAt: -1 });
    // ...
```

---

### 5. Missing Authentication on `/health` Endpoint in ML Service
**File:** [ml_service/app.py](ml_service/app.py#L12-L19)  
**Severity:** CRITICAL  
**Type:** Broken Authentication & Information Disclosure

```python
@app.get("/health")
def health() -> tuple:
    return jsonify(
        {
            "status": "ok" if MODEL_LOADED else "degraded",
            "model_loaded": MODEL_LOADED,
            "model_repo": MODEL_REPO,
        }
    ), 200
```

**Issue:**
- Exposes internal model information to unauthenticated users
- Reveals model repository (could help in reverse engineering)
- System status information useful for reconnaissance
- Should be internal monitoring only

**Risk:** Information gathering for targeted attacks

---

### 6. Missing Authentication on FastAPI `/analyze` Endpoints
**File:** [forensics_service/app/api/routes.py](forensics_service/app/api/routes.py#L29-L47)  
**Severity:** CRITICAL  
**Type:** Broken Authentication

```python
@router.post("/analyze")
def analyze_evidence(
    evidence_file: UploadFile = File(...),
    case_id: str | None = Form(default=None),
) -> dict:
    # NO authentication - anyone can submit evidence
    os.makedirs(settings.temp_dir, exist_ok=True)
```

And:
```python
@router.post("/analyze/social")
def analyze_social_content(req: SocialAnalyzeRequest) -> dict:
    # NO authentication
    social_result = social_engine.analyze(
```

**Issue:**
- Both forensics analysis endpoints lack authentication
- Anyone can submit evidence for analysis
- Forensics reports are generated without authorization checks
- Can be abused for reconnaissance or resource exhaustion

**Risk:** DOS attacks, unauthorized forensics analysis, system resource depletion

---

### 7. Global CORS Without Domain Restriction (Flask)
**File:** [ml_service/app.py](ml_service/app.py#L7)  
**Severity:** CRITICAL  
**Type:** CORS Misconfiguration

```python
from flask_cors import CORS
app = Flask(__name__)
CORS(app)  # Allows requests from ANY origin
```

**Issue:**
- `CORS(app)` without configuration allows requests from all origins
- Enables CSRF attacks and unauthorized cross-origin requests
- Any website can call this API on behalf of a user's browser
- No origin validation

**Risk:** Cross-Site Request Forgery, unauthorized API usage

**Recommendation:**
```python
CORS(app, 
     origins=["http://localhost:3000"],  # Specify allowed origins
     supports_credentials=True,
     allow_headers=["Content-Type", "Authorization"],
     max_age=3600)
```

---

### 8. Global CORS in Express Server Without Domain Restriction
**File:** [backend/server.js](backend/server.js#L10)  
**Severity:** CRITICAL  
**Type:** CORS Misconfiguration

```javascript
import cors from 'cors';
// ...
app.use(cors());  // No configuration - allows all origins
```

**Issue:**
- Unrestricted CORS configuration
- Allows requests from any origin with credentials
- Enables CSRF attacks from any malicious website
- No origin whitelist

**Risk:** Cross-Site Request Forgery, credential theft

**Recommendation:**
```javascript
app.use(cors({
  origin: ['http://localhost:3000', 'https://yourdomain.com'],
  credentials: true,
  optionsSuccessStatus: 200
}));
```

---

## HIGH Severity Issues

### 1. No File Type Validation on Evidence Upload
**File:** [backend/routes/evidence.js](backend/routes/evidence.js#L256-L264)  
**Severity:** HIGH  
**Type:** Insecure File Upload

```javascript
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});
```

**Issue:**
- File extension taken from `file.originalname` which is user-controlled
- MIME type not validated against whitelist
- No file content validation
- Could upload executable files (.exe, .js, .sh) with misleading extensions
- File stored with original extension allowing execution if served

**Risk:** Arbitrary file upload, potential code execution, malware distribution

**Recommendation:**
```javascript
const ALLOWED_MIMES = ['image/jpeg', 'image/png', 'video/mp4', 'audio/mpeg'];
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.mp4', '.mp3'];

router.post('/upload', authMiddleware, upload.single('evidenceFile'), async (req, res) => {
  if (!ALLOWED_MIMES.includes(req.file.mimetype)) {
    return res.status(400).json({ error: 'Invalid file type' });
  }
  const ext = path.extname(req.file.originalname).toLowerCase();
  if (!ALLOWED_EXTENSIONS.includes(ext)) {
    return res.status(400).json({ error: 'Invalid file extension' });
  }
```

---

### 2. No File Size Limits Configured
**File:** [backend/routes/evidence.js](backend/routes/evidence.js#L250-L265)  
**Severity:** HIGH  
**Type:** Denial of Service

```javascript
const upload = multer({ storage });  // No limits configuration
```

**Issue:**
- Multer configured without file size limits
- Attackers can upload arbitrarily large files
- Disk space exhaustion possible
- DOS attack vectors available
- Memory issues during processing

**Risk:** Disk space exhaustion, Service degradation, DOS attacks

**Recommendation:**
```javascript
const upload = multer({
  storage,
  limits: {
    fileSize: 500 * 1024 * 1024, // 500MB max
    files: 1
  }
});
```

---

### 3. Uploaded Files Served Statically Without Access Control
**File:** [backend/server.js](backend/server.js#L14-L15)  
**Severity:** HIGH  
**Type:** Broken Access Control

```javascript
// Serve uploaded files statically if needed for testing (not recommended for production)
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
```

**Issue:**
- Files served via static middleware without authentication
- Anyone knowing the filename can download any evidence file
- Evidence files contain sensitive case information
- Chain of custody compromised by unauthorized access
- Comment acknowledges it's insecure but left in code

**Risk:** Unauthorized evidence access, data breach, chain of custody violation

**Recommendation:**
- Remove static upload serving
- Create authenticated `/api/evidence/:id/download` endpoint
- Implement proper access control checks
- Use content-disposition headers to prevent direct access

---

### 4. No Input Validation on Case Creation
**File:** [backend/routes/cases.js](backend/routes/cases.js#L13-L24)  
**Severity:** HIGH  
**Type:** NoSQL Injection & Input Validation

```javascript
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { caseNumber, title, description } = req.body;
    // No validation on these inputs
    const newCase = new Case({
      caseNumber,
      title,
      description,
      assignedOfficers: [req.user.id]
    });
```

**Issue:**
- No input validation on caseNumber, title, description
- Although mongoose schemas help, no explicit validation
- Potential for NoSQL injection if inputs processed unsafely elsewhere
- No length limits could cause document size issues
- No sanitization for special characters

**Risk:** Data injection, NoSQL injection, buffer overflow in storage

**Recommendation:**
```javascript
const { body, validationResult } = require('express-validator');

router.post('/', 
  authMiddleware,
  body('caseNumber').isLength({ min: 1, max: 50 }).trim().escape(),
  body('title').isLength({ min: 1, max: 200 }).trim(),
  body('description').optional().isLength({ max: 5000 }).trim(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
```

---

### 5. API Error Messages Expose Internal Details
**File:** Multiple files  
**Severity:** HIGH  
**Type:** Information Disclosure

```javascript
// backend/routes/evidence.js
} catch (error) {
  res.status(500).json({ error: error.message });  // Exposes error details
}
```

**Issue:**
- Error.message can expose:
  - Database query details
  - File system paths
  - Internal variable names
  - Stack traces (depending on error type)
- Helpful for attackers to understand system architecture
- Privacy risk for sensitive system information

**Risk:** Information disclosure, system reconnaissance

**Recommendation:**
```javascript
} catch (error) {
  console.error('Upload error:', error);  // Log internally
  res.status(500).json({ error: 'File upload failed. Please try again.' });
}
```

---

### 6. No Rate Limiting on Authentication Endpoints
**File:** [backend/routes/auth.js](backend/routes/auth.js#L29-L58)  
**Severity:** HIGH  
**Type:** Brute Force Attack Vulnerability

```javascript
router.post('/login', async (req, res) => {
  try {
    const { badgeNumber, password } = req.body;
    // No rate limiting - unlimited login attempts
    const officer = await Officer.findOne({ badgeNumber });
```

**Issue:**
- No rate limiting on `/login` endpoint
- No account lockout after failed attempts
- Attackers can perform brute force attacks
- No CAPTCHA or progressive delays
- Badge numbers may be enumerable (e.g., ADMIN-001, etc.)

**Risk:** Credential brute force attacks, account takeover

**Recommendation:**
```javascript
import rateLimit from 'express-rate-limit';

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per windowMs
  message: 'Too many login attempts, please try again later'
});

router.post('/login', loginLimiter, async (req, res) => {
```

---

## MEDIUM Severity Issues

### 1. JWT Secret Not Validated for Strength
**File:** [backend/routes/auth.js](backend/routes/auth.js#L40-L45)  
**Severity:** MEDIUM  
**Type:** Weak Cryptography

```javascript
const token = jwt.sign(
  { id: officer._id, role: officer.role, badgeNumber: officer.badgeNumber },
  process.env.JWT_SECRET,  // No validation on env var content
  { expiresIn: '12h' }
);
```

**Issue:**
- No validation that JWT_SECRET is provided or strong
- 12-hour expiration is long (could be shorter)
- No refresh token mechanism
- JWT_SECREET vulnerable if .env file exposed

**Risk:** Weak token signing, extended session validity

**Recommendation:**
- Validate JWT_SECRET at startup (min 32 characters)
- Use shorter expiration (30 min to 1 hour)
- Implement refresh token pattern
- Use HS256 with strong secrets or RS256 with key pairs

---

### 2. No Input Validation in Social Media Forensics Endpoint
**File:** [forensics_service/app/api/routes.py](forensics_service/app/api/routes.py#L20-L27)  
**Severity:** MEDIUM  
**Type:** Input Validation

```python
class SocialAnalyzeRequest(BaseModel):
    case_id: str | None = None  # Unrestricted string
    platform: str              # Unrestricted string
    post_text: str            # Unrestricted string, could be very large
    posted_at: str | None = None
    claimed_location: str | None = None
```

**Issue:**
- No validation on string lengths
- No validation on platform (could inject unexpected values)
- No validation on content (could be extremely large)
- No input sanitization
- Could cause memory exhaustion with huge post_text

**Risk:** DOS attack, memory exhaustion, injection attacks

---

### 3. Temporary File Cleanup Issues in Forensics Service
**File:** [forensics_service/app/api/routes.py](forensics_service/app/api/routes.py#L37-L45)  
**Severity:** MEDIUM  
**Type:** Resource Management

```python
@router.post("/analyze")
def analyze_evidence(
    evidence_file: UploadFile = File(...),
    case_id: str | None = Form(default=None),
) -> dict:
    os.makedirs(settings.temp_dir, exist_ok=True)
    
    ext = os.path.splitext(evidence_file.filename or "")[1]
    tmp_name = f"{uuid.uuid4().hex}{ext}"
    tmp_path = os.path.join(settings.temp_dir, tmp_name)

    with open(tmp_path, "wb") as out:
        shutil.copyfileobj(evidence_file.file, out)

    try:
        result = engine.analyze(tmp_path, case_id=case_id)
        # ...
    finally:
        if os.path.exists(tmp_path):
            os.remove(tmp_path)
```

**Issue:**
- Temp file cleanup in finally block is good
- But path traversal possible with malicious filenames
- `uuid.uuid4().hex` + `extension` preserves attacker-controlled extension
- If analysis service crashes, temp files may accumulate
- Temp directory cleanup not implemented

**Risk:** File system exhaustion, temporary file accumulation

---

### 4. Case ID SQL Injection Risk in Forensics Service
**File:** [forensics_service/app/models/db_models.py](forensics_service/app/models/db_models.py#L13)  
**Severity:** MEDIUM  
**Type:** SQL Injection / NoSQL Injection Risk

```python
class AnalysisRecord(Base):
    __tablename__ = "analysis_records"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    case_id: Mapped[str | None] = mapped_column(String(128), nullable=True)
```

**Issue:**
- case_id stored as String(128) without validation
- Not uniquely constrained or validated
- Could receive arbitrary strings from unauthenticated endpoints
- String(128) is stored directly without sanitization
- Case IDs from untrusted MongoDB ObjectIds

**Risk:** Injection attacks, SQL injection if queried unsafely

---

### 5. Database SQLite Default in Production Configuration
**File:** [forensics_service/app/core/db.py](forensics_service/app/core/db.py#L8)  
**Severity:** MEDIUM  
**Type:** Insecure Configuration

```python
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./forensics.db")
```

**Issue:**
- SQLite default database not suitable for forensics (audit trail)
- No built-in encryption
- No concurrent transaction support
- File-based, can be stolen
- Not suitable for multi-user forensic environment
- No replication or backup options

**Risk:** Data loss, insufficient audit trail, database compromise

---

## LOW Severity Issues

### 1. Missing HTTPS/TLS Enforcement
**File:** [backend/server.js](backend/server.js#L29-L33)  
**Severity:** LOW  
**Type:** Insecure Communication

```javascript
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
// No HTTPS configuration visible
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

**Issue:**
- No HTTPS enforcement visible
- Credentials and evidence could be transmitted unencrypted
- Man-in-the-middle attacks possible

**Risk:** Credential interception, evidence tampering in transit

---

### 2. Debug Mode Configuration Not Explicitly Disabled
**File:** [ml_service/app.py](ml_service/app.py#L40)  
**Severity:** LOW  
**Type:** Configuration Management

```python
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=False)
```

**Issue:**
- While debug=False, binding to 0.0.0.0 makes it externally accessible
- No environment-based configuration
- No authentication on Flask app
- Potential for information leakage in error pages

---

### 3. No Audit Logging for Authentication Failures
**File:** [backend/routes/auth.js](backend/routes/auth.js#L29-L49)  
**Severity:** LOW  
**Type:** Insufficient Logging

```javascript
router.post('/login', async (req, res) => {
  try {
    const { badgeNumber, password } = req.body;
    const officer = await Officer.findOne({ badgeNumber });
    if (!officer) return res.status(404).json({ error: 'Officer not found' });
    
    const isMatch = await bcrypt.compare(password, officer.passwordHash);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });
```

**Issue:**
- Failed login attempts not logged to AuditLog
- No tracking of failed authentication
- Cannot detect brute force attacks from logs
- Missing security events in audit trail

**Risk:** Unable to detect or respond to attacks, insufficient forensic evidence

---

## Vulnerability Summary Table

| Severity | Count | Category |
|----------|-------|----------|
| CRITICAL | 8 | Auth/Authz, CORS, Credentials |
| HIGH | 6 | Input Validation, File Upload, Error Handling, Rate Limiting |
| MEDIUM | 5 | Input Validation, Database Config, JWT Config, Resource Mgmt |
| LOW | 3 | HTTPS, Debug Config, Logging |
| **TOTAL** | **22** | |

---

## Recommended Fix Priority

### Phase 1 (Immediate - 48 hours)
1. ✓ Remove `/seed` endpoint or protect with environment key
2. ✓ Add `authMiddleware` to `/detect-ai` endpoint
3. ✓ Add `authMiddleware` to `/analytics/summary` endpoint
4. ✓ Fix case authorization logic (req.user.role check)
5. ✓ Remove static upload serving or add authentication
6. ✓ Fix CORS configuration (both Express and Flask)
7. ✓ Add authentication to FastAPI forensics endpoints

### Phase 2 (3-7 days)
1. Add file upload validation and limits
2. Add input validation to all routes
3. Add rate limiting to auth endpoints
4. Implement proper error handling
5. Fix database configuration for production
6. Add audit logging for failed auth

### Phase 3 (1-2 weeks)
1. Implement HTTPS/TLS
2. Add JWT refresh token mechanism
3. Implement request/response logging
4. Add monitoring and alerting
5. Perform penetration testing
6. Update security documentation

---

## Testing Recommendations

### Authentication Tests
- Test unauthorized access to all protected endpoints
- Verify role-based access control works for cases
- Test JWT token validation and expiration

### File Upload Tests
- Attempt upload of executable files
- Test large file uploads (>500MB)
- Test path traversal in filenames
- Verify uploaded files not directly accessible

### API Security Tests
- Test CORS from non-whitelisted origins
- Perform brute force testing on login
- Attempt injection attacks in all inputs
- Test unauthenticated endpoint access

---

## Compliance Notes

These vulnerabilities may impact:
- **Chain of Custody:** Unauthorized file access (HIGH-2, MED-5)
- **Evidence Integrity:** Missing detailed access logs
- **Data Protection:** Unencrypted storage, missing encryption
- **OWASP Top 10:** A01-Broken Access Control (multiple), A07-CORS misconfiguration

---

## Conclusion

The application has significant security gaps that must be addressed before production deployment. The most critical issues involve authentication/authorization bypasses and CORS misconfigurations. Implementing the Phase 1 fixes immediately will dramatically improve security posture.

All forensics-related evidence handling must be secured given the legal and evidentiary implications of the application's purpose.
