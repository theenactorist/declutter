const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://postgres:okSETkHkJgdFBESdKbrVGNGIaKjFgLQa@gondola.proxy.rlwy.net:44923/railway'
});

const ac = {
    name: "Scanfrost 1.5HP Split Air Conditioner",
    short_description: "1.5HP / 12,000 BTU Split AC with 100% Copper Condenser",
    full_description: "Scanfrost 1.5HP wall-mounted split air conditioner (Model: SFACS12M). Features a 12,000 BTU cooling capacity and a 100% copper coil condenser for durability. Includes a dust filter and an anti-bacteria filter to help clean the air while cooling.",
    category: "appliances",
    price: 170000,
    status: "available",
    condition_grade: "8",
    condition_notes: "Well used — may exhibit 'dings' or noticeable marks.",
    specs: JSON.stringify({
        "Model": "Scanfrost SFACS12M",
        "Type": "Split type air conditioner",
        "Power": "1.5 HP",
        "Cooling Capacity": "12,000 BTU",
        "Condenser": "100% Copper / Copper coil condenser",
        "Colour": "White",
        "Features": "Dust filter, Anti-bacteria filter"
    }),
    extras: ["Installation accessories", "Remote control"],
    quantity: 1,
    images: [
        "https://res.cloudinary.com/theenactorist/image/upload/v1774082818/Declutter/AC-Declutter-0_jec345.webp",
        "https://res.cloudinary.com/theenactorist/image/upload/v1774082886/Declutter/AC-Declutter-1_pzrwx8.jpg",
        "https://res.cloudinary.com/theenactorist/image/upload/v1774082823/Declutter/AC-Declutter-2_a7upai.jpg",
        "https://res.cloudinary.com/theenactorist/image/upload/v1774082819/Declutter/AC-Declutter-3_ttug9k.jpg",
        "https://res.cloudinary.com/theenactorist/image/upload/v1774082891/Declutter/AC-Declutter-4_awyuik.jpg"
    ]
};

async function insertAC() {
    try {
        // Find if there's a generic 'AC' to overwrite
        const deleteRes = await pool.query(`DELETE FROM items WHERE name = 'AC' RETURNING name`);
        if (deleteRes.rowCount > 0) {
            console.log(`Removed generic placeholder "AC"`);
        }

        console.log(`Inserting "${ac.name}"...`);
        const result = await pool.query(
            `INSERT INTO items (
                name, short_description, full_description, category,
                price, condition_grade, condition_notes, status, specs, extras, quantity, images
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
            RETURNING id, name;`,
            [
                ac.name, ac.short_description, ac.full_description, ac.category,
                ac.price, ac.condition_grade, ac.condition_notes, ac.status,
                ac.specs, ac.extras, ac.quantity, ac.images
            ]
        );
        console.log(`✓ Created "${result.rows[0].name}" (ID: ${result.rows[0].id})`);
    } catch (err) {
        console.error("Error:", err);
    } finally {
        await pool.end();
    }
}

insertAC();
