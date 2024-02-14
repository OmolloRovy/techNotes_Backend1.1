const express = require('express');
const Customer = require('../models/Customer')
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');



const Customer = mongoose.model('Customer', CustomerSchema);

const router = express.Router();

// Middleware for validation and error handling
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};


// Create a new customer (POST)
router.post('/',
  body('name').isString().notEmpty(),
  body('email').isEmail().custom(async (email, { req }) => {
    const existingCustomer = await Customer.findOne({ email });
    if (existingCustomer) {
      throw new Error('Email already exists');
    }
    return true;
  }),
  body('address').isString().optional(),
  body('phone_number').isString().optional(),
  body('device_details').isObject().optional(),
  validate,
  async (req, res) => {
    const newCustomer = new Customer(req.body);
    try {
      const savedCustomer = await newCustomer.save();
      res.status(201).json(savedCustomer);
    } catch (err) {
      console.error('Error creating customer:', err);
      res.status(500).json({ message: 'Error creating customer' });
    }
  }
);

// Get all customers (GET)
router.get('/', async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    console.error('Error getting customers:', err);
    res.status(500).json({ message: 'Error getting customers' });
  }
});

// Get a specific customer by ID (GET)
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const customer = await Customer.findById(id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.json(customer);
  } catch (err) {
    console.error('Error getting customer:', err);
    res.status(500).json({ message: 'Error getting customer' });
  }
});

// Update a customer's details (PUT)
router.put('/:id',
  body('name').isString().optional(),
  body('email').isEmail().optional(),
  body('address').isString().optional(),
  body('phone_number').isString().optional(),
  body('device_details').isObject().optional(),
  validate,
  async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    try {
      const updatedCustomer = await Customer.findByIdAndUpdate(id, updates, { new: true });
      if (!updatedCustomer) {
        return res.status(404).json({ message: 'Customer not found' });
      }
      res.json(updatedCustomer);
    } catch (err) {
      console.error('Error updating customer:', err);
      res.status(500).json({ message: 'Error updating customer' });
    }
  }
)

// Delete a customer (DELETE)
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCustomer = await Customer.findByIdAndDelete(id);
    if (!deletedCustomer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.json({ message: 'Customer deleted successfully' });
  } catch (err) {
    console.error('Error deleting customer:', err);
    res.status(500).json({ message: 'Error deleting customer' });
  }
});

module.exports = router; // Export the router for use in your main app
