import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || '5432'),
});

async function check() {
    try {
        const res = await pool.query('SELECT id, first_name, last_name, mobile_number, created_at FROM users ORDER BY created_at DESC LIMIT 5');
        console.log('Recent Users:');
        console.table(res.rows);
    } catch (err) {
        console.error('Error querying database:', err);
    } finally {
        await pool.end();
    }
}

check();
