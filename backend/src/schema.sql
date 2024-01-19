CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role INTEGER
);

CREATE TABLE customers (
  id SERIAL PRIMARY KEY,
  role INTEGER REFERENCES users,
  company TEXT,
  email TEXT,
  phonenumber TEXT,
  bi_code TEXT,
  deadline DATE,
  payperiod TEXT,
  material_id INTEGER
); 

CREATE TABLE salarydata (
  id SERIAL PRIMARY KEY,
  material_id INTEGER REFERENCES customers,
  delivered BOOLEAN
);