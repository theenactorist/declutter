const { Pool } = require('pg');

const pool = new Pool({
    connectionString: 'postgresql://postgres:okSETkHkJgdFBESdKbrVGNGIaKjFgLQa@gondola.proxy.rlwy.net:44923/railway'
});

const tvData = {
    name: "LG 55-inch 4K UHD Smart LED TV",
    short_description: "LG 55-inch 4K UHD Smart TV (Wall Mount Only)",
    full_description: "Stunning LG 55-inch 4K UHD Smart LED TV. Please note that it's to be wall mounted, no table top available.",
    category: "living_room",
    price: 250000,
    status: "available",
    condition_grade: "9",
    condition_notes: "Very good condition. Wall mount only.",
    specs: JSON.stringify({
        "Screen Size": "55 inches (139 cm)",
        "Resolution": "3840 × 2160 (4K UHD)",
        "Panel Type": "IPS (In-Plane Switching)",
        "Backlight": "Edge LED",
        "Aspect Ratio": "16:9",
        "Brightness": "230 cd/m²",
        "Contrast Ratio": "5000:1",
        "Refresh Rate": "100 Hz (True Motion 100)",
        "HDR Support": "HDR10, HLG (Hybrid Log-Gamma)",
        "Viewing Angle": "178° horizontal & vertical",
        "HDMI": "4 ports",
        "USB": "2 ports",
        "Component Video In": "Yes",
        "Audio Out": "Digital optical",
        "Wi-Fi": "Built-in",
        "Bluetooth": "Yes",
        "CI+ Slot": "Yes",
        "LAN (Ethernet)": "Yes",
        "Dimensions (W×H×D)": "1237 × 775 × 259 mm",
        "Weight": "~17.3 kg",
        "Power Consumption": "89 W",
        "Energy Rating": "A+",
        "Wall Mount": "VESA-standard",
        "Body Colour": "Black/Silver"
    }),
    extras: [
        "LG Magic Remote",
        "Wall Hanger",
        "4K HDMI Cable",
        "Power cable"
    ],
    quantity: 1,
    images: [
        "https://res.cloudinary.com/theenactorist/image/upload/v1772667300/Declutter/LG-55-4K-1_xqklyg.jpg",
        "https://res.cloudinary.com/theenactorist/image/upload/v1772667083/Declutter/LG-55-4K-4_cimynw.avif",
        "https://res.cloudinary.com/theenactorist/image/upload/v1772667082/Declutter/LG-55-4K-2_gdnpir.avif",
        "https://res.cloudinary.com/theenactorist/image/upload/v1772668229/Declutter/LG-55-4K-5_nqc9pg.jpg"
    ]
};

async function updateItem() {
    try {
        console.log("Updating TV...");

        const result = await pool.query(
            `UPDATE items 
             SET name = $1, short_description = $2, full_description = $3, category = $4,
                 price = $5, condition_grade = $6, condition_notes = $7, status = $8,
                 specs = $9, extras = $10, quantity = $11, images = $12
             WHERE name = 'TV' OR name = 'LG 55-inch 4K UHD Smart LED TV'
             RETURNING id, name;`,
            [
                tvData.name, tvData.short_description, tvData.full_description, tvData.category,
                tvData.price, tvData.condition_grade, tvData.condition_notes, tvData.status,
                tvData.specs, tvData.extras, tvData.quantity, tvData.images
            ]
        );

        if (result.rows.length > 0) {
            console.log(`Successfully updated TV. ID: ${result.rows[0].id}`);
        } else {
            console.log('TV item not found to update. Creating it instead...');
            const insertResult = await pool.query(
                `INSERT INTO items (
                     name, short_description, full_description, category, 
                     price, condition_grade, condition_notes, status, specs, extras, quantity, images
                 ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
                 RETURNING id, name;`,
                [
                    tvData.name, tvData.short_description, tvData.full_description, tvData.category,
                    tvData.price, tvData.condition_grade, tvData.condition_notes, tvData.status,
                    tvData.specs, tvData.extras, tvData.quantity, tvData.images
                ]
            );
            console.log(`Successfully created TV. ID: ${insertResult.rows[0].id}`);
        }
    } catch (err) {
        console.error("Error updating TV:", err);
    } finally {
        await pool.end();
    }
}

updateItem();
