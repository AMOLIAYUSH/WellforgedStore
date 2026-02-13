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

const batches = [
    {
        sku: 'WF-MOR-100G',
        batch_number: 'WF-2024-001',
        productName: 'Moringa Leaf Powder',
        manufactureDate: '2024-01-15',
        expirationDate: '2026-01-15',
        testDate: '2024-01-18',
        labName: 'NSF International',
        status: 'passed',
        purityLevel: 99.8,
        tests: [
            { name: "Heavy Metals (Lead)", result: "<0.5 ppm", status: "passed", limit: "<1.0 ppm" },
            { name: "Heavy Metals (Mercury)", result: "<0.1 ppm", status: "passed", limit: "<0.5 ppm" },
            { name: "Heavy Metals (Arsenic)", result: "<0.2 ppm", status: "passed", limit: "<1.0 ppm" },
            { name: "Microbial Testing", result: "No pathogens detected", status: "passed", limit: "None" },
            { name: "Moringa Identity", result: "Confirmed", status: "passed", limit: "Positive ID" },
            { name: "Moisture Content", result: "4.2%", status: "passed", limit: "<8%" }
        ]
    },
    {
        sku: 'WF-MOR-250G',
        batch_number: 'WF2026021212',
        productName: 'Moringa Leaf Powder',
        manufactureDate: '2024-06-01',
        expirationDate: '2026-06-01',
        testDate: '2024-06-04',
        labName: 'NSF International',
        status: 'passed',
        purityLevel: 99.9,
        tests: [
            { name: "Heavy Metals (Lead)", result: "<0.3 ppm", status: "passed", limit: "<1.0 ppm" },
            { name: "Heavy Metals (Mercury)", result: "<0.05 ppm", status: "passed", limit: "<0.5 ppm" },
            { name: "Heavy Metals (Arsenic)", result: "<0.1 ppm", status: "passed", limit: "<1.0 ppm" },
            { name: "Microbial Testing", result: "No pathogens detected", status: "passed", limit: "None" },
            { name: "Moringa Identity", result: "Confirmed", status: "passed", limit: "Positive ID" },
            { name: "Moisture Content", result: "3.5%", status: "passed", limit: "<8%" }
        ]
    }
];

async function seed() {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        for (const data of batches) {
            // Get product ID from SKU
            const prodRes = await client.query('SELECT id FROM products WHERE sku = $1', [data.sku]);
            if (prodRes.rows.length === 0) {
                console.log(`Product with SKU ${data.sku} not found. Skipping.`);
                continue;
            }
            const productId = prodRes.rows[0].id;

            // Insert batch
            const batchRes = await client.query(
                `INSERT INTO report_batches (product_id, batch_number, testing_date, tested_by) 
                 VALUES ($1, $2, $3, $4) RETURNING id`,
                [productId, data.batch_number, data.testDate, data.labName]
            );
            const batchId = batchRes.rows[0].id;

            // Insert tests
            for (const test of data.tests) {
                await client.query(
                    `INSERT INTO report_test_results (batch_id, test_name, test_value, unit, pass_status) 
                     VALUES ($1, $2, $3, $4, $5)`,
                    [batchId, test.name, test.result, test.limit.split(' ').pop() || '', test.status === 'passed']
                );
            }
            console.log(`Seeded batch ${data.batch_number}`);
        }

        await client.query('COMMIT');
        console.log('Seeding complete!');
    } catch (err) {
        await client.query('ROLLBACK');
        console.error('Seeding failed:', err);
    } finally {
        client.release();
        await pool.end();
    }
}

seed();
