const { Pool } = require('pg');

const pool = new Pool({
    connectionString: 'postgresql://postgres:okSETkHkJgdFBESdKbrVGNGIaKjFgLQa@gondola.proxy.rlwy.net:44923/railway'
});

const cookerData = {
    name: "Skyrun Gas Cooker",
    short_description: "Skyrun 4-Burner Gas Cooker",
    full_description: "Skyrun 4-Burner Gas Cooker with a 60-liter oven capacity. Perfect for your kitchen cooking needs.",
    category: "appliances",
    price: 60000,
    status: "available",
    condition_grade: "7",
    condition_notes: "Shows considerable wear and above-average signs of use.",
    specs: JSON.stringify({
        "Configuration": "4+0 (4 Gas Burners, No Electric Burner)",
        "Cooker Dimensions": "50 × 50 cm",
        "Oven Capacity": "60 Litres",
        "Burner Material": "Aluminium",
        "Main Body Material": "Cold Plate Steel",
        "Ignition": "Manual",
        "Colour": "Brown"
    }),
    extras: [],
    quantity: 1,
    images: [
        "https://res.cloudinary.com/theenactorist/image/upload/v1772730636/Declutter/Gascooker-1_srpaic.jpg",
        "https://res.cloudinary.com/theenactorist/image/upload/v1772730635/Declutter/Gascooker-3_a9ubvp.jpg",
        "https://res.cloudinary.com/theenactorist/image/upload/v1772730635/Declutter/Gascooker-2_qb7pk6.jpg"
    ]
};

async function updateItem() {
    try {
        console.log("Updating Gas Cooker...");

        const result = await pool.query(
            `UPDATE items 
             SET name = $1, short_description = $2, full_description = $3, category = $4,
                 price = $5, condition_grade = $6, condition_notes = $7, status = $8,
                 specs = $9, extras = $10, quantity = $11, images = $12
             WHERE name ILIKE '%Cooker%'
             RETURNING id, name;`,
            [
                cookerData.name, cookerData.short_description, cookerData.full_description, cookerData.category,
                cookerData.price, cookerData.condition_grade, cookerData.condition_notes, cookerData.status,
                cookerData.specs, cookerData.extras, cookerData.quantity, cookerData.images
            ]
        );

        if (result.rows.length > 0) {
            console.log(`Successfully updated Gas Cooker. ID: ${result.rows[0].id}`);
        } else {
            console.log('Gas Cooker item not found to update. Executing INSERT...');
            const insertResult = await pool.query(
                `INSERT INTO items (
                     name, short_description, full_description, category, 
                     price, condition_grade, condition_notes, status, specs, extras, quantity, images
                 ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
                 RETURNING id, name;`,
                [
                    cookerData.name, cookerData.short_description, cookerData.full_description, cookerData.category,
                    cookerData.price, cookerData.condition_grade, cookerData.condition_notes, cookerData.status,
                    cookerData.specs, cookerData.extras, cookerData.quantity, cookerData.images
                ]
            );
            console.log(`Successfully created Gas Cooker. ID: ${insertResult.rows[0].id}`);
        }
    } catch (err) {
        console.error("Error updating Gas Cooker:", err);
    } finally {
        await pool.end();
    }
}

updateItem();
