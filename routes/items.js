const express = require('express');
const router = express.Router();

const { authenticate } = require('../middlewares/auth');

const { Item, BasketItem, Item_id  } = require('../models');


// Add your resource-specific routes here
// Create a new Item
router.post('/', authenticate, async (req, res) => {
    try {
      const item = await Item.create(req.body);
      res.status(201).json(item);
    } catch (error) {
      res.status(500).json({ message: 'Error creating item', error });
    }
  });
  
  router.get('/', async (req, res) => {
    try {
      const items = await Item.findAll(); // how can we include the ITEMS associated with the items in this response?
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving items', error });
    }
  });
  
  router.get('/:id', async (req, res) => {
    try {
      const item = await Item.findByPk(req.params.id); // how can we include the ITEMS associated with the items in this response?
  
      if (!item) {
        res.status(404).json({ message: 'Items not found' });
      } else {
        res.json(item);
      }
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving Item', error });
    }
  });

// Update a item by ID
router.put('/:id', authenticate,async (req, res) => {
    try {
      const [updated] = await Item.update(req.body, {
        where: { id: req.params.id },
      });
  
      if (updated) {
        const updatedItem = await Item.findByPk(req.params.id);
        res.json(updatedItem);
      } else {
        res.status(404).json({ message: 'Item not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error updating item', error });
    }
  });

  // Delete a item by ID
router.delete('/:id', authenticate,async (req, res) => {
    try {
      const deleted = await Item.destroy({
        where: { id: req.params.id },
      });
  
      if (deleted) {
        res.status(204).json({ message: 'Item deleted' });
      } else {
        res.status(404).json({ message: 'Item not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error deleting item', error });
    }
  });

module.exports = router;