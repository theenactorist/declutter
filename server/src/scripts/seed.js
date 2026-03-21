require('dotenv').config();
const db = require('../db');
const bcrypt = require('bcryptjs');

const MOCK_ITEMS = [
    { id: 'bb1b671a-6d11-4d32-aafe-2a07c3fbbc5a', name: 'Minimalist Beige Sofa', short_description: '3-Seater Living Room Sofa', full_description: 'Extremely comfortable 3-seater sofa in a warm beige fabric. Barely used, sat in a secondary living room. Cushions still hold their shape perfectly. Selling because I am moving to a smaller apartment.', price: 350000, status: 'available', condition_grade: 'New: Never opened', category: 'living_room', images: ['/images/sofa.png'], specs: { 'Brand': 'Custom Made', 'Material': 'Linen Blend Fabric', 'Color': 'Warm Beige', 'Dimensions': 'W: 220cm x D: 90cm x H: 85cm' }, extras: ['3 matching throw pillows included'] },
    { id: '1b2a9d82-ed13-41bb-b0db-fc0d879486c6', name: 'ECM Espresso Machine', short_description: 'Stainless Steel Coffee Maker', full_description: 'Professional grade prosumer espresso machine. Features a dual boiler and PID temperature control. Has been backflushed regularly and only used with filtered water.', price: 1200000, status: 'negotiation', condition_grade: '9+: Preowned equipment that shows little to no signs of wear', category: 'kitchen', images: ['/images/coffee.png'], specs: { 'Brand': 'ECM', 'Model': 'Synchronika', 'Material': 'Stainless Steel', 'Boiler Type': 'Dual Boiler' }, extras: ['Bottomless portafilter', 'Tamper', 'Milk frothing jug'] },
    { id: '94e24eb3-fb22-44df-9195-2aa08dfabfa7', name: 'Samsung 27" Monitor', short_description: '4K UHD Display', full_description: 'Great 4K monitor for productivity and light gaming. Excellent color accuracy. Upgrading to a larger ultrawide.', price: 85000, status: 'sold', condition_grade: '9: Very good condition; overall looks clean but may have minor signs of use/surface marks', category: 'electronics', images: ['/images/monitor.png'], specs: { 'Resolution': '3840 x 2160', 'Refresh Rate': '60Hz', 'Panel Type': 'IPS' }, extras: ['Power cable', 'HDMI cable'] },
    { id: '09cc8228-dd69-42b7-a3a7-58474d284f33', name: 'Large Monstera Deliciosa', short_description: 'Healthy indoor plant with ceramic pot', full_description: 'Beautiful, large Monstera plant. Has been thriving in bright indirect light. Comes with a premium white ceramic planter and drainage saucer.', price: 15000, status: 'available', condition_grade: '10: Preowned equipment that looks good as new; no signs of wear', category: 'living_room', images: ['/images/plant.png'], specs: { 'Height': 'Approx 1.2m', 'Pot Material': 'Ceramic' }, extras: [] }
];

async function seed() {
    try {
        console.log('Starting execution of DB Setup & Seeding...');

        // 1. Create Users Table
        await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);
        console.log('✅ Users table created/verified');

        // 2. Create Items Table
        await db.query(`
      CREATE TABLE IF NOT EXISTS items (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        short_description TEXT,
        full_description TEXT,
        category TEXT NOT NULL,
        price NUMERIC NOT NULL,
        price_notes TEXT,
        status TEXT DEFAULT 'available',
        condition_grade TEXT,
        condition_notes TEXT,
        specs JSONB DEFAULT '{}'::jsonb,
        extras TEXT[] DEFAULT '{}',
        quantity INTEGER DEFAULT 1,
        images TEXT[] DEFAULT '{}',
        is_archived BOOLEAN DEFAULT false,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);
        console.log('✅ Items table created/verified');

        // 3. Seed Admin User
        const adminEmail = 'loveisconsistent@gmail.com';
        const rawPassword = 'uranusmiltonAI01.';

        const { rows: existingUsers } = await db.query('SELECT * FROM users WHERE email = $1', [adminEmail]);

        if (existingUsers.length === 0) {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(rawPassword, salt);

            await db.query(
                'INSERT INTO users (email, password_hash) VALUES ($1, $2)',
                [adminEmail, hash]
            );
            console.log('✅ Default Admin user created');
        } else {
            console.log('ℹ️ Admin user already exists');
        }

        // 4. Seed Mock Items if table is empty
        const { rows: existingItems } = await db.query('SELECT count(*) FROM items');

        if (parseInt(existingItems[0].count) === 0) {
            console.log('Seeding mock items...');

            for (const item of MOCK_ITEMS) {
                await db.query(`
          INSERT INTO items (
            id, name, short_description, full_description, category, price, status,
            condition_grade, specs, extras, images
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        `, [
                    item.id, item.name, item.short_description, item.full_description,
                    item.category, item.price, item.status, item.condition_grade,
                    item.specs, item.extras, item.images
                ]);
            }
            console.log(`✅ Seeded ${MOCK_ITEMS.length} mock items`);
        } else {
            console.log(`ℹ️ Items table not empty (${existingItems[0].count} rows), skipping item seed.`);
        }

        console.log('🎉 Setup Complete!');
        process.exit(0);

    } catch (error) {
        console.error('❌ Migration Error:', error);
        process.exit(1);
    }
}

seed();
