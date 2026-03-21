const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://postgres:okSETkHkJgdFBESdKbrVGNGIaKjFgLQa@gondola.proxy.rlwy.net:44923/railway'
});

async function updateTables() {
    try {
        const updates = [
            {
                oldName: '%Small Work Table%',
                newName: 'Small-size Work Table',
                condition_grade: '8',
                condition_notes: 'Well used — may exhibit minor scratches to finish.'
            },
            {
                oldName: '%Mid Work Table%',
                newName: 'Mid-size Work Table',
                condition_grade: '8+',
                condition_notes: 'Shows moderate wear; scuffing or minor marks to finish but overall clean.'
            },
            {
                oldName: '%Large Work Table%',
                newName: 'Large-size Work Table',
                condition_grade: '7',
                condition_notes: 'Shows considerable wear and above-average signs of use; visible edge scratches on one side. Removable top can be flipped to conceal them.'
            }
        ];

        for (const u of updates) {
            const result = await pool.query(
                `UPDATE items
                 SET name = $1, condition_grade = $2, condition_notes = $3
                 WHERE name ILIKE $4
                 RETURNING id, name, condition_grade;`,
                [u.newName, u.condition_grade, u.condition_notes, u.oldName]
            );
            if (result.rows.length > 0) {
                console.log(`✓ "${result.rows[0].name}" — condition: ${result.rows[0].condition_grade}`);
            } else {
                console.log(`✗ No match found for: ${u.oldName}`);
            }
        }

        // Also fetch the Large table's images to check for broken links
        const imgResult = await pool.query(
            `SELECT id, name, images FROM items WHERE name ILIKE '%Large%Work%Table%';`
        );
        if (imgResult.rows.length > 0) {
            console.log('\nLarge table images:');
            imgResult.rows[0].images.forEach((img, i) => console.log(`  ${i+1}. ${img}`));
        }

        console.log('\nDone!');
    } catch (err) {
        console.error("Error:", err);
    } finally {
        await pool.end();
    }
}

updateTables();
