CREATE TABLE movies (
  id SERIAL, 
  url text PRIMARY KEY,
  title text,
  year text,
  rating text,
  summary text,
  poster text
);

CREATE TABLE links (
  id SERIAL,
  url text REFERENCES movies(url),
  link text UNIQUE
);
