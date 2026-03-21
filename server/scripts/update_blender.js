const { Pool } = require('pg');

const pool = new Pool({
    connectionString: 'postgresql://postgres:okSETkHkJgdFBESdKbrVGNGIaKjFgLQa@gondola.proxy.rlwy.net:44923/railway'
});

const blenderData = {
    name: "Binatone 1.5-litre Blender",
    short_description: "Binatone BLG-452 1.5L Blender",
    full_description: "Binatone 1.5-litre Blender with unbreakable polycarbonate jug. Model BLG-452.",
    category: "appliances",
    price: 10000,
    status: "available",
    condition_grade: "7",
    condition_notes: "Shows considerable wear and above-average signs of use.",
    specs: JSON.stringify({
        "Model": "BLG-452",
        "Capacity": "1.5 Litres",
        "Motor Power": "300 – 350W",
        "Voltage": "220–240V ~ 50/60Hz",
        "Speed Settings": "2 Speed + Pulse Mode",
        "Blade Material": "Stainless Steel",
        "Jug Material": "Unbreakable Polycarbonate (PC)",
        "Colour": "Black",
        "Weight": "1.5 kg"
    }),
    extras: [],
    quantity: 1,
    images: [
        "https://res.cloudinary.com/theenactorist/image/upload/v1772731296/Declutter/Blender-02_fngaqu.jpg",
        "https://res.cloudinary.com/theenactorist/image/upload/v1772731297/Declutter/Blender-01_jgguaz.jpg"
    ]
};

async function updateItem() {
    try {
        console.log("Updating Blender...");

        const result = await pool.query(
            `UPDATE items 
             SET name = $1, short_description = $2, full_description = $3, category = $4,
                 price = $5, condition_grade = $6, condition_notes = $7, status = $8,
                 specs = $9, extras = $10, quantity = $11, images = $12
             WHERE name ILIKE '%Blender%'
             RETURNING id, name;`,
            [
                blenderData.name, blenderData.short_description, blenderData.full_description, blenderData.category,
                blenderData.price, blenderData.condition_grade, blenderData.condition_notes, blenderData.status,
                blenderData.specs, blenderData.extras, blenderData.quantity, blenderData.images
            ]
        );

        if (result.rows.length > 0) {
            console.log(`Successfully updated Blender. ID: ${result.rows[0].id}`);
        } else {
            console.log('Blender not found to update. Executing INSERT...');
            const insertResult = await pool.query(
                `INSERT INTO items (
                     name, short_description, full_description, category, 
                     price, condition_grade, condition_notes, status, specs, extras, quantity, images
                 ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
                 RETURNING id, name;`,
                [
                    blenderData.name, blenderData.short_description, blenderData.full_description, blenderData.category,
                    blenderData.price, blenderData.condition_grade, blenderData.condition_notes, blenderData.status,
                    blenderData.specs, blenderData.extras, blenderData.quantity, blenderData.images
                ]
            );
            console.log(`Successfully created Blender. ID: ${insertResult.rows[0].id}`);
        }
    } catch (err) {
        console.error("Error updating Blender:", err);
    } finally {
        await pool.end();
    }
}

updateItem();
