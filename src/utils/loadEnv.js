const path = process.env.NODE_ENV === 'test' ? '.env.test' : '.env';
require('dotenv').config({ path, silent: process.env.NODE_ENV === 'test' });
