const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://postgres:okSETkHkJgdFBESdKbrVGNGIaKjFgLQa@gondola.proxy.rlwy.net:44923/railway'
});

async function updateSamsungPrice() {
    try {
        const result = await pool.query(
            `UPDATE items SET price = 100000 WHERE name ILIKE '%Samsung U28%' RETURNING id, name, price`
        );
        console.log(`✓ Updated "${result.rows[0].name}" price to ₦${result.rows[0].price}`);
    } catch (err) {
        console.error("Error:", err);
    } finally {
        await pool.end();
    }
}

updateSamsungPrice();
