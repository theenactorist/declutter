const { Pool } = require('pg');

const pool = new Pool({
    connectionString: 'postgresql://postgres:okSETkHkJgdFBESdKbrVGNGIaKjFgLQa@gondola.proxy.rlwy.net:44923/railway'
});

const items = [
    {
        name: "Vintage Leather Armchair",
        short_description: "Mid-century modern armchair in cognac leather.",
        full_description: "A beautiful mid-century modern armchair with original cognac leather upholstery. The wood frame is solid walnut and has been recently oiled. There is some patination on the leather which adds character. Extremely comfortable and a great statement piece for any living room or den.",
        category: "living_room",
        price: 185000,
        status: "available",
        condition_grade: "8",
        condition_notes: "Leather shows beautiful patina; some minor scuffs on legs.",
        specs: JSON.stringify({ Brand: "Unknown Vintage", Material: "Leather, Walnut", Color: "Cognac" }),
        extras: [],
        quantity: 1,
        images: ["https://api.dicebear.com/9.x/shapes/svg?seed=armchair"]
    },
    {
        name: "Standing Desk Converter",
        short_description: "Adjustable sit-stand desk converter, fits dual monitors.",
        full_description: "Ergonomic standing desk converter. Easily transitions from sitting to standing with a gas spring mechanism. Spacious enough for two monitors and features a separate keyboard tray. Very sturdy and in excellent condition.",
        category: "work_den",
        price: 45000,
        status: "available",
        condition_grade: "9",
        condition_notes: "Almost new, mechanism works perfectly.",
        specs: JSON.stringify({ Brand: "FlexiSpot", Material: "Steel, Engineered Wood", Color: "Black" }),
        extras: ["Keyboard tray included"],
        quantity: 1,
        images: ["https://api.dicebear.com/9.x/shapes/svg?seed=desk-converter"]
    },
    {
        name: "KitchenAid Stand Mixer",
        short_description: "Artisan Series 5 Quart Tilt-Head Stand Mixer.",
        full_description: "The classic KitchenAid Artisan stand mixer in a beautiful Empire Red color. It has a powerful 325-watt motor and a 5-quart stainless steel bowl with a comfortable handle. Comes with a flat beater, dough hook, and wire whip. Barely used and in perfect working order.",
        category: "kitchen",
        price: 150000,
        status: "negotiation",
        condition_grade: "10",
        condition_notes: "Used twice, practically brand new.",
        specs: JSON.stringify({ Brand: "KitchenAid", Model: "Artisan 5 Quart", Color: "Empire Red" }),
        extras: ["Flat beater", "Dough hook", "Wire whip", "Pouring shield"],
        quantity: 1,
        images: ["https://api.dicebear.com/9.x/shapes/svg?seed=mixer"]
    },
    {
        name: "Sony Noise Cancelling Headphones",
        short_description: "WH-1000XM4 Wireless Intelligent Noise Canceling Headphones.",
        full_description: "Industry-leading noise canceling headphones with amazing sound quality and comfort. Features touch controls, 30-hour battery life, and comfortable ear pads. Complete with carrying case and necessary cables.",
        category: "electronics",
        price: 130000,
        status: "available",
        condition_grade: "9",
        condition_notes: "Very good condition, slight wear on the carrying case.",
        specs: JSON.stringify({ Brand: "Sony", Model: "WH-1000XM4", Color: "Silver" }),
        extras: ["Carrying case", "Audio cable", "USB-C charging cable", "In-flight adapter"],
        quantity: 1,
        images: ["https://api.dicebear.com/9.x/shapes/svg?seed=headphones"]
    },
    {
        name: "Queen Size Bed Frame",
        short_description: "Sturdy wooden platform bed frame, no box spring needed.",
        full_description: "A solid pine wood platform bed frame. It has a minimalist design and provides excellent support for any mattress without the need for a box spring. Easy to assemble and has a clearance of 12 inches underneath for storage.",
        category: "bedroom",
        price: 85000,
        status: "available",
        condition_grade: "9",
        condition_notes: "No squeaks, all slats are intact.",
        specs: JSON.stringify({ Size: "Queen", Material: "Pine Wood", Color: "Natural Wood" }),
        extras: [],
        quantity: 1,
        images: ["https://api.dicebear.com/9.x/shapes/svg?seed=bed"]
    },
    {
        name: "Dyson V8 Absolute Vacuum",
        short_description: "Cordless stick vacuum cleaner with multiple attachments.",
        full_description: "Powerful, cordless suction for whole-home cleaning. The Dyson V8 Absolute comes with a soft roller cleaner head for hard floors and a direct-drive cleaner head for carpets. Up to 40 minutes of fade-free power. Includes a convenient docking station.",
        category: "electronics",
        price: 175000,
        status: "available",
        condition_grade: "8",
        condition_notes: "Battery holds a good charge; some cosmetic scratches on the wand.",
        specs: JSON.stringify({ Brand: "Dyson", Model: "V8 Absolute", Type: "Cordless Stick" }),
        extras: ["Combination tool", "Crevice tool", "Mini motorized tool", "Soft dusting brush", "Docking station"],
        quantity: 1,
        images: ["https://api.dicebear.com/9.x/shapes/svg?seed=dyson"]
    },
    {
        name: "Bose SoundLink Revolve+ II",
        short_description: "Portable Bluetooth speaker with 360-degree sound.",
        full_description: "Excellent portable speaker delivering deep, loud, and immersive sound in every direction. It is water and dust resistant (IP55 rating) and features a flexible fabric handle. Battery life up to 17 hours.",
        category: "electronics",
        price: 110000,
        status: "sold",
        condition_grade: "9",
        condition_notes: "Works perfectly, minor scuff on the rubber base.",
        specs: JSON.stringify({ Brand: "Bose", Model: "SoundLink Revolve+ II", Color: "Triple Black" }),
        extras: ["USB power supply", "USB cable"],
        quantity: 1,
        images: ["https://api.dicebear.com/9.x/shapes/svg?seed=bose"]
    },
    {
        name: "Cast Iron Skillet Set",
        short_description: "Set of two pre-seasoned cast iron skillets (10-inch and 12-inch).",
        full_description: "A pair of heavy-duty cast iron skillets, essential for every kitchen. They provide excellent heat retention and even heating. Pre-seasoned and ready to use for searing, baking, broiling, frying, or grilling. Well cared for and seasoned regularly.",
        category: "kitchen",
        price: 35000,
        status: "available",
        condition_grade: "8+",
        condition_notes: "Seasoning is in great shape, no rust.",
        specs: JSON.stringify({ Brand: "Lodge", Sizes: "10-inch, 12-inch", Material: "Cast Iron" }),
        extras: ["Silicone handle covers included"],
        quantity: 1,
        images: ["https://api.dicebear.com/9.x/shapes/svg?seed=skillet"]
    }
];

async function seed() {
    try {
        console.log("Seeding database...");
        let successCount = 0;
        for (const item of items) {
            await pool.query(
                `INSERT INTO items (
                    name, short_description, full_description, category, 
                    price, condition_grade, condition_notes, status, specs, extras, quantity, images
                ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
                [
                    item.name, item.short_description, item.full_description, item.category,
                    item.price, item.condition_grade, item.condition_notes, item.status,
                    item.specs, item.extras, item.quantity, item.images
                ]
            );
            successCount++;
        }
        console.log(`Successfully added ${successCount} items.`);
    } catch (err) {
        console.error("Error seeding:", err);
    } finally {
        await pool.end();
    }
}

seed();
