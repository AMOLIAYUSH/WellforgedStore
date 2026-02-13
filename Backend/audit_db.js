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

async function audit() {
    try {
        console.log('--- TABLE SCHEMA CHECK ---');
        const schemaRes = await pool.query(`
            SELECT table_name, column_name, data_type 
            FROM information_schema.columns 
            WHERE table_schema = 'public'
            ORDER BY table_name, ordinal_position
        `);
        console.table(schemaRes.rows);

        console.log('\n--- FOREIGN KEY INTEGRITY ---');
        // Check orders -> users
        const orphanOrders = await pool.query('SELECT id FROM orders WHERE user_id NOT IN (SELECT id FROM users)');
        console.log(`Orphan Orders (no user): ${orphanOrders.rows.length}`);

        // Check order_items -> orders
        const orphanOrderItems = await pool.query('SELECT id FROM order_items WHERE order_id NOT IN (SELECT id FROM orders)');
        console.log(`Orphan Order Items: ${orphanOrderItems.rows.length}`);

        // Check cart_items -> carts
        const orphanCartItems = await pool.query('SELECT id FROM cart_items WHERE cart_id NOT IN (SELECT id FROM cart)');
        console.log(`Orphan Cart Items: ${orphanCartItems.rows.length}`);

        console.log('\n--- DATA FLOW CHECK (SAMPLE ORDER) ---');
        const sampleOrder = await pool.query('SELECT * FROM orders ORDER BY created_at DESC LIMIT 1');
        if (sampleOrder.rows.length > 0) {
            const order = sampleOrder.rows[0];
            console.log(`Order ${order.id} total: ${order.total_amount}`);
            console.log(`Address Snapshot: ${typeof order.address_snapshot}`);

            const items = await pool.query('SELECT * FROM order_items WHERE order_id = $1', [order.id]);
            console.log(`Items in order: ${items.rows.length}`);
        }

        console.log('\n--- INVENTORY LOGS CONSISTENCY ---');
        const logCount = await pool.query('SELECT count(*) FROM inventory_logs');
        console.log(`Total inventory logs: ${logCount.rows[0].count}`);

    } catch (err) {
        console.error('Audit failed:', err);
    } finally {
        await pool.end();
    }
}

audit();
