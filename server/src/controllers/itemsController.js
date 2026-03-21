const db = require('../db');

// GET /api/items
const getItems = async (req, res) => {
    try {
        const { rows } = await db.query(
            'SELECT * FROM items WHERE is_archived = false ORDER BY created_at DESC'
        );
        res.json(rows);
    } catch (error) {
        console.error('Error fetching items:', error);
        res.status(500).json({ error: 'Failed to fetch items' });
    }
};

// GET /api/items/:id
const getItemById = async (req, res) => {
    try {
        const { id } = req.params;
        const { rows } = await db.query('SELECT * FROM items WHERE id = $1', [id]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Item not found' });
        }

        res.json(rows[0]);
    } catch (error) {
        console.error('Error fetching item:', error);
        res.status(500).json({ error: 'Failed to fetch item' });
    }
};

// POST /api/items
const createItem = async (req, res) => {
    try {
        const {
            name, short_description, full_description, category,
            price, price_notes, status, condition_grade, condition_notes,
            specs, extras, quantity, images
        } = req.body;

        const query = `
      INSERT INTO items (
        name, short_description, full_description, category, price,
        price_notes, status, condition_grade, condition_notes,
        specs, extras, quantity, images
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13
      ) RETURNING *;
    `;

        const values = [
            name, short_description, full_description, category, price,
            price_notes, status || 'available', condition_grade, condition_notes,
            specs || {}, extras || [], quantity || 1, images || []
        ];

        const { rows } = await db.query(query, values);
        res.status(201).json(rows[0]);
    } catch (error) {
        console.error('Error creating item:', error);
        res.status(500).json({ error: 'Failed to create item' });
    }
};

// PUT /api/items/:id
const updateItem = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            name, short_description, full_description, category,
            price, price_notes, status, condition_grade, condition_notes,
            specs, extras, quantity, images, is_archived
        } = req.body;

        // Check if exists
        const check = await db.query('SELECT id FROM items WHERE id = $1', [id]);
        if (check.rows.length === 0) {
            return res.status(404).json({ error: 'Item not found' });
        }

        const query = `
      UPDATE items SET
        name = COALESCE($1, name),
        short_description = COALESCE($2, short_description),
        full_description = COALESCE($3, full_description),
        category = COALESCE($4, category),
        price = COALESCE($5, price),
        price_notes = COALESCE($6, price_notes),
        status = COALESCE($7, status),
        condition_grade = COALESCE($8, condition_grade),
        condition_notes = COALESCE($9, condition_notes),
        specs = COALESCE($10, specs),
        extras = COALESCE($11, extras),
        quantity = COALESCE($12, quantity),
        images = COALESCE($13, images),
        is_archived = COALESCE($14, is_archived),
        updated_at = NOW()
      WHERE id = $15
      RETURNING *;
    `;

        // We use COALESCE so if a field is omitted, it keeps its existing value. 
        // However, if the client actually wants to clear an array to [], COALESCE($x, images) 
        // means they must pass [] explicitly or it defaults to null then coalesces. 
        // This is a basic merge strategy.

        const values = [
            name, short_description, full_description, category, price,
            price_notes, status, condition_grade, condition_notes,
            specs, extras, quantity, images, is_archived, id
        ];

        const { rows } = await db.query(query, values);
        res.json(rows[0]);
    } catch (error) {
        console.error('Error updating item:', error);
        res.status(500).json({ error: 'Failed to update item' });
    }
};

// DELETE /api/items/:id (or soft-delete depending on preference)
const deleteItem = async (req, res) => {
    try {
        const { id } = req.params;

        // We'll actually delete it from DB as requested, but we could also just set is_archived=true
        const { rowCount } = await db.query('DELETE FROM items WHERE id = $1', [id]);

        if (rowCount === 0) {
            return res.status(404).json({ error: 'Item not found' });
        }

        res.json({ message: 'Item deleted successfully' });
    } catch (error) {
        console.error('Error deleting item:', error);
        res.status(500).json({ error: 'Failed to delete item' });
    }
};

module.exports = {
    getItems,
    getItemById,
    createItem,
    updateItem,
    deleteItem
};
