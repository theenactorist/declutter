require('dotenv').config({ path: '../.env' });
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: "postgresql://postgres:okSETkHkJgdFBESdKbrVGNGIaKjFgLQa@gondola.proxy.rlwy.net:44923/railway"
});

const bedData = {
    name: "6 by 6 King Size Mouka Mattress + Bed Frame with Headboard",
    short_description: "King size wooden bed frame and extra firm Mouka mattress",
    full_description: "A complete 6x6 King Size bedroom set featuring a sturdy black wooden bed frame with a headboard, paired with an extra firm Mouka mattress.",
    category: "bedroom",
    price: 180000,
    price_notes: "Negotiable if buying pieces separately. If interested buyer needs the bed frame alone or mattress alone, let me know.",
    condition_grade: "9",
    condition_notes: "Very good condition",
    specs: JSON.stringify({
        "Mattress Dimensions": "6ft × 6ft × 8″ thickness (1.83m × 1.83m × 20cm thickness)",
        "Bed Frame Dimensions": "6ft × 6ft × 12″ height (1.83m × 1.83m × 30cm height)",
        "Mattress Hardness": "Extra firm",
        "Frame Finishing": "Wood",
        "Color": "Black"
    }),
    quantity: 1,
    images: ["https://res.cloudinary.com/theenactorist/image/upload/v1774093721/Declutter/Bed_Frame_qz4s2f.jpg"]
};

async function insertBed() {
    try {
        const query = `
      INSERT INTO items (
        name, short_description, full_description, category,
        price, price_notes, status, condition_grade, condition_notes,
        specs, quantity, images
      ) VALUES (
        $1, $2, $3, $4, $5, $6, 'available', $7, $8, $9, $10, $11
      ) RETURNING id, name;
    `;

        const values = [
            bedData.name, bedData.short_description, bedData.full_description,
            bedData.category, bedData.price, bedData.price_notes, bedData.condition_grade,
            bedData.condition_notes, bedData.specs, bedData.quantity, bedData.images
        ];

        const res = await pool.query(query, values);
        console.log('Successfully inserted:', res.rows[0]);
    } catch (err) {
        console.error('Error inserting bed:', err);
    } finally {
        await pool.end();
    }
}

insertBed();
