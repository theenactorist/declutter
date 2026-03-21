const { Pool } = require('pg');

const pool = new Pool({
    connectionString: 'postgresql://postgres:okSETkHkJgdFBESdKbrVGNGIaKjFgLQa@gondola.proxy.rlwy.net:44923/railway'
});

async function updateItem() {
    try {
        console.log("Updating Soundbar category and grade...");

        const result = await pool.query(
            `UPDATE items 
             SET category = $1, condition_grade = $2 
             WHERE name = 'Hisense Soundbar' OR name = 'Hisense HS205 2.0CH 60W Soundbar'
             RETURNING id, name, category, condition_grade;`,
            [
                'living_room', '10'
            ]
        );

        if (result.rows.length > 0) {
            console.log(`Successfully updated Soundbar. ID: ${result.rows[0].id}`);
            console.log(result.rows[0]);
        } else {
            console.log('Soundbar item not found to update.');
        }
    } catch (err) {
        console.error("Error updating Soundbar:", err);
    } finally {
        await pool.end();
    }
}

updateItem();
