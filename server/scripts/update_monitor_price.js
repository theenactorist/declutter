const { Pool } = require('pg');

const pool = new Pool({
    connectionString: 'postgresql://postgres:okSETkHkJgdFBESdKbrVGNGIaKjFgLQa@gondola.proxy.rlwy.net:44923/railway'
});

async function updateItem() {
    try {
        console.log("Updating Monitor price...");

        const result = await pool.query(
            `UPDATE items 
             SET price = $1
             WHERE name ILIKE '%Samsung 4k Monitor%' OR name ILIKE '%U28E590D%'
             RETURNING id, name, price;`,
            [150000]
        );

        if (result.rows.length > 0) {
            console.log(`Successfully updated Monitor price. ID: ${result.rows[0].id}`);
            console.log(result.rows[0]);
        } else {
            console.log('Monitor item not found to update.');
        }
    } catch (err) {
        console.error("Error updating Monitor:", err);
    } finally {
        await pool.end();
    }
}

updateItem();
