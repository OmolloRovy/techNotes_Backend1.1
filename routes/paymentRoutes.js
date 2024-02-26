const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController'); // Adjust path based on your controller location

// Middleware (implement any authentication or authorization here if needed)
// const verifyJWT = require('../middleware/verifyJWT');
// router.use(verifyJWT); // Uncomment if middleware is required

// Customer routes
router.route('/')
  .get(paymentController.getAllPayments) // Get all customers
  .post(paymentController.createPayments) // Create a new customer
  .put(paymentController.updatePayments) // Update a customer's details
  .delete(paymentController.deletePayments) // Delete a customer

module.exports = router;
