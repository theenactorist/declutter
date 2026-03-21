const { Pool } = require('pg');

const pool = new Pool({
    connectionString: 'postgresql://postgres:okSETkHkJgdFBESdKbrVGNGIaKjFgLQa@gondola.proxy.rlwy.net:44923/railway'
});

const fanData = {
    name: 'Nexus 18" Standing Fan (3 Available)',
    short_description: 'Nexus 18" Standing Fan (NX-SF5400B)',
    full_description: "I have 3 of these reliable 18-inch standing fans available. They feature 5 blades, 3 speed settings, and are adjustable up to 2 meters in height. The price listed is per fan.",
    category: "appliances",
    price: 10000,
    status: "available",
    condition_grade: "8",
    condition_notes: "Good working condition.",
    specs: JSON.stringify({
        "Model": "NX-SF5400B",
        "Blade Size": "18 inches",
        "Number of Blades": "5",
        "Blade Material": "Rust-free metal/plastic",
        "Speed Settings": "3 speeds",
        "Power Consumption": "60W – 75W",
        "Voltage": "230V ~ 50Hz",
        "Power Supply": "Single phase",
        "Weight": "5 kg",
        "Colour": "Black",
        "Height": "Up to 2 metres (~4 feet)",
        "Dimensions": "46W × 135H × 45D mm"
    }),
    extras: [],
    quantity: 3,
    images: ["https://res.cloudinary.com/theenactorist/image/upload/v1772670501/Declutter/Nexus-Fan-1_ugxd3l.jpg"]
};

async function updateItem() {
    try {
        console.log("Updating Fans...");

        const result = await pool.query(
            `UPDATE items 
             SET name = $1, short_description = $2, full_description = $3, category = $4,
                 price = $5, condition_grade = $6, condition_notes = $7, status = $8,
                 specs = $9, extras = $10, quantity = $11, images = $12
             WHERE name = 'Fans' OR name LIKE 'Nexus 18%'
             RETURNING id, name;`,
            [
                fanData.name, fanData.short_description, fanData.full_description, fanData.category,
                fanData.price, fanData.condition_grade, fanData.condition_notes, fanData.status,
                fanData.specs, fanData.extras, fanData.quantity, fanData.images
            ]
        );

        if (result.rows.length > 0) {
            console.log(`Successfully updated Fans. ID: ${result.rows[0].id}`);
        } else {
            console.log('Fans item not found to update. Creating it instead...');
            const insertResult = await pool.query(
                `INSERT INTO items (
                     name, short_description, full_description, category, 
                     price, condition_grade, condition_notes, status, specs, extras, quantity, images
                 ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
                 RETURNING id, name;`,
                [
                    fanData.name, fanData.short_description, fanData.full_description, fanData.category,
                    fanData.price, fanData.condition_grade, fanData.condition_notes, fanData.status,
                    fanData.specs, fanData.extras, fanData.quantity, fanData.images
                ]
            );
            console.log(`Successfully created Fans. ID: ${insertResult.rows[0].id}`);
        }
    } catch (err) {
        console.error("Error updating Fans:", err);
    } finally {
        await pool.end();
    }
}

updateItem();
