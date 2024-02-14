const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController'); // Adjust path based on your controller location

// Middleware (implement any authentication or authorization here if needed)
// const verifyJWT = require('../middleware/verifyJWT');
// router.use(verifyJWT); // Uncomment if middleware is required

// Customer routes
router.route('/')
  .get(customerController.getAllCustomers) // Get all customers
  .post(customerController.createCustomer); // Create a new customer

router.route('/:id')
  .get(customerController.getCustomerById) // Get a specific customer by ID
  .put(customerController.updateCustomer) // Update a customer's details
  .delete(customerController.deleteCustomer); // Delete a customer

module.exports = router;
