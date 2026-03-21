const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://postgres:okSETkHkJgdFBESdKbrVGNGIaKjFgLQa@gondola.proxy.rlwy.net:44923/railway'
});

async function updateImages() {
    try {
        const replacements = [
            {
                nameFilter: '%Samsung U28%',
                oldUrl: 'https://res.cloudinary.com/theenactorist/image/upload/v1774025153/Declutter/Monitor-riser-annotation-1_xu931y.jpg',
                newUrl: 'https://res.cloudinary.com/theenactorist/image/upload/v1774041297/Declutter/Monitor-riser-annotation-1_rfmxpn.jpg'
            },
            {
                nameFilter: '%Mid-size%Table%',
                oldUrl: 'https://res.cloudinary.com/theenactorist/image/upload/v1774023614/Declutter/Table-Mid-Declutter-4_u8zcwz.jpg',
                newUrl: 'https://res.cloudinary.com/theenactorist/image/upload/v1774041478/Declutter/Mid-table-annotate_zpkthv.jpg'
            },
            {
                nameFilter: '%Small-size%Table%',
                oldUrl: 'https://res.cloudinary.com/theenactorist/image/upload/v1774023974/Declutter/Table-Declutter-6_sqddko.jpg',
                newUrl: 'https://res.cloudinary.com/theenactorist/image/upload/v1774041632/Declutter/Small-table-annotate_cvomrb.jpg'
            }
        ];

        for (const req of replacements) {
            const result = await pool.query(
                `UPDATE items 
                 SET images = array_replace(images, $1, $2)
                 WHERE name ILIKE $3
                 RETURNING id, name;`,
                [req.oldUrl, req.newUrl, req.nameFilter]
            );
            if (result.rows.length > 0) {
                console.log(`✓ Updated images for: "${result.rows[0].name}"`);
            } else {
                console.log(`✗ Item not found for filter: ${req.nameFilter}`);
            }
        }
    } catch (err) {
        console.error("Error:", err);
    } finally {
        await pool.end();
    }
}

updateImages();
