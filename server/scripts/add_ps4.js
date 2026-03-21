const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://postgres:okSETkHkJgdFBESdKbrVGNGIaKjFgLQa@gondola.proxy.rlwy.net:44923/railway'
});

const ps4 = {
    name: "PlayStation 4 Console (Offline Only)",
    short_description: "PS4 Console packed with 10 Top Games & 2 Controllers",
    full_description: "Excellent PlayStation 4 console bundle (Offline strictly). Comes fully loaded with 10 blockbuster games pre-installed. Perfect straight-out-of-the-box entertainment setup for solo gaming or multiplayer with friends.",
    category: "electronics",
    price: 200000,
    status: "available",
    condition_grade: "9",
    condition_notes: "Very good condition; overall looks clean but may have minor signs of use/surface marks.",
    specs: JSON.stringify({
        "Type": "Gaming Console",
        "Model": "PlayStation 4",
        "Connectivity": "Offline Only mode",
        "Included Games (10)": "Call of Duty, Fifa 23, Mortal Kombat XL, Grand Theft Auto V, Need for Speed Heat, Batman, God of War, Resident Evil 2, Racing Bros, Far Cry 4"
    }),
    extras: [
        "2x Wireless Gaming Pads",
        "4K HDMI Cable",
        "Power Cable"
    ],
    quantity: 1,
    images: [
        "https://res.cloudinary.com/theenactorist/image/upload/v1774048735/Declutter/PS-4_cgs4jz.jpg"
    ]
};

async function insertPS4() {
    try {
        console.log(`Inserting "${ps4.name}"...`);
        const result = await pool.query(
            `INSERT INTO items (
                name, short_description, full_description, category,
                price, condition_grade, condition_notes, status, specs, extras, quantity, images
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
            RETURNING id, name;`,
            [
                ps4.name, ps4.short_description, ps4.full_description, ps4.category,
                ps4.price, ps4.condition_grade, ps4.condition_notes, ps4.status,
                ps4.specs, ps4.extras, ps4.quantity, ps4.images
            ]
        );
        console.log(`✓ Created "${result.rows[0].name}" (ID: ${result.rows[0].id})`);
    } catch (err) {
        console.error("Error:", err);
    } finally {
        await pool.end();
    }
}

insertPS4();
