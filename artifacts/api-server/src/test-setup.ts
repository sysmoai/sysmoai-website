// Test setup — minimal env vars for isolated unit tests
process.env.NODE_ENV = 'test';
process.env.PORT = '0'; // random port, won't actually bind
process.env.DATABASE_URL = 'postgresql://placeholder:placeholder@localhost:5432/test';
