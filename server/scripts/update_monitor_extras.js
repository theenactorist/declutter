const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://postgres:okSETkHkJgdFBESdKbrVGNGIaKjFgLQa@gondola.proxy.rlwy.net:44923/railway'
});

async function updateMonitorExtras() {
    try {
        console.log("Updating Monitor extras...");
        const result = await pool.query(
            `UPDATE items 
             SET extras = $1
             WHERE name ILIKE '%Monitor%' OR name ILIKE '%Samsung U28%'
             RETURNING id, name, extras;`,
            [["Monitor risers", "Power cable", "4K HDMI cables"]]
        );
        
        if (result.rows.length > 0) {
            result.rows.forEach(row => {
                console.log(`Updated "${row.name}" (ID: ${row.id})`);
                console.log(`  Extras: ${row.extras.join(', ')}`);
            });
        } else {
            console.log('No monitor items found.');
        }
    } catch (err) {
        console.error("Error:", err);
    } finally {
        await pool.end();
    }
}

updateMonitorExtras();
