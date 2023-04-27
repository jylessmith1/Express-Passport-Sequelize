const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/auth');
const { Order, OrderBaskets, Basket } = require('../models');

// Add your resource-specific routes here


// Create a new order
router.post('/', authenticate,async (req, res) => {
    try {
      const orders = await Order.create(req.body);
      res.status(201).json(orders);
    } catch (error) {
      res.status(500).json({ message: 'Error creating order', error });
    }
  });

  // Get all orders, including associated items
router.get('/', async (req, res) => {
    try {
      const orders = await Order.findAll(); // how can we include the ITEMS associated with the orders in this response?
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving orders', error });
    }
  });

  router.get('/:id', async (req, res) => {
    try {
      const orders = await Order.findByPk(req.params.id); // how can we include the ITEMS associated with the orderss in this response?
  
      if (!orders) {
        res.status(404).json({ message: 'Orders not found' });
      } else {
        res.json(orders);
      }
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving order', error });
    }
  });

  // Update a order by ID
router.put('/:id', authenticate,async (req, res) => {
    try {
      const [updated] = await Order.update(req.body, {
        where: { id: req.params.id },
      });
  
      if (updated) {
        const updatedOrder = await Order.findByPk(req.params.id);
        res.json(updatedOrder);
      } else {
        res.status(404).json({ message: 'Order not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error updating order', error });
    }
  });

  // Delete a order by ID
router.delete('/:id', authenticate,async (req, res) => {
    try {
      const deleted = await Order.destroy({
        where: { id: req.params.id },
      });
  
      if (deleted) {
        res.status(204).json({ message: 'Order deleted' });
      } else {
        res.status(404).json({ message: 'Order not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error deleting order', error });
    }
  });

  
module.exports = router;