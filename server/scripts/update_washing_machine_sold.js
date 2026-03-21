const { Pool } = require('pg');

const pool = new Pool({
    connectionString: 'postgresql://postgres:okSETkHkJgdFBESdKbrVGNGIaKjFgLQa@gondola.proxy.rlwy.net:44923/railway'
});

async function updateItem() {
    try {
        console.log("Updating Washing Machine status to sold...");

        const result = await pool.query(
            `UPDATE items 
             SET status = $1
             WHERE name ILIKE '%Washing Machine%'
             RETURNING id, name, status;`,
            ['sold']
        );

        if (result.rows.length > 0) {
            console.log(`Successfully updated Washing Machine. ID: ${result.rows[0].id}`);
            console.log(result.rows[0]);
        } else {
            console.log('Washing Machine item not found to update.');
        }
    } catch (err) {
        console.error("Error updating Washing Machine:", err);
    } finally {
        await pool.end();
    }
}

updateItem();
