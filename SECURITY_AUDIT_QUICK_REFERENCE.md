# Security Audit - Quick Reference

## Critical Vulnerabilities (Must Fix Immediately)

| Issue | Location | Impact |
|-------|----------|--------|
| **Hardcoded Admin Password** | `backend/routes/auth.js:7-26` | `password123` exposed - complete system compromise |
| **No Auth on `/detect-ai`** | `backend/routes/evidence.js:293-316` | Anyone can upload files, DOS attacks |
| **No Auth on `/analytics/summary`** | `backend/routes/evidence.js:351` | Sensitive system statistics exposed publicly |
| **Wrong Authorization Logic** | `backend/routes/cases.js:25-32` | All cases visible to all officers (should be role-based) |
| **No Auth on ML Service** | `ml_service/app.py:12-19` | Model info exposed, anyone can analyze files |
| **No Auth on FastAPI Endpoints** | `forensics_service/app/api/routes.py:29-47` | Forensics endpoints exposed, DOS vectors |
| **Global CORS (Flask)** | `ml_service/app.py:7` | CSRF attacks enabled, any origin can call API |
| **Global CORS (Express)** | `backend/server.js:10` | CSRF attacks enabled |

**Immediate Actions:**
```javascript
// 1. Add authMiddleware to unprotected endpoints
router.post('/detect-ai', authMiddleware, upload.single('evidenceFile'), ...)
router.get('/analytics/summary', authMiddleware, async (req, res) => { ... })

// 2. Fix case authorization
if (req.user.role !== 'admin') {
  query = { assignedOfficers: req.user.id };
}

// 3. Remove /seed or protect it with environment key
if (process.env.SEED_KEY !== req.body.seedKey) {
  return res.status(403).json({ error: 'Forbidden' });
}

// 4. Fix CORS
app.use(cors({ origin: ['http://localhost:3000'], credentials: true }));
```

---

## High Priority Vulnerabilities

| Issue | Location | Risk |
|-------|----------|------|
| No file type validation | `backend/routes/evidence.js:250-265` | Executable file upload, code execution |
| No file size limits | `backend/routes/evidence.js:250` | DOS, disk exhaustion |
| Static upload serving | `backend/server.js:14-15` | Anyone can download evidence |
| No input validation | `backend/routes/cases.js:13-24` | NoSQL injection, data corruption |
| Error messages expose details | Multiple files | System reconnaissance |
| No rate limiting on login | `backend/routes/auth.js:29` | Brute force attacks |

---

## Medium Priority Vulnerabilities

| Issue | Location | Impact |
|-------|----------|--------|
| JWT secret not validated | `backend/routes/auth.js:40-45` | Weak signing keys possible |
| No input validation (social) | `forensics_service/app/api/routes.py:20-27` | DOS via large inputs |
| Temp file path traversal | `forensics_service/app/api/routes.py:37-45` | File system attacks |
| Case ID injection risk | `forensics_service/app/models/db_models.py:13` | Data injection |
| SQLite default database | `forensics_service/app/core/db.py:8` | No encryption, not audit-suitable |

---

## Vulnerability Count by Component

### Backend (Node.js/Express)
- **CRITICAL:** 4 issues (hardcoded password, missing auth on 2 endpoints, wrong authz)
- **HIGH:** 4 issues (file upload, validation, errors, rate limiting)
- **MEDIUM:** 1 issue (JWT validation)
- **LOW:** 2 issues (HTTPS, logging)

### ML Service (Flask)
- **CRITICAL:** 2 issues (exposed health info, global CORS)
- **HIGH:** 1 issue (error handling)
- **LOW:** 1 issue (debug config)

### Forensics Service (FastAPI)
- **CRITICAL:** 2 issues (missing auth on 2 endpoints)
- **MEDIUM:** 3 issues (input validation, file handling, database)

---

## Risk Assessment

**If untrusted users have access:**
- Can access ALL cases and evidence (authorization bypass)
- Can brute force admin account with known password
- Can upload and analyze arbitrary files (DOS risk)
- Can enumerate system activity via analytics
- Can view uploaded evidence files

**For legal/forensic implications:**
- Chain of custody compromised (unauthorized access)
- Audit trail incomplete (missing failed auth logs)
- Evidence integrity at risk (unauthorized file access)
- Non-compliant with forensic standards

---

## Quick Fix Checklist

- [ ] Add `authMiddleware` to `/detect-ai` endpoint
- [ ] Add `authMiddleware` to `/analytics/summary` endpoint
- [ ] Fix case GET authorization (check user.role)
- [ ] Remove `/seed` endpoint or protect with key
- [ ] Add `authMiddleware` to FastAPI `/analyze` endpoints
- [ ] Fix CORS configuration (whitelist origins)
- [ ] Add file type validation (`.jpg`, `.png`, `.mp4` only)
- [ ] Add file size limits (500MB max)
- [ ] Remove static `/uploads` route or add auth
- [ ] Add input validation to all endpoints
- [ ] Add rate limiting to `/login` endpoint
- [ ] Fix error message handling (don't expose details)

---

## Testing Commands

```bash
# Test unauthenticated access
curl http://localhost:5000/api/evidence/detect-ai \
  -F "evidenceFile=@test.jpg"

# Test unauthenticated analytics access
curl http://localhost:5000/api/evidence/analytics/summary

# Test CORS from different origin
curl -H "Origin: http://evil.com" \
  http://localhost:5000/api/cases

# Test default password
curl -X POST http://localhost:5000/api/auth/seed

# Test case enumeration
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:5000/api/cases
```

