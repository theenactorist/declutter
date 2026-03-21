const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://postgres:okSETkHkJgdFBESdKbrVGNGIaKjFgLQa@gondola.proxy.rlwy.net:44923/railway'
});

const fridge = {
    name: "Skyrun 252-Litres Double Door Top Mount Fridge",
    short_description: "252L Dark Grey Top-Freezer Refrigerator with interior LED & Lock",
    full_description: "Skyrun double-door refrigerator featuring fast cooling, with separate refrigerated and freezing sections to keep fresh food and frozen items in good condition. It also comes with interior LED lighting and includes a lock and key for security.",
    category: "appliances",
    price: 170000,
    status: "available",
    condition_grade: "8",
    condition_notes: "Well used — may exhibit noticeable marks to finish or signs of use.",
    specs: JSON.stringify({
        "Type": "Double-door top mount / top freezer refrigerator",
        "Brand": "Skyrun",
        "Model": "BCD-257A",
        "Capacity": "252 Litres (Total) / 257 Litres (Gross)",
        "Dimensions": "58cm × 55cm × 163cm height (1.9ft × 1.8ft × 5.3ft)",
        "Width": "58cm (1.9 ft)",
        "Depth": "55cm (1.8 ft)",
        "Height": "163cm (5.3 ft)",
        "Colour": "Dark grey",
        "Features": "Interior LED lighting, Lock and key included"
    }),
    extras: ["Lock and Key"],
    quantity: 1,
    images: ["https://res.cloudinary.com/theenactorist/image/upload/v1774086583/Declutter/Fridge-Declutter-0_zcmk2o.jpg"]
};

async function insertFridge() {
    try {
        // Find if there's a generic 'Fridge' to overwrite, or just insert new
        const deleteRes = await pool.query(`DELETE FROM items WHERE name = 'Fridge' RETURNING name`);
        if (deleteRes.rowCount > 0) {
            console.log(`Removed generic placeholder "${deleteRes.rows[0].name}"`);
        }

        console.log(`Inserting "${fridge.name}"...`);
        const result = await pool.query(
            `INSERT INTO items (
                name, short_description, full_description, category,
                price, condition_grade, condition_notes, status, specs, extras, quantity, images
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
            RETURNING id, name;`,
            [
                fridge.name, fridge.short_description, fridge.full_description, fridge.category,
                fridge.price, fridge.condition_grade, fridge.condition_notes, fridge.status,
                fridge.specs, fridge.extras, fridge.quantity, fridge.images
            ]
        );
        console.log(`✓ Created "${result.rows[0].name}" (ID: ${result.rows[0].id})`);
    } catch (err) {
        console.error("Error:", err);
    } finally {
        await pool.end();
    }
}

insertFridge();
