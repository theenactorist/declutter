const express = require('express');
const { login } = require('../controllers/authController');
const { getItems, getItemById, createItem, updateItem, deleteItem } = require('../controllers/itemsController');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

// Auth
router.post('/auth/login', login);

// Public Item Routes
router.get('/items', getItems);
router.get('/items/:id', getItemById);

// Protected Admin Item Routes
router.post('/items', requireAuth, createItem);
router.put('/items/:id', requireAuth, updateItem);
router.delete('/items/:id', requireAuth, deleteItem);

module.exports = router;
