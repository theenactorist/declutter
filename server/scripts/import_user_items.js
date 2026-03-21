const { Pool } = require('pg');

const pool = new Pool({
    connectionString: 'postgresql://postgres:okSETkHkJgdFBESdKbrVGNGIaKjFgLQa@gondola.proxy.rlwy.net:44923/railway'
});

const defaultItem = (name, category, quantity = 1) => ({
    name,
    short_description: `Decluttering ${name}`,
    full_description: `Details for ${name} to be updated.`,
    category,
    price: 0,
    status: 'available',
    condition_grade: '8',
    condition_notes: 'Details pending',
    specs: JSON.stringify({}),
    extras: [],
    quantity,
    images: [`https://api.dicebear.com/9.x/shapes/svg?seed=${name.replace(/ /g, '')}`]
});

const items = [
    {
        name: "Scanfrost 6.8kg Twin Tub Semi-Automatic Washing Machine",
        short_description: "Model SFSANTTD6, White color. 6.8kg wash capacity.",
        full_description: "A reliable semi-automatic twin tub washing machine by Scanfrost. It has a high water level of 68L and a rated wash power of 420W. The body is plastic with a toughened glass connected cover lid.",
        category: "appliances",
        price: 0,
        status: "available",
        condition_grade: "8",
        condition_notes: "Please update with actual condition.",
        specs: JSON.stringify({
            "Brand": "Scanfrost",
            "Model Number": "SFSANTTD6",
            "Type": "Semi-Automatic Twin Tub",
            "Wash Capacity": "6.0 – 6.8 kg",
            "Spin Capacity": "5.5 kg",
            "Rated Wash Power": "420 W",
            "Rated Spin Power": "160 W",
            "High Water Level": "68 L",
            "Low Water Level": "50 L",
            "Voltage": "220V / 50Hz",
            "Dimensions": "775 × 450 × 895 mm",
            "Body": "Plastic",
            "Lid": "Toughened glass connected cover"
        }),
        extras: [],
        quantity: 1,
        images: [
            "https://res.cloudinary.com/theenactorist/image/upload/v1772665838/Declutter/WashingMachine-1_txnrsh.jpg",
            "https://res.cloudinary.com/theenactorist/image/upload/v1772665838/Declutter/WashingMachine-3_p4wekf.jpg",
            "https://res.cloudinary.com/theenactorist/image/upload/v1772665838/Declutter/WashingMachine-2_wuvuzm.jpg"
        ]
    },
    defaultItem("TV", "electronics"),
    defaultItem("AC", "appliances"),
    defaultItem("Fridge", "appliances"),
    defaultItem("TV furniture", "furniture"),
    defaultItem("Hisense Soundbar", "electronics"),
    defaultItem("PS4", "electronics"),
    defaultItem("Extension boxes", "electronics", 6),
    defaultItem("Fans", "electronics", 3),
    defaultItem("Books", "misc"),
    defaultItem("Baby dining seat", "furniture"),
    defaultItem("Highlander 2010", "vehicles"),
    defaultItem("Camry 2004", "vehicles"),
    defaultItem("Work desk big", "furniture"),
    defaultItem("Work desk small", "furniture", 2),
    defaultItem("Samsung 4k Monitors", "electronics", 2),
    defaultItem("Monitor stand", "furniture"),
    defaultItem("Wall frames", "misc", 2),
    defaultItem("Sofa chairs", "furniture"),
    defaultItem("Cooker", "appliances"),
    defaultItem("Microwave", "appliances"),
    defaultItem("Blender", "appliances"),
    defaultItem("Plates & cups", "kitchen"),
    defaultItem("Mattress", "bedroom", 3),
    defaultItem("Bed frame", "bedroom", 3),
    defaultItem("Hanger sets", "misc"),
    defaultItem("Baby wardrobe", "furniture"),
    defaultItem("Vacuum cleaner", "appliances"),
    defaultItem("Watch holder", "misc"),
    defaultItem("Perfume", "misc", 2),
    defaultItem("Shoes", "apparel"),
    defaultItem("Clothes", "apparel"),
    defaultItem("Sterilizer", "appliances"),
    defaultItem("Inverter", "electronics"),
    defaultItem("Generator", "electronics"),
    defaultItem("Asus laptop", "electronics")
];

async function seed() {
    try {
        console.log("Seeding real items...");
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
