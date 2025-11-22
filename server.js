// server.js
require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const authRoutes = require('./routes/auth');
const reportsRouter = require('./routes/reports');
const adminFlagsRouter = require('./routes/adminFlags'); // if you have this route file
const pool = require('./db');

const app = express();

// CORS - in dev allow all; tighten origin in production
app.use(cors());
// parse json
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

// Auth middleware - verify JWT and set req.user (id, username, is_admin if available)
function authMiddleware(req, res, next) {
  try {
    const auth = req.headers.authorization || req.headers.Authorization;
    if (!auth || !auth.startsWith('Bearer ')) return next();

    const token = auth.split(' ')[1];
    if (!token) return next();

    const payload = jwt.verify(token, JWT_SECRET);
    // attach full payload (so req.user.id, req.user.username are available)
    req.user = payload;
    return next();
  } catch (err) {
    console.warn('authMiddleware: invalid token', err && err.message);
    // don't block request — just leave req.user undefined and continue
    return next();
  }
}

app.use(authMiddleware);

// serve uploaded media files from /uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// register routes
app.use('/api/auth', authRoutes);
app.use('/api/reports', reportsRouter);
app.use('/api/admin', adminFlagsRouter);

// try to require other optional route files if present
try {
  const postsRouter = require('./routes/posts');
  app.use('/api/posts', postsRouter);
} catch (e) {
  console.log('Posts route not found (./routes/posts). Add backend/routes/posts.js to enable post upload and feed.');
}

try {
  const usersRouter = require('./routes/users');
  app.use('/api/users', usersRouter);
} catch (e) {
  console.log('Users route not found (./routes/users). Add backend/routes/users.js to enable profile endpoints.');
}

try {
  const messagesRouter = require('./routes/messages');
  app.use('/api/messages', messagesRouter);
} catch (e) {
  console.log('Messages route not found (./routes/messages). Add backend/routes/messages.js to enable messaging endpoints.');
}

// admin endpoint to list flagged accounts (simple)
// Uses pool.query result flexibly to support mysql2 and other clients
app.get('/api/admin/flags', async (req, res) => {
  try {
    const q = `SELECT fa.id, fa.account_id, fa.reason, fa.suspicion_score, fa.triggered_by, fa.flagged_at, u.username
               FROM flagged_accounts fa
               JOIN users u ON u.id = fa.account_id
               ORDER BY fa.flagged_at DESC
               LIMIT 200`;

    const result = await pool.query(q);
    // mysql2 returns [rows, fields]; other libs may return { rows }
    const rows = (Array.isArray(result) && Array.isArray(result[0])) ? result[0] : (result.rows || result);
    res.json({ ok: true, rows });
  } catch (err) {
    console.error('GET /api/admin/flags error:', err && err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend running on ${PORT}`));
