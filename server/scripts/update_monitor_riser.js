const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://postgres:okSETkHkJgdFBESdKbrVGNGIaKjFgLQa@gondola.proxy.rlwy.net:44923/railway'
});

async function update() {
    try {
        const { rows } = await pool.query(`SELECT id, name, extras, images FROM items WHERE name ILIKE '%Samsung U28%'`);
        if (!rows.length) { console.log('Samsung Monitor not found'); return; }
        const item = rows[0];
        console.log('Found:', item.name);

        // Update extras - replace generic 'Monitor risers' with detailed info
        // Each monitor comes with its own free riser (2 risers for 2 monitors)
        const newExtras = (item.extras || []).filter(e => e !== 'Monitor risers');
        newExtras.push('Free Monitor riser with each unit — 24″ × 6″ × 3.5″ height (0.61m × 0.15m × 0.09m)');

        // Add riser images
        const riserImages = [
            'https://res.cloudinary.com/theenactorist/image/upload/v1774025152/Declutter/Monitor-riser-annotation-2_veeruv.jpg',
            'https://res.cloudinary.com/theenactorist/image/upload/v1774025153/Declutter/Monitor-riser-annotation-1_xu931y.jpg'
        ];
        // Only add if not already present
        const newImages = [...item.images];
        for (const img of riserImages) {
            if (!newImages.includes(img)) newImages.push(img);
        }

        const result = await pool.query(
            `UPDATE items SET extras = $1, images = $2 WHERE id = $3 RETURNING id, name, extras`,
            [newExtras, newImages, item.id]
        );
        console.log('✓ Updated:', result.rows[0].name);
        console.log('  Extras:', result.rows[0].extras.join(', '));
    } catch (err) {
        console.error('Error:', err);
    } finally {
        await pool.end();
    }
}

update();
