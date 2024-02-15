CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role INTEGER
);

CREATE TABLE clients (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users,
  company TEXT,
  email TEXT,
  phonenumber TEXT,
  bi_code TEXT,
  deadline DATE,
  payperiod TEXT
);


CREATE TABLE pdfs (
    id SERIAL PRIMARY KEY,
    owner INTEGER REFERENCES clients,
    name TEXT,
    path TEXT,
    date TIMESTAMP
);