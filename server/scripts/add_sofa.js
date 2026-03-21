require('dotenv').config({ path: '../.env' });
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: "postgresql://postgres:okSETkHkJgdFBESdKbrVGNGIaKjFgLQa@gondola.proxy.rlwy.net:44923/railway"
});

const sofaData = {
    name: "Large Navy Velvet L-Shaped Sofa",
    short_description: "Large, L-shaped sofa in a deep navy velvet fabric with extra accessories.",
    full_description: "A large, incredibly comfortable L-shaped sofa wrapped in a rich, deep navy velvet fabric. It comes generously bundled with matching velvet ottoman cubes, accent pillows, and a free rug to tie your living room together.",
    category: "living_room",
    price: 65000,
    price_notes: "Please note: The sofas will need a deep surface cleaning.",
    condition_grade: "8",
    condition_notes: "Shows well but needs a deep surface cleaning",
    specs: JSON.stringify({
        "Material": "Velvet",
        "Color": "Deep Navy",
        "Shape": "L-Shaped",
        "Seating Capacity": "High (Sectional)"
    }),
    extras: [
        "Free rug",
        "Two square velvet ottoman cubes",
        "Two accent pillows"
    ],
    quantity: 1,
    images: ["https://res.cloudinary.com/theenactorist/image/upload/v1774094643/Declutter/Couch_rov1wy.jpg"]
};

async function insertSofa() {
    try {
        const query = `
      INSERT INTO items (
        name, short_description, full_description, category,
        price, price_notes, status, condition_grade, condition_notes,
        specs, extras, quantity, images
      ) VALUES (
        $1, $2, $3, $4, $5, $6, 'available', $7, $8, $9, $10, $11, $12
      ) RETURNING id, name;
    `;

        const values = [
            sofaData.name, sofaData.short_description, sofaData.full_description,
            sofaData.category, sofaData.price, sofaData.price_notes, sofaData.condition_grade,
            sofaData.condition_notes, sofaData.specs, sofaData.extras, sofaData.quantity, sofaData.images
        ];

        const res = await pool.query(query, values);
        console.log('Successfully inserted:', res.rows[0]);
    } catch (err) {
        console.error('Error inserting sofa:', err);
    } finally {
        await pool.end();
    }
}

insertSofa();
