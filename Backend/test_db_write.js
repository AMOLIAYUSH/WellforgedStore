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

async function testInsert() {
    try {
        const res = await pool.query(
            "INSERT INTO users (id, first_name, last_name, email, mobile_number, password, role) VALUES (gen_random_uuid(), 'DATABASE', 'TEST', 'dbtest@example.com', '1234567890', 'password', 'customer') RETURNING *"
        );
        console.log('Insert Successful:', res.rows[0]);

        // Clean up
        await pool.query("DELETE FROM users WHERE email = 'dbtest@example.com'");
        console.log('Cleanup Successful');
    } catch (err) {
        console.error('Insert Failed:', err);
    } finally {
        await pool.end();
    }
}

testInsert();
