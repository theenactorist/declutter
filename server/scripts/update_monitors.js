const { Pool } = require('pg');

const pool = new Pool({
    connectionString: 'postgresql://postgres:okSETkHkJgdFBESdKbrVGNGIaKjFgLQa@gondola.proxy.rlwy.net:44923/railway'
});

const monitorData = {
    name: "Samsung U28E590D 28 Inches Monitor (2 Available)",
    short_description: "Samsung 28-inch 4K UHD Monitor",
    full_description: "I have two of these fantastic 28-inch Samsung 4K monitors available. They offer an incredible 1 billion colors, incredibly fast 1ms response time, and multiple connectivity options. Perfect for work, creative projects, or gaming.",
    category: "electronics",
    price: 0, // Price not provided in prompt, leaving at 0
    status: "available",
    condition_grade: "8", // Defaulting to 8, adjust if needed
    condition_notes: "Please update with actual condition.",
    specs: JSON.stringify({
        "Screen Size": "28 inches",
        "Panel Type": "TN (Twisted Nematic) LCD",
        "Resolution": "3840 × 2160 (4K UHD)",
        "Aspect Ratio": "16:9",
        "Brightness": "370 cd/m²",
        "Static Contrast": "1,000:1",
        "Dynamic Contrast": "Mega DCR",
        "Colour Support": "1 Billion colours",
        "Colour Gamut": "100% sRGB",
        "Response Time": "1ms (GTG)",
        "Refresh Rate": "60Hz",
        "Pixel Pitch": "0.16 × 0.16 mm",
        "Surface Finish": "Anti-Glare / Matte",
        "HDMI": "2 × HDMI 2.0",
        "DisplayPort": "1 × DisplayPort",
        "Audio Output": "1 × 3.5mm headphone jack"
    }),
    extras: [],
    quantity: 2,
    images: [
        "https://res.cloudinary.com/theenactorist/image/upload/v1772671039/Declutter/samsung-u28e590d-1_ppgwak.webp",
        "https://res.cloudinary.com/theenactorist/image/upload/v1772671038/Declutter/samsung-u28e590d-2_lhidjw.avif",
        "https://res.cloudinary.com/theenactorist/image/upload/v1772671036/Declutter/samsung-u28e590d-3_g5vls3.avif",
        "https://res.cloudinary.com/theenactorist/image/upload/v1772671035/Declutter/samsung-u28e590d-4_h3urse.avif"
    ]
};

async function updateItem() {
    try {
        console.log("Updating Monitors...");

        const result = await pool.query(
            `UPDATE items 
             SET name = $1, short_description = $2, full_description = $3, category = $4,
                 specs = $5, quantity = $6, images = $7
             WHERE name ILIKE '%Samsung 4k Monitor%'
             RETURNING id, name;`,
            [
                monitorData.name, monitorData.short_description, monitorData.full_description, monitorData.category,
                monitorData.specs, monitorData.quantity, monitorData.images
            ]
        );

        if (result.rows.length > 0) {
            console.log(`Successfully updated Monitors. ID: ${result.rows[0].id}`);
        } else {
            console.log('Monitor item not found to update.');
        }
    } catch (err) {
        console.error("Error updating Monitors:", err);
    } finally {
        await pool.end();
    }
}

updateItem();
