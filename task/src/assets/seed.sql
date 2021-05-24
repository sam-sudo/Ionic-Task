CREATE TABLE IF NOT EXISTS developer(id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT,skills TEXT,img TEXT);
INSERT or IGNORE INTO developer VALUES (1, 'Simon', '', 'https://media.vandal.net/i/1200x630/5-2021/20215201361676_1.jpg');
INSERT or IGNORE INTO developer VALUES (2, 'Max', '', 'https://sm.ign.com/t/ign_es/news/z/zelda-brea/zelda-breath-of-wild-wii-u-version-seemingly-leaks-online_zv7t.1280.jpg');
INSERT or IGNORE INTO developer VALUES (3, 'Ben', '', 'https://static.wikia.nocookie.net/zelda/images/2/26/Link_Artwork_LAR.png/revision/latest?cb=20191015020845&path-prefix=es');
 
CREATE TABLE IF NOT EXISTS product(id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT, creatorId INTEGER);
INSERT or IGNORE INTO product(id, name, creatorId) VALUES (1, 'Ionic Academy', 1);
INSERT or IGNORE INTO product(id, name, creatorId) VALUES (2, 'Software Startup Manual', 1);
INSERT or IGNORE INTO product(id, name, creatorId) VALUES (3, 'Ionic Framework', 2);
INSERT or IGNORE INTO product(id, name, creatorId) VALUES (4, 'Drifty Co', 2);
INSERT or IGNORE INTO product(id, name, creatorId) VALUES (5, 'Drifty Co', 3);
INSERT or IGNORE INTO product(id, name, creatorId) VALUES (6, 'Ionicons', 3);