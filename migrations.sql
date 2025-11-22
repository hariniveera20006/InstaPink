-- run in psql or your DB UI
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE,
  hashed_password TEXT,
  is_flagged BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  caption TEXT,
  media_url TEXT,
  media_type TEXT,
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE reports (
  id SERIAL PRIMARY KEY,
  reporter_user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  reported_account_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  post_id INTEGER REFERENCES posts(id) ON DELETE SET NULL,
  report_text TEXT,
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE flagged_accounts (
  id SERIAL PRIMARY KEY,
  account_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  reason TEXT,
  suspicion_score INTEGER DEFAULT 0,
  triggered_by TEXT,
  flagged_at TIMESTAMP DEFAULT now(),
  status TEXT DEFAULT 'pending'
);
