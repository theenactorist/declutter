const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://postgres:okSETkHkJgdFBESdKbrVGNGIaKjFgLQa@gondola.proxy.rlwy.net:44923/railway'
});

async function fixTables() {
    try {
        // Fix Small table specs + add image
        console.log("Fixing Small-size Work Table...");
        let result = await pool.query(
            `UPDATE items
             SET specs = $1,
                 images = array_append(images, $2)
             WHERE name ILIKE '%Small%Work%Table%'
             RETURNING id, name;`,
            [
                JSON.stringify({
                    "Type": "Work Table / Desk",
                    "Size": "Small",
                    "Dimensions": "0.80m × 0.44m × 0.71m (31.5″ × 17.5″ × 28″)",
                    "Width": "0.80m (31.5 inches)",
                    "Depth": "0.44m (17.5 inches)",
                    "Height": "0.71m (28 inches)",
                    "Finish": "Black Burnished Polished Wood",
                    "Drawers": "2",
                    "Colour": "Black"
                }),
                "https://res.cloudinary.com/theenactorist/image/upload/v1774023974/Declutter/Table-Declutter-6_sqddko.jpg"
            ]
        );
        console.log(`  ✓ ${result.rows[0]?.name || 'Not found'}`);

        // Fix Mid table specs + add image
        console.log("Fixing Mid-size Work Table...");
        result = await pool.query(
            `UPDATE items
             SET specs = $1,
                 images = array_append(images, $2)
             WHERE name ILIKE '%Mid%Work%Table%'
             RETURNING id, name;`,
            [
                JSON.stringify({
                    "Type": "Work Table / Desk",
                    "Size": "Mid",
                    "Dimensions": "1.07m × 0.51m × 0.71m (42″ × 20″ × 28″)",
                    "Width": "1.07m (42 inches)",
                    "Depth": "0.51m (20 inches)",
                    "Height": "0.71m (28 inches)",
                    "Finish": "Black Burnished Polished Wood",
                    "Drawers": "1",
                    "Colour": "Black"
                }),
                "https://res.cloudinary.com/theenactorist/image/upload/v1774023614/Declutter/Table-Mid-Declutter-4_u8zcwz.jpg"
            ]
        );
        console.log(`  ✓ ${result.rows[0]?.name || 'Not found'}`);

        // Fix Large table specs (no new image)
        console.log("Fixing Large-size Work Table...");
        result = await pool.query(
            `UPDATE items
             SET specs = $1
             WHERE name ILIKE '%Large%Work%Table%'
             RETURNING id, name;`,
            [
                JSON.stringify({
                    "Type": "Work Table / Desk",
                    "Size": "Large",
                    "Dimensions": "1.60m × 0.75m × 0.71m (63″ × 29.5″ × 28″)",
                    "Width": "1.60m (63 inches)",
                    "Depth": "0.75m (29.5 inches)",
                    "Height": "0.71m (28 inches)",
                    "Finish": "Maple/Cedar Polished",
                    "Top": "Removable (can be flipped)",
                    "Colour": "Maple/Cedar"
                })
            ]
        );
        console.log(`  ✓ ${result.rows[0]?.name || 'Not found'}`);

        console.log('\nAll tables fixed!');
    } catch (err) {
        console.error("Error:", err);
    } finally {
        await pool.end();
    }
}

fixTables();
