const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://postgres:okSETkHkJgdFBESdKbrVGNGIaKjFgLQa@gondola.proxy.rlwy.net:44923/railway'
});

const frames = [
    {
        name: "World Map Wall Frame",
        short_description: "Decorative World Map Frame — Continents, Countries, Capitals & Oceans",
        full_description: "Beautiful wall frame featuring a map of the world showing continents, countries & capitals, and oceans. Includes 3 scriptural references for declaration. A stunning addition to any living room or study. Extreme giveaway price!",
        category: "living_room",
        price: 4999,
        price_notes: "Extreme giveaway price!",
        status: "available",
        condition_grade: "9",
        condition_notes: "Very good condition; overall looks clean with little to no signs of wear.",
        specs: JSON.stringify({
            "Type": "Wall Frame",
            "Content": "Map of the World — Continents, Countries & Capitals, Oceans",
            "Features": "3 scriptural references for declaration",
            "Width": "0.91m (36 inches)",
            "Height": "0.66m (26 inches)",
            "Orientation": "Landscape"
        }),
        extras: [],
        quantity: 1,
        images: [
            "https://res.cloudinary.com/theenactorist/image/upload/v1774021668/Declutter/Wall-frame-1_smx0yb.jpg"
        ]
    },
    {
        name: "Nielsen's 10 Usability Heuristics Wall Frame",
        short_description: "Jakob Nielsen's 10 Usability Heuristics — The Commandments of Interface Design",
        full_description: "A beautifully framed print of Jakob Nielsen's 10 Usability Heuristics — the \"commandments\" of interface design. Also applicable to the messy, non-linear experience of being a human. If design is about making tools work for people, life is about making our existence work for ourselves and those around us. Extreme giveaway price!",
        category: "living_room",
        price: 4999,
        price_notes: "Extreme giveaway price!",
        status: "available",
        condition_grade: "9",
        condition_notes: "Very good condition; overall looks clean with little to no signs of wear.",
        specs: JSON.stringify({
            "Type": "Wall Frame",
            "Content": "Jakob Nielsen's 10 Usability Heuristics",
            "Theme": "Interface Design / Life Philosophy",
            "Width": "0.66m (26 inches)",
            "Height": "0.91m (36 inches)",
            "Orientation": "Portrait"
        }),
        extras: [],
        quantity: 1,
        images: [
            "https://res.cloudinary.com/theenactorist/image/upload/v1774021669/Declutter/Wall-frame-2_pugjbk.jpg"
        ]
    }
];

async function insertFrames() {
    try {
        for (const frame of frames) {
            console.log(`Inserting "${frame.name}"...`);
            const result = await pool.query(
                `INSERT INTO items (
                    name, short_description, full_description, category,
                    price, price_notes, condition_grade, condition_notes, status, specs, extras, quantity, images
                ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
                RETURNING id, name;`,
                [
                    frame.name, frame.short_description, frame.full_description, frame.category,
                    frame.price, frame.price_notes, frame.condition_grade, frame.condition_notes,
                    frame.status, frame.specs, frame.extras, frame.quantity, frame.images
                ]
            );
            console.log(`  ✓ Created "${result.rows[0].name}" (ID: ${result.rows[0].id})`);
        }
        console.log('\nDone!');
    } catch (err) {
        console.error("Error:", err);
    } finally {
        await pool.end();
    }
}

insertFrames();
