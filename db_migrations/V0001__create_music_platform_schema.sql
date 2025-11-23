CREATE TABLE artists (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  avatar_url TEXT,
  bio TEXT,
  social_links JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE artist_aliases (
  id SERIAL PRIMARY KEY,
  artist_id INTEGER NOT NULL REFERENCES artists(id),
  alias_name VARCHAR(255) UNIQUE NOT NULL,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE releases (
  id SERIAL PRIMARY KEY,
  artist_id INTEGER NOT NULL REFERENCES artists(id),
  title VARCHAR(255) NOT NULL,
  cover_url TEXT,
  upc VARCHAR(50),
  isrc VARCHAR(50),
  release_date DATE,
  created_date DATE NOT NULL DEFAULT CURRENT_DATE,
  territories TEXT,
  platforms JSONB DEFAULT '[]',
  genre VARCHAR(100),
  status VARCHAR(50) DEFAULT 'draft',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tracks (
  id SERIAL PRIMARY KEY,
  release_id INTEGER NOT NULL REFERENCES releases(id),
  title VARCHAR(255) NOT NULL,
  duration INTEGER,
  isrc VARCHAR(50),
  track_number INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE release_stats (
  id SERIAL PRIMARY KEY,
  release_id INTEGER NOT NULL REFERENCES releases(id),
  date DATE NOT NULL,
  streams INTEGER DEFAULT 0,
  downloads INTEGER DEFAULT 0,
  country_code VARCHAR(2),
  platform VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(release_id, date, country_code, platform)
);

CREATE INDEX idx_releases_artist_id ON releases(artist_id);
CREATE INDEX idx_tracks_release_id ON tracks(release_id);
CREATE INDEX idx_release_stats_release_id ON release_stats(release_id);
CREATE INDEX idx_release_stats_date ON release_stats(date);
CREATE INDEX idx_artist_aliases_artist_id ON artist_aliases(artist_id);