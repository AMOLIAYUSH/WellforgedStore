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

async function verifyOrder() {
    try {
        // 1. Get the latest order
        const orderRes = await pool.query('SELECT * FROM orders ORDER BY created_at DESC LIMIT 1');
        if (orderRes.rows.length === 0) {
            console.log('❌ No orders found in database.');
            return;
        }
        const order = orderRes.rows[0];
        console.log('\n✅ Latest Order Found:');
        console.table([order]);

        // 2. Get order items
        const itemsRes = await pool.query(`
            SELECT oi.*, p.name, p.sku 
            FROM order_items oi 
            JOIN products p ON oi.product_id = p.id 
            WHERE oi.order_id = $1
        `, [order.id]);
        console.log('\n📦 Order Items:');
        console.table(itemsRes.rows);

        // 3. Get address
        const addressRes = await pool.query('SELECT * FROM addresses WHERE id = $1', [order.address_id]);
        console.log('\n📍 Shipping Address Saved:');
        console.table(addressRes.rows);

        // 4. Check Inventory Log
        if (itemsRes.rows.length > 0) {
            const productId = itemsRes.rows[0].product_id;
            const logRes = await pool.query('SELECT * FROM inventory_logs WHERE product_id = $1 ORDER BY created_at DESC LIMIT 1', [productId]);
            console.log('\n📉 Inventory Log Entry:');
            console.table(logRes.rows);
        }

    } catch (err) {
        console.error('Error during verification:', err);
    } finally {
        await pool.end();
    }
}

verifyOrder();
