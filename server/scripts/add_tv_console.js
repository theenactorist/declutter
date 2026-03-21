const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://postgres:okSETkHkJgdFBESdKbrVGNGIaKjFgLQa@gondola.proxy.rlwy.net:44923/railway'
});

const tvConsole = {
    name: "Black Matte Wood TV Console",
    short_description: "TV Stand/Cabinet with 2 side cabinets, central drawer, 2 cubbyholes & vertical section",
    full_description: "Beautiful black matte wood TV stand and console. Features two side cabinets and a central drawer for keeping items out of sight. Also includes two cubbyholes (perfect for consoles like a PlayStation) and a vertical section designed for books or board games.",
    category: "living_room",
    price: 50000,
    status: "available",
    condition_grade: "9",
    condition_notes: "Very good condition; overall looks clean with little to no signs of wear.",
    specs: JSON.stringify({
        "Type": "TV Stand / Cabinet / Console",
        "Length": "1.22m (48 inches)",
        "Breadth / Depth": "0.41m (16 inches)",
        "Height": "0.46m (18 inches)",
        "Dimensions": "1.22m × 0.41m × 0.46m (48″ × 16″ × 18″)",
        "Finish": "Wood, Black Matte",
        "Storage": "2 side cabinets, 1 central drawer",
        "Open Storage": "2 cubbyholes, 1 vertical section"
    }),
    extras: [],
    quantity: 1,
    images: [
        "https://res.cloudinary.com/theenactorist/image/upload/v1774042024/Declutter/tv-console-2_d3dovh.jpg",
        "https://res.cloudinary.com/theenactorist/image/upload/v1774042023/Declutter/tv-console-1_jjtsmt.jpg",
        "https://res.cloudinary.com/theenactorist/image/upload/v1774042021/Declutter/tv-console-3_f0x5gr.jpg",
        "https://res.cloudinary.com/theenactorist/image/upload/v1774042018/Declutter/tv-console-4_rvm6pt.jpg",
        "https://res.cloudinary.com/theenactorist/image/upload/v1774042020/Declutter/tv-console-5_jrvapc.jpg"
    ]
};

async function insertConsole() {
    try {
        console.log(`Inserting "${tvConsole.name}"...`);
        const result = await pool.query(
            `INSERT INTO items (
                name, short_description, full_description, category,
                price, condition_grade, condition_notes, status, specs, extras, quantity, images
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
            RETURNING id, name;`,
            [
                tvConsole.name, tvConsole.short_description, tvConsole.full_description, tvConsole.category,
                tvConsole.price, tvConsole.condition_grade, tvConsole.condition_notes, tvConsole.status,
                tvConsole.specs, tvConsole.extras, tvConsole.quantity, tvConsole.images
            ]
        );
        console.log(`✓ Created "${result.rows[0].name}" (ID: ${result.rows[0].id})`);
    } catch (err) {
        console.error("Error:", err);
    } finally {
        await pool.end();
    }
}

insertConsole();
