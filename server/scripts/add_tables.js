const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://postgres:okSETkHkJgdFBESdKbrVGNGIaKjFgLQa@gondola.proxy.rlwy.net:44923/railway'
});

const tables = [
    {
        name: "Small Work Table",
        short_description: "Compact Black Burnished Polished Wood Desk with Two Drawers — Free Chair Included!",
        full_description: "Compact black burnished polished wood work table with two drawers. Perfect for a home office or study. Comes with a FREE working chair — great value! Some minor surface scratches.",
        category: "furniture",
        price: 35000,
        status: "available",
        condition_grade: "9",
        condition_notes: "Very good condition; some little scratches but overall looks clean.",
        specs: JSON.stringify({
            "Type": "Work Table / Desk",
            "Size": "Small",
            "Dimensions": "0.80m × 0.44m × 0.71m (31.5ft × 17.5ft × 28ft)",
            "Width": "0.80m (31.5ft)",
            "Depth": "0.44m (17.5ft)",
            "Height": "0.71m (28ft)",
            "Finish": "Black Burnished Polished Wood",
            "Drawers": "2",
            "Colour": "Black"
        }),
        extras: ["Free working chair included"],
        quantity: 1,
        images: [
            "https://res.cloudinary.com/theenactorist/image/upload/v1773945584/Declutter/Table-Declutter-1_iguurc.jpg",
            "https://res.cloudinary.com/theenactorist/image/upload/v1773945584/Declutter/Table-Declutter-2_mfe1wf.jpg",
            "https://res.cloudinary.com/theenactorist/image/upload/v1773945583/Declutter/Table-Declutter-3_upemxb.jpg",
            "https://res.cloudinary.com/theenactorist/image/upload/v1773945583/Declutter/Table-Declutter-4_h5w8kn.jpg",
            "https://res.cloudinary.com/theenactorist/image/upload/v1773945583/Declutter/Table-Declutter-5_vho8ty.jpg"
        ]
    },
    {
        name: "Mid Work Table",
        short_description: "Mid-Size Black Burnished Polished Wood Desk with One Drawer",
        full_description: "Mid-size black burnished polished wood work table with one drawer. Ideal workspace for productivity. No visible scratches — in excellent condition.",
        category: "furniture",
        price: 40000,
        status: "available",
        condition_grade: "10",
        condition_notes: "Preowned equipment that looks good as new; no signs of wear or scratches.",
        specs: JSON.stringify({
            "Type": "Work Table / Desk",
            "Size": "Mid",
            "Dimensions": "1.07m × 0.51m × 0.71m (42ft × 20ft × 28ft)",
            "Width": "1.07m (42ft)",
            "Depth": "0.51m (20ft)",
            "Height": "0.71m (28ft)",
            "Finish": "Black Burnished Polished Wood",
            "Drawers": "1",
            "Colour": "Black"
        }),
        extras: [],
        quantity: 1,
        images: [
            "https://res.cloudinary.com/theenactorist/image/upload/v1773945508/Declutter/Table-Mid-Declutter-0_en4e3z.jpg",
            "https://res.cloudinary.com/theenactorist/image/upload/v1773945510/Declutter/Table-Mid-Declutter-1_lnp0wc.jpg",
            "https://res.cloudinary.com/theenactorist/image/upload/v1773945507/Declutter/Table-Mid-Declutter-2_ju1fa8.jpg",
            "https://res.cloudinary.com/theenactorist/image/upload/v1773945506/Declutter/Table-Mid-Declutter-3_vzlbxq.jpg"
        ]
    },
    {
        name: "Large Work Table",
        short_description: "Large Maple/Cedar Polished Desk with Removable Top — Free Side Cabinet & Monitor Arm!",
        full_description: "Large maple/cedar polished work table with a removable top. Comes with a FREE side cabinet with two drawers and a FREE Wali monitor holder arm. The table has noticeable edge scratches on one side, but since the top is removable, it can be turned around to hide them. Ideal for a spacious home office setup.",
        category: "furniture",
        price: 50000,
        status: "available",
        condition_grade: "8",
        condition_notes: "Well used — has visible edge scratches on one side. Removable top can be flipped to conceal them.",
        specs: JSON.stringify({
            "Type": "Work Table / Desk",
            "Size": "Large",
            "Dimensions": "1.60m × 0.75m × 0.71m (63ft × 29.5ft × 28ft)",
            "Width": "1.60m (63ft)",
            "Depth": "0.75m (29.5ft)",
            "Height": "0.71m (28ft)",
            "Finish": "Maple/Cedar Polished",
            "Top": "Removable (can be flipped)",
            "Colour": "Maple/Cedar"
        }),
        extras: ["Free side cabinet with two drawers", "Free Wali monitor holder arm"],
        quantity: 1,
        images: [
            "https://res.cloudinary.com/theenactorist/image/upload/v1773945401/Declutter/Table-Large-Declutter-1_yiphm8.jpg",
            "https://res.cloudinary.com/theenactorist/image/upload/v1773945403/Declutter/Table-Large-Declutter-2_usfdab.jpg",
            "https://res.cloudinary.com/theenactorist/image/upload/v1773945401/Declutter/Table-Large-Declutter-3_u1vjev.jpg",
            "https://res.cloudinary.com/theenactorist/image/upload/v1773945400/Declutter/Table-Large-Declutter-4_vsujlh.jpg",
            "https://res.cloudinary.com/theenactorist/image/upload/v1773946234/Declutter/Monitor_Arm_Only-3_z57tup.jpg",
            "https://res.cloudinary.com/theenactorist/image/upload/v1773946234/Declutter/Monitor_Arm_Only-4_zlpoge.jpg"
        ]
    }
];

async function insertTables() {
    try {
        for (const table of tables) {
            console.log(`Inserting "${table.name}"...`);
            const result = await pool.query(
                `INSERT INTO items (
                    name, short_description, full_description, category,
                    price, condition_grade, condition_notes, status, specs, extras, quantity, images
                ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
                RETURNING id, name;`,
                [
                    table.name, table.short_description, table.full_description, table.category,
                    table.price, table.condition_grade, table.condition_notes, table.status,
                    table.specs, table.extras, table.quantity, table.images
                ]
            );
            console.log(`  ✓ Created "${result.rows[0].name}" (ID: ${result.rows[0].id})`);
        }
        console.log("\nAll 3 tables added successfully!");
    } catch (err) {
        console.error("Error:", err);
    } finally {
        await pool.end();
    }
}

insertTables();
