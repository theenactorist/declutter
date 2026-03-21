const { Pool } = require('pg');

const pool = new Pool({
    connectionString: 'postgresql://postgres:okSETkHkJgdFBESdKbrVGNGIaKjFgLQa@gondola.proxy.rlwy.net:44923/railway'
});

const soundbarData = {
    name: "Hisense HS205 2.0CH 60W Soundbar",
    short_description: "Hisense 2.0CH 60W Soundbar with Bluetooth",
    full_description: "Enhance your TV audio experience with the Hisense HS205 2.0CH 60W Soundbar. It features multiple connection options including HDMI ARC, Optical, and Bluetooth for seamless streaming.",
    category: "electronics",
    price: 50000,
    status: "available",
    condition_grade: "9",
    condition_notes: "Very good condition.",
    specs: JSON.stringify({
        "Channels": "2.0 Stereo",
        "Total Output Power": "60W (30W × 2 Left/Right)",
        "Frequency Response": "40Hz – 20KHz",
        "Virtual Surround": "No",
        "Audio Decoding": "PCM, Multi-ch PCM, FLAC, MP3, WAV, WMA",
        "HDMI (ARC/CEC)": "Yes (1 port — Audio in/out)",
        "Optical Input": "Yes (1 port)",
        "Coaxial Input": "Yes (1 port)",
        "AUX (3.5mm)": "Yes (1 port)",
        "USB Type-A": "Yes (1 port — Audio + Firmware updates)",
        "Bluetooth": "Yes, version 4.2",
        "Wi-Fi": "No"
    }),
    extras: [
        "Power cable",
        "Remote control",
        "Optical cable"
    ],
    quantity: 1,
    images: [
        "https://res.cloudinary.com/theenactorist/image/upload/v1772669427/Declutter/Hisense-Soundbar-1_kzya4k.png",
        "https://res.cloudinary.com/theenactorist/image/upload/v1772669419/Declutter/Hisense-Soundbar-3_tyqk0e.png",
        "https://res.cloudinary.com/theenactorist/image/upload/v1772669421/Declutter/Hisense-Soundbar-2_oy15ee.png"
    ]
};

async function updateItem() {
    try {
        console.log("Updating Soundbar...");

        const result = await pool.query(
            `UPDATE items 
             SET name = $1, short_description = $2, full_description = $3, category = $4,
                 price = $5, condition_grade = $6, condition_notes = $7, status = $8,
                 specs = $9, extras = $10, quantity = $11, images = $12
             WHERE name = 'Hisense Soundbar' OR name = 'Hisense HS205 2.0CH 60W Soundbar'
             RETURNING id, name;`,
            [
                soundbarData.name, soundbarData.short_description, soundbarData.full_description, soundbarData.category,
                soundbarData.price, soundbarData.condition_grade, soundbarData.condition_notes, soundbarData.status,
                soundbarData.specs, soundbarData.extras, soundbarData.quantity, soundbarData.images
            ]
        );

        if (result.rows.length > 0) {
            console.log(`Successfully updated Soundbar. ID: ${result.rows[0].id}`);
        } else {
            console.log('Soundbar item not found to update. Creating it instead...');
            const insertResult = await pool.query(
                `INSERT INTO items (
                     name, short_description, full_description, category, 
                     price, condition_grade, condition_notes, status, specs, extras, quantity, images
                 ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
                 RETURNING id, name;`,
                [
                    soundbarData.name, soundbarData.short_description, soundbarData.full_description, soundbarData.category,
                    soundbarData.price, soundbarData.condition_grade, soundbarData.condition_notes, soundbarData.status,
                    soundbarData.specs, soundbarData.extras, soundbarData.quantity, soundbarData.images
                ]
            );
            console.log(`Successfully created Soundbar. ID: ${insertResult.rows[0].id}`);
        }
    } catch (err) {
        console.error("Error updating Soundbar:", err);
    } finally {
        await pool.end();
    }
}

updateItem();
