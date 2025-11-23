INSERT INTO artists (name, email, avatar_url, bio, social_links) VALUES 
('NarGen_', 'nargen@music.com', 'https://i.pravatar.cc/150?img=1', 'Electronic music producer', '{"instagram": "@nargen_music", "spotify": "nargen"}'),
('cvdence Music', 'cvdence@music.com', 'https://i.pravatar.cc/150?img=2', 'Alternative electronic artist', '{"instagram": "@cvdence", "soundcloud": "cvdence"}'),
('freakprod', 'freakprod@music.com', 'https://i.pravatar.cc/150?img=3', 'Phonk and electronic music producer', '{"youtube": "freakprod", "spotify": "freakprod"}');

INSERT INTO artist_aliases (artist_id, alias_name, is_primary) VALUES
(1, 'NarGen_', true),
(2, 'cvdence Music', true),
(2, 'anwtb', false),
(3, 'freakprod', true);

INSERT INTO releases (artist_id, title, cover_url, upc, isrc, release_date, created_date, territories, platforms, genre, status) VALUES
(1, 'comeback to me', 'https://picsum.photos/seed/comeback/400/400', '506383367981', '506383367981', '2025-11-07', '2025-10-29', 'Все страны', '["Spotify", "Apple Music", "Deezer"]', 'Electronic', 'published'),
(3, 'Dark Passenger', 'https://picsum.photos/seed/dark/400/400', '506383367912', '506383367912', '2025-11-07', '2025-10-29', 'Все страны', '["Spotify", "Apple Music", "YouTube Music"]', 'Phonk/Fonk', 'published'),
(1, 'Night Drive', 'https://picsum.photos/seed/night/400/400', '506383367923', '506383367923', '2025-12-15', '2025-11-20', 'Все страны', '["Spotify", "Apple Music"]', 'Electronic', 'pending'),
(2, 'Urban Lights', 'https://picsum.photos/seed/urban/400/400', '506383367934', '506383367934', '2025-11-25', '2025-11-15', 'Все страны', '["Spotify"]', 'Electronic', 'moderation');

INSERT INTO tracks (release_id, title, duration, isrc, track_number) VALUES
(1, 'comeback to me', 180, '506383367981', 1),
(2, 'Dark Passenger', 195, '506383367912', 1),
(3, 'Night Drive', 210, '506383367923', 1),
(3, 'Midnight Run', 185, '506383367924', 2),
(4, 'Urban Lights', 165, '506383367934', 1);

INSERT INTO release_stats (release_id, date, streams, downloads, country_code, platform) VALUES
(1, '2025-11-10', 1523, 45, 'RU', 'Spotify'),
(1, '2025-11-11', 1847, 52, 'RU', 'Spotify'),
(1, '2025-11-12', 2103, 61, 'RU', 'Spotify'),
(1, '2025-11-13', 2456, 73, 'RU', 'Spotify'),
(1, '2025-11-14', 2891, 89, 'RU', 'Spotify'),
(1, '2025-11-15', 3234, 102, 'RU', 'Spotify'),
(1, '2025-11-10', 892, 23, 'US', 'Spotify'),
(1, '2025-11-11', 1045, 28, 'US', 'Spotify'),
(1, '2025-11-12', 1234, 34, 'US', 'Spotify'),
(2, '2025-11-10', 3421, 112, 'RU', 'Spotify'),
(2, '2025-11-11', 3789, 128, 'RU', 'Spotify'),
(2, '2025-11-12', 4123, 145, 'RU', 'Spotify');