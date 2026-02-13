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

async function seedProducts() {
    try {
        // First delete existing moringa if any to avoid duplicates or keep it clean
        // (Optional, but helps during development)

        const moringa100 = {
            name: 'Moringa Leaf Powder - 100g',
            slug: 'moringa-leaf-powder-100g',
            sku: 'WF-MOR-100G',
            price: 349,
            stock: 100,
            description: '100% Pure Moringa Leaf Powder'
        };

        const moringa250 = {
            name: 'Moringa Leaf Powder - 250g',
            slug: 'moringa-leaf-powder-250g',
            sku: 'WF-MOR-250G',
            price: 549,
            stock: 100,
            description: '100% Pure Moringa Leaf Powder'
        };

        const query = 'INSERT INTO products (id, name, slug, sku, price, stock, description, is_active) VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, true) RETURNING *';

        const res1 = await pool.query(query, [moringa100.name, moringa100.slug, moringa100.sku, moringa100.price, moringa100.stock, moringa100.description]);
        console.log('Seeded 100g:', res1.rows[0]);

        const res2 = await pool.query(query, [moringa250.name, moringa250.slug, moringa250.sku, moringa250.price, moringa250.stock, moringa250.description]);
        console.log('Seeded 250g:', res2.rows[0]);

    } catch (err) {
        console.error('Seed Failed:', err);
    } finally {
        await pool.end();
    }
}

seedProducts();
